const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const ReactDomServer = require('react-dom/server');
const React = require('react');

import HomePage from '../src/HomePage';
import "../src/App.css"
console.log(path.join(__dirname, "..","public"));

app.use("static", express.static(path.join(__dirname, "..", "public")))

app.get("/", (req, res) =>{
    const component = ReactDomServer.renderToString(<HomePage/>)
    console.log(component)
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React App From Scratch</title>
    <meta name="description" content="React App from Scratch">
    <meta name="author" content="Giulia Altomare">
    <meta name=" viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <div id="root">${component}</div>
</body>
</html>
    `
    res.send(html)
})

app.listen(port, ()=>{
    console.log(`Server now listening at http://localhost:${port}`)
})