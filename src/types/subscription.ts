// src/types/subscription.ts (or lib/types.ts)

export type Subscription = {
  id: string;
  name: string;
  price: number;
  category: string;
  renewDate: string;
  priority: "Low" | "Medium" | "High";
};
