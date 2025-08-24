
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Nav(){
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  const logout = ()=>{
    localStorage.removeItem('token'); localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Food Prices</Link>
        <div className="flex items-center gap-4">
          <Link to="/directory" className="hover:underline">Directory</Link>
          <Link to="/markets" className="hover:underline">Markets</Link>
          <Link to="/report" className="px-3 py-1 rounded bg-black text-white">Report</Link>
          {user?.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          )}
        </div>
      </div>
    </nav>
  )
}
