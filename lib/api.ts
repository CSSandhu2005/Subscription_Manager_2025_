// lib/api.ts

import axios from "axios";
import { Subscription } from "@/types/subscription";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/subscriptions";

// CREATE
export const createSubscription = (data: Omit<Subscription, "id">) => {
  return axios.post<Subscription>(API_BASE_URL, data);
};

// READ ALL
export const getSubscriptions = () => {
  return axios.get<Subscription[]>(API_BASE_URL);
};

// READ ONE
export const getSubscriptionById = (id: string) => {
  return axios.get<Subscription>(`${API_BASE_URL}/${id}`);
};

// UPDATE
export const updateSubscription = (id: string, data: Omit<Subscription, "id">) => {
  return axios.put<Subscription>(`${API_BASE_URL}/${id}`, data);
};

// DELETE
export const deleteSubscription = (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
