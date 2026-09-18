import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../search-bar";

describe("SearchBar Component", () => {
  it("should render with default placeholder", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
  });

  it("should render with custom placeholder", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar placeholder="Buscar propiedades..." onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Buscar propiedades...");
    expect(input).toBeInTheDocument();
  });

  it("should call onSearch when user types", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} debounceMs={100} />);

    const input = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("test");
    });
  });

  it("should debounce search calls", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} debounceMs={100} />);

    const input = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSearch).toHaveBeenCalledWith("test");
    });
  });

  it("should update input value on change", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });

    expect(input.value).toBe("hello");
  });

  it("should have search icon", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
