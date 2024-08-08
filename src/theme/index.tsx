import React, { useMemo } from 'react'
import { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { lightTheme } from './colors'

const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

function getSettings() {
  return {
    breakpoint: BREAKPOINTS,
  }
}

export function getTheme() {
  return {
    ...lightTheme,
    ...getSettings(),
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeObject = useMemo(() => getTheme(), [])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.neutral1};
    background-color: ${({ theme }) => theme.bg1} !important;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'SN Pro';
  }

  a {
    color: ${({ theme }) => theme.neutral1};
    text-decoration: underline;
  }

  summary::-webkit-details-marker {
    display:none;
  }
`
