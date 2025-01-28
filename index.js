const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const leadRoutes = require('./routes/leadRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const commentRoutes = require('./routes/commentRoutes');
const editleadoppRoute = require("./routes/editleadoppRoute");
const assigneeRoute = require("./routes/assigneeRoute")
const travelOpportunityRoute = require("./routes/travelOpportunityRoutes")


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', authRoutes);
app.use('/', employeeRoutes);
app.use('/api', leadRoutes);
app.use('/api', opportunityRoutes);
app.use('/', commentRoutes);
app.use("/api", editleadoppRoute);
app.use('/', assigneeRoute);
app.use('/', travelOpportunityRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
