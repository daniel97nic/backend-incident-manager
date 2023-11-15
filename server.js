import app from './server/express.js';
import ticketRoutes from './server/routes/ticket.routes'; 
import userRoutes from './server/routes/user.routes';
import mongoose from 'mongoose';

mongoose.set("strictQuery", false);
mongoose
  .connect('mongodb+srv://danielmayorga97:TnHrW6f9MxRP7TsJ@cluster0.zdxepku.mongodb.net/Incident-Management-System?retryWrites=true&w=majority&appName=AtlasApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000.');
      app.get("/", (req, res) => {
        res.json({ message: "Welcome to Incident Management System application." });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

  app.use('/api', ticketRoutes);
  app.use('/api', userRoutes);
