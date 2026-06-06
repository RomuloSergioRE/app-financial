"use client";

import { Button } from "@/components/atoms/Button";
import type { PaginationProps } from "./types";
import * as S from "./style";

function getPageRange(currentPage: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const range = 2;
  const start = Math.max(2, currentPage - range);
  const end = Math.min(totalPages - 1, currentPage + range);

  pages.push(1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);

  return (
    <S.Wrapper>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        Anterior
      </Button>
      {pages.map((p, i) =>
        p === "..." ? (
          <S.PageDots key={`dots-${i}`}>...</S.PageDots>
        ) : (
          <S.PageButton key={p} $active={p === currentPage} onClick={() => onPageChange(p)}>
            {p}
          </S.PageButton>
        ),
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próximo
      </Button>
    </S.Wrapper>
  );
}
