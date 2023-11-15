const Ticket = require('../models/ticket.model');

const TicketController = {
    createTicket: async (req, res) => {
        const ticket = new Ticket(req.body);
        try {
            await ticket.save();
            return res.status(201).json({
                success: true,
                data: ticket
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    },
    getTickets: async (req, res) => {
        try {
            const partialTicketTitle = req.query.title;
            if (partialTicketTitle) {
                const tickets = await Ticket.find({ title: { $regex: new RegExp(partialTicketTitle), $options: "i" } });
                if (partialTicketTitle > 0) {
                    return res.status(200).json({
                        success: true,
                        data: tickets
                    });
                }
                else {
                    return res.status(404).json({
                        success: false,
                        message: 'Ticket not found'
                    });
                }
            } else {
                const tickets = await Ticket.find();
                return res.status(200).json({
                    success: true,
                    data: tickets
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    getTicketById: async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id);
            if (ticket) {
                return res.status(200).json({
                    success: true,
                    data: ticket
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    updateTicket: async (req, res) => {
        try {
            const ticket = await Ticket.findByIdAndUpdate(req.parms.id, req.body, { new: true });
            if (Ticket){
                return res.status(200).json({
                    success: true,
                    data: ticket
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    deleteTicket: async (req, res) => {
        try{
            const ticket = await Ticket.findByIdAndDelete(req.params.id);
            if(ticket) {
                return res.status(200).json({
                    success: true,
                    message: 'Ticket deleted'
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found'
                });
            }
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    deleteAllTickets: async (req, res) => {
        try{
            const ticket = await Ticket.deleteMany();
            if(ticket) {
                return res.status(200).json({
                    success: true,
                    message: 'Tickets deleted'
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'Tickets not found'
                });
            }
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = TicketController;