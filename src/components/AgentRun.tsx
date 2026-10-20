import { published } from "../content";

export function AgentRun() {
  const { run } = published.home;
  return (
    <div className="run">
      <p className="run-label">{run.label.toText()}</p>
      <ol className="run-steps">
        {run.done.map((line) => (
          <li key={line.toText()} className="run-step" data-state="done">
            {line.toText()}
          </li>
        ))}
        <li className="run-step run-wait" data-state="waiting">
          <span>{run.waiting.toText()}</span>
          <span className="run-approve" aria-hidden="true">
            {run.approve.toText()}
          </span>
        </li>
      </ol>
    </div>
  );
}
