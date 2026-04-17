import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Form, InputGroup, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { Shield, Zap, Copy, CheckCircle, Award, ArrowRight, X, Loader2, Heart, TrendingUp, Users, Globe } from 'lucide-react';

const COLORS = {
  green: "#009E49",
  red: "#EF2B2D", 
  yellow: "#FCD116",
  dark: "#1a1a1a",
  light: "#f8f9fa",
  gradient: "linear-gradient(135deg, #009E49 0%, #EF2B2D 50%, #FCD116 100%)"
};

const CAUSES = [
  { 
    id: 1, 
    title: "Soutien Patriotique", 
    desc: "Aide directe aux forces engagées et aux déplacés internes", 
    priority: "high",
    icon: <Shield size={24} />,
    color: "#009E49",
    image: "/images/fond_de_soutient_patriotique.jpg"
  },
  { 
    id: 2, 
    title: "Contribution à Faso Meebo", 
    desc: "Financement de projets d'infrastructures communautaires", 
    priority: "medium",
    icon: <TrendingUp size={24} />,
    color: "#FCD116",
    image: "/images/faso_meebo.jpg"
  },
  { 
    id: 3, 
    title: "Mémorial Thomas Sankara", 
    desc: "Préservation de la mémoire et de l'héritage révolutionnaire", 
    priority: "high",
    icon: <Heart size={24} />,
    color: "#EF2B2D",
    image: "/images/memorial_thomas_sankara.webp"
  }
];

const PRESET_AMOUNTS = [100, 500, 1000, 5000, 10000, 50000];

const SinglePageDonationFlow = ({ onClose, onDonationComplete, preselectedCause }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(1000);
  const [selectedCause, setSelectedCause] = useState(CAUSES[0]);
  const [invoice, setInvoice] = useState("");
  const [invoiceHash, setInvoiceHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const amountInputRef = useRef(null);

  // Effet pour utiliser la cause pré-sélectionnée si elle est fournie
  useEffect(() => {
    if (preselectedCause) {
      const matchingCause = CAUSES.find(cause => cause.id === preselectedCause.id);
      if (matchingCause) {
        setSelectedCause(matchingCause);
      }
    }
  }, [preselectedCause]);

  // Effet pour nettoyer les erreurs
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Effet pour réinitialiser la progression
  useEffect(() => {
    if (!loading) {
      setPaymentProgress(0);
    }
  }, [loading]);

  const handleAmountChange = (value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 10 && numValue <= 1000000) {
      setAmount(numValue);
    }
  };

  const handlePresetAmount = (presetAmount) => {
    setAmount(presetAmount);
    // Focus sur l'input après sélection
    if (amountInputRef.current) {
      amountInputRef.current.focus();
      amountInputRef.current.select();
    }
  };

  
  const generateInvoice = async () => {
    if (amount < 10) {
      setError("Le montant minimum est de 10 sats");
      return;
    }

    // Empêcher la double génération
    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);
    setPaymentProgress(0);

    try {
      // Simulation de progression
      const progressInterval = setInterval(() => {
        setPaymentProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const requestBody = {
        sats: parseInt(amount),
        description: `Don Fasochain - ${selectedCause.title}`
      };

      const response = await fetch('http://localhost:5003/api/invoice', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      clearInterval(progressInterval);
      setPaymentProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        
        // Message d'erreur plus clair pour l'utilisateur
        if (response.status === 0) {
          throw new Error("Impossible de se connecter au serveur. Vérifiez que le backend est démarré.");
        } else if (response.status === 400) {
          throw new Error("Données invalides. Vérifiez le montant saisi.");
        } else if (response.status === 500) {
          throw new Error("Erreur serveur. Veuillez réessayer dans quelques instants.");
        } else {
          throw new Error(`Erreur ${response.status}: ${errorText}`);
        }
      }
      
      const data = await response.json();
      
      if (!data.payment) {
        throw new Error("Le serveur n'a pas retourné d'adresse de paiement.");
      }
      
      setInvoice(data.payment);
      
      // Extraire le hash de l'adresse Lightning
      try {
        // Le hash est généralement dans les premiers caractères de l'invoice
        const hashMatch = data.payment.match(/lnbc1[a-z0-9]{50,}/i);
        if (hashMatch) {
          const fullInvoice = hashMatch[0];
          // Prendre les 64 premiers caractères comme hash visible
          const visibleHash = fullInvoice.substring(0, 64);
          setInvoiceHash(visibleHash);
        } else {
          // Alternative: utiliser les premiers 64 caractères de l'invoice
          setInvoiceHash(data.payment.substring(0, 64));
        }
      } catch (hashError) {
        setInvoiceHash(data.payment.substring(0, 64));
      }
      
      setStep(2);
    } catch (err) {
      setError("Impossible de générer la facture. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setTimeout(() => setPaymentProgress(0), 1000);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(invoice);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      setError("Impossible de copier le code");
    }
  };

  const copyHashToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(invoiceHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 3000);
    } catch (err) {
      setError("Impossible de copier le hash");
    }
  };

  const finalizePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
      setShowSuccess(true);
      onDonationComplete?.(amount, selectedCause);
    }, 2000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-100"
        style={{ maxWidth: '1200px', maxHeight: '90vh', overflow: 'hidden' }}
      >
        <Card className="border-0 shadow-lg" style={{ height: '90vh', borderRadius: '20px' }}>
          {/* Header */}
          <div className="position-relative p-4 border-bottom" style={{ background: COLORS.gradient, borderRadius: '20px 20px 0 0' }}>
            <Button
              variant="link"
              className="position-absolute top-0 end-0 m-3 text-white"
              onClick={onClose}
              style={{ zIndex: 10 }}
            >
              <X size={24} />
            </Button>
            
            <div className="text-center text-white">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="d-inline-block mb-3"
              >
                <Zap size={60} />
              </motion.div>
              <h1 className="display-5 fw-bold mb-2">Fasochain</h1>
              <p className="lead mb-0">Système de Dons Lightning</p>
            </div>

            {/* Progress Indicator */}
            <div className="d-flex justify-content-center mt-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="d-flex align-items-center">
                  <motion.div
                    className={`rounded-circle d-flex align-items-center justify-content-center ${
                      step >= stepNumber ? 'bg-white text-success' : 'bg-white bg-opacity-30 text-white'
                    }`}
                    style={{ width: '40px', height: '40px' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
                  </motion.div>
                  {stepNumber < 3 && (
                    <motion.div
                      className="mx-2"
                      style={{ 
                        width: '60px', 
                        height: '2px',
                        background: step > stepNumber ? 'white' : 'rgba(255,255,255,0.3)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4" style={{ height: 'calc(90vh - 200px)', overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="fw-bold mb-4">Choisissez votre cause</h3>
                  
                  {/* Causes Selection */}
                  <div className="row g-3 mb-4">
                    {CAUSES.map((cause, index) => (
                      <div className="col-md-4" key={cause.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`h-100 border-2 rounded-4 shadow-sm cursor-pointer ${
                              selectedCause.id === cause.id ? 'border-success shadow-lg' : 'border-light'
                            }`}
                            onClick={() => setSelectedCause(cause)}
                            style={{ 
                              background: selectedCause.id === cause.id 
                                ? `linear-gradient(135deg, rgba(${cause.color === '#009E49' ? '0,158,73' : cause.color === '#FCD116' ? '252,209,22' : '239,43,45'},0.1), rgba(0,0,0,0.05))` 
                                : 'white'
                            }}
                          >
                            <Card.Body className="text-center p-3">
                              <div className="mb-2">
                                <img 
                                  src={cause.image} 
                                  alt={cause.title}
                                  className="img-fluid rounded-circle mb-2"
                                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              </div>
                              <Card.Title className="fw-bold small">{cause.title}</Card.Title>
                              <Card.Text className="text-muted small">{cause.desc}</Card.Text>
                              <Badge bg={cause.priority === 'high' ? 'danger' : 'primary'} className="mt-2">
                                {cause.priority === 'high' ? 'Priorité' : 'Important'}
                              </Badge>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Amount Selection */}
                  <h4 className="fw-bold mb-3">Montant du don</h4>
                  
                  {/* Preset Amounts */}
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-2">
                      {PRESET_AMOUNTS.map((presetAmount) => (
                        <motion.button
                          key={presetAmount}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`btn btn-outline-success rounded-pill ${
                            amount === presetAmount ? 'btn-success' : ''
                          }`}
                          style={{ fontSize: '0.8rem', minWidth: '80px' }}
                          onClick={() => handlePresetAmount(presetAmount)}
                        >
                          {presetAmount >= 1000 ? `${presetAmount/1000}k` : presetAmount} sats
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Input */}
                  <InputGroup size="lg" className="mb-4">
                    <InputGroup.Text className="bg-white border-end-0">
                      <Zap size={20} color={COLORS.yellow} fill={COLORS.yellow}/>
                    </InputGroup.Text>
                    <Form.Control
                      ref={amountInputRef}
                      type="number"
                      min="10"
                      max="1000000"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="border-start-0 ps-0 fw-bold"
                      placeholder="1000"
                    />
                    <InputGroup.Text className="bg-white border-start-0">sats</InputGroup.Text>
                  </InputGroup>
                  
                  <Form.Text className="text-muted small mb-4 d-block">
                    Minimum 10 sats pour soutenir l'effort national
                  </Form.Text>

                  {/* Loading Progress */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-3"
                    >
                      <ProgressBar now={paymentProgress} variant="success" className="mb-2" />
                      <p className="text-center small text-muted">
                        {paymentProgress < 90 ? 'Génération de la facture...' : 'Finalisation...'}
                      </p>
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert variant="danger" className="mb-3 small">
                        <X className="me-2" size={16} />
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-center">
                    <Button
                      variant="success"
                      size="lg"
                      className="rounded-pill px-5 py-3 fw-bold shadow-sm"
                      disabled={loading || amount < 10}
                      onClick={generateInvoice}
                      style={{ backgroundColor: COLORS.green, border: 'none' }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin me-2" size={20} />
                          Génération...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="me-2" size={20} />
                          Générer la facture
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="fw-bold mb-4">Facture Lightning générée</h3>
                  
                  <div className="bg-light p-4 rounded-3 mb-4">
                    <p className="text-muted small mb-2 text-uppercase fw-bold">Facture Lightning (BOLT11)</p>
                    
                    {/* Hash de l'adresse Lightning */}
                    <div className="mb-3">
                      <p className="text-muted small mb-1">Hash de l'adresse:</p>
                      <div className="d-flex align-items-center gap-2">
                        <code className="flex-grow-1 p-2 bg-white rounded border small" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {invoiceHash}
                        </code>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant={copiedHash ? "success" : "outline-primary"}
                            size="sm"
                            onClick={copyHashToClipboard}
                          >
                            {copiedHash ? (
                              <>
                                <CheckCircle size={14} className="me-1"/>
                                Copié
                              </>
                            ) : (
                              <>
                                <Copy size={14} className="me-1"/>
                                Hash
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Code complet de la facture */}
                    <div className="mb-3">
                      <p className="text-muted small mb-1">Code complet:</p>
                      <code className="d-block p-3 bg-white rounded border text-break small" style={{ maxHeight: '120px', overflowY: 'auto', fontFamily: 'monospace' }}>
                        {invoice}
                      </code>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={copied ? "success" : "outline-dark"}
                        className="rounded-pill px-4"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <>
                            <CheckCircle size={18} className="me-2"/>
                            Code copié !
                          </>
                        ) : (
                          <>
                            <Copy size={18} className="me-2"/>
                            Copier le code complet
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setStep(1)}
                      >
                        <ArrowRight size={16} className="me-1 rotate-180" />
                        Retour
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="danger"
                        size="lg"
                        className="rounded-pill fw-bold shadow"
                        onClick={finalizePayment}
                        disabled={isProcessing}
                        style={{ backgroundColor: COLORS.red, border: 'none' }}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="animate-spin me-2" size={20} />
                            Vérification...
                          </>
                        ) : (
                          "J'ai effectué le paiement"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Award size={80} color={COLORS.yellow} className="mb-3" />
                    </motion.div>
                    <h1 className="fw-bold display-5">Merci, Patriote !</h1>
                    <p className="lead">Votre contribution renforce l'unité et la souveraineté du Faso.</p>
                  </div>

                  <Card className="border-0 shadow-lg mx-auto mb-4 overflow-hidden" style={{ maxWidth: '400px', borderRadius: '20px' }}>
                    <div style={{ height: '6px', backgroundColor: COLORS.green }}></div>
                    <Card.Body className="p-4 position-relative">
                      <div className="position-absolute top-0 end-0 p-3 opacity-10">
                        <Heart size={80} fill={COLORS.red} />
                      </div>
                      <Badge bg="warning" text="dark" className="mb-3 px-3 py-2 rounded-pill">CERTIFICAT DE DONATEUR</Badge>
                      <h4 className="fw-bold mb-3">Fasochain Solidaire</h4>
                      <div className="text-start mb-3">
                        <div className="mb-2">
                          <small className="text-muted">Cause soutenue :</small>
                          <div className="d-flex align-items-center mt-1">
                            <span style={{ color: selectedCause.color, marginRight: '8px' }}>
                              {selectedCause.icon}
                            </span>
                            <strong>{selectedCause.title}</strong>
                          </div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Montant versé :</small>
                          <div className="d-flex align-items-center">
                            <Zap size={16} color={COLORS.yellow} className="me-2" />
                            <strong className="fs-5 text-success">{amount.toLocaleString()} Satoshis</strong>
                          </div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Date :</small>
                          <div><strong>{new Date().toLocaleDateString('fr-FR')}</strong></div>
                        </div>
                      </div>
                      <div className="border-top pt-2 d-flex justify-content-between align-items-center">
                        <span className="small text-muted">ID: #LN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        <CheckCircle color={COLORS.green} fill={`${COLORS.green}20`} size={30} />
                      </div>
                    </Card.Body>
                    <div style={{ height: '6px', backgroundColor: COLORS.green }}></div>
                  </Card>

                  <div className="d-flex gap-3 justify-content-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="success" 
                        className="rounded-pill px-4 py-2 fw-bold"
                        style={{ background: 'linear-gradient(45deg, #009E49, #EF2B2D)', border: 'none' }}
                        onClick={() => {
                          setStep(1);
                          setAmount(1000);
                          setInvoice("");
                          setCopied(false);
                        }}
                      >
                        <Heart className="me-2" size={16} />
                        Nouveau don
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline-secondary" className="rounded-pill px-4" onClick={onClose}>
                        Retour au site
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SinglePageDonationFlow;
