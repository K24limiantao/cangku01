import { RBAC } from 'rbac'; 
var RBAC = require('rbac').default;

export const rbac = new RBAC({
  //角色
  roles: ['superadmin', 'admin', 'user', 'guest'],
  //权限
  permissions: {
    //用户
    user: ['create', 'delete'],
    //密码
    password: ['change', 'forgot'],
    //文章
    article: ['create'],
    rbac: ['update'],
  },
  //角色拥有的对应权限
  grants: {
    guest: ['create_user', 'forgot_password'],
    user: ['change_password'],
    admin: ['user', 'delete_user', 'update_rbac'],
    superadmin: ['admin'],
  },
});
 
await rbac.init();