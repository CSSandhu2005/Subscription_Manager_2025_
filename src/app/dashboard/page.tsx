"use client";

import { useEffect, useState } from "react";
import { getSubscriptions, createSubscription, updateSubscription, deleteSubscription } from "../../../lib/api";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface Subscription {
  id: string;
  name: string;
  price: number;
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low";
}

interface SubscriptionAPI {
  id: string;
  name: string;
  price: string;
  category: string;
  renewDate: string;
  priority: "High" | "Medium" | "Low";
}

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // New subscription form state
  const [newSub, setNewSub] = useState<Omit<Subscription, "id">>({
    name: "",
    price: 0,
    category: "",
    renewDate: "",
    priority: "Medium",
  });

  const [creating, setCreating] = useState(false);

  // Editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Subscription, "id"> | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscriptions();
      const subs: Subscription[] = res.data.map((sub: SubscriptionAPI) => ({
        ...sub,
        price: Number(sub.price),
      }));
      setSubscriptions(subs);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSub((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !newSub.name ||
      newSub.price <= 0 ||
      !newSub.category ||
      !newSub.renewDate ||
      !newSub.priority
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setCreating(true);
    try {
      const res = await createSubscription(newSub);
      const createdSub = {
        ...res.data,
        price: Number(res.data.price),
      };
      setSubscriptions((prev) => [createdSub, ...prev]);

      // Reset form
      setNewSub({
        name: "",
        price: 0,
        category: "",
        renewDate: "",
        priority: "Medium",
      });
    } catch (error) {
      console.error("Failed to create subscription:", error);
      alert("Failed to create subscription. Try again.");
    } finally {
      setCreating(false);
    }
  };

  // Start editing a subscription
  const handleEditClick = (sub: Subscription) => {
    setEditingId(sub.id);
    setEditData({
      name: sub.name,
      price: sub.price,
      category: sub.category,
      renewDate: sub.renewDate,
      priority: sub.priority,
    });
  };

  // Handle edit form input changes
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  // Save updated subscription
  const handleUpdate = async (id: string) => {
    if (!editData) return;

    // Basic validation
    if (
      !editData.name ||
      editData.price <= 0 ||
      !editData.category ||
      !editData.renewDate ||
      !editData.priority
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setUpdating(true);
    try {
      const res = await updateSubscription(id, editData);
      const updatedSub = {
        ...res.data,
        price: Number(res.data.price),
      };

      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === id ? updatedSub : sub))
      );
      setEditingId(null);
      setEditData(null);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      alert("Failed to update subscription. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">
          <p>Loading subscriptions...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold mb-4">All Subscriptions</h1>

        {/* Add New Subscription Form */}
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded shadow space-y-4 border"
        >
          <h2 className="text-xl font-semibold">Add New Subscription</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newSub.name}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              min={0}
              step="0.01"
              value={newSub.price}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newSub.category}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />

            <input
              type="date"
              name="renewDate"
              value={newSub.renewDate}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />

            <select
              name="priority"
              value={newSub.priority}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={creating}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
              creating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {creating ? "Adding..." : "Add Subscription"}
          </button>
        </form>

        {/* Subscription List */}
        {subscriptions.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-gray-100 p-4 rounded shadow space-y-1"
              >
                {editingId === sub.id && editData ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditInputChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      min={0}
                      step="0.01"
                      onChange={handleEditInputChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleEditInputChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="date"
                      name="renewDate"
                      value={editData.renewDate}
                      onChange={handleEditInputChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <select
                      name="priority"
                      value={editData.priority}
                      onChange={handleEditInputChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => handleUpdate(sub.id)}
                        disabled={updating}
                        className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ${
                          updating ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {updating ? "Saving..." : "Save"}
                      </button>

                      <button
                        onClick={handleCancelEdit}
                        disabled={updating}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
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
                      <button
                        onClick={() => handleEditClick(sub)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Subscription Manager</div>
        <div className="space-x-4 flex items-center">
          <a href="/dashboard" className="hover:underline">
            Dashboard
          </a>
          <a href="/dashboard/subscriptions" className="hover:underline">
            Subscriptions
          </a>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
