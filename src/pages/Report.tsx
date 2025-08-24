
import { useEffect, useState } from 'react';
import api from '../api';

export default function Report(){
  const [items, setItems] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [foodItem, setFoodItem] = useState('');
  const [market, setMarket] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [receipt, setReceipt] = useState<File|null>(null);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    api.get('/food-items').then(res=> setItems(res.data));
    api.get('/markets').then(res=> setMarkets(res.data));
  },[]);

  const submit = async (e:any)=>{
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    fd.append('foodItem', foodItem);
    fd.append('market', market);
    fd.append('price', price);
    if(unit) fd.append('unit', unit);
    if(receipt) fd.append('receipt', receipt);
    try{
      await api.post('/price-reports', fd, { headers:{ 'Content-Type':'multipart/form-data' } });
      setMsg('Submitted! Awaiting approval by admin.');
      setFoodItem(''); setMarket(''); setPrice(''); setUnit(''); setReceipt(null);
    }catch(e:any){
      setMsg(e.response?.data?.error || 'Failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow mt-6">
      <h1 className="text-xl font-semibold mb-3">Submit Today&apos;s Price</h1>
      {msg && <p className="text-sm mb-2">{msg}</p>}
      <form onSubmit={submit} className="space-y-3">
        <select className="w-full border rounded p-2" value={foodItem} onChange={e=>setFoodItem(e.target.value)}>
          <option value="">Select food item</option>
          {items.map((i:any)=>(<option key={i._id} value={i._id}>{i.name}</option>))}
        </select>
        <select className="w-full border rounded p-2" value={market} onChange={e=>setMarket(e.target.value)}>
          <option value="">Select market</option>
          {markets.map((m:any)=>(<option key={m._id} value={m._id}>{m.name} - {m.city}</option>))}
        </select>
        <input className="w-full border rounded p-2" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Unit (e.g., 1kg, 1 paint)" value={unit} onChange={e=>setUnit(e.target.value)} />
        <input className="w-full" type="file" onChange={e=>setReceipt(e.target.files?.[0] || null)} />
        <button className="w-full bg-black text-white rounded p-2">Submit</button>
      </form>
    </div>
  )
}
