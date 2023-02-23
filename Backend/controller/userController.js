const asyncHandler = require("express-async-handler");
const User = require("../Modals/userModal");
const generateToken = require("../ConfigDatabase/generateToken");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Failed to create the user")
    }
});

//  /api/user?serach=abhishek
const allUsers = asyncHandler(async (req, res) => {
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
        : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    console.log("HEllo", users);
    res.send(users);
    console.log("hiiiii", keyword);
});


module.exports = { registerUser, authUser, allUsers };