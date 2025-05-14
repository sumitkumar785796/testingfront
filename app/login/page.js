'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const router = useRouter()

  const handleEmail = async (e) => {
    e.preventDefault()
    const res = await fetch('https://testingapisumit.onrender.com/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (res.ok) {
      alert(data.message)
      setShowOtp(true)
    } else {
      alert(data.message)
    }
  }

  const handleOtp = async (e) => {
    e.preventDefault()
    const res = await fetch('https://testingapisumit.onrender.com/api/users/verify', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    const data = await res.json()
    if (res.ok) {
      alert(data.message)
      router.push('/profile')
    } else {
      alert(data.message)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login or Register</h2>
      <form onSubmit={showOtp ? handleOtp : handleEmail}>
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {showOtp && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-3"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <br />
        <button type="submit" className="btn btn-primary">
          {showOtp ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  )
}
