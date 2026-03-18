import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function PublierOeuvre() {
  const navigate = useNavigate()
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [categorie, setCategorie] = useState('peinture')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlePublier(e) {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setMessage('❌ Tu dois être connecté pour publier une oeuvre')
      setLoading(false)
      return
    }

    const { data: artist } = await supabase
      .from('artists')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!artist) {
      setMessage('❌ Profil artiste introuvable')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('artworks').insert([{
      artist_id: artist.id,
      titre,
      description,
      prix: parseFloat(prix),
      categorie,
      statut: 'disponible'
    }])

    if (error) {
      setMessage('❌ Erreur : ' + error.message)
    } else {
      setMessage('✅ Oeuvre publiée avec succès !')
      setTimeout(() => navigate('/'), 2000)
    }

    setLoading(false)
  }

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#c8d8f0', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← Retour à l'accueil</button>
      </nav>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a3a6b', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Publier une oeuvre</h1>
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>Partagez votre creation avec le monde</p>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e8d8b0', padding: '32px' }}>
          <form onSubmit={handlePublier} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Titre de l'oeuvre *</label>
              <input
                type="text"
                value={titre}
                onChange={e => setTitre(e.target.value)}
                placeholder="Ex: Coucher de soleil à Essaouira"
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Décrivez votre oeuvre, son histoire, sa technique..."
                rows={4}
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Prix (€) *</label>
                <input
                  type="number"
                  value={prix}
                  onChange={e => setPrix(e.target.value)}
                  placeholder="150"
                  max="200"
                  style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Catégorie *</label>
                <select
                  value={categorie}
                  onChange={e => setCategorie(e.target.value)}
                  style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', background: 'white' }}
                >
                  <option value="peinture">Peinture</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="photographie">Photographie</option>
                  <option value="artisanat">Artisanat</option>
                  <option value="calligraphie">Calligraphie</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Publication...' : '🎨 Publier mon oeuvre'}
            </button>

          </form>

          {message && (
            <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublierOeuvre