const PROTO_PATH = __dirname + '/uber.proto';
const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader'); // just the rpc library, not the actual pb class

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

let uberGRPC = grpc.loadPackageDefinition(packageDefinition).uber;

function main() {
  let client = new uberGRPC.LocationService('localhost:4500', grpc.credentials.createInsecure());
  let raw = fs.readFileSync('locationData.json');
  let data = JSON.parse(raw);

  client.sendLocations({locations: data}, function(err, response) {
    console.log(`Response: ${JSON.stringify(response.timestamps)}, ${err}`);
  });
}

main();