const _ = require('lodash');
const crtpto = require('crypto');
logger = require('../common/logger');
const tool = require('../common/tool');
//models = require('../models');
const sequelize = models.Sequelize;
//Op = models.Sequelize.Op;

//系统管理控制器
class systemController {
    //#region 用户管理
    
    //用户管理页面
    async showUserList(req,res,next){
        res.render("system/user-list",{
            pageTitle : "用户管理"
        })
    }
    //获取用户分页数据
    async getUserPage(req,res,next){
        let offset = +req.query.offset || 0,
            limit = +req.query.limit || 15;
        const data = await models.user.findAndCountAll({
            where : {},
            limit : limit,
            offset : offset
        });
        res.send({
            total : data.count,
            rows : data.rows
        });
    }
    
    //显示用户编辑页面
    async showUserEdit(req,res,next){
        let id = req.params.id;
        if(id == 0){
            res.render('system/user-edit',{
                pageTitle : "用户管理",
                action : 'add'
            });
        }else{
            let model = await models.user.findByPk(id);
            if(!model) throw Error("没有找到该用户！");
            res.render('system/user-edit',{
                pageTitle : " 用户管理",
                action : 'edit',
                model : model
            });
        }
    }

    //保存编辑用户数据
    async saveUserEdit(req,res,next){
        let id = req.params.id;
        if(id == 0){
            let branch_id = req.body.branch_id || 0;
            let branch_model = await models.branch.findByPk(branch_id);
            //检查用户名
            let usr = await models.user.findAll({
                where : {
                    login_name : req.body.login_name
                }
            });
            if(usr.length > 0){
                res.send({
                    state : false,
                    msg : "用户名已存在！"
                });
                return;
            }
            //新增
            await models.user.create({
                login_name : req.body.log_name || '',
                login_password: crypto.createHash('md5').update(req.body.login_password).digest('hex'),
                branch_id: branch_id,
                branch_name: !branch_model ? '' : branch_model.name,
                position_id: req.body.position_id || '',
                position_name: req.body.position_name || '',
                real_name: req.body.real_name || '',
                mobile: req.body.mobile || '',
                is_enabled: req.body.is_enabled
            });
        }else{
            //编辑
            let model = await models.user.findByPk(id);
            if (typeof(req.body.login_name) !== 'undefined') {
                //检查用户名
                let usr = await models.user.findAll({
                    where: {
                        id: {
                            [Op.ne]: id
                        },
                        login_name: req.body.login_name
                    }
                });
                if (usr.length > 0) {
                    res.send({
                        state: false,
                        msg: "用户名已存在！"
                    });
                    return;
                }
                model.login_name = req.body.login_name;
            }
            if (typeof(req.body.login_password) !== 'undefined' && req.body.login_password !== '') {
                model.login_password = crypto.createHash('md5').update(req.body.login_password).digest('hex');
            }
            if (typeof(req.body.branch_id) !== 'undefined')
                model.branch_id = req.body.branch_id;
            if (model.branch_id !== 0) {
                let branch_model = await models.branch.findByPk(model.branch_id);
                model.branch_name = !branch_model ? '' : branch_model.name;
            }
            if (typeof(req.body.position_id) !== 'undefined')
                model.position_id = req.body.position_id;
            if (typeof(req.body.position_name) !== 'undefined')
                model.position_name = req.body.position_name;
            if (typeof(req.body.real_name) !== 'undefined')
                model.real_name = req.body.real_name;
            if (typeof(req.body.mobile) !== 'undefined')
                model.mobile = req.body.mobile;
            if (typeof(req.body.is_enabled) !== 'undefined')
                model.is_enabled = req.body.is_enabled;

            await model.save();
        }
        res.send({
            state : true,
            msg : "保存成功！"
        });
    }
    //删除用户
    async deleteUser(req, res, next) {
        let id = req.params.id;
        await models.user.destroy({
            where: {
                id: id
            }
        });
        res.send({
            state: true,
            msg: "删除成功！"
        });
    }
    //#endregion 

    //#region  菜单管理
    //菜单管理页面
    async showMenuList(req,res,next){
        res.render("system/menu-list",)
    }
}


