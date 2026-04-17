import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from 'react-bootstrap';
import { Shield, Globe, Heart, ArrowRight, Users, TrendingUp } from 'lucide-react';

const CAUSES = [
  { 
    id: 1, 
    title: "Soutien Patriotique", 
    desc: "Aide directe aux forces engagées et aux déplacés internes. Votre contribution soutient directement nos héros sur le terrain et les familles affectées par les crises.", 
    image: "/images/fond_de_soutient_patriotique.jpg",
    stats: "12,458 donateurs",
    amount: "2.5M sats",
    priority: "high",
    progress: 75,
    goal: "3.5M sats"
  },
  { 
    id: 2, 
    title: "Contribution à Faso Meebo", 
    desc: "Financement de projets d'infrastructures communautaires pour le développement durable de nos villages et quartiers.", 
    image: "/images/faso_meebo.jpg",
    stats: "8,234 donateurs", 
    amount: "1.8M sats",
    priority: "medium",
    progress: 60,
    goal: "3M sats"
  },
  { 
    id: 3, 
    title: "Mémorial Thomas Sankara", 
    desc: "Préservation de la mémoire et de l'héritage révolutionnaire pour les générations futures. Education et culture patriotique.", 
    image: "/images/memorial_thomas_sankara.webp",
    stats: "15,789 donateurs",
    amount: "4.2M sats", 
    priority: "high",
    progress: 85,
    goal: "5M sats"
  },
];

const CausesSection = ({ selectedCause, setSelectedCause, onDonationClick }) => {
  const [hoveredCause, setHoveredCause] = useState(null);

  return (
    <section className="py-5" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-4 fw-bold mb-3">
            Nos <span style={{ color: '#009E49' }}>Causes</span> 
            <span style={{ color: '#EF2B2D' }}> Patriotiques</span>
          </h2>
          <p className="lead text-muted">
            Chaque contribution renforce notre souveraineté et notre unité nationale
          </p>
        </motion.div>

        <div className="row g-4">
          {CAUSES.map((cause, index) => (
            <div className="col-lg-4" key={cause.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className={`h-100 border-0 rounded-4 shadow-lg overflow-hidden transition-all ${
                    selectedCause?.id === cause.id ? 'ring-3 ring-success' : ''
                  }`}
                  style={{ 
                    cursor: 'pointer',
                    transform: hoveredCause === cause.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => {
                    setSelectedCause(cause);
                    onDonationClick?.(cause);
                  }}
                  onMouseEnter={() => setHoveredCause(cause.id)}
                  onMouseLeave={() => setHoveredCause(null)}
                >
                  <div className="position-relative">
                    <img 
                      src={cause.image}
                      alt={cause.title}
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                      onError={(e) => {
                        const colors = ['#009E49', '#EF2B2D', '#FCD116'];
                        const color = colors[index % colors.length];
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${color};stop-opacity:0.6' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad${index})' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(cause.title)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    
                    <div className="position-absolute top-0 end-0 m-3">
                      <Badge 
                        bg={cause.priority === 'high' ? 'danger' : 'primary'} 
                        className="px-3 py-2"
                      >
                        {cause.priority === 'high' ? 'Priorité' : 'Important'}
                      </Badge>
                    </div>
                    
                    <motion.div
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{ 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '20px'
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-white">
                        <div className="d-flex align-items-center mb-2">
                          {index === 0 && <Shield className="me-2" size={20} />}
                          {index === 1 && <Globe className="me-2" size={20} />}
                          {index === 2 && <Heart className="me-2" size={20} />}
                          <span className="fw-bold">{cause.stats}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{cause.amount}</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3">{cause.title}</Card.Title>
                    <Card.Text className="text-muted mb-4">{cause.desc}</Card.Text>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Progression</small>
                        <small className="fw-bold">{cause.progress}%</small>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <motion.div
                          className="progress-bar"
                          style={{ 
                            background: 'linear-gradient(90deg, #009E49, #FCD116)',
                            width: hoveredCause === cause.id ? `${cause.progress}%` : '0%'
                          }}
                          animate={{ width: `${cause.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <small className="text-muted">Objectif: {cause.goal}</small>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={selectedCause?.id === cause.id ? "success" : "outline-success"}
                        className="w-100 rounded-pill py-2 fw-bold"
                        style={{
                          background: selectedCause?.id === cause.id 
                            ? 'linear-gradient(45deg, #009E49, #EF2B2D)' 
                            : 'transparent',
                          border: selectedCause?.id === cause.id ? 'none' : '2px solid #009E49'
                        }}
                      >
                        {selectedCause?.id === cause.id ? 'Sélectionné' : 'Sélectionner cette cause'}
                      </Button>
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="d-inline-flex align-items-center gap-4 p-4 rounded-4 shadow-lg" style={{ background: 'white' }}>
            <div className="text-start">
              <h5 className="fw-bold mb-1">Impact Total</h5>
              <p className="text-muted mb-0">Ensemble, nous changeons le Burkina</p>
            </div>
            <div className="vr"></div>
            <div className="d-flex gap-4">
              <div className="text-center">
                <TrendingUp size={30} color="#009E49" />
                <h4 className="fw-bold mb-0">8.5M</h4>
                <small className="text-muted">sats collectés</small>
              </div>
              <div className="text-center">
                <Users size={30} color="#EF2B2D" />
                <h4 className="fw-bold mb-0">36.5K</h4>
                <small className="text-muted">donateurs</small>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CausesSection;
