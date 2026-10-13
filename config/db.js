// Mock Database connection setup (Simulates production database layers)
const connectDB = async () => {
    try {
        console.log("Mock Database connection established successfully.");
        return true;
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;