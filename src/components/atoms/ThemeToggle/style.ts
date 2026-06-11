import styled from "styled-components";

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;