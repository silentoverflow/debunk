/**
 * Preset styles of the Rebass Text component
 */

import React from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled from 'styled-components'

import { lightTheme } from '../colors'

interface TextWrapperCustomProps {
  color: keyof typeof lightTheme
  lineHeight: number
}

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'lineHeight',
})<TextWrapperCustomProps>`
  color: ${({ color, theme }) => (theme as any)[color]};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : 1)};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

export const ThemedText = {
  Custom(props: TextProps) {
    return <TextWrapper {...props} />
  },

  HeadlineLarge(props: TextProps) {
    return <TextWrapper fontWeight={800} fontSize={80} lineHeight={92} color="neutral1" {...props} />
  },
  HeadlineMedium(props: TextProps) {
    return <TextWrapper fontWeight={800} fontSize={60} lineHeight={70} color="neutral1" {...props} />
  },
  HeadlineSmall(props: TextProps) {
    return <TextWrapper fontWeight={800} fontSize={32} lineHeight={38} color="neutral1" {...props} />
  },

  SubHeaderLarge(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={32} lineHeight={38} color="neutral2" {...props} />
  },

  BodyPrimary(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} lineHeight={32} color="neutral1" {...props} />
  },
  Subtitle(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={16} color="neutral2" {...props} />
  },
}
