const https = require("https");
const fs = require("fs");
const io = require("socket.io");
const path = require("path");
const cors = require("cors");
let bodyParser = require("body-parser");
const express = require("express");

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

// import App from '../server/front-end/src/App';

const PORT = 5443;
const IP = "192.168.1.153"; //"192.168.1.153"; //"192.168.1.153"; //"192.168.1.52"; //"192.168.88.236"

let app = new express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use('/*', express.static(path.join(__dirname,'style.css')))
app.use(express.static(__dirname));
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname));
// });

let key = fs.readFileSync(
  "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.key"
);
let cert = fs.readFileSync(
  "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.crt"
);
let options = {
  key: key,
  cert: cert,
};

const server = https.createServer(options, app).listen(PORT, IP, () => {
  console.log(`Express app listening at http: ${IP}:${PORT}`);
});

const agent = new https.Agent({
  rejectUnauthorized: false,
});

let clientCount = 0;
const maxClients = 1;

// server.maxConnections = 1
const socket = io(server, {
  cors: {
    origin: "*",
  },
});

let batteryStatus;
let deviceInfo;
let positionInfo;
let networkInfo;
let img = "";
let messages = []

let messagesRecieved = [];

socket.on("connection", (socket) => {
  console.log(socket.id);
  if (clientCount >= maxClients) {
    return socket.disconnect(true);
  }

  clientCount++;

  socket.on("disconnect", () => {
    console.log("disconnected");
    clientCount--;
  });

  socket.on("battery", (batteryInfo)=>{
    batteryStatus=batteryInfo
  })

  socket.on("deviceInfo", (device) => {
    deviceInfo = device;
  });

  socket.on("position", (position) => {
    positionInfo = position;
  });

  socket.on("networkInfo", (network) => {
    networkInfo = network;
  });

  socket.on("pictureTaken", (image) => {
    console.log("event: pictureTaken");
    img = image;
  });

  socket.on("recieveMessage", (message)=>{
    console.log("Message Recieved: " + message)
    let newMessage = {
      from: "client",
      message: message
    }
    messages.push(newMessage)
    console.log(messagesRecieved)
  })

  // device info
  // app.get("/deviceInfo", function (req, res) {
  //   socket.emit("device")
  //   res.send(connectedDevice)
  // });
});

// Check client connection

app.get("/isConnected", (req, res) => {
  if (clientCount > 0) {
    let connectedDevice = {
      batteryStatus: batteryStatus,
      deviceInfo: deviceInfo,
      positionInfo: positionInfo,
      networkInfo: networkInfo,
    };
    res.send(connectedDevice);
  } else {
    res.send(false);
  }
});

// camera
app.get("/takePhoto", (req, res) => {
  console.log("camera");
  socket.emit("camera");
});

app.get("/pictureTaken", (req, res) => {
  if (img != "") {
    res.send(img);
  } else {
    res.send(false);
  }
});

app.get("/resetImage", (req, res) => {
  img = false;
});

app.post("/savePhoto", (req, res) => {
  if (fs.existsSync("./imgs/" + req.body.fileName + ".png")) {
    console.log("file exists");
    res.send("file exists");
  } else {
    fs.writeFileSync(
      "./imgs/" + req.body.fileName + ".png",
      req.body.image,
      "base64"
    );
    res.send("done");
  }
});

app.post("/overwrite", (req, res) => {
  console.log("overwrite");
  fs.writeFileSync(
    "./imgs/" + req.body.fileName + ".png",
    req.body.image,
    "base64"
  );
});

//position
app.get("/getPosition", (req, res) => {
  console.log("getPosition");
  socket.emit("getPosition")
});

app.get("/position", (req, res)=>{
  if (positionInfo) {
    res.send(positionInfo);
  } else {
    res.send(false);
  }
})

app.get("/resetPosition", (req, res) => {
  positionInfo=false
});

// battery
app.get("/getBatteryInfo", (req, res) => {
  socket.emit("getBatteryInfo")
});

app.get("/battery", (req, res) => {
  if (batteryStatus) {
    res.send(batteryStatus);
  } else {
    res.send(false);
  }
});

app.get("/resetBatteryInfo", (req, res) => {
  batteryStatus = false;
});

app.get("/getMessages", (req, res) =>{
  res.send(messages)
})

app.post("/sendMessage", (req, res) => {
  console.log("Send Message: "+  req.body.message)
  messages.push({from: "server", message: req.body.message})
  socket.emit("sentMessage", req.body.message)
});