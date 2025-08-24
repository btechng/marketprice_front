
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ data }:{ data:{date:string, avg:number}[] }){
  return (
    <div className="w-full h-64 bg-white rounded-2xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avg" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
