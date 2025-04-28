// filepath: d:\LEARN\Works\Task\backend\seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create test users
    const john = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 8),
    });
    const jane = new User({
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 8),
    });

    await john.save();
    await jane.save();

    // Create sample tasks
    const tasks = [
        { title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'Medium', status: 'incomplete', user: john._id },
        { title: 'Complete report', description: 'Finish Q3 report', priority: 'High', status: 'complete', user: jane._id },
        { title: 'Workout', description: '1-hour gym session', priority: 'Low', status: 'incomplete', user: john._id },
    ];

    await Task.insertMany(tasks);

    console.log('Seed data added');
    mongoose.disconnect();
};

seedDatabase().catch(err => console.error(err));