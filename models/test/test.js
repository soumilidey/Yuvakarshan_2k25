const mongoose = require('mongoose');
const User = require('./models/User'); 

mongoose.connect('mongodb://localhost:27017/foodaid_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to DB");

    await User.create({
        username: "test123",
        name: "testuser",
        email: "test@gmail.com",
        password: "test",
        city: "mumbai",
        role: "donor",
        foodDetails: "Rice, Roti, Achar",
        balance: 100,
        totalOrders: 2
    });

    console.log("User inserted");
    process.exit();
}).catch(err => {
    console.error("Error connecting to DB", err);
});
