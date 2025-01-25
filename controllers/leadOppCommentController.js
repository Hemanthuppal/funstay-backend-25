const LeadModel = require('../models/');

const getLeadData = (req, res) => {
  const leadid = req.params.leadid;

  LeadModel.getLeadData(leadid, (err, results) => {
    if (err) {
      console.error('Error fetching lead data:', err.message);
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = { getLeadData };
