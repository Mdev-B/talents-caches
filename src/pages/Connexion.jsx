import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Connexion() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [resetMode, setResetMode] = useState(false)
  const [resetEnvoye, setResetEnvoye] = useState(false)

  async function handleConnexion(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setMessage('Erreur : ' + error.message); return }
    navigate('/dashboard')
  }

  async function handleReset(e) {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/dashboard'
    })
    if (error) { setMessage('Erreur : ' + error.message); return }
    setResetEnvoye(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f3ec' }}>
      <div className="card-animate" style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 12px' }}>🏺</div>
          <h1 style={{ color: '#1a3a6b', fontSize: '22px', fontWeight: '600' }}>
            {resetMode ? 'Mot de passe oublié' : 'Connexion'}
          </h1>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>Talents Cachés</p>
        </div>

        {resetEnvoye ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
            <p style={{ color: '#1a7a4a', fontWeight: '500', marginBottom: '8px' }}>Email envoyé !</p>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>Vérifie ta boîte mail pour réinitialiser ton mot de passe.</p>
            <button onClick={() => { setResetMode(false); setResetEnvoye(false) }} style={{ color: '#1a3a6b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={resetMode ? handleReset : handleConnexion} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none' }}
              required
            />
            {!resetMode && (
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none' }}
                required
              />
            )}
            {!resetMode && (
              <div style={{ textAlign: 'right' }}>
                <span onClick={() => setResetMode(true)} style={{ color: '#1a3a6b', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
                  Mot de passe oublié ?
                </span>
              </div>
            )}
            <button
              type="submit"
              className="btn-pulse"
              style={{ background: '#1a3a6b', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
            >
              {resetMode ? 'Envoyer le lien' : 'Se connecter'}
            </button>
            {resetMode && (
              <button type="button" onClick={() => setResetMode(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
                Retour à la connexion
              </button>
            )}
          </form>
        )}

        {message && (
          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: '#e85d2a' }}>{message}</p>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
          Pas encore artiste ?{' '}
          <span onClick={() => navigate('/inscription')} style={{ color: '#e85d2a', cursor: 'pointer', fontWeight: '500' }}>
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  )
}

export default Connexion