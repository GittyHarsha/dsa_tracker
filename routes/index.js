const express=require('express');
const router=express.Router();
console.log('router loaded');
const homeController= require('../controllers/home_controller');

router.get('/', homeController.home);
router.post('/addProblem', homeController.addProblem);
router.post('/deleteProblem', homeController.deleteProblem);
router.post('/updateProblem', homeController.updateProblem);

module.exports=router;



