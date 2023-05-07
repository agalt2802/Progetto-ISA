document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // navigator.notification.alert("Hello");

  document.getElementById("connect").addEventListener("click", () => {
    
    const socket = io("https://192.168.0.92:5443"); 
    if (!socket.connected) {
      socket.on(
        "connect",
        () => {
          navigator.notification.alert("Connected to server");
          socket.emit("test");
          // after connection send position, vattery status and network Info
          navigator.geolocation.getCurrentPosition(
            geolocationSuccess,
            geolocationError,
            { enableHighAccuracy: true }
          );

          initBatteryStatus();

          socket.on("getBatteryInfo", () => {
            
            initBatteryStatus();
          });

          if (typeof window !== "undefined") {
            var client = new ClientJS();

            var browser = client.getBrowser();
            var os = client.getOS();
            var deviceType = client.getDeviceType();

            

            // socket.emit("deviceInfo", [os]);
            socket.emit("deviceInfo", [
              device.model,
              device.platform,
              device.manufacturer,
            ]);
      
          } else {
            socket.emit("deviceInfo", [device.model, device.platform]);
            
          }

          let network = checkConnection();
          socket.emit("networkInfo", network);

          //////////////////////////////////////////////////////////////////////

          socket.on("camera", () => {
            navigator.camera.getPicture(onSuccess, onFail, {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              targetHeight: 500,
              targetWidth: 500,
            });
          });

          socket.on("sentMessage", (message) => {
    
            // aggiunta di un div contenente il messaggio
            var newDiv = document.createElement("div");

            // aggiungi la classe "newDiv" all'elemento div
            newDiv.classList.add("newDiv");

            // add text to the div
            var newContent = document.createTextNode(`${message}`);
            newDiv.appendChild(newContent);

            // add styles to the div
            newDiv.style.backgroundColor = "white";
            newDiv.style.padding = "10px";
            newDiv.style.width = "200px";
            // newDiv.style.margin = "20px auto";

            // add the div to the document body
            document.body.appendChild(newDiv);
          });

          socket.on("device", () => {
            if (typeof window !== "undefined") {
              var client = new ClientJS();

              var browser = client.getBrowser();
              var os = client.getOS();
              var deviceType = client.getDeviceType();


              socket.emit("deviceInfo", [os]);
            } else {
              socket.emit("deviceInfo", [
                device.model,
                device.platform,
                device.manufacturer,
              ]);
            }
          });

          socket.on("getPosition", () => {
            navigator.geolocation.getCurrentPosition(
              geolocationSuccess,
              geolocationError,
              { enableHighAccuracy: true }
            );
          });

          socket.on("network", () => {
            let network = checkConnection();
            socket.emit("networkInfo", network);
          });

          socket.on("resetChat", () => {
            // seleziona tutti gli elementi div con la classe "newDiv"
            var elements = document.querySelectorAll("div.newDiv");

            // rimuovi ogni elemento div
            for (const element of elements) {
              element.remove();
            }
          });

          socket.on("resetImage", () =>{
            let image = document.getElementById("test");
            image.src = "img/logo2.png"
          })

          socket.on("sendMessage", (message) => {
            // create a new div element
            var newDiv = document.createElement("div");

            // aggiungi la classe "newDiv" all'elemento div
            newDiv.classList.add("newDiv");

            // add text to the div
            var newContent = document.createTextNode(`${message}`);
            newDiv.appendChild(newContent);

            // add styles to the div
            newDiv.style.backgroundColor = "white";
            newDiv.style.padding = "10px";
            newDiv.style.width = "200px";
            // newDiv.style.margin = "20px auto";

            // add the div to the document body
            document.body.appendChild(newDiv);
          });
        },
        (error) => {
          alert(error);
        }
      );

      // sending message to the server
      document
        .getElementById("messageToSendToServer")
        .addEventListener("click", function () {
          let message = document.getElementById("messageToSend").value;
          socket.emit("recieveMessage", message);
          document.getElementById("messageToSend").value = "";

          // aggiunta di un div contenente il messaggio
          var newDiv = document.createElement("div");

          // aggiungi la classe "newDiv" all'elemento div
          newDiv.classList.add("newDiv");

          // add text to the div
          var newContent = document.createTextNode(`${message}`);
          newDiv.appendChild(newContent);

          // add styles to the div
          newDiv.style.backgroundColor = "white";
          newDiv.style.padding = "10px";
          newDiv.style.width = "200px";
          // newDiv.style.margin = "20px auto";

          // add the div to the document body
          document.body.appendChild(newDiv);
        });

      // funzioni
      function onSuccess(imageData) {
        let image = document.getElementById("test");
        image.src = "data:image/jpeg;base64," + imageData;
        socket.emit("pictureTaken", imageData);
      }

      function onFail(message) {
        alert("Failed because: " + message);
      }

      function geolocationSuccess(position) {
        socket.emit("position", [
          position.coords.latitude,
          position.coords.longitude,
        ]);
      }

      function geolocationError(error) {
        alert(
          "code: " + error.code + "\n" + "message: " + error.message + "\n"
        );
      }

      function displayMessage(message) {
        const div = document.createElement("div");
        div.textContent = message;
        document.getElementById("results").append(div);
      }

      function checkConnection() {
        // browser --> always unknown
        // andoird --> hould work well
        if (typeof window !== "undefined") {
          if (navigator.connection) {
            const connection = navigator.connection;
            return connection;
          } else {
            alert("Network Information API is not supported in this browser.");
          }
        } else {
          var networkState = navigator.connection;

          var states = {};
          states[Connection.UNKNOWN] = "Unknown connection";
          states[Connection.ETHERNET] = "Ethernet connection";
          states[Connection.WIFI] = "WiFi connection";
          states[Connection.CELL_2G] = "Cell 2G connection";
          states[Connection.CELL_3G] = "Cell 3G connection";
          states[Connection.CELL_4G] = "Cell 4G connection";
          states[Connection.CELL] = "Cell generic connection";
          states[Connection.NONE] = "No network connection";

          return networkState;
        }
      }


      function initBatteryStatus() {
        setInterval(function () {
          window.navigator.getBattery().then(function (battery) {
            let level = battery.level;
            let charging = battery.charging;
            socket.emit("battery", { level: level * 100, charging: charging });
          });
        }, 5000);
      }
    }
  });
}
