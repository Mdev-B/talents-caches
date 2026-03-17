import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'
import PublierOeuvre from './pages/PublierOeuvre'
import Oeuvre from './pages/Oeuvre'
import Dashboard from './pages/Dashboard'
import Galerie from './pages/Galerie'
import ProfilArtiste from './pages/ProfilArtiste'
import Parametres from './pages/Parametres'
import Merci from './pages/Merci'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/publier" element={<PublierOeuvre />} />
        <Route path="/oeuvre/:id" element={<Oeuvre />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/artiste/:id" element={<ProfilArtiste />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/merci" element={<Merci />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App