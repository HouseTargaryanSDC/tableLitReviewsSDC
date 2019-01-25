const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/reviews/all/:restaurantId')
  .get(controller.all.get)
  .post(controller.all.post);

router
  .route('/reviews/summary/:restaurantId')
  .get(controller.summary.get);

router
  .route('/reviews/filters/:restaurantId');

router
  .route('/reviews/update')
  .put(controller.review.put);

router
  .route('/reviews/delete')
  .delete(controller.review.delete);

module.exports = router;
