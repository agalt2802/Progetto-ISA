exports.checkConnectionToClient = async (setDevice) => {

    let response = await fetch("https://192.168.1.153:5443/checkConnection").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      console.log("JSON: " + JSON.stringify(json))
      if(json)
      setDevice(json);
}

exports.isConnected = async (setConnetcted, setDevice) =>{
  let response = await fetch("https://192.168.1.153:5443/isConnected").catch(
      (error) => console.log(error)
    );
    response = await response.json();
    console.log("Response: "+ JSON.stringify(response))
    if (response) {
      setConnetcted(true)
      setDevice(response)
    }else{
      setConnetcted(false)
    }
}

exports.takePhoto = async () => {
  await fetch("https://192.168.1.153:5443/takePhoto").catch(
    (error) => console.log(error)
  );
  console.log("takePhoto")
};

exports.resetImage = async () => {
  await fetch("https://192.168.1.153:5443/resetImage").catch(
    (error) => console.log(error)
  );
  console.log("takePhoto")
};

exports.getPicture = async (setImg) => {
  let response = await fetch("https://192.168.1.153:5443/pictureTaken").catch(
    (error) => console.log(error)
  );
  response = await response.text();
  setImg(response)
};


exports.savePhoto = async (fileName, image) => {

  console.log(image)
  console.log(fileName)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: fileName, image: image }),
  };
  let response = await fetch("https://192.168.1.153:5443/savePhoto", requestOptions)
  .catch(
    (error) => console.log(error)
  );
  response = await response.text()
  return response
}

exports.overwrite = async (fileName, image) => {

  console.log(image)
  console.log(fileName)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: fileName, image: image }),
  };
  await fetch("https://192.168.1.153:5443/overwrite", requestOptions)
  .catch(
    (error) => console.log(error)
  );
}

exports.getPosition = async () =>{
  await fetch("https://192.168.1.153:5443/getPosition").catch(
    (error) => console.log(error)
  );
  console.log("getPosition")
}

exports.resetPosition = async () => {
  await fetch("https://192.168.1.153:5443/resetPosition").catch(
    (error) => console.log(error)
  );
  console.log("takePhoto")
};

exports.getBatteryInfo = async () =>{
  await fetch("https://192.168.1.153:5443/getBatteryInfo").catch(
    (error) => console.log(error)
  );
  console.log("getPosition")
}

exports.resetBatteryInfo = async () => {
  await fetch("https://192.168.1.153:5443/resetBatteryInfo").catch(
    (error) => console.log(error)
  );
  console.log("resetBatteryInfo")
};

exports.getMessages = async () => {
  await fetch("https://192.168.1.153:5443/getMessages").catch(
    (error) => console.log(error)
  );
  console.log("takePhoto")
};

exports.sendNewMessage = async (newMessage) => {

  console.log(newMessage)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: newMessage}),
  };
  let response = await fetch("https://192.168.1.153:5443/sendMessage", requestOptions)
  .catch(
    (error) => console.log(error)
  );
}
