//const Hospital = require("../models/Hospital.js");

import { Hospital } from "../models/Hospital.js";

//@access public
export async function getHospitals(req, res, next) {
    try{
        const hospitals = await Hospital.find();
        res.status(200).json({ success: true, count: hospitals.length, data: hospitals });
    } catch(err) {
        res.status(400).json({ success: false})
    }
}
//@access public
export async function getHospital(req, res, next) {
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital){
            res.status(400).json({ success: false})
        }
        res.status(200).json({ success: true, data: hospital });
    } catch(err) {
        res.status(400).json({ success: false})
    }
}
//@access private
export async function createHospital(req, res, next) {
    console.log(req.body)
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital })
}
//@access private
export async function updateHospital(req, res, next) {
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!hospital){
            res.status(400).json({ success: false})
        }
        res.status(200).json({ success: true, data: hospital });
    } catch(err) {
        res.status(400).json({ success: false})
    }
}
//@access private
export async function deleteHospital(req, res, next) {
    try{
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if(!hospital){
            res.status(400).json({ success: false})
        }
        res.status(200).json({ success: true, msg: `Delete hospital id: ${req.params.id}`, data: hospital })
    } catch(err) {
        res.status(400).json({ success: false})
    }
}