import { Link } from 'gatsby'
import React from 'react'
import { styled } from 'styled-components'

import { ThemedText } from '../../theme/components'
import { Row } from '../Flex'

const StyledHeader = styled(Row)`
  padding: 32px 0;
  gap: 40px;
  justify-content: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover > * {
    color: ${({ theme }) => theme.neutral1};
  }
`

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="#">
        <ThemedText.Subtitle>À propos</ThemedText.Subtitle>
      </StyledLink>

      <StyledLink to="#">
        <ThemedText.Subtitle>Faire un don pour la Palestine</ThemedText.Subtitle>
      </StyledLink>
    </StyledHeader>
  )
}
