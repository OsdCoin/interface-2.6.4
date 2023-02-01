import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { NewSwapPoolTabs } from '../../components/NavigationTabs'
import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import Row, { RowBetween } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import { Dots } from '../../components/swap/styleds'
import {
  CardInner,
  Container,
  Main,
  ShareContainer,
  SideBar,
  SideHeader,
  ThemeSwitchWrapper,
  SeparatorLine,
  ThemeIconWrapper
} from './styleds'
import EascLogo from '../../assets/images/easc_logo.png'
import { ReactComponent as TelegramIcon } from '../../assets/svg/telegram.svg'
import { ReactComponent as TwitterIcon } from '../../assets/svg/twitter.svg'
import { ReactComponent as RefreshIcon } from '../../assets/svg/refresh.svg'
import { ReactComponent as SettingIcon } from '../../assets/svg/setting.svg'
import { ReactComponent as DoubtIcon } from '../../assets/svg/doubt.svg'
import { ReactComponent as LightIcon } from '../../assets/svg/light.svg'
import { ReactComponent as DarkIcon } from '../../assets/svg/dark.svg'
import NavMenu from '../../components/NavMenu'
import { Header } from './styleds'
import { SearchInput } from '../../components/SearchInput'
import {
  LiquidityCard,
  CardHeader,
  TextWrapper,
  Desc,
  Title,
  OperationIconWrapper,
  IconButton,
  StyledButtonPrimary
} from './styleds'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
      <Container>
        <SideBar>
          <SideHeader>
            <img src={EascLogo} alt="logo" width={223} height={56} />
          </SideHeader>
          <NavMenu />
          <ShareContainer>
            <TelegramIcon style={{ marginRight: '20px' }} />
            <TwitterIcon />
          </ShareContainer>
          <ThemeSwitchWrapper>
            <ThemeIconWrapper mode="light">
              <LightIcon />
            </ThemeIconWrapper>

            <SeparatorLine>/</SeparatorLine>
            <ThemeIconWrapper mode="dark">
              <DarkIcon />
            </ThemeIconWrapper>
          </ThemeSwitchWrapper>
        </SideBar>
        <Main>
          <Header>
            <NewSwapPoolTabs active={'pool'} />
            <SearchInput type="text" placeholder="请输入" />
          </Header>
          <LiquidityCard>
            <CardInner>
              <CardHeader>
                <TextWrapper>
                  <Title>Liquidity</Title>
                  <Desc>Add liquidity to receive LP tokens</Desc>
                </TextWrapper>
                <OperationIconWrapper>
                  <IconButton style={{ marginRight: 40 }}>
                    <SettingIcon />
                  </IconButton>
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </OperationIconWrapper>
              </CardHeader>
              <StyledButtonPrimary id="join-pool-button" as={Link} to="/add/ETH">
                <Text fontWeight={500} fontSize={20}>
                  Add Liquidity
                </Text>
              </StyledButtonPrimary>
              <AutoColumn gap="12px" style={{ width: '100%' }}>
                <Row>
                  <Text color="#333F66" marginRight={9} fontSize={26} fontWeight={500}>
                    Your Liquidity
                  </Text>
                  <Question
                    icon={<DoubtIcon />}
                    text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below."
                  />
                </Row>

                {!account ? (
                  <LightCard padding="40px" height="200px" backgroundColor="#E3EBFF" borderRadius="12px" border="none">
                    <TYPE.body color="#A1ADD5" textAlign="center">
                      Connect to a wallet to view your liquidity.
                    </TYPE.body>
                  </LightCard>
                ) : v2IsLoading ? (
                  <LightCard padding="40px" height="200px" backgroundColor="#E3EBFF" borderRadius="12px" border="none">
                    <TYPE.body color="#A1ADD5" textAlign="center">
                      <Dots>Loading</Dots>
                    </TYPE.body>
                  </LightCard>
                ) : allV2PairsWithLiquidity?.length > 0 ? (
                  <>
                    {allV2PairsWithLiquidity.map(v2Pair => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <LightCard padding="40px" height="200px" backgroundColor="#E3EBFF" borderRadius="12px" border="none">
                    <TYPE.body color="#A1ADD5" textAlign="center">
                      No liquidity found.
                    </TYPE.body>
                  </LightCard>
                )}

                <div>
                  <Text color="#A1ADD5" fontSize={20}>
                    {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joined? "}
                    <StyledInternalLink
                      id="import-pool-link"
                      to={hasV1Liquidity ? '/migrate/v1' : '/find'}
                      style={{ color: '#4965FC' }}
                    >
                      {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                    </StyledInternalLink>
                  </Text>
                  <Text color="#A1ADD5" fontSize={20} marginTop="40px">
                    Or, if you staked your LP tokens in a farm, unstake them to see them here.
                  </Text>
                </div>
              </AutoColumn>
            </CardInner>
          </LiquidityCard>
        </Main>
      </Container>

      {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
        <ButtonSecondary as={Link} style={{ width: 'initial' }} to="/migrate/v1">
          Migrate V1 Liquidity
        </ButtonSecondary>
      </div> */}
    </>
  )
}
