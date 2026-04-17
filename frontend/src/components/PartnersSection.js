import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from 'react-bootstrap';
import { Globe, Building, Users, Award, Star, CheckCircle, Heart } from 'lucide-react';

const PARTNERS = [
  {
    id: 1,
    name: "Banque Nationale du Burkina",
    logo: "/images/partner1.svg",
    category: "Finance",
    description: "Partenaire stratégique pour la transformation numérique et l'inclusion financière.",
    website: "https://bnb.bf",
    since: "2023",
    level: "Strategic",
    services: ["Traitement des transactions", "Support technique", "Formation"],
    verified: true
  },
  {
    id: 2,
    name: "Université de Ouagadougou",
    logo: "/images/partner2.svg",
    category: "Éducation",
    description: "Formation des jeunes talents à la blockchain et aux technologies de demain.",
    website: "https://univ-ouaga.bf",
    since: "2024",
    level: "Academic",
    services: ["Recherche", "Formation", "Développement"],
    verified: true
  },
  {
    id: 3,
    name: "Ministère de la Solidarité",
    logo: "/images/partner3.svg",
    category: "Gouvernement",
    description: "Coordination des programmes d'aide et de solidarité nationale.",
    website: "https://solidarite.gov.bf",
    since: "2023",
    level: "Government",
    services: ["Coordination", "Mise en oeuvre", "Suivi"],
    verified: true
  },
  {
    id: 4,
    name: "Collectif Diaspora Europe",
    logo: "/images/partner4.svg",
    category: "Communauté",
    description: "Mobilisation de la diaspora pour le développement du Burkina Faso.",
    website: "#",
    since: "2024",
    level: "Community",
    services: ["Mobilisation", "Transferts", "Expertise"],
    verified: false
  },
  {
    id: 5,
    name: "Société Nationale d'Électricité",
    logo: "/images/partner5.svg",
    category: "Énergie",
    description: "Support infrastructurel pour les projets communautaires.",
    website: "https://sonabel.bf",
    since: "2024",
    level: "Infrastructure",
    services: ["Énergie", "Maintenance", "Développement"],
    verified: true
  },
  {
    id: 6,
    name: "Association des Femmes Entrepreneurs",
    logo: "/images/partner6.svg",
    category: "Social",
    description: "Autonomisation économique des femmes à travers la technologie.",
    website: "#",
    since: "2024",
    level: "Social",
    services: ["Formation", "Accompagnement", "Financement"],
    verified: false
  },
  {
    id: 7,
    name: "Chambre de Commerce et d'Industrie",
    logo: "/images/partner7.svg",
    category: "Business",
    description: "Facilitation des partenariats entre entreprises et projets sociaux.",
    website: "https://ccibf.bf",
    since: "2023",
    level: "Business",
    services: ["Mise en relation", "Conseil", "Support"],
    verified: true
  },
  {
    id: 8,
    name: "Fondation Thomas Sankara",
    logo: "/images/partner8.svg",
    category: "Culture",
    description: "Préservation de l'héritage révolutionnaire et éducation patriotique.",
    website: "#",
    since: "2023",
    level: "Cultural",
    services: ["Éducation", "Culture", "Mémoire"],
    verified: true
  }
];

const CATEGORIES = {
  "Finance": { icon: <Globe size={20} />, color: "#009E49" },
  "Éducation": { icon: <Award size={20} />, color: "#FCD116" },
  "Gouvernement": { icon: <Building size={20} />, color: "#EF2B2D" },
  "Communauté": { icon: <Users size={20} />, color: "#6c757d" },
  "Énergie": { icon: <Star size={20} />, color: "#17a2b8" },
  "Social": { icon: <Heart size={20} />, color: "#e83e8c" },
  "Business": { icon: <Building size={20} />, color: "#343a40" },
  "Culture": { icon: <Star size={20} />, color: "#fd7e14" }
};

const PartnersSection = () => {
  const getCategoryColor = (category) => {
    return CATEGORIES[category]?.color || "#6c757d";
  };

  const getLevelColor = (level) => {
    const colors = {
      "Strategic": "danger",
      "Government": "warning", 
      "Academic": "info",
      "Infrastructure": "primary",
      "Business": "dark",
      "Community": "secondary",
      "Social": "success",
      "Cultural": "warning"
    };
    return colors[level] || "secondary";
  };

  return (
    <section className="py-5" style={{ background: 'white' }}>
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
              background: 'linear-gradient(45deg, #009E49, #EF2B2D)' 
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          >
            <Users size={30} color="white" fill="white" />
          </motion.div>
          
          <h2 className="display-4 fw-bold mb-3">
            Nos <span style={{ color: '#009E49' }}>Partenaires</span> 
            <span style={{ color: '#EF2B2D' }}> Stratégiques</span>
          </h2>
          <p className="lead text-muted">
            Ensemble pour construire un Burkina Faso souverain et prospère
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="col-md-3">
            <Card className="border-0 rounded-4 text-center p-4 shadow-sm">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '50px', height: '50px', background: 'rgba(0,158,73,0.1)' }}>
                <Building size={25} color="#009E49" />
              </div>
              <h3 className="fw-bold mb-1">{PARTNERS.length}</h3>
              <p className="text-muted mb-0">Partenaires Actifs</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 rounded-4 text-center p-4 shadow-sm">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '50px', height: '50px', background: 'rgba(239,43,45,0.1)' }}>
                <Users size={25} color="#EF2B2D" />
              </div>
              <h3 className="fw-bold mb-1">8</h3>
              <p className="text-muted mb-0">Secteurs Couverts</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 rounded-4 text-center p-4 shadow-sm">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '50px', height: '50px', background: 'rgba(252,209,22,0.1)' }}>
                <Award size={25} color="#FCD116" />
              </div>
              <h3 className="fw-bold mb-1">2023</h3>
              <p className="text-muted mb-0">Début du Programme</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 rounded-4 text-center p-4 shadow-sm">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '50px', height: '50px', background: 'rgba(108,117,125,0.1)' }}>
                <Globe size={25} color="#6c757d" />
              </div>
              <h3 className="fw-bold mb-1">15+</h3>
              <p className="text-muted mb-0">Projets Réalisés</p>
            </Card>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="row g-4">
          {PARTNERS.map((partner, index) => (
            <div className="col-lg-3 col-md-6" key={partner.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-100 border-0 rounded-4 shadow-sm overflow-hidden transition-all">
                  <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
                    <div className="position-relative d-inline-block mb-3">
                      <img 
                        src={partner.logo}
                        alt={partner.name}
                        className="rounded-3"
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover',
                          border: '3px solid white',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                          const color = getCategoryColor(partner.category);
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${color};stop-opacity:0.6' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='15' fill='url(%23grad${index})' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(partner.name.charAt(0))}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      {partner.verified && (
                        <div className="position-absolute top-0 end-0">
                          <CheckCircle size={20} color="#009E49" fill="#009E49" className="bg-white rounded-circle" />
                        </div>
                      )}
                    </div>
                    
                    <h6 className="fw-bold mb-2">{partner.name}</h6>
                    <div className="d-flex justify-content-center gap-2 mb-2">
                      <Badge bg={getLevelColor(partner.level)} className="px-2 py-1">
                        {partner.level}
                      </Badge>
                      <Badge bg="light" text="dark" className="px-2 py-1">
                        {CATEGORIES[partner.category].icon}
                        <span className="ms-1">{partner.category}</span>
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <p className="text-muted small mb-3">
                      {partner.description}
                    </p>
                    
                    <div className="mb-3">
                      <p className="text-muted small mb-1">
                        <strong>Services:</strong>
                      </p>
                      <div className="d-flex flex-wrap gap-1">
                        {partner.services.slice(0, 2).map((service, i) => (
                          <Badge key={i} bg="light" text="dark" className="px-2 py-1" style={{ fontSize: '0.7rem' }}>
                            {service}
                          </Badge>
                        ))}
                        {partner.services.length > 2 && (
                          <Badge bg="secondary" className="px-2 py-1" style={{ fontSize: '0.7rem' }}>
                            +{partner.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <small className="text-muted">
                        <strong>Depuis:</strong> {partner.since}
                      </small>
                      {partner.verified && (
                        <CheckCircle size={16} color="#009E49" />
                      )}
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline-success" 
                        className="w-100 rounded-pill py-2 fw-bold"
                        style={{ borderColor: '#009E49', color: '#009E49', fontSize: '0.9rem' }}
                        disabled={partner.website === "#"}
                      >
                        {partner.website === "#" ? "Contact privé" : "Visiter le site"}
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
          <Card className="border-0 rounded-4 p-5 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(0,158,73,0.05), rgba(239,43,45,0.05))' }}>
            <Users size={50} color="#009E49" className="mb-3" />
            <h3 className="fw-bold mb-3">Devenez Partenaire Fasochain</h3>
            <p className="text-muted mb-4">
              Rejoignez notre écosystème de partenaires engagés pour la transformation du Burkina Faso. 
              Ensemble, nous créons un impact durable.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="success" 
                  className="rounded-pill px-4 py-3 fw-bold"
                  style={{ background: 'linear-gradient(45deg, #009E49, #EF2B2D)', border: 'none' }}
                >
                  <Building className="me-2" size={20} />
                  Devenir Partenaire
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline-secondary" 
                  className="rounded-pill px-4 py-3 fw-bold"
                >
                  <Globe className="me-2" size={20} />
                  En savoir plus
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
