import { useEffect, useState } from "react";
import api from "../api";
import Chart from "../components/Chart";
import AdvancedChart from "../components/AdvancedChart";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [selectedB, setSelectedB] = useState<string>("");
  const [trend, setTrend] = useState<any[]>([]);
  const [avg, setAvg] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [filterFood, setFilterFood] = useState<string>("");
  const [filterMarket, setFilterMarket] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 12; // reports per page

  // Fetch all food items
  useEffect(() => {
    api
      .get("/food-items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load food items:", err));
  }, []);

  // Fetch all markets
  useEffect(() => {
    api
      .get("/markets")
      .then((res) => setMarkets(res.data))
      .catch((err) => console.error("Failed to load markets:", err));
  }, []);

  // Fetch trend and average when an item is selected
  useEffect(() => {
    if (selected) {
      api
        .get("/stats/trend", { params: { foodItem: selected, days: 30 } })
        .then((res) => setTrend(res.data))
        .catch((err) => console.error("Failed to load trend:", err));

      api
        .get("/stats/average", { params: { foodItem: selected } })
        .then((res) => setAvg(res.data))
        .catch((err) => console.error("Failed to load average:", err));
    }
  }, [selected]);

  // Fetch latest approved price reports with filters & pagination
  const fetchReports = (reset = false) => {
    const params: any = { status: "approved", limit, page: reset ? 1 : page };
    if (filterFood) params.foodItem = filterFood;
    if (filterMarket) params.market = filterMarket;

    api
      .get("/price-reports", { params })
      .then((res) => {
        if (reset) {
          setReports(res.data.items);
        } else {
          setReports((prev) => [...prev, ...res.data.items]);
        }
        setTotalPages(res.data.pages || 1);
      })
      .catch((err) => console.error("Failed to load reports:", err));
  };

  // Reload reports when filters change
  useEffect(() => {
    setPage(1);
    fetchReports(true);
  }, [filterFood, filterMarket]);

  // Load more handler
  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Fetch next page when `page` changes
  useEffect(() => {
    if (page > 1) fetchReports();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* --- Trends & Selection --- */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">Food Price Trends</h1>

        {/* Food selection */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <select
            className="border rounded p-2 flex-1"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select a food item</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          {avg && (
            <div className="text-sm text-gray-600">
              <p>Average: {avg.average?.toFixed?.(2) ?? "—"}</p>
              <p>vs Yesterday: {avg.vsYesterday?.toFixed?.(2) ?? "—"}</p>
              <p>vs Last Week: {avg.vsLastWeek?.toFixed?.(2) ?? "—"}</p>
            </div>
          )}
        </div>

        {/* Trend chart */}
        {selected && <Chart data={trend} />}
      </div>

      {/* --- Comparison Chart --- */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-semibold mb-2">Compare Items</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="border rounded p-2 flex-1"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select item A</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2 flex-1"
            value={selectedB}
            onChange={(e) => setSelectedB(e.target.value)}
          >
            <option value="">Select item B (optional)</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        <AdvancedChart foodItemA={selected} foodItemB={selectedB} days={30} />
      </div>

      {/* --- Latest Reporter Posts (Pinterest-style) --- */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Latest Price Reports
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            className="border rounded p-2 flex-1"
            value={filterFood}
            onChange={(e) => setFilterFood(e.target.value)}
          >
            <option value="">All food items</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2 flex-1"
            value={filterMarket}
            onChange={(e) => setFilterMarket(e.target.value)}
          >
            <option value="">All markets</option>
            {markets.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {reports.length > 0 ? (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {reports.map((r) => (
                <div
                  key={r._id}
                  className="break-inside-avoid bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {r.receiptUrl ? (
                    <img
                      src={r.receiptUrl}
                      alt="receipt"
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      No receipt
                    </div>
                  )}
                  <div className="p-3">
                    <div className="font-semibold text-lg">
                      {r.foodItem?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ₦{r.price} • {r.market?.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Reported by {r.reporter?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More button */}
            {page < totalPages && (
              <div className="text-center mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">
            No reports match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
