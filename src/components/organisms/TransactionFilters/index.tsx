"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("transactions");

  return (
    <S.FilterRow>
      <S.FormGroup>
        <S.Label>{t("pesquisar")}</S.Label>
        <S.SearchWrapper>
          <S.SearchIcon>
            <HiOutlineMagnifyingGlass size={16} />
          </S.SearchIcon>
          <Input
            placeholder={t("buscarDescricao")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: "36px" }}
          />
        </S.SearchWrapper>
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("filtrarCategoria")}</S.Label>
        <Select
          value={categoryFilter}
          onChange={onCategoryChange}
          options={[
            { value: "", label: t("todas") },
            ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("dataInicio")}</S.Label>
        <Input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("dataFim")}</S.Label>
        <Input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} />
      </S.FormGroup>
    </S.FilterRow>
  );
}
