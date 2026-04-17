import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from 'react-bootstrap';
import { Calendar, Clock, ArrowRight, TrendingUp, Heart, Shield } from 'lucide-react';

const NEWS = [
  {
    id: 1,
    title: "Lancement du Programme Faso Meebo 2024",
    excerpt: "Le gouvernement annonce un investissement record de 10 milliards de sats pour les infrastructures communautaires dans les 13 régions.",
    image: "/images/lancement_programme_faso_meebo.jpg",
    date: "15 Avril 2024",
    category: "Actualité",
    readTime: "5 min",
    featured: true,
    author: "Ministère de la Solidarité"
  },
  {
    id: 2,
    title: "Record de Solidarité: 5M Sats Collectés en 48h",
    excerpt: "La communauté Fasochain bat un nouveau record avec une mobilisation exceptionnelle pour soutenir les déplacés internes.",
    image: "/images/news2.svg",
    date: "12 Avril 2024", 
    category: "Succès",
    readTime: "3 min",
    featured: false,
    author: "Équipe Fasochain"
  },
  {
    id: 3,
    title: "Inauguration du Centre Technologique de Ouagadougou",
    excerpt: "Premier centre financé entièrement par la communauté Bitcoin Lightning, offrant des formations gratuites aux jeunes.",
    image: "/images/news3.svg",
    date: "8 Avril 2024",
    category: "Projet",
    readTime: "7 min", 
    featured: false,
    author: "Direction des Projets"
  },
  {
    id: 4,
    title: "Partenariat Stratégique avec l'Université de Ouagadougou",
    excerpt: "Formation de 1000 étudiants à la technologie blockchain pour renforcer la souveraineté numérique nationale.",
    image: "/images/news4.svg",
    date: "5 Avril 2024",
    category: "Éducation",
    readTime: "4 min",
    featured: false,
    author: "Partenariats"
  },
  {
    id: 5,
    title: "Hommage aux Héros: Cérémonie du Mémorial Sankara",
    excerpt: "Plus de 10,000 patriotes ont rendu hommage à Thomas Sankara lors de la cérémonie annuelle du mémorial.",
    image: "/images/news5.svg",
    date: "1 Avril 2024",
    category: "Culture",
    readTime: "6 min",
    featured: false,
    author: "Comité du Mémorial"
  },
  {
    id: 6,
    title: "Lancement du Programme d'Urgence Nord",
    excerpt: "Déploiement immédiat de 2M sats pour les populations affectées par la crise sécuritaire dans les régions du nord.",
    image: "/images/news6.svg",
    date: "28 Mars 2024",
    category: "Urgence",
    readTime: "4 min",
    featured: false,
    author: "Cellule de Crise"
  }
];

const NewsSection = () => {
  const featuredNews = NEWS.find(news => news.featured);
  const regularNews = NEWS.filter(news => !news.featured);

  const getCategoryColor = (category) => {
    const colors = {
      'Actualité': 'primary',
      'Succès': 'success',
      'Projet': 'info',
      'Éducation': 'warning',
      'Culture': 'danger',
      'Urgence': 'dark'
    };
    return colors[category] || 'secondary';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Succès': return <TrendingUp size={16} />;
      case 'Urgence': return <Shield size={16} />;
      case 'Culture': return <Heart size={16} />;
      default: return null;
    }
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
          <h2 className="display-4 fw-bold mb-3">
            Actualités <span style={{ color: '#009E49' }}>Fasochain</span>
          </h2>
          <p className="lead text-muted">
            Restez informé des dernières nouvelles de notre révolution solidaire
          </p>
        </motion.div>

        {/* Featured Article */}
        {featuredNews && (
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="row g-0">
                <div className="col-lg-6">
                  <img 
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover', minHeight: '400px' }}
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23009E49;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23EF2B2D;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad)' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(featuredNews.title)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <Card.Body className="p-4 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Badge bg={getCategoryColor(featuredNews.category)} className="px-3 py-2">
                        {getCategoryIcon(featuredNews.category)}
                        <span className="ms-1">{featuredNews.category}</span>
                      </Badge>
                      <Badge bg="warning" text="dark" className="px-3 py-2">
                        À la une
                      </Badge>
                    </div>
                    
                    <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                      {featuredNews.title}
                    </Card.Title>
                    
                    <Card.Text className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                      {featuredNews.excerpt}
                    </Card.Text>
                    
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <div className="d-flex align-items-center">
                          <Calendar size={16} className="me-1" />
                          {featuredNews.date}
                        </div>
                        <div className="d-flex align-items-center">
                          <Clock size={16} className="me-1" />
                          {featuredNews.readTime}
                        </div>
                      </div>
                      <div className="text-muted small">
                        Par {featuredNews.author}
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline-success" 
                        className="rounded-pill px-4 py-2 fw-bold"
                        style={{ borderColor: '#009E49', color: '#009E49' }}
                      >
                        Lire l'article complet
                        <ArrowRight className="ms-2" size={18} />
                      </Button>
                    </motion.div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Regular News Grid */}
        <div className="row g-4">
          {regularNews.map((news, index) => (
            <div className="col-lg-4 col-md-6" key={news.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 rounded-4 shadow-sm overflow-hidden transition-all">
                  <div className="position-relative">
                    <img 
                      src={news.image}
                      alt={news.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        const colors = ['#009E49', '#EF2B2D', '#FCD116', '#6c757d'];
                        const color = colors[index % colors.length];
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${color};stop-opacity:0.6' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='200' fill='url(%23grad${index})' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(news.title)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    
                    <div className="position-absolute top-0 end-0 m-3">
                      <Badge bg={getCategoryColor(news.category)} className="px-2 py-1">
                        {getCategoryIcon(news.category)}
                        <span className="ms-1">{news.category}</span>
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>
                      {news.title}
                    </Card.Title>
                    
                    <Card.Text className="text-muted mb-3 small">
                      {news.excerpt}
                    </Card.Text>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Calendar size={14} />
                        {news.date}
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Clock size={14} />
                        {news.readTime}
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="link" 
                        className="p-0 fw-bold text-decoration-none"
                        style={{ color: '#009E49' }}
                      >
                        Lire plus
                        <ArrowRight size={16} className="ms-1" />
                      </Button>
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline-success" 
              className="rounded-pill px-5 py-3 fw-bold"
              style={{ borderColor: '#009E49', color: '#009E49' }}
            >
              Voir toutes les actualités
              <ArrowRight className="ms-2" size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
