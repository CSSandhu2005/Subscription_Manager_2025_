import axios from "axios";

// Backend sends price as string, so define API type:
export interface SubscriptionAPI {
  id: string;
  name: string;
  price: string;        // string from backend
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low";
}

// Frontend subscription type with price as number
export interface Subscription {
  id: string;
  name: string;
  price: number;        // number for frontend usage
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low";
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/subscriptions";

// CREATE (send price as number, backend may accept number or string)
export const createSubscription = (data: Omit<Subscription, "id">) => {
  return axios.post<Subscription>(API_BASE_URL, data);
};

// READ ALL (response returns SubscriptionAPI[], with price as string)
export const getSubscriptions = () => {
  return axios.get<SubscriptionAPI[]>(API_BASE_URL);
};

// READ ONE (response returns SubscriptionAPI, price as string)
export const getSubscriptionById = (id: string) => {
  return axios.get<SubscriptionAPI>(`${API_BASE_URL}/${id}`);
};

// UPDATE (send price as number)
export const updateSubscription = (id: string, data: Omit<Subscription, "id">) => {
  return axios.put<Subscription>(`${API_BASE_URL}/${id}`, data);
};

// DELETE
export const deleteSubscription = (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
