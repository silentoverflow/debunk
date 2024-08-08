import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import DebunkCard from '../components/Cards/debunk'
import { Column } from '../components/Flex'
import Layout from '../layouts'
import { ThemedText } from '../theme/components'

const Section = styled.section`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto 100px;
  padding: 0 32px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoint.xl}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.md}px) {
    grid-template-columns: 1fr;
  }
`

const IntroArticle = styled(Column)`
  margin: 0 auto;
  padding: 0 100px;
  margin: 100px 0;
  gap: 42px;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}px) {
    padding: 0 50px;
    margin: 50px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    padding: 0;
    margin: 32px 0;
    gap: 32px;
  }
`

const Title = styled(ThemedText.HeadlineMedium)`
  max-width: 942px;
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

const Subtitle = styled(ThemedText.SubHeaderLarge)`
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    font-size: 24px !important;
    line-height: 28px !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.xs}px) {
    font-size: 18px !important;
    line-height: 20px !important;
  }
`

// eslint-disable-next-line import/no-unused-modules
export default function Home({ data }: PageProps<Queries.AllDebunksQuery>) {
  const debunks = data.allContentYaml.nodes.filter((node) => +node.fields.index)

  return (
    <Layout>
      <Section>
        <IntroArticle>
          <Title>Guide d&apos;auto défense sur la Palestine 🇵🇸</Title>

          <Subtitle>
            Le but de ce site est de fournir rapidement une réponse aux arguments utilisés par les soutiens
            d&apos;Israël pour nier le génocide à Gaza, et plus générallement la colonisation, racisme et apartheid en
            Israël. Chaque question propose une réponse courte qui peut tenir en un tweet ou quelques phrases, ainsi que
            des sources et contenu pour aller plus loin.
          </Subtitle>
        </IntroArticle>

        <Grid>
          {debunks.map((node) => (
            <DebunkCard
              key={node.fields.slug}
              id={node.fields.index}
              title={node.title}
              slug={node.fields.slug}
              tag={node.tag}
            />
          ))}
        </Grid>
      </Section>
    </Layout>
  )
}

// eslint-disable-next-line import/no-unused-modules
export const query = graphql`
  query AllDebunks {
    allContentYaml(sort: { fields: { slug: ASC } }) {
      nodes {
        title
        tag
        fields {
          slug
          index
        }
      }
    }
  }
`
