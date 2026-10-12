const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Green', message: 'Server is active and operational' });
});

app.use(errorHandler);

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server executing securely on port ${PORT}`));
}

module.exports = app;