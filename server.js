const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const auth= require('./authentication')
require("dotenv").config();

const server = jsonServer.create();
const router= jsonServer.router('./jokes-json.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
const jokesdb= JSON.parse(fs.readFileSync('./jokes-json.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());


const SECRET_KEY = process.env.ACCESS_TOKEN

const expiresIn = '4h'

//create user token from a payload

function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }


  // Verify the token 
function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  }
  
  // Check if the user exists in database
  function isAuthenticated({email, password}){
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  }

  function getUser({email, password}){
    return userdb.users.find(user=> user.email===email && user.password===password)
  }


// Login to one of the users from ./users.json
  server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const {email, password} = req.body;
    const user=getUser({email,password})
    if (isAuthenticated({email, password}) === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    // const accessToken = createToken({email, password})
    // console.log("Access Token:" + accessToken);
    // res.status(200).json({token: accessToken})
    const accessToken = jwt.sign({email:user.email,role: user.role}, process.env.ACCESS_TOKEN, {
        expiresIn: "4h",
      });
      res.status(200).json({ token: accessToken });
  })

  server.get('/auth/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message: "true"});
  })


  server.use(/^(?!\/auth).*$/,  (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }
    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  
       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         res.status(status).json({status, message})
         return
       }
       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
  })

  //get the jokes quantity to present ont the front of the dashboard 

  server.get('/dashboard/details/',auth.authenticateToken,(req,res)=>{
    let jokes= jokesdb.jokes;
    
    try {
        let data={
            jokesCount: jokes.length
         } 
         return res.status(200).json(data);
        
    } catch (err) {
      return res.status(500).json(err);
    }
  })

  server.get('/joke/get/', auth.authenticateToken, (req,res)=>{
    let jokes= jokesdb.jokes;
    try{
        let data= jokes;
        return res.status(200).json(data);
    } catch(err){
        return res.status(500).json(err);
    }
  })

  server.get('/joke/getByType/:type', auth.authenticateToken,(req,res)=>{
    let type=req.params.type;
    let jokes= jokesdb.jokes.filter(joke=>joke.type==type)
    try {
        let data= jokes.slice(-10)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json(err)
    }
    
  })

  server.post('/joke/add/', auth.authenticateToken, (req,res)=>{
    let newJoke= req.body;
    let jokes= jokesdb.jokes;
    try{
        jokes.push(newJoke);
        return res.status(200).json({message: "joke was added successfully"});
    } catch(err){
        return res.status(500).json(err);
    }
  })



  
  server.use(router)

server.listen(8080, () => {
  console.log('Run Auth API Server')
})
  
