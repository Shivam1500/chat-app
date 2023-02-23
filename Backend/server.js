const express = require('express');
const dotenv = require("dotenv");
const { chats } = require("./Data/data");
const connectDB = require('./ConfigDatabase/db');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Here API is Working");
});

app.use('/api/user', userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
// console.log(process.env.PORT);

app.listen(port, console.log(`Server Started On PORT ${port}`))