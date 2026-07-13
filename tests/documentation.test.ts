import { describe, expect, it } from "vitest";
import { documentation } from "../src/content/documentation";

describe("Ledgerline documentation", () => {
  it("uses unique stable anchors", () => {
    const anchors = documentation.navigation.flatMap((section) => [
      section.anchor,
      ...section.items.map((item) => item.anchor),
    ]);
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it("preserves the create-payment evidence", () => {
    const endpoint = documentation.endpoints.find((item) => item.anchor === "create-payment");
    expect(endpoint).toBeDefined();
    expect(endpoint?.method).toBe("POST");
    expect(endpoint?.path).toBe("/v1/payments");
    expect(endpoint?.parameters.some((item) => item.name === "amount" && item.required)).toBe(true);
    expect(endpoint?.examples.curl).toContain("2500");
    expect(endpoint?.examples.javascript).toContain("2500");
    expect(endpoint?.success).toContain("pay_01J9AZ7J6Y3K2E8M4T");
    expect(endpoint?.error).toContain("parameter_missing");
  });

  it("clearly labels the fictional API", () => {
    expect(documentation.disclaimer.toLowerCase()).toContain("fictional");
    expect(documentation.disclaimer.toLowerCase()).toContain("not production");
  });
});
