import { home } from "../content/home";

export function AgentRun() {
  const { run } = home;
  return (
    <div className="run">
      <p className="run-label">{run.label}</p>
      <ol className="run-steps">
        {run.done.map((line) => (
          <li key={line} className="run-step" data-state="done">
            {line}
          </li>
        ))}
        <li className="run-step run-wait" data-state="waiting">
          <span>{run.waiting}</span>
          <span className="run-approve" aria-hidden="true">
            {run.approve}
          </span>
        </li>
      </ol>
    </div>
  );
}
