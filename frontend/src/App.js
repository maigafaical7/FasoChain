import React, { useState, useEffect, useRef } from 'react';
import {
Container, Navbar, Nav, Row, Col, Card, Button,
Form, InputGroup, Spinner, Alert, Badge, ProgressBar
} from 'react-bootstrap';
import {
Heart, Zap, Copy, CheckCircle, Award,
Send, Facebook, Twitter, Instagram, LayoutGrid,
TrendingUp, Users, Shield, Globe, Sparkles,
ArrowRight, Check, X, Loader2, Gift, Menu
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

// Import components
import HeroSection from './components/HeroSection';
import CausesSection from './components/CausesSection';
import NewsSection from './components/NewsSection';
import MajorDonorsSection from './components/MajorDonorsSection';
import PartnersSection from './components/PartnersSection';
import SinglePageDonationFlow from './components/SinglePageDonationFlow';

// --- CONFIGURATION ---
const API_URL = "http://localhost:5003/api";

// Couleurs du drapeau (Burkina Faso) avec variations modernes
const COLORS = {
green: "#009E49",
red: "#EF2B2D",
yellow: "#FCD116",
dark: "#1a1a1a",
light: "#f8f9fa",
gradient: "linear-gradient(135deg, #009E49 0%, #EF2B2D 50%, #FCD116 100%)"
};

// Animation variants
const cardVariants = {
hidden: { opacity: 0, y: 50 },
visible: { opacity: 1, y: 0 },
hover: {
scale: 1.05,
transition: {
type: "spring",
stiffness: 400,
damping: 10
}
}
};

const App = () => {
const [showDonationFlow, setShowDonationFlow] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [totalDonations, setTotalDonations] = useState(8500000);
const [activeDonors, setActiveDonors] = useState(36500);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [lastDonation, setLastDonation] = useState(null);
const [selectedCause, setSelectedCause] = useState(null);

// Scroll animations
const { scrollYProgress } = useScroll();
const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

// Ref for confetti
const confettiRef = useRef(null);

// Gestion du scroll pour l'effet flou de la Navbar
useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Gestion des dons complétés
const handleDonationComplete = (amount, cause) => {
setLastDonation({ amount, cause, date: new Date() });
setTotalDonations(prev => prev + amount);
setActiveDonors(prev => prev + 1);
triggerConfetti();
};

// Animation confetti
const triggerConfetti = () => {
const duration = 3 * 1000;
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
const timeLeft = animationEnd - Date.now();

if (timeLeft <= 0) {
return clearInterval(interval);
}

const particleCount = 50 * (timeLeft / duration);
  
// Confetti from left
confetti(Object.assign({}, defaults, {
particleCount,
origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
colors: [COLORS.green, COLORS.red, COLORS.yellow]
}));

// Confetti from right
confetti(Object.assign({}, defaults, {
particleCount,
origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
colors: [COLORS.green, COLORS.red, COLORS.yellow]
}));
}, 250);
};

// --- ACTIONS ---
const openDonationFlow = () => {
setShowDonationFlow(true);
};

const closeDonationFlow = () => {
setShowDonationFlow(false);
};

// --- MAIN SITE RENDERING ---

return (
<div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', overflowX: 'hidden' }}>
{/* Enhanced Styles */}
<style>{`
.transition-all { transition: all 0.3s ease; }
.cursor-pointer { cursor: pointer; }
.navbar-blur { backdrop-filter: blur(10px); background: rgba(255,255,255,0.95) !important; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
.hero-gradient { background: linear-gradient(135deg, #009E49 0%, #EF2B2D 50%, #FCD116 100%); }
.card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.card-hover:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.btn-gradient { background: linear-gradient(45deg, #009E49, #EF2B2D); border: none; }
.btn-gradient:hover { background: linear-gradient(45deg, #007a3a, #d62020); transform: translateY(-2px); }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
.floating { animation: float 3s ease-in-out infinite; }
.glass-effect { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
.text-gradient { background: linear-gradient(45deg, #009E49, #EF2B2D); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

/* Correction pour la navbar fixe */
html {
  scroll-behavior: smooth;
}

.navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1030 !important;
}

/* Ajout d'espace pour le contenu sous la navbar */
body {
  padding-top: 80px !important;
}

/* Correction pour le défilement */
.flex-grow-1 {
  padding-top: 0 !important;
}

/* Styles forcés pour le nom Fasochain */
.fasochain-brand {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
  margin-left: -50px !important;
  padding-left: 0 !important;
  position: relative !important;
  left: -30px !important;
  display: flex !important;
  align-items: center !important;
}

.fasochain-brand span {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
}

.fasochain-brand .text-gradient {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
  margin-left: 10px !important;
  color: COLORS.green !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: COLORS.green !important;
}

.navbar-brand {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
  margin-left: -50px !important;
  padding-left: 0 !important;
  position: relative !important;
  left: -30px !important;
  display: flex !important;
  align-items: center !important;
}

.navbar-brand span {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
}

.navbar-brand .text-gradient {
  font-size: 2.5rem !important;
  font-weight: 900 !important;
  margin-left: 10px !important;
  color: COLORS.green !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: COLORS.green !important;
}

.navbar-brand .rounded-circle {
  flex-shrink: 0 !important;
  margin-right: 1rem !important;
}

/* Styles forcés pour les boutons de navigation */
.navbar-nav .nav-link {
  background-color: #f8f9fa !important;
  color: #009E49 !important;
  border: 2px solid #009E49 !important;
  transition: all 0.3s ease !important;
}

.navbar-nav .nav-link:hover {
  background-color: #009E49 !important;
  color: white !important;
  transform: translateY(-2px) !important;
}

.nav-btn-custom {
  background-color: #f8f9fa !important;
  color: #009E49 !important;
  border: 2px solid #009E49 !important;
  transition: all 0.3s ease !important;
}

.nav-btn-custom:hover {
  background-color: #009E49 !important;
  color: white !important;
  transform: translateY(-2px) !important;
}

.navbar-nav .nav-link.nav-btn-custom {
  background-color: #f8f9fa !important;
  color: #009E49 !important;
  border: 2px solid #009E49 !important;
}
`}</style>

{/* Donation Flow Overlay - Only show when donation flow is active */}
<AnimatePresence>
{showDonationFlow && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
style={{ 
zIndex: 9999, 
background: 'rgba(0,0,0,0.8)',
backdropFilter: 'blur(5px)'
}}
onClick={closeDonationFlow}
>
<motion.div
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}
className="w-100 h-100"
style={{ maxWidth: '1200px', maxHeight: '90vh', overflowY: 'auto' }}
onClick={(e) => e.stopPropagation()}
>
<SinglePageDonationFlow 
onClose={closeDonationFlow} 
onDonationComplete={handleDonationComplete}
preselectedCause={selectedCause}
/>
</motion.div>
</motion.div>
)}
</AnimatePresence>

{/* Enhanced Navigation */}
<motion.nav 
className={`navbar sticky-top navbar-expand-lg py-3 transition-all ${scrolled ? 'navbar-blur' : 'bg-white'}`}
style={{ zIndex: 1000 }}
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ type: "spring", stiffness: 100 }}
>
<Container>
<motion.div 
className="navbar-brand fw-bold d-flex align-items-center cursor-pointer fasochain-brand"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
style={{ 
  fontSize: '2.5rem !important', 
  fontWeight: '900 !important',
  marginLeft: '-50px !important',
  paddingLeft: '0 !important',
  position: 'relative !important',
  left: '-30px !important'
}}
>
<motion.div 
className="rounded-circle me-4 d-flex align-items-center justify-content-center floating"
style={{ 
  width: '55px', 
  height: '55px', 
  background: `linear-gradient(45deg, ${COLORS.green}, ${COLORS.red})`,
  flexShrink: 0
}}
>
<Zap size={30} color="white" fill="white" />
</motion.div>
<div className="d-flex flex-nowrap">
<span style={{ 
  fontSize: '2.5rem !important',
  fontWeight: '900 !important',
  color: COLORS.green,
  marginLeft: '10px !important'
}}>Faso</span>
<span style={{ 
  color: COLORS.red, 
  fontSize: '2.5rem !important',
  fontWeight: '900 !important'
}}>chain</span>
</div>
</motion.div>

<Navbar.Toggle 
aria-controls="basic-navbar-nav" 
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
<Menu size={24} />
</Navbar.Toggle>

<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mx-auto fw-medium">
{[
{ name: 'Accueil', href: '#accueil' },
{ name: 'Causes', href: '#causes' },
{ name: 'Actualités', href: '#actualites' },
{ name: 'Dons Majeurs', href: '#dons-majeurs' },
{ name: 'Partenaires', href: '#partenaires' }
].map((item, index) => (
<motion.div 
  key={item.name} 
  whileHover={{ scale: 1.05 }} 
  whileTap={{ scale: 0.95 }}
  className="mx-2"
>
  <Nav.Link 
    href={item.href} 
    className="px-4 py-2 rounded-pill text-decoration-none fw-bold nav-btn-custom"
    style={{
      backgroundColor: '#f8f9fa !important',
      color: COLORS.green + ' !important',
      border: `2px solid ${COLORS.green} !important`,
      transition: 'all 0.3s ease !important',
      fontSize: '1rem !important'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = COLORS.green + ' !important';
      e.target.style.color = 'white !important';
      e.target.style.transform = 'translateY(-2px) !important';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#f8f9fa !important';
      e.target.style.color = COLORS.green + ' !important';
      e.target.style.transform = 'translateY(0px) !important';
    }}
  >
    {item.name}
  </Nav.Link>
</motion.div>
))}
</Nav>
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
<Button 
className="rounded-pill px-4 fw-bold shadow-sm" 
variant="success"
style={{ backgroundColor: COLORS.green, border: 'none' }}
onClick={openDonationFlow}
>
<Heart className="me-2" size={16} />
Je contribue
</Button>
</motion.div>
</Navbar.Collapse>
</Container>
</motion.nav>

{/* Main Content */}
<div className="flex-grow-1">
{/* Hero Section */}
<section id="accueil">
<HeroSection totalDonations={totalDonations} activeDonors={activeDonors} onDonationClick={openDonationFlow} />
</section>

{/* Causes Section */}
<section id="causes">
<CausesSection 
  selectedCause={selectedCause} 
  setSelectedCause={setSelectedCause} 
  onDonationClick={(cause) => {
    setSelectedCause(cause);
    openDonationFlow();
  }} 
/>
</section>

{/* News Section */}
<section id="actualites">
<NewsSection />
</section>

{/* Major Donors Section */}
<section id="dons-majeurs">
<MajorDonorsSection />
</section>

{/* Partners Section */}
<section id="partenaires">
<PartnersSection />
</section>

</div>

{/* Enhanced Footer */}
<motion.footer 
className="bg-dark text-white pt-5 pb-3"
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.8 }}
>
<Container>
<Row className="gy-4 mb-4">
<Col lg={4}>
<motion.div whileHover={{ scale: 1.02 }}>
<h5 className="fw-bold mb-3">
<Sparkles className="me-2" size={20} />
Fasochain
</h5>
<p className="text-muted small">La plateforme de solidarité nationale utilisant la technologie Bitcoin pour un impact direct et transparent au Burkina Faso.</p>
<div className="d-flex gap-3 mt-3">
<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
<Badge bg="success" className="px-3 py-2">
{totalDonations.toLocaleString()} sats collectés
</Badge>
</motion.div>
<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
<Badge bg="danger" className="px-3 py-2">
{activeDonors} donateurs
</Badge>
</motion.div>
</div>
</motion.div>
</Col>
<Col lg={4}>
<motion.div whileHover={{ scale: 1.02 }}>
<h5 className="fw-bold mb-3">Navigation Rapide</h5>
<div className="d-flex flex-column gap-2">
{['Causes', 'Actualités', 'Dons Majeurs', 'Partenaires'].map((item) => (
<motion.a
key={item}
href={`#${item.toLowerCase().replace(' ', '-')}`}
className="text-white text-decoration-none"
style={{ color: 'rgba(255,255,255,0.7)' }}
whileHover={{ color: 'white', x: 5 }}
>
{item}
</motion.a>
))}
</div>
</motion.div>
</Col>
<Col lg={4} className="text-lg-end">
<motion.div whileHover={{ scale: 1.02 }}>
<h5 className="fw-bold mb-3">Suivez-nous</h5>
<div className="d-flex justify-content-lg-end gap-3">
{[
{ icon: <Facebook />, color: '#1877f2' },
{ icon: <Twitter />, color: '#1da1f2' },
{ icon: <Instagram />, color: '#e4405f' }
].map((social, index) => (
<motion.a
key={index}
href="#"
className="text-white opacity-75"
style={{ color: social.color }}
whileHover={{ scale: 1.2, opacity: 1 }}
whileTap={{ scale: 0.8 }}
>
{social.icon}
</motion.a>
))}
</div>
<div className="mt-3">
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
<Button 
variant="success" 
className="rounded-pill px-4 py-2 fw-bold"
style={{ background: 'linear-gradient(45deg, #009E49, #EF2B2D)', border: 'none' }}
onClick={openDonationFlow}
>
<Heart className="me-2" size={16} />
Faire un don
</Button>
</motion.div>
</div>
</motion.div>
</Col>
</Row>
<hr className="opacity-10" />
<motion.div 
className="text-center text-muted small mb-0"
whileHover={{ scale: 1.02 }}
>
© 2024 Fasochain - La patrie ou la mort, nous vaincrons.
</motion.div>
</Container>
</motion.footer>
</div>
);
};

export default App;
