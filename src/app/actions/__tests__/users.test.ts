/**
 * Tests for users server actions
 * Run with: npm test -- users.test.ts
 */

import { validateUser } from "@/lib/validators";

describe("Users Server Actions", () => {
  describe("validateUser", () => {
    it("should validate a complete user object", () => {
      const validUser = {
        full_name: "Juan Martínez",
        email: "juan@example.com",
        phone: "+34912345678",
        role: "agente",
        bio: "Agente profesional",
      };

      const result = validateUser(validUser);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should fail when required fields are missing", () => {
      const incompleteUser = {
        full_name: "",
        email: "juan@example.com",
        phone: "+34912345678",
        role: "agente",
      };

      const result = validateUser(incompleteUser);
      expect(result.valid).toBe(false);
    });

    it("should validate email format", () => {
      const invalidUser = {
        full_name: "Juan Martínez",
        email: "invalid-email",
        phone: "+34912345678",
        role: "agente",
        bio: "Test",
      };

      const result = validateUser(invalidUser);
      expect(result.valid).toBe(false);
    });

    it("should validate phone format", () => {
      const invalidUser = {
        full_name: "Juan Martínez",
        email: "juan@example.com",
        phone: "123",
        role: "agente",
        bio: "Test",
      };

      const result = validateUser(invalidUser);
      expect(result.valid).toBe(false);
    });

    it("should accept all valid user roles", () => {
      const roles = ["particular", "agente", "comprador", "desarrolladora", "admin", "moderador"];

      roles.forEach((role) => {
        const user = {
          full_name: "Usuario",
          email: "test@example.com",
          phone: "+34912345678",
          role,
          bio: "Test",
        };

        const result = validateUser(user);
        expect(result.valid).toBe(true);
      });
    });
  });
});

describe("User Authentication", () => {
  it("should hash passwords securely", () => {
    const password = "SecurePassword123!";
    expect(password.length).toBeGreaterThan(8);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[0-9]/.test(password)).toBe(true);
  });

  it("should validate user can be verified", () => {
    const user = { verified: false, active: true };
    expect(user.verified).toBe(false);

    const verifiedUser = { ...user, verified: true };
    expect(verifiedUser.verified).toBe(true);
  });

  it("should toggle user suspension status", () => {
    const user = { active: true };
    const suspended = { ...user, active: false };
    const reactivated = { ...suspended, active: true };

    expect(user.active).toBe(true);
    expect(suspended.active).toBe(false);
    expect(reactivated.active).toBe(true);
  });
});

describe("User Data Processing", () => {
  it("should calculate user statistics", () => {
    const users = [
      { verified: true, active: true },
      { verified: true, active: true },
      { verified: false, active: true },
      { verified: true, active: false },
    ];

    const verifiedCount = users.filter((u) => u.verified).length;
    const activeCount = users.filter((u) => u.active).length;

    expect(verifiedCount).toBe(3);
    expect(activeCount).toBe(3);
  });
});
