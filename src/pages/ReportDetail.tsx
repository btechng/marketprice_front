import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/price-reports`, { params: { status: "approved", limit: 1, id } })
      .then((res) => {
        // Some APIs may return items array
        const found = res.data.items?.[0] || res.data;
        if (!found) {
          setError("Report not found");
        } else {
          setReport(found);
        }
      })
      .catch(() => setError("Failed to fetch report"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading report...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow p-4 space-y-4">
        <h1 className="text-2xl font-bold">{report.foodItem?.name}</h1>

        {report.receiptUrl ? (
          <img
            src={report.receiptUrl}
            alt="receipt"
            className="w-full max-h-96 object-contain rounded"
          />
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
            No receipt available
          </div>
        )}

        <div className="space-y-1">
          <p>
            <span className="font-semibold">Price:</span> ₦{report.price}{" "}
            {report.unit || ""}
          </p>
          <p>
            <span className="font-semibold">Market:</span> {report.market?.name}{" "}
            ({report.market?.city})
          </p>
          <p>
            <span className="font-semibold">Reported by:</span>{" "}
            {report.reporter?.name} ({report.reporter?.email})
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(report.date).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-bold ${
                report.status === "approved"
                  ? "text-green-600"
                  : report.status === "rejected"
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {report.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
