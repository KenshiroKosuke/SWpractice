import express from "express";
import { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } from '../controllers/hospitals.js'
//const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.js');
const router = express.Router();

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').put(updateHospital).delete(deleteHospital).get(getHospital);

/*
router.get('/', (req, res) => {
    res.status(200).json({success:true,msg:'Show all hospital'});
});

router.get('/:id', (req, res) => {
    res.status(200).json({succes:true, msg:`Show hospital ${req.params.id}`})
});

router.post('/', (req, res) => {
    res.status(200).json({success:true, msg:'Create new hospitals'})
});

router.put('/:id', (req, res) => {
    res.status(200).json({success:true, msg:`Update hosital id: ${req.params.id}`})
});

router.delete('/:id', (req, res) => {
    res.status(200).json({success:true, msg:`Delete hosital id: ${req.params.id}`})
});
*/

export {router};