import { published } from "../content";
import { Placeholder } from "./Placeholder";

export function Products() {
  const { intro, products } = published.home.work;
  return (
    <>
      <p>{intro.toText()}</p>
      <ul className="products">
        {products.map((product) => (
          <li key={product.name.toText()} className="product">
            <h3>{product.name.toText()}</h3>
            {"link" in product ? (
              <>
                <p>{product.body.toText()}</p>
                <a className="text-link" href={product.link.href.toHref()}>
                  {product.link.label.toText()}
                </a>
              </>
            ) : (
              <Placeholder kind="product" />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
