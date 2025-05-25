// src/types/subscription.ts

export type Subscription = {
  id: string;
  name: string;
  price: number;
  category: string;
  renewDate: string;
  priority: "Low" | "Medium" | "High";
};
