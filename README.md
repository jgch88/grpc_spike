# gRPC / protobuf notes

## Credits
Adapted from https://adityasridhar.com/posts/how-to-easily-use-grpc-and-protocol-buffers-with-nodejs

## Goals
Set up client / server
Compare payload sizes with JSON

## Imaginary business case
- Uber service where user's mobile sends an array of latitude / longitude / longitude info

## Server
- defines a remote procedure service as a function, that takes a payload and returns a response
- array is defined via `repeated`