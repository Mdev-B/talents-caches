import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Accueil() {
  const navigate = useNavigate()
  const [categorieActive, setCategorieActive] = useState('Tout voir')
  const [oeuvres, setOeuvres] = useState([])
  const [artistes, setArtistes] = useState([])

  useEffect(() => {
    async function chargerDonnees() {
      const { data: oeuvresData, error } = await supabase.from('artworks').select('*')
      if (!error) setOeuvres(oeuvresData)
      const { data: artistesData } = await supabase.from('artists').select('*').limit(3)
      if (artistesData) setArtistes(artistesData)
    }
    chargerDonnees()
  }, [])

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav className="nav-animate" style={{ background: '#1a3a6b', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div>
            <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
            <div style={{ color: '#a0b8d8', fontSize: '11px' }}>Découvrez les artistes cachés du Maroc</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Accueil', 'Galerie', 'Nos Artistes'].map(link => (
            <span key={link} onClick={() => link === 'Galerie' && navigate('/galerie')} style={{ color: link === 'Galerie' ? '#f5c842' : '#c8d8f0', fontSize: '14px', cursor: 'pointer' }}>{link}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/connexion')} style={{ background: 'transparent', color: '#f5c842', border: '1px solid #f5c842', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Connexion</button>
          <button onClick={() => navigate('/inscription')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Devenir Artiste</button>
        </div>
      </nav>

      <div style={{ background: 'linear-gradient(rgba(26,58,107,0.75), rgba(26,58,107,0.75)), url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Essaouira_ramparts.jpg/1280px-Essaouira_ramparts.jpg) center/cover', padding: '80px 32px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '600', maxWidth: '500px', margin: '0 auto 12px', animation: 'fadeInDown 1s ease forwards' }}>
          L'Art Émergent du Maroc
        </h1>
        <p style={{ color: '#c8d8f0', fontSize: '16px', marginBottom: '28px', animation: 'fadeInUp 1s ease 0.3s forwards', opacity: 0 }}>
          Achetez des oeuvres originales à moins de 200 €
        </p>
        <button className="btn-pulse" onClick={() => navigate('/galerie')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', animation: 'fadeInUp 1s ease 0.6s forwards', opacity: 0 }}>
          Explorer les Oeuvres
        </button>
      </div>

      <div style={{ background: 'white', padding: '16px 32px', borderBottom: '1px solid #e0d8c8', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input type="text" placeholder="Rechercher une oeuvre..." style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none' }} />
        <button onClick={() => navigate('/galerie')} style={{ background: '#1a3a6b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>Rechercher</button>
      </div>

      <div style={{ background: 'white', padding: '14px 32px', display: 'flex', gap: '12px', borderBottom: '2px solid #e0d8c8', flexWrap: 'wrap' }}>
        {['Tout voir', 'Peintures', 'Sculptures', 'Artisanat', 'Photographie', 'Calligraphie'].map((cat) => (
          <span key={cat} onClick={() => setCategorieActive(cat)} style={{ background: categorieActive === cat ? '#1a3a6b' : 'white', color: categorieActive === cat ? 'white' : '#5a3a10', border: '1px solid #d8c890', borderRadius: '24px', padding: '7px 18px', fontSize: '13px', cursor: 'pointer' }}>
            {cat}
          </span>
        ))}
      </div>

      <div style={{ padding: '36px 32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>Nouvelles Oeuvres</h2>
        {oeuvres.length === 0 ? (
          <p style={{ color: '#888' }}>Aucune oeuvre pour le moment...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {oeuvres.map((oeuvre, index) => (
              <div key={oeuvre.id} className="card-animate card-hover" onClick={() => navigate(`/oeuvre/${oeuvre.id}`)} style={{ background: 'white', borderRadius: '10px', border: '1px solid #e8d8b0', overflow: 'hidden', cursor: 'pointer', animationDelay: `${index * 0.1}s` }}>
                <div style={{ background: '#f5ede0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>🎨</div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '4px' }}>{oeuvre.titre}</div>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>{oeuvre.categorie}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#e85d2a' }}>{oeuvre.prix} €</div>
                    <button style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Faire une Offre</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '36px 32px', background: '#eef2f8' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>Nos Artistes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {artistes.map((a, index) => (
              <div key={a.id} className="card-animate" onClick={() => navigate(`/artiste/${a.id}`)} style={{ background: 'white', borderRadius: '10px', border: '1px solid #c8d8f0', padding: '16px', textAlign: 'center', cursor: 'pointer', animationDelay: `${index * 0.15}s` }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#f5c842', fontWeight: '500', margin: '0 auto 10px' }}>
                  {a.nom.charAt(0).toUpperCase()}
                </div>
                <div style={{ fontWeight: '500', color: '#1a1a1a', marginBottom: '2px' }}>{a.nom}</div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{a.ville || 'Maroc'}</div>
                <span style={{ fontSize: '12px', color: '#1a3a6b', cursor: 'pointer' }}>Voir Profil →</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff8e8', borderRadius: '10px', border: '2px solid #f5c842', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎨</div>
            <h3 style={{ color: '#1a3a6b', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Devenir Vendeur</h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Vous etes un artiste marocain ? Vendez vos oeuvres sur Talents Caches</p>
            <button className="btn-pulse" onClick={() => navigate('/inscription')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', width: '100%' }}>Devenir Vendeur</button>
          </div>
        </div>
      </div>

      <div style={{ background: '#1a3a6b', padding: '32px', textAlign: 'center' }}>
        <div style={{ color: '#f5c842', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>🏺 Talents Cachés</div>
        <div style={{ color: '#a0b8d8', fontSize: '13px' }}>Une galerie d'art accessible et abordable pour dénicher les talents cachés</div>
      </div>

    </div>
  )
}

export default Accueil