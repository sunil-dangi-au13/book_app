const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const controller = require('../controller/authController')



// Route No----- 1    create User:-- Post method----- api/auth/createuser--------//
router.post('/createuser',controller.createuser)

  

//Route No-----2    Login-User----- Post method---- api/auth/login----->>>>//
router.post('/login',controller.loginuser)

 

//Route No-----3  Get User Details------>>>> Get method------ api/auth/getuser------   Login Required//
router.get('/getuser',fetchuser,controller.getuser)


 
 



module.exports = router;