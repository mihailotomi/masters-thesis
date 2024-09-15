import { ReactNode } from "react";

export interface iPaginationProps {
  id: string;
  currentPage?: number;
  perPage: number;
  count: number;
  paginationConfiguration?: iPaginationConfiguration;
  onPageChange: (val: number) => void;
  onRowsPerPageChange?: (val: number) => void;
}

export interface iPaginationConfiguration {
  position?: "left" | "center" | "right";
  backButton?: iPaginationButton;
  nextButton?: iPaginationButton;
  pageButton?: iPaginationPageButton;
}

export interface iPaginationButton {
  label: string;
  icon?: ReactNode;
  render?: () => ReactNode;
  styles?: string;
}

export interface iPaginationPageButton {
  render?: (value: number, active: boolean) => ReactNode;
  styles?: string;
  activeStyles?: string;
}

export interface iPaginationButtonProps {
  currentPage: number;
  pageNumbers: number[];
  type: "next" | "back";
  perPage: number;
  onClick: () => void;
  buttonConfiguration?: iPaginationButton;
}

export interface iActivePageProps {
  onPageChange: () => void;
  pageNumber: number;
  currentPage: number;
  pageButton?: iPaginationPageButton;
}
