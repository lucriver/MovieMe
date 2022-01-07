const User = require('../models/User.model.js');
const router = require('express').Router();

/** USER OPERATIONS ----------- */

/** Add a new user to the database- Will not allow duplicates */
router.route('/').post((req,res) => {
  const username = req.body.username;
  const newUser = new User({username})

  User.countDocuments({ username: req.body.username}, function (err,count){
    if(count > 0){
      User.findOne({ username: req.body.username })
        .then(() => res.json("User already exists."))
        .catch((err) => res.json(err));
    } else {
      newUser.save()
        .then(() => res.json("User added."))
        .catch((err) => res.json(err));
    }
  })
})

/** Return all users.  */
router.route('/').get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
})

/** Delete user from the database. */
router.route('/:username').delete((req,res) => {
  User.findOneAndDelete({ username: req.params.username })
    .then(() => res.json("Account deleted."))
    .catch((err) => res.json(err));
})

/** Return a user. */
router.route('/:username').get((req,res) => {
  User.findOne({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
})

/** USER OPERATIONS ----------- */



/**  -------------------------- */



/** MOVIE OPERATIONS ----------- */

/** Return a single users movies */
router.route('/:username/movies').get((req,res) => {
  User.findOne({ username: req.params.username })
    .then((user) => res.json(user.movies))
    .catch((err) => res.json(err))
})

/** Add movie to a users list. */
router.route('/:username/movies').post((req,res) => {
  User.findOne({ username: req.params.username}, function(err,obj) {
      const movie = {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        creator: req.body.creator,
        genre: req.body.genre,
        image: req.body.image,
        movieID: req.body.movieID
      }

      let isExisting = false;
      obj.movies.forEach((item) => {
        if(item.movieID == req.body.movieID)
          isExisting = true
      })

      if(isExisting)
        return res.json("This movie is already in the list.")

      obj.movies.push(movie)
      obj.save()
        .then(() => res.json("Movie added!"))
        .catch((err) => res.json(err))
  })
})

/** Return a specific movie from a users list.  */
router.route('/:username/movies/:id').get((req,res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      let index = user.movies.findIndex(x => x.movieID == req.params.id)
      res.json(user.movies[i])
    })
    .catch((err) => res.json(err))
})

/** Remove a movie from a users list */
router.route('/:username/movies/:id').delete((req,res) => {
  User.findOne({ username: req.params.username}, function(err,obj) {

    let isExisting = false;
    let id;
    obj.movies.forEach((item) => {
      if(item.movieID == req.params.id){
        isExisting = true;
        id = item._id;
      }
    })

    if(!isExisting)
      return res.json("This movie is not in your list.")

    obj.movies.pull(id)
    obj.save()
      .then(() => res.json("Movie removed from list."))
      .catch((err) => res.json(err))
  })
});


module.exports = router