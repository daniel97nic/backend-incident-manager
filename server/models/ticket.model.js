const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    description: {
        type: String,
        trim: true, 
        required: 'Description is required'
    },
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'In Progress', 'Closed']
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    },
    urgency: {
        type: String,
        default: 'Low',
        enum: ['Low', 'Medium', 'High']
    }
});

    const Ticket = mongoose.model('Ticket', ticketSchema);
    module.exports = Ticket;