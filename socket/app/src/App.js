import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

function App() {
    const [data, setData] = useState(() => {
        // Initialize state from localStorage if available
        const storedData = localStorage.getItem("chartData");
        return storedData ? JSON.parse(storedData) : [];
    });
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4001/");
        socket.on("message", (newData) => {
            setData(newData);
            // this.render();
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {/* <h1>{data}</h1> */}
            <LineChart width={1000} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
                <Line type="monotone" dataKey="y" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
}

export default App;
