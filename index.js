const express = require('express');
const routers = require("./Routes/routers");
const path = require('path')
const { mailRoute } = routers;

const app = express();

const PORT = 10000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded());


const staticDirectory = path.join(__dirname, 'front-end');
app.use(express.static(staticDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(staticDirectory, "index.html"));
})


app.use(mailRoute)

app.use('/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Path not found'
    })
})

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))