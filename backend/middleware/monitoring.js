// backend/middleware/monitoring.js
const promClient = require('prom-client');

// Créer un registre pour les métriques
const register = new promClient.Registry();

// Ajouter des métriques par défaut
promClient.collectDefaultMetrics({ register });

// Créer des métriques personnalisées
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});

const totalHttpRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route']
});

// Middleware pour collecter les métriques
const monitoringMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Enregistrer la durée de la requête
    httpRequestDurationMicroseconds
      .labels(req.method, req.route.path, res.statusCode)
      .observe(duration);
    
    // Incrémenter le compteur de requêtes
    totalHttpRequests
      .labels(req.method, req.route.path)
      .inc();
  });
  
  next();
};

// Endpoint pour exposer les métriques
const metricsEndpoint = (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
};

module.exports = {
  monitoringMiddleware,
  metricsEndpoint,
  register
};