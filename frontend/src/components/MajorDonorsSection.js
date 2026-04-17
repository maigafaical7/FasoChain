import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { Trophy, Crown, Star, Heart, TrendingUp, Users, Zap, Award } from 'lucide-react';

const MAJOR_DONORS = [
  {
    id: 1,
    name: "Alpha Technologies",
    avatar: "/images/donor1.svg",
    amount: "500,000 sats",
    rank: "Platinum",
    contributions: 12,
    joined: "Janvier 2024",
    impact: "Financement de 3 puits et 2 écoles",
    badge: "platinum"
  },
  {
    id: 2,
    name: "Collectif Diaspora Europe",
    avatar: "/images/donor2.svg", 
    amount: "350,000 sats",
    rank: "Gold",
    contributions: 8,
    joined: "Février 2024",
    impact: "Soutien à 150 familles déplacées",
    badge: "gold"
  },
  {
    id: 3,
    name: "Entreprise FasoMeebo",
    avatar: "/images/donor3.svg",
    amount: "250,000 sats", 
    rank: "Silver",
    contributions: 15,
    joined: "Mars 2024",
    impact: "Équipement informatique pour 3 centres",
    badge: "silver"
  },
  {
    id: 4,
    name: "Communauté Bitcoin BF",
    avatar: "/images/donor4.svg",
    amount: "180,000 sats",
    rank: "Silver", 
    contributions: 20,
    joined: "Décembre 2023",
    impact: "Formation de 500 jeunes au Bitcoin",
    badge: "silver"
  },
  {
    id: 5,
    name: "Association Patriotes 2024",
    avatar: "/images/donor5.svg",
    amount: "120,000 sats",
    rank: "Bronze",
    contributions: 6,
    joined: "Janvier 2024",
    impact: "Mémorial Thomas Sankara - Phase 1",
    badge: "bronze"
  },
  {
    id: 6,
    name: "Fondation Solidarité",
    avatar: "/images/donor6.svg",
    amount: "95,000 sats",
    rank: "Bronze",
    contributions: 10,
    joined: "Février 2024",
    impact: "Aide médicale d'urgence",
    badge: "bronze"
  }
];

const RANKS = {
  platinum: { icon: <Trophy size={20} />, color: '#E5E4E2', bg: 'linear-gradient(45deg, #E5E4E2, #C0C0C0)' },
  gold: { icon: <Crown size={20} />, color: '#FFD700', bg: 'linear-gradient(45deg, #FFD700, #FFA500)' },
  silver: { icon: <Star size={20} />, color: '#C0C0C0', bg: 'linear-gradient(45deg, #C0C0C0, #808080)' },
  bronze: { icon: <Award size={20} />, color: '#CD7F32', bg: 'linear-gradient(45deg, #CD7F32, #8B4513)' }
};

const MajorDonorsSection = () => {
  const [selectedRank, setSelectedRank] = useState('all');

  const filteredDonors = selectedRank === 'all' 
    ? MAJOR_DONORS 
    : MAJOR_DONORS.filter(donor => donor.badge === selectedRank);

  const totalAmount = MAJOR_DONORS.reduce((sum, donor) => 
    sum + parseInt(donor.amount.replace(/[^0-9]/g, '')), 0
  );

  return (
    <section className="py-5" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(45deg, #FFD700, #FFA500)' 
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          >
            <Trophy size={30} color="white" fill="white" />
          </motion.div>
          
          <h2 className="display-4 fw-bold mb-3 text-white">
            Dons <span style={{ color: '#FFD700' }}>Majeurs</span>
          </h2>
          <p className="lead text-white-50">
            Nos partenaires stratégiques qui transforment le Burkina Faso
          </p>
        </motion.div>

        {/* Statistics Overview */}
        <motion.div
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Trophy size={40} color="#FFD700" className="mb-3" />
              <h3 className="text-white fw-bold mb-1">{MAJOR_DONORS.length}</h3>
              <p className="text-white-50 mb-0">Donateurs Majeurs</p>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <TrendingUp size={40} color="#009E49" className="mb-3" />
              <h3 className="text-white fw-bold mb-1">{totalAmount.toLocaleString()} sats</h3>
              <p className="text-white-50 mb-0">Total Collecté</p>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Heart size={40} color="#EF2B2D" className="mb-3" />
              <h3 className="text-white fw-bold mb-1">{MAJOR_DONORS.reduce((sum, d) => sum + d.contributions, 0)}</h3>
              <p className="text-white-50 mb-0">Contributions Totales</p>
            </Card>
          </div>
        </motion.div>

        {/* Rank Filter */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="d-inline-flex gap-2 p-2 rounded-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            {[
              { key: 'all', label: 'Tous', color: '#6c757d' },
              { key: 'platinum', label: 'Platinum', ...RANKS.platinum },
              { key: 'gold', label: 'Gold', ...RANKS.gold },
              { key: 'silver', label: 'Silver', ...RANKS.silver },
              { key: 'bronze', label: 'Bronze', ...RANKS.bronze }
            ].map((rank) => (
              <motion.button
                key={rank.key}
                className={`btn rounded-pill px-3 py-2 fw-bold text-white ${
                  selectedRank === rank.key ? 'text-white' : ''
                }`}
                style={{
                  background: selectedRank === rank.key ? rank.bg : 'rgba(255,255,255,0.1)',
                  border: selectedRank === rank.key ? 'none' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => setSelectedRank(rank.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {rank.icon}
                <span className="ms-1">{rank.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Donors Grid */}
        <div className="row g-4">
          {filteredDonors.map((donor, index) => (
            <div className="col-lg-4 col-md-6" key={donor.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-100 border-0 rounded-4 shadow-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.95)' }}>
                  <div className="position-relative">
                    <div className="p-4 text-center" style={{ background: RANKS[donor.badge].bg }}>
                      <div className="position-relative d-inline-block">
                        <img 
                          src={donor.avatar}
                          alt={donor.name}
                          className="rounded-circle mb-3"
                          style={{ 
                            width: '80px', 
                            height: '80px', 
                            objectFit: 'cover',
                            border: '4px solid white'
                          }}
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${RANKS[donor.badge].color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${RANKS[donor.badge].color};stop-opacity:0.6' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='40' cy='40' r='40' fill='url(%23grad${index})' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${donor.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <div className="position-absolute top-0 end-0">
                          <Badge bg="white" text="dark" className="rounded-circle p-2">
                            {RANKS[donor.badge].icon}
                          </Badge>
                        </div>
                      </div>
                      
                      <h5 className="fw-bold mb-1">{donor.name}</h5>
                      <Badge bg={donor.badge === 'platinum' ? 'dark' : donor.badge === 'gold' ? 'warning' : donor.badge === 'silver' ? 'secondary' : 'info'} className="mb-3">
                        {donor.rank}
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <div className="text-center mb-4">
                      <h3 className="fw-bold mb-1" style={{ color: '#009E49' }}>
                        {donor.amount}
                      </h3>
                      <p className="text-muted small mb-3">Total des dons</p>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Contributions</small>
                        <small className="fw-bold">{donor.contributions}</small>
                      </div>
                      <ProgressBar 
                        variant="success" 
                        now={(donor.contributions / 20) * 100} 
                        style={{ height: '8px' }}
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-muted small mb-2">
                        <strong>Impact:</strong> {donor.impact}
                      </p>
                      <p className="text-muted small mb-0">
                        <strong>Membre depuis:</strong> {donor.joined}
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline-success" 
                        className="w-100 rounded-pill py-2 fw-bold"
                        style={{ borderColor: '#009E49', color: '#009E49' }}
                      >
                        Voir le profil complet
                      </Button>
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-0 rounded-4 p-5" style={{ background: 'linear-gradient(135deg, rgba(0,158,73,0.1), rgba(239,43,45,0.1))' }}>
            <Zap size={50} color="#FCD116" className="mb-3" />
            <h3 className="text-white fw-bold mb-3">Devenez Donateur Majeur</h3>
            <p className="text-white-50 mb-4">
              Rejoignez l'élite des patriotes qui transforment le Burkina Faso. 
              Votre contribution majeure crée un impact durable.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="warning" 
                className="rounded-pill px-5 py-3 fw-bold"
                style={{ background: 'linear-gradient(45deg, #FCD116, #FFA500)', border: 'none' }}
              >
                <Crown className="me-2" size={20} />
                Devenir Partenaire Premium
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default MajorDonorsSection;
