import { useState } from 'react'
import { supabase } from '../supabase'

function Inscription() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [message, setMessage] = useState('')

  async function handleInscription(e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage('❌ Erreur : ' + error.message)
      return
    }

    const { error: artistError } = await supabase
      .from('artists')
      .insert([{ user_id: data.user.id, nom }])

    if (artistError) {
      setMessage('❌ Erreur profil : ' + artistError.message)
      return
    }

    setMessage('✅ Compte créé avec succès !')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#4f46e5' }}>
          🎨 Rejoindre Émergent de l'art
        </h1>

        <form onSubmit={handleInscription} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            placeholder="Ton nom d'artiste"
            value={nom}
            onChange={e => setNom(e.target.value)}
            style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '16px' }}
            required
          />
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
            Créer mon compte artiste
          </button>
        </form>

        {message && (
          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>{message}</p>
        )}
      </div>
    </div>
  )
}

export default Inscription