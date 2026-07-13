export type NavItem = { label: string; anchor: string };
export type NavSection = { label: string; anchor: string; items: readonly NavItem[] };
export type Parameter = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};
export type CodeExamples = { curl: string; javascript: string };
export type Endpoint = {
  anchor: string;
  eyebrow: string;
  title: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  parameters: readonly Parameter[];
  examples: CodeExamples;
  success: string;
  error: string;
};
export type LedgerlineDocumentation = {
  disclaimer: string;
  navigation: readonly NavSection[];
  endpoints: readonly Endpoint[];
};

const createPaymentCurl = `curl https://api.ledgerline.test/v1/payments \\
  -H "Authorization: Bearer ll_test_example" \\
  -H "Content-Type: application/json" \\
  -d '{"amount":2500,"currency":"thb","capture_method":"manual"}'`;

const createPaymentJavaScript = `const payment = await fetch(
  "https://api.ledgerline.test/v1/payments",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer ll_test_example",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 2500,
      currency: "thb",
      capture_method: "manual",
    }),
  },
).then((response) => response.json());`;

export const documentation: LedgerlineDocumentation = {
  disclaimer:
    "Ledgerline is a fictional API for interface evaluation. Examples are illustrative and not production payment guidance.",
  navigation: [
    { label: "Getting Started", anchor: "getting-started", items: [{ label: "First payment", anchor: "first-payment" }] },
    { label: "Payments", anchor: "payments", items: [{ label: "Create a payment", anchor: "create-payment" }, { label: "Payment lifecycle", anchor: "payment-lifecycle" }] },
    { label: "Refunds", anchor: "refunds", items: [{ label: "Create a refund", anchor: "create-refund" }] },
    { label: "Webhooks", anchor: "webhooks", items: [{ label: "Verify signatures", anchor: "verify-signatures" }] },
    { label: "Errors", anchor: "errors", items: [{ label: "Error object", anchor: "error-object" }] },
    { label: "API Reference", anchor: "api-reference", items: [{ label: "Endpoints", anchor: "endpoints" }] },
  ],
  endpoints: [
    {
      anchor: "create-payment",
      eyebrow: "Payments / create",
      title: "Create a payment",
      method: "POST",
      path: "/v1/payments",
      description: "Create a test-mode payment. Manual capture returns a payment ready for a later capture request.",
      parameters: [
        { name: "amount", type: "integer", required: true, description: "Amount in minor currency units. Use 2500 for ฿25.00." },
        { name: "currency", type: "string", required: true, description: "Lowercase three-letter currency code. This example uses thb." },
        { name: "capture_method", type: "enum", required: false, description: "automatic or manual. Defaults to automatic." },
      ],
      examples: { curl: createPaymentCurl, javascript: createPaymentJavaScript },
      success: `{
  "id": "pay_01J9AZ7J6Y3K2E8M4T",
  "object": "payment",
  "amount": 2500,
  "currency": "thb",
  "status": "requires_capture"
}`,
      error: `{
  "error": {
    "code": "parameter_missing",
    "message": "amount is required",
    "param": "amount"
  }
}`,
    },
  ],
} as const;
