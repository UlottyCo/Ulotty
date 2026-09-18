import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterPanel, FilterConfig } from "../filter-panel";

describe("FilterPanel Component", () => {
  const mockFilters: FilterConfig[] = [
    {
      key: "status",
      label: "Estado",
      options: [
        { value: "aprobada", label: "Aprobada" },
        { value: "pendiente", label: "Pendiente" },
      ],
    },
    {
      key: "type",
      label: "Tipo",
      options: [
        { value: "casa", label: "Casa" },
        { value: "apartamento", label: "Apartamento" },
      ],
    },
  ];

  it("should render filter labels", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={false}
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
  });

  it("should render all filter options", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={false}
      />
    );

    expect(screen.getByText("Aprobada")).toBeInTheDocument();
    expect(screen.getByText("Apartamento")).toBeInTheDocument();
  });

  it("should call onFiltersChange when filter changes", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={false}
      />
    );

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "aprobada" } });

    expect(mockOnChange).toHaveBeenCalledWith({ status: "aprobada" });
  });

  it("should handle collapsible mode", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={true}
      />
    );

    const button = screen.getByText("Filtros");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("should reset filters when reset button is clicked", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={false}
      />
    );

    const resetButton = screen.getByText("Limpiar filtros");
    fireEvent.click(resetButton);

    expect(mockOnChange).toHaveBeenCalledWith({});
  });

  it("should have 'Todas' as default option", () => {
    const mockOnChange = jest.fn();
    render(
      <FilterPanel
        filters={mockFilters}
        onFiltersChange={mockOnChange}
        collapsible={false}
      />
    );

    const options = screen.getAllByText("Todas");
    expect(options.length).toBeGreaterThan(0);
  });
});
