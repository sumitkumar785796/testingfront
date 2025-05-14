'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('https://testingapisumit.onrender.com/api/users/accessprofile', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => {
        setProfile(data.data)
        setName(data.data.name)
      })
      .catch(() => router.push('/login'))
  }, [router])

  const updateName = async (e) => {
    e.preventDefault()
    const res = await fetch('https://testingapisumit.onrender.com/api/users/updateprofile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()
    if (res.ok) alert('Name updated')
    else alert(data.message)
  }

  const handleLogout = async () => {
    await fetch('http://localhost:3001/api/users/logout', {
      credentials: 'include',
    })
    router.push('/login')
  }

  if (!profile) return <p>Loading...</p>

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <form onSubmit={updateName} className="mt-4">
        <input
          type="text"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-green-500 text-dark px-4 py-2 w-full">Update Name</button>
      </form>
      <button onClick={handleLogout} className="bg-red-500 text-dark px-4 py-2 mt-3 w-full">
        Logout
      </button>
      
    </div>
  )
}
