
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1:27017/LoginDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = mongoose.model("User", {
    username: String,
    password: String
});

// Add user
app.post("/add", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User Added Successfully" });
});

// Fetch users
app.get("/users", async (req, res) => {
    const users = await User.find({}, "username");
    res.json(users);
});

// Login verification
app.post("/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        res.json({ message: "Login Successful!" });
    } else {
        res.json({ message: "Invalid Username or Password" });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
