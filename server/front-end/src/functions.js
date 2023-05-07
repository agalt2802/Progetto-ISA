const serverUrl = "https://192.168.0.92:5443";

exports.checkConnectionToClient = async (setDevice) => {
  try {
    const response = await fetch(`${serverUrl}/checkConnection`);
    const json = await response.json();
    console.log("JSON: " + JSON.stringify(json));
    if (json) setDevice(json);
  } catch (error) {
    console.log(error);
  }
};

exports.isConnected = async (setConnected, setDevice) => {
  try {
    const response = await fetch(`${serverUrl}/isConnected`);
    const json = await response.json();
    console.log("Response: " + JSON.stringify(json));
    if (json) {
      setConnected(true);
      setDevice(json);
    } else {
      setConnected(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.takePhoto = async () => {
  try {
    const response = await fetch(`${serverUrl}/takePhoto`);
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }
    console.log("takePhoto");
  } catch (error) {
    console.log(error);
  }
};

exports.resetImage = async () => {
  try {
    await fetch(`${serverUrl}/resetImage`);
    console.log("resetImage");
  } catch (error) {
    console.log(error);
  }
};

exports.getPicture = async (setImg) => {
  try {
    const response = await fetch(`${serverUrl}/pictureTaken`);
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }else{
    const text = await response.text();
    setImg(text);
  }
  } catch (error) {
    console.log(error);
  }
};

exports.savePhoto = async (fileName, image) => {
  try {
    console.log(image);
    console.log(fileName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: fileName, image: image }),
    };
    const response = await fetch(`${serverUrl}/savePhoto`, requestOptions);
    const text = await response.text();
    return text;
  } catch (error) {
    console.log(error);
  }
};

exports.overwrite = async (fileName, image) => {
  try {
    console.log(image);
    console.log(fileName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: fileName, image: image }),
    };
    await fetch(`${serverUrl}/overwrite`, requestOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.getPosition = async () => {
  try {
    await fetch(`${serverUrl}/getPosition`);
    console.log("getPosition");
  } catch (error) {
    console.log(error);
  }
};

exports.resetPosition = async () => {
  try {
    await fetch(`${serverUrl}/resetPosition`);
    console.log("resetPosition");
  } catch (error) {
    console.log(error);
  }
};

exports.getBatteryInfo = async () => {
  try {
    await fetch(`${serverUrl}/getBatteryInfo`);
    console.log("getBatteryInfo");
  } catch (error) {
    console.log(error);
  }
};

exports.resetBatteryInfo = async () => {
  try {
    await fetch(`${serverUrl}/resetBatteryInfo`);
    console.log("resetBatteryInfo");
  } catch (error) {
    console.log(error);
  }
};

exports.getMessages = async () => {
  try {
    await fetch(`${serverUrl}/getMessages`);
    console.log("getMessages");
  } catch (error){
    console.log(error)
  }
}


exports.getMessages = async () => {
  try {
    const response = await fetch(`${serverUrl}/getMessages`);
    const messages = await response.json();
    console.log(messages);
  } catch (error) {
    console.log(error);
  }
};

exports.sendNewMessage = async (newMessage) => {
  console.log(newMessage);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: newMessage }),
  };
  try {
    const response = await fetch(`${serverUrl}/sendMessage`, requestOptions);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

exports.resetMessages = async () => {
  try {
    await fetch(`${serverUrl}/resetMessages`);
    console.log("resetMessages");
  } catch (error) {
    console.log(error);
  }
};
