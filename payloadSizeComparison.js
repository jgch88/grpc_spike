const protobuf = require("protobufjs");
const fs = require("fs");

// comparing size of protobuf vs JSON
// https://github.com/protobufjs/protobuf.js/blob/master/README.md#installation
protobuf.load("uber.proto", (err, root) => {
  if (err)
  throw err;

  const Location = root.lookupType("uber.Location");
  const LocationPayload = root.lookupType("uber.LocationPayload");

  const payload = { "latitude": 101.3, "longitude": 56.3, "timestamp": 1 };
  var locationMessage = Location.create(payload);
  // var locationBuffer = Location.encode(locationMessage).finish();
  // console.log(`protobuf message in bytes: ${locationBuffer.byteLength}`);

  // https://github.com/protobufjs/protobuf.js/issues/204
  const locationPayloadMessage = LocationPayload.create();
  for (let i = 0; i < 7; i++) {
    locationPayloadMessage.locations.push(locationMessage)
  }
  // console.log(locationPayloadMessage)
  const locationPayloadBuffer = LocationPayload.encode(locationPayloadMessage).finish();
  console.log(`protobuf message in bytes: ${locationPayloadBuffer.byteLength}`)
});

const stats = fs.statSync("locationData.json");
console.log(`JSON file in bytes: ${stats.size}`)