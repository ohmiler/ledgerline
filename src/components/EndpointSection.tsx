import type { Endpoint } from "@/content/documentation";
import { CodePanel } from "./CodePanel";
import { ParameterList } from "./ParameterList";

export function EndpointSection({ endpoint }: { endpoint: Endpoint }) {
  return (
    <section id={endpoint.anchor} className="endpoint-section">
      <div className="endpoint-copy">
        <p className="section-kicker">{endpoint.eyebrow}</p>
        <h2>{endpoint.title}</h2>
        <div className="endpoint-address"><span>{endpoint.method}</span><code>{endpoint.path}</code></div>
        <p className="section-intro">{endpoint.description}</p>
        <h3>Parameters</h3>
        <ParameterList parameters={endpoint.parameters} />
      </div>
      <CodePanel examples={endpoint.examples} success={endpoint.success} error={endpoint.error} />
    </section>
  );
}
