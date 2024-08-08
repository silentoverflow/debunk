import { navigate } from 'gatsby'
import { useCallback } from 'react'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import styled, { useTheme } from 'styled-components'

import { Row } from '../Flex'

const BackWrapper = styled(Row)`
  position: absolute;
  top: 32px;
  left: 32px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    top: 64px;
  }
`

export default function Back() {
  // theme
  const theme = useTheme()

  // navigation
  const back = useCallback(() => {
    navigate('/')
  }, [])

  return (
    <BackWrapper onClick={back}>
      <ArrowLeft color={theme.neutral2} />
    </BackWrapper>
  )
}
