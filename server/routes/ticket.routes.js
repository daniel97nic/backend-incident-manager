const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');

//Create a new ticket
router.post('/tickets', TicketController.createTicket);

//Get all tickets or find them by partial title
router.get('/tickets', TicketController.getTickets);

//Get a single ticket by id
router.get('/tickets/:id', TicketController.getTicketById);

//Update a ticket by id
router.put('/tickets/:id', TicketController.updateTicket);

//Delete a ticket by id
router.delete('/tickets/:id', TicketController.deleteTicket);

//Delete all tickets
router.delete('/tickets', TicketController.deleteAllTickets);

module.exports = router;