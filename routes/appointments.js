import express from "express";
import { addAppointment, deleteAppointment, getAppointment, getAppointments, updateAppointment } from "../controllers/appointment.js";
import { authorize, protect } from "../middlewares/auth.js";
const router = express.Router({mergeParams:true});

router.route('/').get(protect,getAppointments).post(protect,authorize('admin','user'),addAppointment);
router.route('/:id').get(protect,getAppointment).put(protect,authorize('admin','user'),updateAppointment).delete(protect,authorize('admin','user'),deleteAppointment)

export { router };