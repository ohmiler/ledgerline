import type { Parameter } from "@/content/documentation";

export function ParameterList({ parameters }: { parameters: readonly Parameter[] }) {
  return (
    <div className="parameter-wrap">
      <table className="parameter-table">
        <thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          {parameters.map((parameter) => (
            <tr key={parameter.name}>
              <td data-label="Parameter"><code>{parameter.name}</code></td>
              <td data-label="Type">{parameter.type}</td>
              <td data-label="Required"><span className={parameter.required ? "required" : "optional"}>{parameter.required ? "YES" : "NO"}</span></td>
              <td data-label="Description">{parameter.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
