
export interface Pricing {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  isFeatured?: boolean;
}
