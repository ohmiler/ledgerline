import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "../src/lib/clipboard";

afterEach(() => vi.restoreAllMocks());

describe("copyText", () => {
  it("returns success after writing text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    await expect(copyText("request")).resolves.toEqual({ ok: true });
    expect(writeText).toHaveBeenCalledWith("request");
  });

  it("returns failure when the clipboard is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    await expect(copyText("request")).resolves.toEqual({ ok: false });
  });

  it("returns failure when writing is rejected", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    await expect(copyText("request")).resolves.toEqual({ ok: false });
  });
});
