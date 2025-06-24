import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import StatsTiles from './components/StatsTiles'
import VIPTierTable from './components/VIP/VIPTierTable'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <HeroCarousel />
      <StatsTiles />
      <VIPTierTable />
      <Footer />
    </div>
  )
}

export default App



