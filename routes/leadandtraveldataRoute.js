const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to fetch data from addleads and travel_opportunity tables
router.get("/fetch-data", (req, res) => {
    const query = `
    SELECT a.*, t.destination AS travel_destination, t.created_at AS travel_created_at 
    FROM addleads a 
    LEFT JOIN travel_opportunity t 
    ON a.leadid = t.leadid
    ORDER BY t.created_at DESC`; // Ordering by travel_created_at in descending order

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data: ", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        // Check if results are empty
        if (results.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.json(results);
    });
});


module.exports = router;