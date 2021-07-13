/*import express from 'express';
import { RBAC } from 'rbac';
import secure from 'rbac/controllers/express';
 
// your custom controller for express
function adminController(req:any, res:any, next:any) {
  res.send('Hello admin');
}
 
const app = express();
const rbac = new RBAC({
  roles: ['admin', 'user'],
});
 
await rbac.init();
 
// setup express routes
app.use('/admin', secure.hasRole(rbac, 'admin'), adminController);*/