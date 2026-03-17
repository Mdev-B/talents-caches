import { useNavigate } from 'react-router-dom'

function Merci() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#f7f3ec', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e8d8b0', padding: '48px', textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎨</div>
        <h1 style={{ color: '#1a3a6b', fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Merci pour votre achat !</h1>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '8px' }}>Votre paiement a été confirmé avec succès.</p>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>L'artiste va vous contacter prochainement pour la livraison de votre oeuvre.</p>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#e85d2a', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

export default Merci