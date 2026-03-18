import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Galerie() {
  const navigate = useNavigate()
  const [oeuvres, setOeuvres] = useState([])
  const [categorieActive, setCategorieActive] = useState('Tout voir')
  const [recherche, setRecherche] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function chargerOeuvres() {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('statut', 'disponible')
        .order('created_at', { ascending: false })
      if (!error) setOeuvres(data)
      setLoading(false)
    }
    chargerOeuvres()
  }, [])

  const oeuvresFiltrees = oeuvres.filter(o => {
    const matchCategorie = categorieActive === 'Tout voir' || o.categorie === categorieActive.toLowerCase()
    const matchRecherche = o.titre.toLowerCase().includes(recherche.toLowerCase())
    return matchCategorie && matchRecherche
  })

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <div style={{ display: 'flex', gap: '28px' }}>
          <span onClick={() => navigate('/')} style={{ color: '#c8d8f0', fontSize: '14px', cursor: 'pointer' }}>Accueil</span>
          <span style={{ color: '#f5c842', fontSize: '14px', cursor: 'pointer', borderBottom: '2px solid #f5c842', paddingBottom: '2px' }}>Galerie</span>
          <span style={{ color: '#c8d8f0', fontSize: '14px', cursor: 'pointer' }}>Nos Artistes</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/connexion')} style={{ background: 'transparent', color: '#f5c842', border: '1px solid #f5c842', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Connexion</button>
          <button onClick={() => navigate('/inscription')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Devenir Artiste</button>
        </div>
      </nav>

      <div style={{ background: '#1a3a6b', padding: '40px 32px', textAlign: 'center' }}>
        <h1 style={{ color: '#f5c842', fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>Galerie des Oeuvres</h1>
        <p style={{ color: '#a0b8d8', fontSize: '15px' }}>Découvrez les talents cachés du Maroc</p>
      </div>

      <div style={{ background: 'white', padding: '16px 32px', borderBottom: '1px solid #e0d8c8', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Rechercher une oeuvre..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none' }}
        />
      </div>

      <div style={{ background: 'white', padding: '14px 32px', display: 'flex', gap: '12px', borderBottom: '2px solid #e0d8c8', flexWrap: 'wrap' }}>
        {['Tout voir', 'Peintures', 'Sculptures', 'Artisanat', 'Photographie', 'Calligraphie'].map((cat) => (
          <span
            key={cat}
            onClick={() => setCategorieActive(cat)}
            style={{ background: categorieActive === cat ? '#1a3a6b' : 'white', color: categorieActive === cat ? 'white' : '#5a3a10', border: '1px solid #d8c890', borderRadius: '24px', padding: '7px 18px', fontSize: '13px', cursor: 'pointer' }}
          >
            {cat}
          </span>
        ))}
      </div>

      <div style={{ padding: '36px 32px' }}>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>{oeuvresFiltrees.length} oeuvre(s) trouvée(s)</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Chargement...</p>
        ) : oeuvresFiltrees.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <p>Aucune oeuvre trouvée</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {oeuvresFiltrees.map(oeuvre => (
              <div
                key={oeuvre.id}
                onClick={() => navigate(`/oeuvre/${oeuvre.id}`)}
                style={{ background: 'white', borderRadius: '10px', border: '1px solid #e8d8b0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ background: '#f5ede0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>🎨</div>
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'inline-block', background: '#eef2f8', color: '#1a3a6b', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', marginBottom: '8px' }}>{oeuvre.categorie}</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '4px' }}>{oeuvre.titre}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#e85d2a' }}>{oeuvre.prix} €</div>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/oeuvre/${oeuvre.id}`) }}
                      style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      Voir
                    </button>
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

export default Galerie