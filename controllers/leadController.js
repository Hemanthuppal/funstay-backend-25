const Lead = require('../models/leadModel');

exports.createLead = (req, res) => {
  const data = Object.values(req.body);
  Lead.createLead(data, (err, result) => {
    if (err) {
      console.error('Error inserting lead:', err);
      res.status(500).json({ message: 'Failed to add lead.' });
    } else {
      res.status(201).json({ message: 'Lead added successfully!', leadId: result.insertId });
    }
  });
};

exports.getAllLeads = (req, res) => {
  Lead.fetchAllLeads((err, results) => {
    if (err) {
      console.error('Error fetching leads:', err);
      res.status(500).json({ message: 'Failed to fetch leads.' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getLeadById = (req, res) => {
  const { leadid } = req.params;
  Lead.fetchLeadById(leadid, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching lead.' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Lead not found.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

exports.updateLead = (req, res) => {
  const { leadid } = req.params;
  const data = req.body;
  Lead.updateLead(leadid, data, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Failed to update lead.' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Lead not found.' });
    } else {
      res.status(200).json({ message: 'Lead updated successfully.' });
    }
  });
};

exports.deleteLead = (req, res) => {
  const { leadid } = req.params;
  Lead.deleteLead(leadid, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete lead.' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Lead not found.' });
    } else {
      res.status(200).json({ message: 'Lead deleted successfully.' });
    }
  });
};


// exports.updateLeadStatus = (req, res) => {
//   const { leadid } = req.params; // Lead ID from the URL
//   const { primaryStatus, secondaryStatus } = req.body; // Status fields from the request body

//   // Validate the request payload
//   if (!primaryStatus || !secondaryStatus) {
//     return res.status(400).json({
//       message: 'Primary status and secondary status are required.',
//     });
//   }

//   // Call the model to update the lead status
//   Lead.updateLeadStatus(leadid, primaryStatus, secondaryStatus, (err, result) => {
//     if (err) {
//       console.error('Error updating lead status:', err);
//       return res.status(500).json({ message: 'Failed to update lead status.' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Lead not found.' });
//     }

//     res.status(200).json({ message: 'Lead status updated successfully.' });
//   });
// };

exports.updateLeadStatus = (req, res) => {
  const { leadid } = req.params; // Lead ID from the URL
  const { primaryStatus, secondaryStatus } = req.body; // Status fields from the request body

  // Validate the request payload
  if (!primaryStatus && !secondaryStatus) {
    return res.status(400).json({
      message: 'At least one of primary status or secondary status is required.',
    });
  }

  // Call the model to update the lead status
  Lead.updateLeadStatus(leadid, primaryStatus, secondaryStatus, (err, result) => {
    if (err) {
      console.error('Error updating lead status:', err);
      return res.status(500).json({ message: 'Failed to update lead status.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    // Determine the message based on the statuses updated
    let statusChangeMessage = 'Lead status updated successfully.';
    if (primaryStatus && secondaryStatus) {
      statusChangeMessage = 'Both primary and secondary statuses updated successfully!';
    } else if (primaryStatus) {
      statusChangeMessage = 'Primary status updated successfully!';
    } else if (secondaryStatus) {
      statusChangeMessage = 'Secondary status updated successfully!';
    }

    res.status(200).json({ message: statusChangeMessage });
  });
};


exports.getLeadData = (req, res) => {
  const { leadid } = req.params;

  Lead.getLeadData(leadid, (err, results) => {
    if (err) {
      console.error('Error fetching lead data:', err.message);
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    } else if (results.length > 0) {
      res.status(200).json(results[0]); // Return the first result
    } else {
      res.status(404).json({ message: 'No lead data found for the given ID' });
    }
  });
};

