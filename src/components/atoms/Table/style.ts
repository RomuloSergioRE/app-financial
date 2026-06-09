import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.sm} - 1px)) {
    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      padding: ${({ theme }) => theme.spacing.md};
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      gap: ${({ theme }) => theme.spacing.xs};
    }

    tbody tr:last-child {
      border-bottom: none;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.sm} - 1px)) {
    display: none;
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  vertical-align: middle;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.sm} - 1px)) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 2px 0;
    border: none;

    &::before {
      content: attr(data-label);
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      color: ${({ theme }) => theme.colors.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      min-width: 70px;
      flex-shrink: 0;
    }
  }
`;

export const TdMono = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-variant-numeric: tabular-nums;
  vertical-align: middle;
  white-space: nowrap;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.sm} - 1px)) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 2px 0;
    border: none;
    white-space: normal;
    text-align: left;

    &::before {
      content: attr(data-label);
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      color: ${({ theme }) => theme.colors.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      min-width: 70px;
      flex-shrink: 0;
    }
  }
`;
