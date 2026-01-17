import { useEffect, useState } from "react";
import api from "../api";
import ProtectedRoute from "../components/ProtectedRoute";

function AdminInner() {
  const [pending, setPending] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loadingIds, setLoadingIds] = useState<string[]>([]); // Track buttons being clicked

  // Fetch pending reports
  useEffect(() => {
    api
      .get("/price-reports", { params: { status: "pending", limit: 50 } })
      .then((res) => setPending(res.data.items))
      .catch((err) => console.error("Failed to load pending reports:", err));
  }, [refresh]);

  // Approve or Reject a report
  const decide = async (id: string, status: "approved" | "rejected") => {
    try {
      setLoadingIds((prev) => [...prev, id]); // show loading for this button
      await api.patch(`/price-reports/${id}/status`, { status });
      setRefresh((v) => v + 1); // refresh list
    } catch (err: any) {
      alert(err.response?.data?.error || "Action failed");
      console.error("Approval error:", err);
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin • Approvals</h1>

      <div className="grid gap-4">
        {pending.length > 0 ? (
          pending.map((r: any) => (
            <div key={r._id} className="bg-white rounded-2xl shadow p-4">
              <div className="font-semibold">
                {r.foodItem?.name} • ₦{r.price} • {r.market?.name} (
                {r.market?.city})
              </div>

              {r.receiptUrl && (
                <img
                  src={r.receiptUrl}
                  alt="receipt"
                  className="mt-2 max-h-60 object-contain rounded"
                />
              )}

              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  disabled={loadingIds.includes(r._id)}
                  onClick={() => decide(r._id, "approved")}
                  className={`px-3 py-1 rounded text-white ${
                    loadingIds.includes(r._id)
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600"
                  }`}
                >
                  {loadingIds.includes(r._id) ? "Approving..." : "Approve"}
                </button>

                <button
                  type="button"
                  disabled={loadingIds.includes(r._id)}
                  onClick={() => decide(r._id, "rejected")}
                  className={`px-3 py-1 rounded text-white ${
                    loadingIds.includes(r._id)
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600"
                  }`}
                >
                  {loadingIds.includes(r._id) ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending reports.</p>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <ProtectedRoute role="admin">
      <AdminInner />
    </ProtectedRoute>
  );
}
