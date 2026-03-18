import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function ProfilArtiste() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artiste, setArtiste] = useState(null)
  const [oeuvres, setOeuvres] = useState([])

  useEffect(() => {
    async function chargerProfil() {
      const { data: artisteData } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single()

      if (!artisteData) return
      setArtiste(artisteData)

      const { data: oeuvresData } = await supabase
        .from('artworks')
        .select('*')
        .eq('artist_id', id)
        .eq('statut', 'disponible')

      setOeuvres(oeuvresData || [])
    }
    chargerProfil()
  }, [id])

  if (!artiste) return <p style={{ padding: '40px', textAlign: 'center' }}>Chargement...</p>

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#c8d8f0', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← Retour</button>
      </nav>

      <div style={{ background: '#1a3a6b', padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '600', color: '#1a3a6b', margin: '0 auto 16px' }}>
          {artiste.nom.charAt(0).toUpperCase()}
        </div>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>{artiste.nom}</h1>
        {artiste.ville && <p style={{ color: '#a0b8d8', fontSize: '14px', marginBottom: '8px' }}>📍 {artiste.ville}</p>}
        {artiste.bio && <p style={{ color: '#c8d8f0', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>{artiste.bio}</p>}
        {artiste.instagram && (
          <a href={`https://instagram.com/${artiste.instagram}`} target="_blank" style={{ color: '#f5c842', fontSize: '13px', marginTop: '12px', display: 'inline-block' }}>
            Instagram @{artiste.instagram}
          </a>
        )}
      </div>

      <div style={{ padding: '36px 32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>
          Oeuvres de {artiste.nom}
        </h2>

        {oeuvres.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>Cet artiste n'a pas encore publié d'oeuvres.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {oeuvres.map(oeuvre => (
              <div
                key={oeuvre.id}
                onClick={() => navigate(`/oeuvre/${oeuvre.id}`)}
                style={{ background: 'white', borderRadius: '10px', border: '1px solid #e8d8b0', overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ background: '#f5ede0', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px' }}>🎨</div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '4px' }}>{oeuvre.titre}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#e85d2a' }}>{oeuvre.prix} €</div>
                    <button style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Voir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: '#1a3a6b', padding: '32px', textAlign: 'center' }}>
        <div style={{ color: '#f5c842', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>🏺 Talents Cachés</div>
        <div style={{ color: '#a0b8d8', fontSize: '13px' }}>Une galerie d'art accessible et abordable</div>
      </div>

    </div>
  )
}

export default ProfilArtiste