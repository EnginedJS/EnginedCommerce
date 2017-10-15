const path = require('path');
const { gRPCService } = require('engined-member');

const Service = gRPCService({
	protoPath: path.join(__dirname, '..', 'proto', 'Member')
});

module.exports = class MemberGRPC extends Service {

};
