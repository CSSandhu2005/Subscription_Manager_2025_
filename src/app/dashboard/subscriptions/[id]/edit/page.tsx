"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSubscriptionById , updateSubscription } from "../../../../../../lib/api";

export default function EditSubscriptionPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    renewDate: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (id) {
      getSubscriptionById(id as string)
        .then((res) => setForm(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSubscription(id as string, form);
      router.push("/dashboard/subscriptions");
    } catch (err) {
      console.error("Error updating subscription", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Subscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Subscription Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="date"
          name="renewDate"
          value={form.renewDate}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Update Subscription
        </button>
      </form>
    </div>
  );
}
