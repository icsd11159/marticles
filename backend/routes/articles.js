const router = require('express').Router();
let Articles = require('../models/articles.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
  Articles.find()
    .then(Articles => res.json(Articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const category_name = req.body.category_name;

  const newArticles = new Articles({
    title,
    description,
    content,
    category_name,
  });

  newArticles.save()
  .then(() => res.json('Articles added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

  router.route('/bycategory').post((req, res) => {
    let request = []
     req.body.map((cat,ind)=>{
      request.push(cat.name)
    })  
    console.log(request);
    Articles.find({category_name: request})
      .then(Articles => res.json(Articles))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/id/:value').get((req, res) => {
 // console.log(mongoose.Types.ObjectId(req.params.value));
  Articles.findById(mongoose.Types.ObjectId(req.params.value))
    .then(Articles => res.json(Articles))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/title/:value').get((req, res) => {
  console.log(req.params.value);
    Articles.findOne({title: { "$regex": req.params.value, "$options": "i"}})
      .then(Articles => res.json(Articles))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete').delete((req, res) => {
  Articles.findByIdAndRemove(mongoose.Types.ObjectId(req.body._id))
    .then(() => res.json('Articles deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deletecategory').delete((req, res) => {
  Articles.findOneAndRemove({category_name:req.body.name})
    .then(() => res.json('Categories from Articles deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update').post((req, res) => { //update by id 
  Articles.findById(mongoose.Types.ObjectId(req.body._id))
    .then(Articles => {
      Articles.content = req.body.content;

      Articles.save()
        .then(() => res.json('Articles updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;