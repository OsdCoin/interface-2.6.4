import React from 'react'
import styled from 'styled-components'
import { CardProps, Text } from 'rebass'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{
  padding?: string
  border?: string
  borderRadius?: string
  height?: string
  backgroundColor?: string
}>`
  width: 100%;
  border-radius: 16px;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Card

export const LightCard = styled(Card)`
  border: ${({ theme, border }) => (border ? border : `1px solid ${theme.bg2}`)};
  background-color: ${({ theme, backgroundColor }) => (backgroundColor ? backgroundColor : theme.bg1)};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow2};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

const BlueCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`

export const BlueCard = ({ children, ...rest }: CardProps) => {
  return (
    <BlueCardStyled {...rest}>
      <Text fontWeight={500} color="#2172E5">
        {children}
      </Text>
    </BlueCardStyled>
  )
}
