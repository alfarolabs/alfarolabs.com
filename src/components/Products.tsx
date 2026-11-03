import { published } from "../content";

export function Products() {
  const { intro, agents, products } = published.software.work;
  return (
    <>
      <p>{intro.toText()}</p>
      <p>{agents.toText()}</p>
      <ul className="products">
        {products.map((product) => (
          <li key={product.name.toText()} className="product">
            <h3>{product.name.toText()}</h3>
            <p>{product.body.toText()}</p>
            {"link" in product ? (
              <a className="text-link" href={product.link.href.toHref()}>
                {product.link.label.toText()}
              </a>
            ) : (
              <p className="eyebrow">{product.status.toText()}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
