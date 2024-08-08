import styled from 'styled-components'

export const Button = styled.button`
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 12px 24px;
  border-radius: 14px;
  box-shadow: 0px 4px 12px 0px #0000001f;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all ease-in-out 100ms;

  &:hover {
    box-shadow: 0px 2px 12px 0px #0000001f;
    transform: translateY(1px);
  }
`
