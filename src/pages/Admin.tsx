
import { useEffect, useState } from 'react';
import api from '../api';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminInner(){
  const [pending, setPending] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(()=>{
    api.get('/price-reports', { params: { status:'pending', limit:50 } }).then(res=> setPending(res.data.items));
  },[refresh]);

  const decide = async (id:string, status:'approved'|'rejected')=>{
    await api.patch(`/price-reports/${id}/status`, { status });
    setRefresh(v=>v+1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin • Approvals</h1>
      <div className="grid gap-4">
        {pending.map((r:any)=>(
          <div key={r._id} className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{r.foodItem?.name} • ₦{r.price} • {r.market?.name} ({r.market?.city})</div>
            {r.receiptUrl && <img src={r.receiptUrl} alt="receipt" className="mt-2 max-h-60 object-contain rounded" />}
            <div className="flex gap-2 mt-3">
              <button onClick={()=>decide(r._id,'approved')} className="px-3 py-1 rounded bg-green-600 text-white">Approve</button>
              <button onClick={()=>decide(r._id,'rejected')} className="px-3 py-1 rounded bg-red-600 text-white">Reject</button>
            </div>
          </div>
        ))}
        {!pending.length && <p>No pending reports.</p>}
      </div>
    </div>
  )
}

export default function Admin(){
  return <ProtectedRoute role="admin"><AdminInner /></ProtectedRoute>
}
