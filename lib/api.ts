import axios from "axios";

// Backend sends price as string
export interface SubscriptionAPI {
  id?: string;
  _id?: string;
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

// Make sure this env variable does NOT end with a slash
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions`;

// Helper to convert API type to frontend type
function convertApiToSubscription(sub: SubscriptionAPI): Subscription {
  return {
    id: sub.id || sub._id || "",
    name: sub.name,
    price: Number(sub.price),
    category: sub.category,
    renewDate: sub.renewDate,
    priority: sub.priority,
  };
}

// CREATE
export const createSubscription = async (
  data: Omit<Subscription, "id">
): Promise<Subscription> => {
  const res = await axios.post<SubscriptionAPI>(API_BASE_URL, {
    ...data,
    price: data.price.toString(), // send price as string to backend
  });
  return convertApiToSubscription(res.data);
};

// READ ALL
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const res = await axios.get<SubscriptionAPI[]>(API_BASE_URL);
  return res.data.map(convertApiToSubscription);
};

// READ ONE
export const getSubscriptionById = async (id: string): Promise<Subscription> => {
  const res = await axios.get<SubscriptionAPI>(`${API_BASE_URL}/${id}`);
  return convertApiToSubscription(res.data);
};

// UPDATE
export const updateSubscription = async (
  id: string,
  data: Omit<Subscription, "id">
): Promise<Subscription> => {
  const res = await axios.put<SubscriptionAPI>(`${API_BASE_URL}/${id}`, {
    ...data,
    price: data.price.toString(), // send price as string to backend
  });
  return convertApiToSubscription(res.data);
};

// DELETE
export const deleteSubscription = (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
