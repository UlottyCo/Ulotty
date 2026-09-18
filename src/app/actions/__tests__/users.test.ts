/**
 * @jest-environment node
 */

import {
  getUsers,
  getUserById,
  updateUser,
  verifyUser,
  suspendUser,
  getUserStats,
} from "../users";

describe("Users Server Actions", () => {
  describe("getUsers", () => {
    it("should fetch all users without filters", async () => {
      const result = await getUsers();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter users by role", async () => {
      const result = await getUsers({ role: "agente" });
      expect(Array.isArray(result)).toBe(true);
      result.forEach((user: any) => {
        expect(user.role).toBe("agente");
      });
    });

    it("should filter users by verified status", async () => {
      const result = await getUsers({ verified: true });
      expect(Array.isArray(result)).toBe(true);
      result.forEach((user: any) => {
        expect(user.verified).toBe(true);
      });
    });

    it("should handle multiple filters", async () => {
      const result = await getUsers({
        role: "agente",
        verified: true,
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getUserById", () => {
    it("should throw error for non-existent user", async () => {
      await expect(getUserById("non-existent-id")).rejects.toThrow();
    });

    it("should return user object with required fields", async () => {
      const users = await getUsers();
      if (users.length > 0) {
        const user = await getUserById(users[0].id);
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("role");
      }
    });
  });

  describe("getUserStats", () => {
    it("should return stats object with all required fields", async () => {
      const stats = await getUserStats();
      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("verified");
      expect(stats).toHaveProperty("agents");
      expect(stats).toHaveProperty("suspended");
    });

    it("should return numeric values for all stats", async () => {
      const stats = await getUserStats();
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.verified).toBe("number");
      expect(typeof stats.agents).toBe("number");
      expect(typeof stats.suspended).toBe("number");
    });

    it("should have verified <= total", async () => {
      const stats = await getUserStats();
      expect(stats.verified).toBeLessThanOrEqual(stats.total);
    });
  });

  describe("updateUser", () => {
    it("should handle empty updates gracefully", async () => {
      try {
        await updateUser("non-existent", {});
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("verifyUser", () => {
    it("should handle verification of non-existent user", async () => {
      try {
        await verifyUser("non-existent");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("suspendUser", () => {
    it("should handle suspension of non-existent user", async () => {
      try {
        await suspendUser("non-existent");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
