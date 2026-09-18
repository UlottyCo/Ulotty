/**
 * Tests for properties server actions
 * Run with: npm test -- properties.test.ts
 */

import { validateProperty } from "@/lib/validators";

describe("Properties Server Actions", () => {
  describe("validateProperty", () => {
    it("should validate a complete property object", () => {
      const validProperty = {
        title: "Hermoso apartamento",
        address: "Calle Principal 123",
        type: "departamento",
        price: 250000,
        area: 85,
        bedrooms: 2,
        status: "pendiente",
        description: "Buen apartamento",
      };

      const result = validateProperty(validProperty);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should fail when required fields are missing", () => {
      const incompleteProperty = {
        title: "",
        address: "Calle Principal 123",
        type: "departamento",
        price: 250000,
        area: 85,
        bedrooms: 2,
        status: "pendiente",
      };

      const result = validateProperty(incompleteProperty);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should validate price is a positive number", () => {
      const invalidProperty = {
        title: "Apartamento",
        address: "Calle Principal 123",
        type: "departamento",
        price: -100,
        area: 85,
        bedrooms: 2,
        status: "pendiente",
        description: "Test",
      };

      const result = validateProperty(invalidProperty);
      expect(result.valid).toBe(false);
    });

    it("should validate area is positive", () => {
      const invalidProperty = {
        title: "Apartamento",
        address: "Calle Principal 123",
        type: "departamento",
        price: 250000,
        area: 0,
        bedrooms: 2,
        status: "pendiente",
        description: "Test",
      };

      const result = validateProperty(invalidProperty);
      expect(result.valid).toBe(false);
    });

    it("should accept all valid property types", () => {
      const types = ["casa", "departamento", "terreno", "comercial", "lote"];

      types.forEach((type) => {
        const property = {
          title: "Propiedad",
          address: "Dirección",
          type,
          price: 250000,
          area: 85,
          bedrooms: 2,
          status: "pendiente",
          description: "Test",
        };

        const result = validateProperty(property);
        expect(result.valid).toBe(true);
      });
    });
  });
});

describe("Property Data Processing", () => {
  it("should format price with locale", () => {
    const price = 1500000;
    const formatted = price.toLocaleString("es-MX");
    expect(formatted).toContain(",");
  });

  it("should calculate property statistics", () => {
    const properties = [
      { price: 100000, status: "activa" },
      { price: 200000, status: "activa" },
      { price: 300000, status: "pendiente" },
    ];

    const activeProperties = properties.filter((p) => p.status === "activa");
    const avgPrice = activeProperties.reduce((sum, p) => sum + p.price, 0) / activeProperties.length;

    expect(avgPrice).toBe(150000);
    expect(activeProperties).toHaveLength(2);
  });
});
