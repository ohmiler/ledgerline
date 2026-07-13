export type CopyResult = { ok: boolean };

export async function copyText(text: string): Promise<CopyResult> {
  try {
    if (!navigator.clipboard?.writeText) return { ok: false };
    await navigator.clipboard.writeText(text);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
