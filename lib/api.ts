// api.ts

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/subscriptions";

// CRUD functions using API_BASE_URL
export const createSubscription = (data: any) => axios.post(API_BASE_URL, data);
export const getSubscriptions = () => axios.get(API_BASE_URL);
export const getSubscriptionById = (id: string) => axios.get(`${API_BASE_URL}/${id}`);
export const updateSubscription = (id: string, data: any) => axios.put(`${API_BASE_URL}/${id}`, data);
export const deleteSubscription = (id: string) => axios.delete(`${API_BASE_URL}/${id}`);
