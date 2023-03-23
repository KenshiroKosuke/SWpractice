import {Appointment} from '../models/Appointment.js'
import { Hospital } from '../models/Hospital.js';

export async function getAppointments(req,res,next) {
    let query;
    // general user cannot see
    if(req.user.role !== 'admin'){
        query = Appointment.find({user:req.user.id}).populate({
            path: 'hospital',
            select: 'name province tel'
        })
    }else{
        query=Appointment.find().populate({
            path: 'hospital',
            select: 'name province tel'
        })
    }
    try{
        const appointments = await query;
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Cannot find appointment"
        });
    }
}

export async function getAppointment(req,res,next) {
    try {
        const appointment = await Appointment.findById(req.params.id).populate({
            path: 'hospital',
            select: 'name description tel'
        })
        if (!appointment){
            res.status(404).json({ success: false, msg: `no appt id ${req.params.id}` })
        }
        res.status(200).json({
            success: true,
            data: appointment
        })
    } catch (err){
        return res.status(400).json({ success: false, msg: "cannot find appt" })
    }
}

export async function addAppointment(req, res, next) {
    try {
        // getting user (id) from the login procedure (via protect middleware)
        req.body.user = req.user.id
        const existedAppt = await Appointment.find({user:req.user.id})
        if(!existedAppt){
            return res.status(400).json({ success: false, msg: "no user with that id exists " })
        }
        // check if > 3 appt for user
        if(existedAppt.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({ success: false, msg: `The user with id ${req.user.id} has already made 3 appointments` })
        }
        req.body.hospital = req.params.hospitalId;
        const hospital = await Hospital.findById(req.params.hospitalId);
        if (!hospital){
            return res.status(404).json({success:false,msg:`no hospital id ${req.params.hospitalId}` })
        }
        // create appt
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, data: appointment })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err })
    }
}

export async function updateAppointment(req, res, next) {
    try {
        let appointment = await Appointment.findById(req.params.id)
        if (appointment.user.toString()!==req.user.id && req.user.role !== 'admin' ){
            return res.status(404).json({success:false,msg:`User ${req.user.id} is not authorized to update this appointment.`})
        }
        if (!appointment){
            return res.status(404).json({success:false,msg:`no appointment ${req.params.id}`})
        }
        appointment = await  Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({ success: true, data: appointment })
    } catch (err) {
        res.status(400).json({ success: false, message: `cannot update appointment ${req.params.id}`})
    }
}

export async function deleteAppointment(req, res, next) {
    try {
        const appointment = await Appointment.findById(req.params.id)
        if (appointment.user.toString()!==req.user.id && req.user.role !== 'admin' ){
            return res.status(404).json({success:false,msg:`User ${req.user.id} is not authorized to delete this appointment.`})
        }
        if (!appointment){
            return res.status(404).json({success:false, msg:`no appointment ${req.params.id}`})
        }
        await Appointment.deleteOne(req.params.id)
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        res.status(400).json({ success: false, message: `cannot delete appointment ${req.params.id}` })
    }
}
