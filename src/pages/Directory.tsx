
import { useEffect, useState } from 'react';
import api from '../api';

export default function Directory(){
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<any[]>([]);

  useEffect(()=>{
    const t = setTimeout(()=>{
      api.get('/food-items', { params: { q: query }}).then(res=> setItems(res.data));
    }, 300);
    return ()=> clearTimeout(t);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Price Directory</h1>
      <input className="border rounded p-2 w-full mb-4" placeholder="Search by food name..." value={query} onChange={e=>setQuery(e.target.value)} />
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it:any)=>(
          <div key={it._id} className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-gray-600">{it.unit || 'unit'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
