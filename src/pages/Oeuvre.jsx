import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function Oeuvre() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [oeuvre, setOeuvre] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function chargerOeuvre() {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) setOeuvre(data)
    }
    chargerOeuvre()
  }, [id])

  async function handlePaiement() {
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch(
      'https://fycpextqshozbsrrwanz.supabase.co/functions/v1/create-checkout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          titre: oeuvre.titre,
          prix: oeuvre.prix,
          oeuvre_id: oeuvre.id,
        }),
      }
    )

    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Erreur : ' + data.error)
      setLoading(false)
    }
  }

  if (!oeuvre) return <p style={{ padding: '40px', textAlign: 'center' }}>Chargement...</p>

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#c8d8f0', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← Retour à l'accueil</button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: 'white', borderRadius: '16px', border: '1px solid #e8d8b0', overflow: 'hidden' }}>

          <div style={{ background: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', minHeight: '400px' }}>
            🎨
          </div>

          <div style={{ padding: '32px' }}>
            <div style={{ display: 'inline-block', background: '#eef2f8', color: '#1a3a6b', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '16px' }}>
              {oeuvre.categorie}
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>{oeuvre.titre}</h1>

            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>
              {oeuvre.description || 'Aucune description disponible.'}
            </p>

            <div style={{ fontSize: '32px', fontWeight: '700', color: '#e85d2a', marginBottom: '24px' }}>
              {oeuvre.prix} €
            </div>

            <div style={{ background: '#f7f3ec', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Statut</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: oeuvre.statut === 'disponible' ? '#1a7a4a' : '#e85d2a' }}>
                {oeuvre.statut === 'disponible' ? '✅ Disponible' : '❌ Vendu'}
              </div>
            </div>

            {oeuvre.statut === 'disponible' && (
              <button
                onClick={handlePaiement}
                disabled={loading}
                style={{ width: '100%', background: '#e85d2a', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Redirection...' : '💳 Acheter cette oeuvre'}
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              style={{ width: '100%', background: 'transparent', color: '#1a3a6b', border: '1px solid #1a3a6b', padding: '12px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
            >
              ← Voir d'autres oeuvres
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: '#1a3a6b', padding: '32px', textAlign: 'center', marginTop: '40px' }}>
        <div style={{ color: '#f5c842', fontSize: '16px', fontWeight: '500' }}>🏺 Talents Cachés</div>
      </div>

    </div>
  )
}

export default Oeuvre