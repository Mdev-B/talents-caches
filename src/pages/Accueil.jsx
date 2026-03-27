import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Accueil() {
  const navigate = useNavigate()
  const [categorieActive, setCategorieActive] = useState('Tout voir')
  const [prixActif, setPrixActif] = useState('Tout')
  const [styleActif, setStyleActif] = useState('Tous')
  const [oeuvres, setOeuvres] = useState([])
  const [artistes, setArtistes] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function chargerDonnees() {
      const { data: oeuvresData, error } = await supabase.from('artworks').select('*')
      if (!error) setOeuvres(oeuvresData)
      const { data: artistesData } = await supabase.from('artists').select('*').limit(3)
      if (artistesData) setArtistes(artistesData)
    }
    chargerDonnees()
  }, [])

  const photos = [
    'https://picsum.photos/seed/art1/400/300',
    'https://picsum.photos/seed/art2/400/300',
    'https://picsum.photos/seed/art3/400/300',
    'https://picsum.photos/seed/art4/400/300',
    'https://picsum.photos/seed/art5/400/300',
  ]

  const oeuvresFiltrees = oeuvres.filter(o => {
    const matchCategorie = categorieActive === 'Tout voir' || o.categorie === categorieActive.toLowerCase()
    const matchPrix = prixActif === 'Tout' ||
      (prixActif === '0-50€' && o.prix <= 50) ||
      (prixActif === '50-100€' && o.prix > 50 && o.prix <= 100) ||
      (prixActif === '100-200€' && o.prix > 100 && o.prix <= 200) ||
      (prixActif === '200€+' && o.prix > 200)
    return matchCategorie && matchPrix
  })

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav className="nav-animate" style={{ background: '#1a3a6b', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px' }}>
            {['Accueil', 'Galerie', 'Nos Artistes'].map(link => (
              <span key={link} onClick={() => link === 'Galerie' && navigate('/galerie')} style={{ color: link === 'Galerie' ? '#f5c842' : '#c8d8f0', fontSize: '14px', cursor: 'pointer' }}>{link}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/connexion')} style={{ background: 'transparent', color: '#f5c842', border: '1px solid #f5c842', padding: isMobile ? '6px 10px' : '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: isMobile ? '12px' : '13px' }}>Connexion</button>
          <button onClick={() => navigate('/inscription')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: isMobile ? '6px 10px' : '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: isMobile ? '12px' : '13px', fontWeight: '500' }}>{isMobile ? 'Artiste' : 'Devenir Artiste'}</button>
        </div>
      </nav>

      <div style={{ position: 'relative', height: isMobile ? '280px' : '420px', overflow: 'hidden' }}>
        <img
          src="/hero.png"
          alt="Art marocain"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.parentNode.style.background = 'linear-gradient(135deg, #1a3a6b, #e85d2a)' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(26,58,107,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: isMobile ? '24px' : '40px', fontWeight: '700', maxWidth: '600px', margin: '0 auto 12px', animation: 'fadeInDown 1s ease forwards' }}>
            L'Art Émergent du Maroc
          </h1>
          <p style={{ color: '#f0e8d0', fontSize: isMobile ? '14px' : '18px', marginBottom: '28px', animation: 'fadeInUp 1s ease 0.3s forwards', opacity: 0 }}>
            Achetez des oeuvres originales à moins de 200 €
          </p>
          <button className="btn-pulse" onClick={() => navigate('/galerie')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: isMobile ? '12px 24px' : '14px 36px', borderRadius: '8px', fontSize: isMobile ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', animation: 'fadeInUp 1s ease 0.6s forwards', opacity: 0 }}>
            Explorer les Oeuvres
          </button>
        </div>
      </div>

      <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #e0d8c8', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input type="text" placeholder="Rechercher une oeuvre..." style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none' }} />
        <button onClick={() => navigate('/galerie')} style={{ background: '#1a3a6b', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>🔍</button>
      </div>

      <div style={{ background: 'white', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #e0d8c8', flexWrap: 'wrap' }}>
        {['Tout voir', 'Peintures', 'Sculptures', 'Artisanat', 'Photo', 'Calligraphie'].map((cat) => (
          <span key={cat} onClick={() => setCategorieActive(cat)} style={{ background: categorieActive === cat ? '#1a3a6b' : 'white', color: categorieActive === cat ? 'white' : '#5a3a10', border: '1px solid #d8c890', borderRadius: '24px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            {cat}
          </span>
        ))}
      </div>

      <div style={{ background: '#fafaf7', padding: '12px 16px', borderBottom: '2px solid #e0d8c8', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#5a3a10', fontWeight: '600' }}>Prix :</span>
        {['Tout', '0-50€', '50-100€', '100-200€', '200€+'].map(prix => (
          <span key={prix} onClick={() => setPrixActif(prix)} style={{ background: prixActif === prix ? '#e85d2a' : 'white', color: prixActif === prix ? 'white' : '#5a3a10', border: '1px solid #d8c890', borderRadius: '24px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            {prix}
          </span>
        ))}
        <span style={{ fontSize: '12px', color: '#5a3a10', fontWeight: '600', marginLeft: '8px' }}>Style :</span>
        {['Tous', 'Abstrait', 'Réaliste', 'Traditionnel', 'Moderne'].map(style => (
          <span key={style} onClick={() => setStyleActif(style)} style={{ background: styleActif === style ? '#e85d2a' : 'white', color: styleActif === style ? 'white' : '#5a3a10', border: '1px solid #d8c890', borderRadius: '24px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            {style}
          </span>
        ))}
      </div>

      <div style={{ padding: isMobile ? '20px 16px' : '36px 32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>Nouvelles Oeuvres</h2>
        {oeuvresFiltrees.length === 0 ? (
          <p style={{ color: '#888' }}>Aucune oeuvre pour le moment...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {oeuvresFiltrees.map((oeuvre, index) => (
              <div key={oeuvre.id} className="card-animate card-hover" onClick={() => navigate(`/oeuvre/${oeuvre.id}`)} style={{ background: 'white', borderRadius: '10px', border: '1px solid #e8d8b0', overflow: 'hidden', cursor: 'pointer', animationDelay: `${index * 0.1}s` }}>
                <div style={{ height: isMobile ? '120px' : '200px', overflow: 'hidden', background: '#f5ede0' }}>
                  <img
                    src={photos[index % 5]}
                    alt={oeuvre.titre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '4px' }}>{oeuvre.titre}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>{oeuvre.categorie}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#e85d2a' }}>{oeuvre.prix} €</div>
                    <button style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer' }}>Offre</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? '20px 16px' : '36px 32px', background: '#eef2f8' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>Nos Artistes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '12px' }}>
            {artistes.map((a, index) => (
              <div key={a.id} className="card-animate" onClick={() => navigate(`/artiste/${a.id}`)} style={{ background: 'white', borderRadius: '10px', border: '1px solid #c8d8f0', padding: '12px', textAlign: 'center', cursor: 'pointer', animationDelay: `${index * 0.15}s` }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#f5c842', fontWeight: '500', margin: '0 auto 8px' }}>
                  {a.nom.charAt(0).toUpperCase()}
                </div>
                <div style={{ fontWeight: '500', color: '#1a1a1a', marginBottom: '2px', fontSize: '13px' }}>{a.nom}</div>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>{a.ville || 'Maroc'}</div>
                <span style={{ fontSize: '11px', color: '#1a3a6b', cursor: 'pointer' }}>Voir →</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1a3a6b, #2d5a9e)', borderRadius: '10px', padding: '20px', textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎨</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#f5c842' }}>Devenir Vendeur</h3>
            <p style={{ fontSize: '12px', color: '#c8d8f0', marginBottom: '16px', lineHeight: '1.5' }}>Vous êtes un artiste marocain ? Vendez vos oeuvres sur Talents Cachés</p>
            <button className="btn-pulse" onClick={() => navigate('/inscription')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>Devenir Vendeur</button>
          </div>
        </div>
      </div>

      <div style={{ background: '#1a3a6b', padding: '24px 16px', textAlign: 'center' }}>
        <div style={{ color: '#f5c842', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>🏺 Talents Cachés</div>
        <div style={{ color: '#a0b8d8', fontSize: '13px' }}>Une galerie d'art accessible et abordable</div>
      </div>

    </div>
  )
}

export default Accueil