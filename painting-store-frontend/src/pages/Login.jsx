import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null)
    try{
      const res = await api.login({ email, password })
      login(res.data)
      navigate('/')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="p-2 bg-red-100 text-red-700 mb-4">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
        <button type="submit" disabled={loading} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">{loading?'Signing in...':'Sign in'}</button>
      </form>
    </div>
  )
}
