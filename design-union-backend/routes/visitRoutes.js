const express = require('express');
const { bookVisit, getAllVisits, getBookedTimes } = require('../controllers/visitController'); // Adjust the path as necessary

const dbMiddleware = require("../middleware/dbMiddleware");

const router = express.Router();

router.use(dbMiddleware);
// Route for booking a visit
router.post('/book', bookVisit);

// Route for getting all booked visits
router.get('/all-visits', getAllVisits);

// Route for getting booked times for a specific date
router.get('/booked-times', getBookedTimes); // Add this line

module.exports = router;
