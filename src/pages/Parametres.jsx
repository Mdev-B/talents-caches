import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Parametres() {
  const navigate = useNavigate()
  const [nom, setNom] = useState('')
  const [bio, setBio] = useState('')
  const [ville, setVille] = useState('')
  const [instagram, setInstagram] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [artisteId, setArtisteId] = useState(null)

  useEffect(() => {
    async function chargerProfil() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/connexion'); return }

      const { data } = await supabase
        .from('artists')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setArtisteId(data.id)
        setNom(data.nom || '')
        setBio(data.bio || '')
        setVille(data.ville || '')
        setInstagram(data.instagram || '')
      }
      setLoading(false)
    }
    chargerProfil()
  }, [])

  async function handleSauvegarder(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('artists')
      .update({ nom, bio, ville, instagram })
      .eq('id', artisteId)

    if (error) {
      setMessage('❌ Erreur : ' + error.message)
    } else {
      setMessage('✅ Profil mis à jour avec succès !')
    }
  }

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Chargement...</p>

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: '#c8d8f0', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← Mon Dashboard</button>
      </nav>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a3a6b', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Mon Profil</h1>
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>Complète ton profil pour attirer plus d'acheteurs</p>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e8d8b0', padding: '32px' }}>
          <form onSubmit={handleSauvegarder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Nom d'artiste *</label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Parle de toi, de ton art, de ton inspiration..."
                rows={4}
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Ville</label>
              <input
                type="text"
                value={ville}
                onChange={e => setVille(e.target.value)}
                placeholder="Ex: Casablanca, Marrakech, Fès..."
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Instagram</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                <span style={{ background: '#f5f5f5', padding: '10px 14px', fontSize: '14px', color: '#888', borderRight: '1px solid #ddd' }}>@</span>
                <input
                  type="text"
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  placeholder="ton_compte_instagram"
                  style={{ flex: 1, border: 'none', padding: '10px 14px', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ background: '#1a3a6b', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}
            >
              Sauvegarder mon profil
            </button>

          </form>

          {message && (
            <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>{message}</p>
          )}
        </div>
      </div>

      <div style={{ background: '#1a3a6b', padding: '32px', textAlign: 'center', marginTop: '40px' }}>
        <div style={{ color: '#f5c842', fontSize: '16px', fontWeight: '500' }}>🏺 Talents Cachés</div>
      </div>

    </div>
  )
}

export default Parametres