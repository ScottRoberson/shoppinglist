const express = require('express')
const router = express.Router();

//Item Model

const Item = require('../../models/Item');

// @route GET api/items
// @desc  Get All Items
// @access Public
router.get('/', (req, res) => {
  Item.find({}, (err, items) => {
      res.render('index', {
        items: items
      });
    })
    .sort({
      date: -1
    })
})

// @route GET api/items/add
// @desc  Create an item 
// @access Public
router.get('/add', (req, res) => {
  res.render('addItem')
});

// @route POST api/items/add
// @desc  Create an item 
// @access Public
router.post('/add', async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  try {

    await newItem.save();
    res.redirect('/api/items');

  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
});


// @route PUT api/items/:id
// @desc  Update an item
// @access Public
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body).then(() => {
    Item.findOne(req.params.id)
  }).then(item => res.json(item));
});


// @route DELETE api/items/:id
// @desc  Delete an item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({
      success: true
    })))
    .catch(err => res.status(404).json({
      success: false
    }))
});

module.exports = router;




// app.get('/profileface', isLoggedIn, function (req, res) {
//   // mongoose operations are asynchronous, so you need to wait 
//   PracticeModel.find({}, function (err, data) {
//     // note that data is an array of objects, not a single object!
//     res.render('profileface.ejs', {
//       user: req.user,
//       practices: data
//     });
//   });
// });