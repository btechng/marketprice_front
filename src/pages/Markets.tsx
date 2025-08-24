
import { useEffect, useState } from 'react';
import api from '../api';

export default function Markets(){
  const [markets, setMarkets] = useState<any[]>([]);
  const [q, setQ] = useState('');

  useEffect(()=>{
    const t = setTimeout(()=>{
      api.get('/markets', { params: { q } }).then(res=> setMarkets(res.data));
    }, 300);
    return ()=> clearTimeout(t);
  },[q]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Markets</h1>
      <input className="border rounded p-2 w-full mb-4" placeholder="Search market name..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid md:grid-cols-2 gap-4">
        {markets.map((m:any)=>(
          <div key={m._id} className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{m.name}</div>
            <div className="text-sm text-gray-600">{m.city}, {m.state}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
