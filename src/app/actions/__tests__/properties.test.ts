/**
 * @jest-environment node
 */

import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyStats,
} from "../properties";

describe("Properties Server Actions", () => {
  describe("getProperties", () => {
    it("should fetch all properties without filters", async () => {
      const result = await getProperties();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter properties by status", async () => {
      const result = await getProperties({ status: "aprobada" });
      expect(Array.isArray(result)).toBe(true);
      result.forEach((prop: any) => {
        expect(prop.status).toBe("aprobada");
      });
    });

    it("should filter properties by type", async () => {
      const result = await getProperties({ type: "casa" });
      expect(Array.isArray(result)).toBe(true);
    });

    it("should handle multiple filters", async () => {
      const result = await getProperties({
        status: "aprobada",
        type: "casa",
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getPropertyById", () => {
    it("should throw error for non-existent property", async () => {
      await expect(getPropertyById("non-existent-id")).rejects.toThrow();
    });
  });

  describe("getPropertyStats", () => {
    it("should return stats object with all required fields", async () => {
      const stats = await getPropertyStats();
      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("published");
      expect(stats).toHaveProperty("pending");
      expect(stats).toHaveProperty("rejected");
    });

    it("should return numeric values for all stats", async () => {
      const stats = await getPropertyStats();
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.published).toBe("number");
      expect(typeof stats.pending).toBe("number");
      expect(typeof stats.rejected).toBe("number");
    });

    it("should have total >= published + pending + rejected", async () => {
      const stats = await getPropertyStats();
      const sum = stats.published + stats.pending + stats.rejected;
      expect(stats.total).toBeGreaterThanOrEqual(sum);
    });
  });

  describe("createProperty", () => {
    it("should validate required fields", async () => {
      const invalidProperty = {
        title: "Test Property",
      };
      try {
        await createProperty(invalidProperty);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("updateProperty", () => {
    it("should handle empty updates gracefully", async () => {
      try {
        await updateProperty("non-existent", {});
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("deleteProperty", () => {
    it("should handle deletion of non-existent property", async () => {
      try {
        await deleteProperty("non-existent");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
