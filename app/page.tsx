import { api } from "@/lib/api";

export default async function HomePage() {
  const products = await api.listProducts().catch(() => []);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Storefront</h1>
      {products.length === 0 ? (
        <p>No products yet. Add some via the storefront-api /products endpoint.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} — ${(product.price_cents / 100).toFixed(2)} ({product.stock_quantity} in stock)
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
