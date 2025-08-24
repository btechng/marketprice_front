import { useEffect, useState } from "react";
import api from "../api";

export default function Report() {
  const [items, setItems] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);

  // existing selections
  const [foodItem, setFoodItem] = useState("");
  const [market, setMarket] = useState("");

  // new additions
  const [newFoodItem, setNewFoodItem] = useState("");
  const [newMarket, setNewMarket] = useState({ name: "", city: "", state: "" });

  // price details
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/food-items").then((res) => setItems(res.data));
    api.get("/markets").then((res) => setMarkets(res.data));
  }, []);

  const handleAddFoodItem = async () => {
    if (!newFoodItem.trim()) return;
    try {
      const res = await api.post("/food-items", { name: newFoodItem });
      setItems((prev) => [...prev, res.data]);
      setFoodItem(res.data._id);
      setNewFoodItem("");
    } catch (e: any) {
      setMsg(e.response?.data?.error || "Failed to add food item");
    }
  };

  const handleAddMarket = async () => {
    if (!newMarket.name.trim()) return;
    try {
      const res = await api.post("/markets", newMarket);
      setMarkets((prev) => [...prev, res.data]);
      setMarket(res.data._id);
      setNewMarket({ name: "", city: "", state: "" });
    } catch (e: any) {
      setMsg(e.response?.data?.error || "Failed to add market");
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    setMsg("");
    const fd = new FormData();
    fd.append("foodItem", foodItem);
    fd.append("market", market);
    fd.append("price", price);
    if (unit) fd.append("unit", unit);
    if (receipt) fd.append("receipt", receipt);
    try {
      await api.post("/price-reports", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Submitted! Awaiting approval by admin.");
      setFoodItem("");
      setMarket("");
      setPrice("");
      setUnit("");
      setReceipt(null);
    } catch (e: any) {
      setMsg(e.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow mt-6">
      <h1 className="text-xl font-semibold mb-3">Submit Today&apos;s Price</h1>
      {msg && <p className="text-sm mb-2">{msg}</p>}

      <form onSubmit={submit} className="space-y-3">
        {/* Select or Add Food Item */}
        <div>
          <select
            className="w-full border rounded p-2 mb-2"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          >
            <option value="">Select food item</option>
            {items.map((i: any) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              className="border rounded p-2 flex-1"
              placeholder="New food item"
              value={newFoodItem}
              onChange={(e) => setNewFoodItem(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddFoodItem}
              className="bg-green-600 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Select or Add Market */}
        <div>
          <select
            className="w-full border rounded p-2 mb-2"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          >
            <option value="">Select market</option>
            {markets.map((m: any) => (
              <option key={m._id} value={m._id}>
                {m.name} - {m.city}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <input
              className="border rounded p-2 w-full"
              placeholder="New market name"
              value={newMarket.name}
              onChange={(e) =>
                setNewMarket((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              className="border rounded p-2 w-full"
              placeholder="City"
              value={newMarket.city}
              onChange={(e) =>
                setNewMarket((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <input
              className="border rounded p-2 w-full"
              placeholder="State"
              value={newMarket.state}
              onChange={(e) =>
                setNewMarket((prev) => ({ ...prev, state: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={handleAddMarket}
              className="bg-green-600 text-white px-3 rounded w-full"
            >
              Add Market
            </button>
          </div>
        </div>

        {/* Price Inputs */}
        <input
          className="w-full border rounded p-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Unit (e.g., 1kg, 1 paint)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          className="w-full"
          type="file"
          onChange={(e) => setReceipt(e.target.files?.[0] || null)}
        />

        <button className="w-full bg-black text-white rounded p-2">
          Submit
        </button>
      </form>
    </div>
  );
}
