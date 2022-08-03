require('dotenv').config();
const env = process.env.ENVIRONMENT || 'dev';
const config=require('./config/'+env+'/config.json');
const port = process.env.PORT || config.port;
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const fetch=require('node-fetch');
const {Mov}=require('./model/movie');
const {userDetails} =require('./model/user');
const jwt=require('jsonwebtoken');
app.use(express.json());
const mongo=process.env.mongo || config.mongo;
const search_router=require('./routes/movie_route');


app.listen(port, () => {
    console.log('Using configuration ENVIRONMENT: ' + env);
    console.log('Server is running on PORT: ' + port);
});

mongoose.connect(mongo).then(c=>console.log('connection is successful'))
.catch(err=>console.log('connection is unsucessfull',err));

let uservalue;

async function saveMovie(){
    const myPost=await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=59cf13bb");
    const res=await myPost.json();
    console.log(res);
    
      const port=new Mov({
        Title:res.Title,
        Year:res.Year,
        Rated:res.Rated,
        Released:res.Released,
        Runtime:res.Runtime,
        Genre:res.Genre,
        Director:res.Director,
        Awards:res.Awards,
        Ratings:res.Ratings,
        imdbRating:res.imdbRating,
        imdbVotes:res.imdbVotes,
        imdbID:res.imdbID,
        Type:res.Type,
        BoxOffice:res.BoxOffice,
        Production:res.Production,
      });
     port.save();
    }

// saveMovie();

app.use('/api',search_router);




module.exports=app;
