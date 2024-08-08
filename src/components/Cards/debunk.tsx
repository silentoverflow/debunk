import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { ThemedText } from '../../theme/components'
import { Button } from '../Buttons'
import { Column } from '../Flex'
import Tag from '../Tag'

const StyledDebunkCard = styled(Column)`
  background: ${({ theme }) => theme.bg2};
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    padding: 16px 12px;
  }
`

const Title = styled(ThemedText.HeadlineSmall)`
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}px) {
    font-size: 24px !important;
    line-height: 24px !important;
  }
`

interface DebunkCardProps {
  id: string
  title: string
  slug: string
  tag: string
}

export default function DebunkCard({ slug, id, title, tag }: DebunkCardProps) {
  return (
    <StyledDebunkCard>
      <ThemedText.Custom color="neutral3" fontSize={48} fontWeight={900}>
        {id}
      </ThemedText.Custom>

      <Column gap={24}>
        <Tag>{tag}</Tag>
        <Title>“{title}”</Title>
      </Column>

      <Link to={slug}>
        <Button>En savoir plus</Button>
      </Link>
    </StyledDebunkCard>
  )
}
