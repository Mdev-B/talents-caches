import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Connexion() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleConnexion(e) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage('Erreur : ' + error.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#4f46e5' }}>
          Connexion
        </h1>

        <form onSubmit={handleConnexion} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '16px' }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '16px' }}
            required
          />
          <button
            type="submit"
            style={{ background: '#4f46e5', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Se connecter
          </button>
        </form>

        {message && (
          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>{message}</p>
        )}
      </div>
    </div>
  )
}

export default Connexion