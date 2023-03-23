//const Hospital = require("../models/Hospital.js");

import { Hospital } from "../models/Hospital.js";

//@access public
export async function getHospitals(req, res, next) {
    let query;
    //Copy req.query
    const reqQuery = {...req.query}
    //Fields to exclude
    const removeFields = ['select','sort']
    //Loop over removed fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    //Crete query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    query = Hospital.find(JSON.parse(queryStr)).populate('appointments');
    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query=query.select(fields)
    }
    //Sort
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query=query.sort(sortBy)
    } else {
        //default
        query=query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,10)||5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit
    try {
        const total = await Hospital.countDocuments();
        query = query.skip(startIndex).limit(limit);
        //Real exec
        const hospitals = await query;
        //Pagination result
        const pagination = {}
        //Next page exists
        if (endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }
        //Prev page exists (because startIndex is 0 only for first page)
        if (startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }
        res.status(200).json({
            success: true,
            count: hospitals.length,
            data: hospitals
        });
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
//@access public
export async function getHospital(req, res, next) {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: hospital });
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
//@access private
export async function createHospital(req, res, next) {
    console.log(req.body)
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).json({ success: true, data: hospital })
    } catch (err) {
        res.status(400).json({ success: false, message: err })
    }
}
//@access private
export async function updateHospital(req, res, next) {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!hospital) {
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: hospital });
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
//@access private
export async function deleteHospital(req, res, next) {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            res.status(400).json({ success: false })
        }
        hospital.remove();
        res.status(200).json({ success: true, msg: `Delete hospital id: ${req.params.id}`, data: hospital })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}