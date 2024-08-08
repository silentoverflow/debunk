import React from 'react'
import { styled } from 'styled-components'

import { ThemedText } from '../../theme/components'
import { capitalizeWord } from '../../utils/string'

const StyledTag = styled(ThemedText.Custom)`
  font-size: 14px;
  font-weight: 500;
  padding: 4px 12px;
  background: ${({ theme }) => theme.bg1};
  border-radius: 99px;
  color: ${({ theme }) => theme.gray500};
`

interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return <StyledTag>{capitalizeWord(children)}</StyledTag>
}
