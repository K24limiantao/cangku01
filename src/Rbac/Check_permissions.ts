//import rbac from './Usage';

import { rbac } from "./Usage";

 
const can01 = await rbac.can('admin', 'create', 'article');
if (can01) {
  console.log('Admin is able create article');
}
 
// 或者您可以使用管理角色的实例。
const admin = await rbac.getRole('admin');
if (!admin) {
  //return console.log('Role 不存在！');
  console.log('Role 不存在！');
}
 
const can02 = await admin.can('create', 'article');
if (can02) {
  console.log('Admin is able create article');    
}


export { };

