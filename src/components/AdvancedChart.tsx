
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../api';

export default function AdvancedChart({ foodItemA, foodItemB, days=30 }:{ foodItemA?: string, foodItemB?: string, days?: number }){
  const [data, setData] = useState<any[]>([]);

  useEffect(()=>{
    if(!foodItemA) return setData([]);
    const fetches = [
      api.get('/stats/trend', { params: { foodItem: foodItemA, days } }).then(r=> ({ key: 'a', data: r.data })),
    ];
    if(foodItemB) fetches.push(api.get('/stats/trend', { params: { foodItem: foodItemB, days } }).then(r=> ({ key: 'b', data: r.data })));
    Promise.all(fetches).then(results=>{
      const map: Record<string, any> = {};
      results.forEach(res=>{
        res.data.forEach((p:any)=>{
          if(!map[p.date]) map[p.date] = { date: p.date };
          map[p.date][res.key === 'a' ? 'a' : 'b'] = Number(p.avg.toFixed(2));
        });
      });
      const arr = Object.values(map).sort((x:any,y:any)=> x.date.localeCompare(y.date));
      setData(arr);
    });
  }, [foodItemA, foodItemB, days]);

  if(!foodItemA) return <div className="bg-white rounded-2xl shadow p-4">Select an item to compare.</div>;

  return (
    <div className="w-full h-72 bg-white rounded-2xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="a" name="Item A" dot={false} />
          {foodItemB && <Line type="monotone" dataKey="b" name="Item B" dot={false} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
