import '../assets/fonts/fonts.css'

import React from 'react'
import { styled } from 'styled-components'

import Header from '../components/Header'
import ThemeProvider, { ThemedGlobalStyle } from '../theme'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  position: relative;
`

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <ThemedGlobalStyle />

      <Wrapper>
        <Header />
        {children}
      </Wrapper>
    </ThemeProvider>
  )
}
