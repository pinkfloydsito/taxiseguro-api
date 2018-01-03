const httpStatus = require('http-status');
const Route = require('../models/route.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load route and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const route = await Route.get(id);
    req.locals = { route };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get route
 * @public
 */
exports.get = (req, res) => res.json(req.locals.route.transform());

/**
 * Create new route
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const route = new Route(req.body);
    const savedRoute = await route.save();
    res.status(httpStatus.CREATED);
    res.json(savedRoute.transform());
  } catch (error) {
    res.json(error);
  }
};

/**
 * Get routes list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const routes = await Route.list(req.query);
    const transformedRoutes = routes.map(route => route.transform());
    res.json(transformedRoutes);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete route
 * @public
 */
exports.remove = (req, res, next) => {
  const { route } = req.locals;

  route.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};


exports.checkRoute = (req, res, next) => {
  if(!req.query._id) {

  }

  route.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};