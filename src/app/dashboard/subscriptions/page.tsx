"use client";

import { useEffect, useState } from "react";
import { getSubscriptions, deleteSubscription } from "../../../../lib/api";

interface Subscription {
  id: string;
  name: string;
  price: number;          // number type here
  category: string;
  renewDate: string;
  priority: string;
}

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscriptions();
      setSubscriptions(res.data);   // assuming res.data is Subscription[]
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this subscription?"
    );
    if (!confirmed) return;

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
      <h1 className="text-2xl font-semibold mb-4">All Subscriptions</h1>

      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-gray-100 p-4 rounded shadow space-y-1"
            >
              <p>
                <strong>Name:</strong> {sub.name}
              </p>
              <p>
                <strong>Price:</strong> ₹{sub.price}
              </p>
              <p>
                <strong>Category:</strong> {sub.category}
              </p>
              <p>
                <strong>Renew Date:</strong> {sub.renewDate}
              </p>
              <p>
                <strong>Priority:</strong> {sub.priority}
              </p>

              <div className="flex gap-3 mt-2">
                {/* Replace with Link to Edit page when ready */}
                {/* <Link href={`/dashboard/subscriptions/${sub.id}/edit`}> */}
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
