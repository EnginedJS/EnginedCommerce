const { Server } = require('engined-grpc');

const gRPCService = Server();

module.exports = class gRPC extends gRPCService {};
