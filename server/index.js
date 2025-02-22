import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

// MongoDB Connection URL - Consider moving this to .env file
const CONNECTION_URL = 'mongodb+srv://Sanjay:San2020@mernstack.bad8g.mongodb.net/?retryWrites=true&w=majority&appName=mernStack';
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log('Connected to MongoDB');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        
    });
