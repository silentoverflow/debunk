import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Back from '../components/Back'
import ArgumentCard from '../components/Cards/argument'
import { Column } from '../components/Flex'
import Tag from '../components/Tag'
import { ThemedText } from '../theme/components'
import Layout from './'

const ThemedGlobalStyle = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.bg2} !important;
  }
`

const Section = styled.section`
  width: 100%;
  max-width: 920px;
  margin: 0 auto 100px;
  padding: 0 16px;
`

const TitleWrapper = styled.div`
  position: relative;
  margin-top: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    margin-top: 100px;
  }
`

const Index = styled(ThemedText.Custom)`
  /* Create the gradient. */
  background-image: linear-gradient(0deg, ${({ theme }) => theme.gray250}, ${({ theme }) => theme.gray130}19);

  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  font-weight: 900;
  font-size: 320px;
  position: absolute;
  text-align: center;
  top: -100px;
  right: 0;
  left: 0;
  z-index: -1;
`

const Title = styled(ThemedText.HeadlineLarge)`
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    font-size: 64px !important;
    line-height: 72px !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.xs}px) {
    font-size: 48px !important;
    line-height: 54px !important;
  }
`

const MainArticle = styled.article`
  max-width: 830px;
  width: 100%;
  margin: 0 auto;
`

// eslint-disable-next-line import/no-unused-modules
export default function Debunk({ data }: PageProps<Queries.DebunkQuery>) {
  const debunk = data.contentYaml

  // should not happen
  if (!debunk) return null

  return (
    <Layout>
      <ThemedGlobalStyle />

      <Back />

      <Section>
        <Column gap={100}>
          <Column gap={8}>
            <TitleWrapper>
              <Index>{debunk.fields.index}</Index>
              <Title>“{debunk.title}”</Title>
            </TitleWrapper>

            <Tag>{debunk.tag}</Tag>
          </Column>

          <MainArticle>
            <Column gap={64}>
              <ThemedText.BodyPrimary>{debunk.subtitle}</ThemedText.BodyPrimary>

              <Column gap={24} alignItems="start">
                <ThemedText.HeadlineSmall>Contre arguments:</ThemedText.HeadlineSmall>

                {debunk.arguments.map((argument, index) => (
                  <ArgumentCard key={`argument-${index}`} name={`Argument ${index + 1}`} argument={argument} />
                ))}
              </Column>
            </Column>
          </MainArticle>
        </Column>
      </Section>
    </Layout>
  )
}

// eslint-disable-next-line import/no-unused-modules
export const query = graphql`
  query Debunk($index: String) {
    contentYaml(fields: { index: { eq: $index } }) {
      title
      tag
      subtitle
      arguments {
        summary
        more {
          p
          img {
            childImageSharp {
              gatsbyImageData(width: 1024)
            }
          }
        }
        sources {
          link
          text
        }
      }
      fields {
        index
      }
    }
  }
`
