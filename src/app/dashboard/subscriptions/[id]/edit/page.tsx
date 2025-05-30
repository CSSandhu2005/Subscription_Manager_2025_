"use client";

import { useEffect, useState } from "react";
import { getSubscriptions, deleteSubscription } from "../../../../../../lib/api";
import { v4 as uuidv4 } from "uuid";

interface SubscriptionAPI {
  id: string;
  name: string;
  price: string; // price as string from API
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low" | string;
}

interface Subscription {
  id: string;
  name: string;
  price: number; // price as number in frontend
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low" | string;
}

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscriptions();
      // res is already SubscriptionAPI[]
      const subs: Subscription[] = res.map((sub) => ({
        ...sub,
        price: Number(sub.price), // convert string to number
      }));
      setSubscriptions(subs);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;

    try {
      await deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p>Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">All Subscriptions (Edit)</h1>

      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={uuidv4()} className="bg-gray-100 p-4 rounded shadow space-y-1">
              <p><strong>Name:</strong> {sub.name}</p>
              <p><strong>Price:</strong> ₹{sub.price}</p>
              <p><strong>Category:</strong> {sub.category}</p>
              <p><strong>Renew Date:</strong> {sub.renewDate}</p>
              <p><strong>Priority:</strong> {sub.priority}</p>

              <div className="flex gap-3 mt-2">
                {/* You can add actual routing for edit */}
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(sub.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
