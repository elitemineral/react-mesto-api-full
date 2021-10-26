const dataModels = {
  user: 'user',
  card: 'card',
};

const statusCodes = {
  badRequest: 400,
  notAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  duplicateError: 409,
  serverError: 500,
};

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'https://it-limon.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin'],
  credentials: true,
};

module.exports = {
  dataModels,
  statusCodes,
  corsOptions,
};
