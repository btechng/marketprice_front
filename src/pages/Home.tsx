
import { useEffect, useState } from 'react';
import api from '../api';
import Chart from '../components/Chart';
import AdvancedChart from '../components/AdvancedChart';

export default function Home(){
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [selectedB, setSelectedB] = useState<string>('');
  const [trend, setTrend] = useState<any[]>([]);
  const [avg, setAvg] = useState<any>(null);

  useEffect(()=>{
    api.get('/food-items').then(res=> setItems(res.data));
  },[]);

  useEffect(()=>{
    if(selected){
      api.get('/stats/trend', { params: { foodItem: selected, days: 30 }}).then(res=> setTrend(res.data));
      api.get('/stats/average', { params: { foodItem: selected }}).then(res=> setAvg(res.data));
    }
  },[selected]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow p-4">
        <h1 className="text-2xl font-bold mb-2">Food Price Trends</h1>
        <select className="border rounded p-2" value={selected} onChange={e=>setSelected(e.target.value)}>
          <option value="">Select item</option>
          {items.map((i:any)=>(<option key={i._id} value={i._id}>{i.name}</option>))}
        </select>
        {avg && <p className="mt-3 text-sm text-gray-600">
          Average: {avg.average?.toFixed?.(2) ?? '—'} | vs Yesterday: {avg.vsYesterday?.toFixed?.(2) ?? '—'} | vs Last Week: {avg.vsLastWeek?.toFixed?.(2) ?? '—'}
        </p>}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Chart data={trend} />
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">Compare items</h2>
          <select className="border rounded p-2 w-full mb-2" value={selected} onChange={e=>setSelected(e.target.value)}>
            <option value="">Select item A</option>
            {items.map((i:any)=>(<option key={i._id} value={i._id}>{i.name}</option>))}
          </select>
          <select className="border rounded p-2 w-full mb-2" value={selectedB} onChange={e=>setSelectedB(e.target.value)}>
            <option value="">(optional) Select item B</option>
            {items.map((i:any)=>(<option key={i._id} value={i._id}>{i.name}</option>))}
          </select>
          <AdvancedChart foodItemA={selected} foodItemB={selectedB} days={30} />
        </div>
      </div>
    </div>
  )
}
