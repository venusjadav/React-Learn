import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost:27017/myapp")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB", err));

const DataSchema = new mongoose.Schema({
    name: Number,
    x: Number,
    x: Number,
    y: Number,
});
const DataModel = mongoose.model("Data", DataSchema);

const port = 4001;
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

// const data = [
//     { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
//     { name: 2, x: Math.random() * 10, y: Math.random() * 10 },
//     { name: 3, x: Math.random() * 10, y: Math.random() * 10 },
//     { name: 4, x: Math.random() * 10, y: Math.random() * 10 },
//     { name: 5, x: Math.random() * 10, y: Math.random() * 10 },
// ];

io.on("connection", (socket) => {
    console.log("connected");

    DataModel.find()
        .sort({ name: 1 })
        .then((err, data) => {
            socket.emit("message", data);
        })
        .catch((err) => {
            console.error("Error fetching initial data", err);
        });

    const interval = setInterval(async () => {
        // Add new data point and maintain the length of the array
        // if (data.length > 5) {
        //     data.shift(); // Remove the oldest data point
        // }
        // const lastName = data[data.length - 1].name;
        // data.push({
        //     name: lastName + 1,
        //     x: Math.random() * 10,
        //     y: Math.random() * 10,
        // });
        // // Emit the updated data
        // socket.emit("message", data);
        try {
            const lastData = await DataModel.findOne()
                .sort({ name: -1 })
                .exec();
            const lastName = lastData ? lastData.name : 0;
            const newData = {
                name: lastName + 1,
                x: Math.random() * 10,
                y: Math.random() * 10,
            };
            await DataModel.create(newData);
            await DataModel.deleteMany({ name: { $lt: lastName - 9 } });
            const updatedData = await DataModel.find().sort({ name: 1 }).exec();
            socket.emit("message", updatedData);
        } catch (err) {
            console.log("Error updating data:", err);
        }
    }, 1000);

    // Cleanup on disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
