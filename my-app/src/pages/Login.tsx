import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      setError(true)
      return
    }

    
    const user = { email, password }
    localStorage.setItem('user', JSON.stringify(user))

    navigate('/home')
  }

  const handleClear = () => {
    localStorage.clear()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md  "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {error && !password && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded "
          >
            Login
          </button>
          <button
            onClick={handleClear}
            className="text-blue-500 px-4 py-2 "
          >
          Clear
          </button>
        </div>
      </div>
    </div>
  )
}
