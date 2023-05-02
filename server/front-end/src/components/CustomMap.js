import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
export function CustomMap({ google, locations }) {
  return (
    <Map
      google={google}
      zoom={15}
      style={{ width: "800px", height: "300px" }}
      initialCenter={{
        lat: locations[0]+0.0886,
        lng: locations[1]-0.0552,
      }}
    >
      <Marker position={{ lat: locations[0]+0.0886, lng: locations[1]-0.0552}}></Marker>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDHut-t2_cknRPUB4qm0ERyJkpr8c6wU9U",
})(CustomMap);
