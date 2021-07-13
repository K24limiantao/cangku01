"use strict";
var Acl = require('acl');
var aclConfig = require('../config/acl_conf');
module.exports = function (app, express) {
    var acl = new Acl(new Acl.memoryBackend()); // eslint-disable-line
    acl.allow(aclConfig);
    return acl;
};
module.exports = [
    {
        roles: 'normal',
        allows: [
            { resources: ['/admin/reserve'], permissions: ['get'] }
        ]
    },
    {
        roles: 'admin',
        allows: [
            { resources: ['/admin/reserve', '/admin/sign', '/admin/set'], permissions: ['get'] },
            { resources: ['/admin/set/add-user', '/admin/set/modify-user'], permissions: ['post'] },
        ]
    },
    {
        roles: 'root',
        allows: [
            { resources: ['/admin/reserve', '/admin/sign', '/admin/set'], permissions: ['get'] },
        ]
    }
];
