const router = require('express').Router();
let Categories = require('../models/categories.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
  Categories.find()
    .then(Categories => res.json(Categories))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newCategory = new Categories({name});

  newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

  router.route('/:delete').delete((req, res) => {
    Categories.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
      .then(() => res.json('Categories deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/name').delete((req, res) => { //edw na kanei delete k sta category+id twn articles
    Categories.findOneAndDelete(req.params.name)
      .then(() => res.json('Categories deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


module.exports = router;