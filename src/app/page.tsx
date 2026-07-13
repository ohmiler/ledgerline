import { DocsNavigation } from "@/components/DocsNavigation";
import { EndpointSection } from "@/components/EndpointSection";
import { documentation } from "@/content/documentation";

export default function Home() {
  const endpoint = documentation.endpoints[0];
  return (
    <div id="top" className="docs-frame">
      <DocsNavigation sections={documentation.navigation} />
      <main className="document-main">
        <header id="getting-started" className="hero">
          <div className="hero-meta"><span>LEDGER / 001</span><span>UPDATED 2026-07-13</span></div>
          <p className="section-kicker">GETTING STARTED / TEST ENVIRONMENT</p>
          <h1>Move value.<br /><em>Keep the record.</em></h1>
          <p className="hero-intro">One request creates a traceable payment object. Follow it from intent to capture, refund, and webhook without leaving the ledger.</p>
          <p className="disclaimer"><strong>ILLUSTRATIVE SYSTEM</strong>{documentation.disclaimer}</p>
        </header>

        <section id="first-payment" className="quickstart">
          <div className="step-index">01</div>
          <div>
            <p className="section-kicker">FIRST PAYMENT / 2 MINUTES</p>
            <h2>Send the request that starts the record.</h2>
            <ol>
              <li><span>01</span><div><strong>Use the test key</strong><p>Pass <code>ll_test_example</code> as a bearer token. It carries no real credentials.</p></div></li>
              <li><span>02</span><div><strong>Set the amount</strong><p>Send <code>2500</code> minor units in <code>thb</code> with manual capture.</p></div></li>
              <li><span>03</span><div><strong>Read the state</strong><p>The response enters <code>requires_capture</code> and preserves the payment ID.</p></div></li>
            </ol>
            <a className="jump-link" href="#create-payment">OPEN ENDPOINT <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="payments" className="chapter-heading"><span>02</span><div><p>CORE RESOURCE</p><h2>Payments</h2></div><p>CREATE → INSPECT → CAPTURE → CANCEL</p></section>
        <EndpointSection endpoint={endpoint} />

        <section id="payment-lifecycle" className="state-ledger">
          <p className="section-kicker">PAYMENT LIFECYCLE</p><h2>State is part of the contract.</h2>
          <div className="state-row"><span>01</span><strong>requires_capture</strong><p>Payment intent accepted; funds are ready for illustrative capture.</p></div>
          <div className="state-row"><span>02</span><strong>captured</strong><p>The test payment record is complete and can be referenced by a refund.</p></div>
          <div className="state-row"><span>03</span><strong>canceled</strong><p>No further capture transition is allowed for this record.</p></div>
        </section>

        <section id="refunds" className="text-chapter"><p className="section-kicker">03 / REFUNDS</p><h2>Reverse value without losing history.</h2><div id="create-refund" className="mini-endpoint"><span>POST</span><code>/v1/refunds</code><p>Create a refund against a captured payment, then inspect it at <code>GET /v1/refunds/:id</code>.</p></div></section>
        <section id="webhooks" className="text-chapter"><p className="section-kicker">04 / WEBHOOKS</p><h2>Verify before you act.</h2><div id="verify-signatures" className="rule-note"><strong>Ledgerline-Signature</strong><p>Verify the illustrative signature before processing <code>payment.captured</code> or <code>refund.created</code>. Failed test deliveries retry with the same event ID.</p></div></section>
        <section id="errors" className="text-chapter"><p className="section-kicker">05 / ERRORS</p><h2>Errors remain readable by machines and people.</h2><div id="error-object" className="error-grid"><code>parameter_missing</code><p>HTTP 400 · stable code · human-readable message · optional parameter path.</p></div></section>
        <section id="api-reference" className="reference-end"><p className="section-kicker">06 / API REFERENCE</p><h2 id="endpoints">One base URL.<br />A complete record.</h2><code>https://api.ledgerline.test/v1</code><p>Retrieve, capture, or cancel a payment using its stable payment ID. Every behavior on this page is fictional and exists only to evaluate the interface.</p></section>
        <footer><span>LEDGERLINE / API v1</span><span>FICTIONAL SYSTEM · MIT</span></footer>
      </main>
    </div>
  );
}
