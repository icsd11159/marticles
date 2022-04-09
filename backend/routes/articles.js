const router = require('express').Router();
let Articles = require('../models/articles.model');

router.route('/').get((req, res) => {
  Articles.find()
    .then(Articles => res.json(Articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const category_id = Object.parse(req.body.category_id);

  const newArticles = new Articles({
    title,
    description,
    content,
    category_id,
  });

  newArticles.save()
  .then(() => res.json('Articles added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:getall').get((req, res) => {
    //if req.content
    Articles.findById(req.params.id)
      .then(Articles => res.json(Articles))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:getbycategory').get((req, res) => {
    //if req.content
    Articles.findById(req.params.category_id)
      .then(Articles => res.json(Articles))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/:id').get((req, res) => {
  Articles.findById(req.params.id)
    .then(Articles => res.json(Articles))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:name').get((req, res) => {
    Articles.findById(req.params.name)
      .then(Articles => res.json(Articles))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
  Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json('Articles deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:name').delete((req, res) => {
    Articles.findByIdAndDelete(req.params.name)
      .then(() => res.json('Articles deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => {
  Articles.findById(req.params.id)
    .then(Articles => {
      Articles.content = req.body.content;

      Articles.save()
        .then(() => res.json('Articles updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;