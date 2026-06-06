"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/molecules/Select";
import * as S from "./style";

interface TransactionFiltersProps {
  search: string;
  categoryFilter: string;
  startDate: string;
  endDate: string;
  categories: { id: string; name: string }[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export function TransactionFilters({
  search,
  categoryFilter,
  startDate,
  endDate,
  categories,
  onSearchChange,
  onCategoryChange,
  onStartDateChange,
  onEndDateChange,
}: TransactionFiltersProps) {
  return (
    <S.FilterRow>
      <S.FormGroup>
        <S.Label>Pesquisar</S.Label>
        <S.SearchWrapper>
          <S.SearchIcon>
            <HiOutlineMagnifyingGlass size={16} />
          </S.SearchIcon>
          <Input
            placeholder="Buscar por descrição..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: "36px" }}
          />
        </S.SearchWrapper>
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>Filtrar por Categoria</S.Label>
        <Select
          value={categoryFilter}
          onChange={onCategoryChange}
          options={[
            { value: "", label: "Todas" },
            ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>Data Início</S.Label>
        <Input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>Data Fim</S.Label>
        <Input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} />
      </S.FormGroup>
    </S.FilterRow>
  );
}
