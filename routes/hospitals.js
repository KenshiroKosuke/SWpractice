import express from "express";
import { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters } from '../controllers/hospitals.js'
import { authorize, protect } from "../middlewares/auth.js";
import { router as appointmentRouter } from "../routes/appointments.js"
//const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.js');
const router = express.Router();

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/vacCenters').get(getVacCenters);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);
router.use('/:hospitalId/appointments/',appointmentRouter); // route this to POST '/'

export { router };