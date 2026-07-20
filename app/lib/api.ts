const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export interface Product {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  sku: string;
  stock_quantity: number;
  created_at: string;
}

export interface OrderItemInput {
  product_id: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  status: string;
  created_at: string;
  items: { product_id: string; quantity: number; unit_price_cents: number }[];
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ApiError(res.status, body || res.statusText);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const api = {
  listProducts: () => request<Product[]>("/products"),
  getProduct: (id: string) => request<Product>(`/products/${id}`),
  createOrder: (customerEmail: string, items: OrderItemInput[]) =>
    request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify({ customer_email: customerEmail, items }),
    }),
};

export { ApiError };
