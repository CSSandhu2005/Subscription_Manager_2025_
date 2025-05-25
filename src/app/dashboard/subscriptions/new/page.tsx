"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubscription } from "../../../../../lib/api";

export default function NewSubscriptionPage() {
  const router = useRouter();
  const [form, setForm] = useState<{
    name: string;
    price: string;
    category: string;
    renewDate: string;
    priority: "Low" | "Medium" | "High";
  }>({
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
    const { name, value } = e.target;
    if (name === "priority") {
      setForm((prev) => ({ ...prev, priority: value as "Low" | "Medium" | "High" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        renewDate: form.renewDate,
        priority: form.priority,
      };

      await createSubscription(payload);
      router.push("/dashboard/subscriptions");
    } catch (err) {
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
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
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
