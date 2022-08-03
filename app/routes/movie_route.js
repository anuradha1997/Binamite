const mongoose=require('mongoose');
const express=require('express');
const app=express();
const router=express.Router();
app.use(express.json());
const {Mov,MovieStructure}=require('../model/movie');
const {auth}=require("../middleware/auth");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


const Movie=mongoose.model('Search_movie',MovieStructure);
router.get('/',(req,res)=>{
  res.send("hello")
})

router.get('/title',auth,async(req,res) => {
const moviedetails=await Mov.find({Title:req.body.title})
const port=new Movie({
    Title:moviedetails[0].Title, 
    Year:moviedetails[0].Year,
    Rated:moviedetails[0].Rated,
    Released:moviedetails[0].Released,
    Runtime:moviedetails[0].Runtime,
    Genre:moviedetails[0].Genre,
    Director:moviedetails[0].Director,
    Awards:moviedetails[0].Awards,
    Ratings:moviedetails[0].Ratings,
    imdbRating:moviedetails[0].imdbRating,
    imdbVotes:moviedetails[0].imdbVotes,
    imdbID:moviedetails[0].imdbID,
    Type:moviedetails[0].Type,
    BoxOffice:moviedetails[0].BoxOffice,
    Production:moviedetails[0].Production,
  });
 port.save();
res.send(port);
})

router.post('/updateRuntime',auth,async(req,res)=>{
  try {
    const { Runtime } = req.body;
    const movie_obj = await Mov.find({
        Title: req.body.title
    });
    // Movie does not exist
    if(!movie_obj) {
      return res.status(404).send({
        message: "Movie not found with title " + req.params.title
    });
    }

    const updatedMovie = await Mov.updateOne({
        Title: req.body.title,
        }, {  
         $set: { "Runtime": Runtime } },
        { upsert: true }
    );

    res.json(updatedMovie);
} catch(error) {
   res.send(error.message)
}
});


router.get('/topRatedMovies',auth,async(req,res) => {
  try{
  const { year } = req.body;
  let movieDetails=await Mov.aggregate([
    {
    $match:
    {
    "Year": year
    }
    },
    {
    $project: {
    "_id":0,
    "Ratings.Source":1,
    "imdbRating":1
    }
    }
    ]).sort({"imdbRating":-1}).limit(1) 
    res.send(movieDetails);
  }
  catch(err){
  res.send(err.message);
  }
  });



  

module.exports=router;