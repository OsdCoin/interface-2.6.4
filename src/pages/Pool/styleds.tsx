import { darken } from 'polished'
import { Text } from 'rebass'
import styled from 'styled-components'
import { ButtonPrimary } from '../../components/Button'

export const Wrapper = styled.div`
  position: relative;
`

export const ClickableText = styled(Text)`
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.primary1};
`
export const MaxButton = styled.button<{ width: string }>`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.25rem 0.5rem;
  `};
  font-weight: 500;
  cursor: pointer;
  margin: 0.25rem;
  overflow: hidden;
  color: ${({ theme }) => theme.primary1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

export const SideBar = styled.div`
  width: 320px;
  height: 100%;
  background-position: center 100%;
  background-size: cover;
  background-image: url('/images/swap_side_bg.png');
  padding: 40px 0 20px;
  position: relative;
`

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 80px 80px;
  background-image: url('/images/main_bg.png');
  background-size: cover;
  background-position: center;
`

export const LiquidityCard = styled.div`
  flex-grow: 1;
  padding: 40px 60px;
  background-image: url('/images/liquidity_card_bg.png');
  background-size: cover;
  background-position: center;
`
export const CardInner = styled.div`
  width: 646px;
`

export const SideHeader = styled.div`
  padding: 0 48px;
`

export const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 39px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

export const TextWrapper = styled.div`
  color: #a1add5;
`
export const Title = styled.div`
  color: #333f66;
  font-size: 30px;
  font-weight: bold;
`
export const Desc = styled.div`
  font-size: 24px;
  margin-top: 10px;
  font-weight: 600;
`

export const OperationIconWrapper = styled.div`
  margin-left: auto;
  flex-wrap: nowrap;
`

export const IconButton = styled.span`
  cursor: pointer;
`

export const StyledButtonPrimary = styled(ButtonPrimary)`
  padding: 16px;
  width: 388px;
  border-radius: 12px;
  background: #4965fc;
  margin-bottom: 80px;
  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, '#4965fc')};
    background-color: ${darken(0.05, '#4965fc')};
  }
  &:hover {
    background-color: ${darken(0.05, '#4965fc')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.05, '#4965fc')};
    background-color: ${darken(0.05, '#4965fc')};
  }
`

export const ThemeSwitchWrapper = styled.div`
  position: absolute;
  left: 30px;
  bottom: 20px;
  height: 23px;
  display: flex;
  align-items: center;
`

export const SeparatorLine = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #a1add5;
  padding: 0 6px;
  display: flex;
  line-height: 20px;
  height: 23px;
`
// 应取theme 这里先做了ui
export const ThemeIconWrapper = styled.span<{ mode?: 'light' | 'dark' }>`
  svg {
    opacity: ${({ mode }) => (mode === 'light' ? 1 : 0.5)};
  }
`
