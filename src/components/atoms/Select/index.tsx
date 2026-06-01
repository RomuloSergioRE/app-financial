"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import type { SelectProps } from "./types";
import * as S from "./style";

export function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption?.label ?? placeholder ?? "Selecione";

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIdx(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIdx(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIdx((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIdx >= 0 && activeIdx < options.length) {
          onChange(options[activeIdx].value);
        }
        close();
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close();
        break;
    }
  };

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    close();
  };

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Trigger
        type="button"
        $isOpen={isOpen}
        $hasError={!!error}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {displayText}
      </S.Trigger>
      <S.Chevron $isOpen={isOpen}>
        <HiOutlineChevronDown size={16} />
      </S.Chevron>
      {isOpen && (
        <S.Dropdown role="listbox">
          {options.map((opt, idx) => (
            <S.OptionItem
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              $isActive={idx === activeIdx}
              $isSelected={opt.value === value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </S.OptionItem>
          ))}
        </S.Dropdown>
      )}
    </S.Wrapper>
  );
}
