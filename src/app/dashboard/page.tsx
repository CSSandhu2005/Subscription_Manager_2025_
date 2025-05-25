'use client'

import NavBar from '@/components/ui/NavBar'
import { useEffect, useState } from 'react'
import { getSubscriptions, createSubscription, updateSubscription, deleteSubscription } from '../../../lib/api'

type Subscription = {
  id: string
  name: string
  price: number      // number here for actual data
  category: string
  renewDate: string
  priority: 'High' | 'Medium' | 'Low'
}

// Form state type: price is string for input binding
type SubscriptionForm = {
  name: string
  price: string
  category: string
  renewDate: string
  priority: 'High' | 'Medium' | 'Low'
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  const [form, setForm] = useState<SubscriptionForm>({
    name: '',
    price: '',
    category: '',
    renewDate: '',
    priority: 'Medium',
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscriptions()
      const subs = res.data.map((sub: any) => ({
        ...sub,
        price: Number(sub.price),
      }))
      setSubscriptions(subs)
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof SubscriptionForm
    const value = e.target.value

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const priceNumber = Number(form.price)
    if (isNaN(priceNumber)) {
      alert('Price must be a valid number')
      return
    }

    const payload: Omit<Subscription, 'id'> = {
      ...form,
      price: priceNumber,
    }

    try {
      if (editingId) {
        await updateSubscription(editingId, payload)
        setEditingId(null)
      } else {
        await createSubscription(payload)
      }

      setForm({
        name: '',
        price: '',
        category: '',
        renewDate: '',
        priority: 'Medium',
      })

      fetchSubscriptions()
    } catch (err) {
      console.error('Submit error:', err)
    }
  }

  const handleEdit = (sub: Subscription) => {
    setForm({
      name: sub.name,
      price: sub.price.toString(),
      category: sub.category,
      renewDate: sub.renewDate,
      priority: sub.priority,
    })
    setEditingId(sub.id)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscription(id)
      fetchSubscriptions()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">My Subscriptions</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            name="name"
            placeholder="Subscription Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Amount (₹)"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="date"
            name="renewDate"
            value={form.renewDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update' : 'Add'} Subscription
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {subscriptions.length === 0 ? (
            <p className="text-gray-500 text-center">No subscriptions added yet.</p>
          ) : (
            subscriptions.map(sub => (
              <div
                key={sub.id}
                className="bg-white border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{sub.name}</p>
                  <p>₹{sub.price} / month</p>
                  <p>Category: {sub.category}</p>
                  <p>Next renewal: {sub.renewDate}</p>
                  <p className="text-sm text-gray-500">Priority: {sub.priority}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(sub)}
                    className="px-3 py-1 bg-yellow-400 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
