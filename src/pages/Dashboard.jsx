import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Dashboard() {
  const navigate = useNavigate()
  const [artiste, setArtiste] = useState(null)
  const [oeuvres, setOeuvres] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function chargerDashboard() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/connexion'); return }
      const { data: artisteData } = await supabase.from('artists').select('*').eq('user_id', user.id).single()
      if (!artisteData) { navigate('/connexion'); return }
      const { data: oeuvresData } = await supabase.from('artworks').select('*').eq('artist_id', artisteData.id)
      setArtiste(artisteData)
      setOeuvres(oeuvresData || [])
      setLoading(false)
    }
    chargerDashboard()
  }, [])

  async function handleDeconnecter() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Chargement...</p>

  const totalVentes = oeuvres.filter(o => o.statut === 'vendu').length
  const totalRevenus = oeuvres.filter(o => o.statut === 'vendu').reduce((sum, o) => sum + o.prix, 0)

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh' }}>

      <nav className="nav-animate" style={{ background: '#1a3a6b', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f5c842', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏺</div>
          <div style={{ color: '#f5c842', fontWeight: '500', fontSize: '18px' }}>Talents Cachés</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#c8d8f0', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Accueil</button>
          <button onClick={handleDeconnecter} style={{ background: 'transparent', color: '#f5c842', border: '1px solid #f5c842', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Se déconnecter</button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>

        <div className="card-animate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '600', color: '#1a3a6b', marginBottom: '4px', animation: 'fadeInDown 0.8s ease forwards' }}>Bonjour {artiste.nom} 🎨</h1>
            <p style={{ color: '#888', fontSize: '14px' }}>Bienvenue sur ton tableau de bord</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn-pulse" onClick={() => navigate('/publier')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              + Publier
            </button>
            <button onClick={() => navigate('/parametres')} style={{ background: 'transparent', color: '#1a3a6b', border: '1px solid #1a3a6b', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
              ⚙️ Profil
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { valeur: oeuvres.length, label: 'Oeuvres publiées', couleur: '#1a3a6b' },
            { valeur: totalVentes, label: 'Ventes', couleur: '#1a3a6b' },
            { valeur: totalRevenus + ' €', label: 'Revenus', couleur: '#e85d2a' },
          ].map((stat, index) => (
            <div key={index} className="card-animate" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e8d8b0', padding: '24px', textAlign: 'center', animationDelay: `${index * 0.15}s` }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: stat.couleur, animation: 'scaleIn 0.6s ease forwards' }}>{stat.valeur}</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', borderBottom: '3px solid #f5c842', paddingBottom: '8px', display: 'inline-block' }}>Mes Oeuvres</h2>

        {oeuvres.length === 0 ? (
          <div className="card-animate" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e8d8b0', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <p style={{ color: '#888', marginBottom: '16px' }}>Tu n'as pas encore publié d'oeuvre</p>
            <button className="btn-pulse" onClick={() => navigate('/publier')} style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
              Publier ma première oeuvre
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {oeuvres.map((oeuvre, index) => (
              <div key={oeuvre.id} className="card-animate card-hover" style={{ background: 'white', borderRadius: '10px', border: '1px solid #e8d8b0', overflow: 'hidden', animationDelay: `${index * 0.1}s` }}>
                <div style={{ background: '#f5ede0', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🎨</div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '4px' }}>{oeuvre.titre}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#e85d2a' }}>{oeuvre.prix} €</div>
                    <div style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', background: oeuvre.statut === 'disponible' ? '#d4edda' : '#f8d7da', color: oeuvre.statut === 'disponible' ? '#1a7a4a' : '#e85d2a' }}>
                      {oeuvre.statut}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard