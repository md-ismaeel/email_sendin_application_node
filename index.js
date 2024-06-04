const express = require('express');
const path = require('path')
const cors = require('cors')

const routers = require("./Routes/routers");
const { mailRoute } = routers;

const app = express();
app.use(cors())

const PORT = 10000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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