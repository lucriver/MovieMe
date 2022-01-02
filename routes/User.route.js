const User = require('../models/User.model.js');
const router = require('express').Router();

/** ADD A USER TO THE DATABASE  */
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(() => res.json('User added.'))
        .catch((err) => res.status(400).json("Error! " + err))
})

/** SHOW DETAILS OF USER BY UNIQUE USER ID */
router.route('/:id').get((req, res) => {
    User.findById({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error ' + err))
})


/** SHOW ALL USERS */
router.route('/').get((req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch((err) => res.status(400).json('Error ' + err))
})

/*** ADDS A MOVIE TO A USERS LIST, WILL NOT ALLOW DUPLICATES */
router.route('/:id/movie/add').post((req, res) => {
    User.findById({ _id : req.params.id })
        .then((user) => {
            
            var movie_data = { 
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                creator: req.body.creator,
                genre: req.body.genre,
                image: req.body.image,
                movieID: req.body.movieID
            };

            for(let i = 0;i<user.__v;i++){
                if(user.movies[i].title == movie_data.title){
                    res.json("This movie is already in list.")
                    return;
                }
            }

            user.movies.push(movie_data)
            user.save()
            .then((user) => {
                res.json('Data updated.');
            })
            .catch((err) => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});


/*** RETURN THE DETAILS FOR A MOVIE IN A USERS LIST */
router.route('/:id/movie/:movieid').get((req, res) => {
    User.findById({ _id : req.params.id })
        .then((user) => {
            let movie_id = req.params.movieid;
            let movie_list = user.movies;
            let picked = movie_list.find(o => o._id == movie_id);
            Promise.resolve(picked)
                .then((movie) => res.json(movie))
                .catch((err) => res.json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err));
});



/****** THIS DELETES A MOVIE FROM A USER'S LIST. */
router.route('/:id/movie/delete/:movieid').delete((req, res) => {
    User.findById({ _id: req.params.id })
        .then((user) => {
            let movie_id = req.params.movieid;
            user.movies.pull(movie_id);
            user.save()
            .then((user) => res.json('movie deleted.'))
            .catch((err) => res.json('Error ' + err))
        })
        .catch((err) => res.status(400).json('Error! ' + err))
})



router.route('/delete/:id').delete((req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((success) => res.json('User deleted.'))
        .catch((err) => res.status(400).json('Error! ' + err))
})

router.route('/update/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((user) => res.json('Sucess! User updated.'))
        .catch((err) => res.status(400).json('Error! ' + err))
})

module.exports = router