class mianController{
    async showMain(req:any,res:any,next:any){
        res.render("main/index",{
            pageTitle : "主页"
        })
    }
}

module.exports = new mianController();