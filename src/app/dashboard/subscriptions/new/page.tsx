"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubscription } from "../../../../../lib/api"; // ✅ Import backend call

export default function NewSubscriptionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    renewDate: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createSubscription(form); // ✅ Send to backend
      router.push("/dashboard/subscriptions");
    } catch (err: any) {
      setError("Failed to create subscription.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Subscription</h2>
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
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Subscription"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
