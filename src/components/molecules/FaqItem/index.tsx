"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";

interface FaqItemProps {
  question: string;
  answer: string;
  open?: boolean;
}

export function FaqItem({ question, answer, open = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <S.Wrapper>
      <S.Trigger
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {question}
        <S.Chevron $open={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </S.Chevron>
      </S.Trigger>
      <S.Content $open={isOpen} $height={height}>
        <S.Answer ref={contentRef}>{answer}</S.Answer>
      </S.Content>
    </S.Wrapper>
  );
}
