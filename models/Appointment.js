import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    apptDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hospital',
        rewuired: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Appointment = mongoose.model('Appointment',AppointmentSchema);