const PROTO_PATH = __dirname + '/uber.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

let uberGRPC = grpc.loadPackageDefinition(packageDefinition).uber; // package

// js implementation of service's procedure
function sendLocations(call, callback) {
  // call.request = payload
  // callback = response
  console.log(call.request.locations);
  const timestamps = call.request.locations.map(location => location.timestamp)
  callback(null, 
    { timestamps }
  );
}

function main() {
  let server = new grpc.Server();
  server.addService(uberGRPC.LocationService.service, {sendLocations: sendLocations});
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();