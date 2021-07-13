const Acl = require('acl');
const aclConfig = require('../config/acl_conf');

module.exports = function (app:any, express:any) {
    const acl = new Acl(new Acl.memoryBackend()); // eslint-disable-line

    acl.allow(aclConfig);

    return acl;
};

module.exports = [
    {
        roles : 'normal',   // 普通用户
        allows : [
            { resources : ['/admin/reserve'],permissions : ['get'] }
        ]
    },
    {
        roles: 'admin',   // 管理员
        allows: [
            { resources: ['/admin/reserve', '/admin/sign', '/admin/set'], permissions: ['get'] },
            { resources: ['/admin/set/add-user', '/admin/set/modify-user'], permissions: ['post'] },
        ]
    },
    {
        roles: 'root',  // 最高权限
        allows: [
            { resources: ['/admin/reserve', '/admin/sign', '/admin/set'], permissions: ['get'] },
        ]
    }
]