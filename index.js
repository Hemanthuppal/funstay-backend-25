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
const myteamRoutes = require('./routes/myteamRoutes');
const createcustomeRoute = require('./routes/createcustomeRoute');
const updatecustomerroute = require('./routes/updatecustomerroute');
const customertableroute = require('./routes/customertableroute');
const forgotpasswordRoute = require('./routes/forgotpassword');
const countRoute = require('./routes/countRoute');
const managercountRoute = require('./routes/managercountRoute');
const salescountRoute = require('./routes/salescountRoute');
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
app.use('/', myteamRoutes);
app.use('/', createcustomeRoute);
app.use('/', updatecustomerroute);
app.use('/', customertableroute);
app.use('/', forgotpasswordRoute);
app.use('/', countRoute);
app.use('/', managercountRoute);
app.use('/', salescountRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
