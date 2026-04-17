import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Shield, Zap } from 'lucide-react';

const HeroSection = ({ totalDonations, activeDonors, onDonationClick }) => {
  return (
    <motion.section 
      className="position-relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute rounded-circle"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(252, 209, 22, ${Math.random() * 0.1 + 0.05})`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="container position-relative">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(45deg, #009E49, #EF2B2D)' 
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "loop", ease: "linear" }}
              >
                <Zap size={40} color="white" fill="white" />
              </motion.div>
              
              <h1 className="display-1 fw-bold text-white mb-4">
                Faso<span style={{ color: '#EF2B2D' }}>chain</span>
              </h1>
              
              <p className="lead text-white-50 mb-5" style={{ fontSize: '1.3rem' }}>
                La révolution Bitcoin au service de la solidarité nationale. 
                Unissez-vous pour un Burkina Faso souverain et prospère.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <motion.button
                  className="btn btn-lg px-4 py-3 rounded-pill text-white fw-bold"
                  style={{ background: 'linear-gradient(45deg, #009E49, #EF2B2D)', border: 'none' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,158,73,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDonationClick}
                >
                  <Shield className="me-2" size={20} />
                  Faire un don
                </motion.button>
                
                <motion.button
                  className="btn btn-lg px-4 py-3 rounded-pill border border-white text-white fw-bold"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  En savoir plus
                </motion.button>
              </div>

              <div className="row g-4">
                <motion.div 
                  className="col-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="d-flex align-items-center">
                    <TrendingUp className="me-3" size={30} color="#FCD116" />
                    <div>
                      <h3 className="text-white fw-bold mb-0">
                        {totalDonations.toLocaleString()} sats
                      </h3>
                      <p className="text-white-50 mb-0">Total collecté</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="col-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="d-flex align-items-center">
                    <Users className="me-3" size={30} color="#FCD116" />
                    <div>
                      <h3 className="text-white fw-bold mb-0">{activeDonors}</h3>
                      <p className="text-white-50 mb-0">Donateurs actifs</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              className="position-relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="position-relative">
                <img 
                  src="/images/hero-bg.svg" 
                  alt="Fasochain Hero"
                  className="img-fluid rounded-4 shadow-2xl"
                  style={{ 
                    width: '100%',
                    height: '600px',
                    objectFit: 'cover',
                    border: '3px solid rgba(252, 209, 22, 0.3)'
                  }}
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23009E49;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23EF2B2D;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FCD116;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23grad)' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EFasochain%3C/text%3E%3C/svg%3E`;
                  }}
                />
                
                <motion.div
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                  style={{ background: 'linear-gradient(45deg, rgba(0,158,73,0.2), rgba(239,43,45,0.2))' }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
