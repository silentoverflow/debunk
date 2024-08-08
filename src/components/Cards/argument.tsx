import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useCallback, useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'
import styled, { useTheme } from 'styled-components'

import { ThemedText } from '../../theme/components'
import { Column, Row } from '../Flex'
import useComponentSize from '../hooks/useComponentSize'

const DROPDOWN_GAP = 16

const StyledArgumentCard = styled.div`
  background: ${({ theme }) => theme.bg1};
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`

const Copy = styled.div`
  cursor: pointer;
`

const Capsule = styled(ThemedText.Custom)<{ color?: string }>`
  height: 30px;
  padding: 0 12px;
  background: ${({ theme, color = 'accent1' }) => theme[color]};
  font-size: 14px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 99px;
  color: ${({ theme }) => theme.white};
`

const Dropdown = styled(Column)<{ opened: boolean; contentHeight: number }>`
  background: ${({ theme }) => theme.bg3};
  padding: 20px;
  width: 100%;
  border-radius: 16px;
  cursor: pointer;
  align-items: normal;
  gap: ${DROPDOWN_GAP}px;
  overflow: hidden;
  transition: height ease-in-out, 100ms;

  height: ${({ opened, contentHeight }) => (opened ? contentHeight + DROPDOWN_GAP + 64 : 64)}px;

  & svg {
    transform: rotate(${({ opened }) => (opened ? 180 : 0)}deg);
    transition: transform ease-in-out, 100ms;
  }
`

const DropdownTitle = styled(ThemedText.Custom)`
  color: ${({ theme }) => theme.neutral1};
  font-weight: 700;
  font-size: 20px;
`

const SourcesWrapper = styled.ul`
  margin: 0;
  padding-left: 24px;
`

const Source = styled.li`
  font-size: 20px;
  line-height: 32px;
`

interface ArgumentCardProps {
  name: string
  argument: NonNullable<Queries.DebunkQuery['contentYaml']>['arguments'][number]
}

export default function ArgumentCard({ argument, name }: ArgumentCardProps) {
  // state
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isSourcesOpen, setIsSourcesOpen] = useState(false)

  // theme
  const theme = useTheme()

  // "more" height
  const moreRef = useRef<HTMLDivElement>(null)
  const { height: moreHeight } = useComponentSize(moreRef)

  // "sources" height
  const sourcesRef = useRef<HTMLUListElement>(null)
  const { height: sourcesHeight } = useComponentSize(sourcesRef)

  // toggle "sources" and "more"
  const toggleMore = useCallback(() => setIsMoreOpen((state) => !state), [])
  const toggleSources = useCallback(() => setIsSourcesOpen((state) => !state), [])

  // copy
  const copyArgument = useCallback(() => {
    navigator.clipboard.writeText(argument.summary)
  }, [argument.summary])

  // more renderer
  const getMoreContent = useCallback((more: ArgumentCardProps['argument']['more'][number]) => {
    if (more.p) {
      return <ThemedText.BodyPrimary>{more.p}</ThemedText.BodyPrimary>
    } else if (more.img) {
      const image = getImage(more.img as any)

      console.log(more.img, image)

      return image ? <GatsbyImage image={image} alt="" /> : null
    } else {
      return null
    }
  }, [])

  return (
    <StyledArgumentCard>
      <Column gap={32} alignItems="normal">
        <Column gap={20} alignItems="normal">
          <Row justify="space-between">
            <Capsule>{name}</Capsule>

            <Copy onClick={copyArgument}>
              <Capsule color="neutral1">Copier</Capsule>
            </Copy>
          </Row>

          <ThemedText.BodyPrimary>{argument.summary}</ThemedText.BodyPrimary>
        </Column>

        <Column gap={16}>
          <Dropdown opened={isMoreOpen} contentHeight={moreHeight}>
            <Row justify="space-between" onClick={toggleMore}>
              <DropdownTitle>Lire plus</DropdownTitle>
              <ChevronDown color={theme.neutral1} />
            </Row>

            <Column ref={moreRef} alignItems="normal" gap={32}>
              {argument.more.map((more, index) => (
                <React.Fragment key={`more-${index}`}>{getMoreContent(more)}</React.Fragment>
              ))}
            </Column>
          </Dropdown>

          <Dropdown opened={isSourcesOpen} contentHeight={sourcesHeight}>
            <Row justify="space-between" onClick={toggleSources}>
              <DropdownTitle>Sources et références</DropdownTitle>
              <ChevronDown color={theme.neutral1} />
            </Row>

            <SourcesWrapper ref={sourcesRef}>
              {argument.sources.map((source, index) => (
                <Source key={`source-${index}`}>
                  <Link to={source.link}>{source.text}</Link>
                </Source>
              ))}
            </SourcesWrapper>
          </Dropdown>
        </Column>
      </Column>
    </StyledArgumentCard>
  )
}
