const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const users= null
  //get all the users from the database
  res.send('users Route');
});

router.get('/:id',(req,res)=>{  
  //search for user in the database
  const user = null
  if(!user) res.status(404).send("User was not found!")
  res.send(user)
})

router.post('/',(req,res)=>{
  const {firstName,lastName,email,password}= req.body;
  const user = {
    firstName,lastName,email,password
  }
  const valid = true
  //validate the data
  if(!valid) res.status(400).send("Data is not valid")
 // add user to the database11
  res.send(user)
})

module.exports = router;
