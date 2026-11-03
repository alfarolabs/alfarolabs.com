import { published } from "../content";
import { Section } from "./Section";
import { Shot } from "./Shot";

export function Products() {
  return (
    <>
      {published.software.products.map((product) => (
        <Section key={product.name.toText()} heading={product.name.toText()}>
          <p>{product.body.toText()}</p>
          {"link" in product ? (
            <>
              <a className="text-link" href={product.link.href.toHref()}>
                {product.link.label.toText()}
              </a>
              {"shot" in product && <Shot shot={product.shot} />}
            </>
          ) : (
            <p className="status">{product.status.toText()}</p>
          )}
        </Section>
      ))}
    </>
  );
}
