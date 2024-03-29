import express from "express";

import homeController from "../controllers/homeController";

import userController from "../controllers/userController";

// home controller giống 1 object 
// của file ni

let router = express.Router();

let initWebRoutes = (app) => {
    // tạo đường link 

    // gọi đên file homeController
    // ->gọi hàm getHomePage
    router.get('/', homeController.getHomePage);

    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);

    //lấy dữ liệu trong database hiển thị ra màn hình
    router.get('/get-crud', homeController.displayGetCRUD);

    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);

    router.delete('/delete-crud', homeController.deleteCRUD);


    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.post('/api/create-new-user', userController.handleCreateNewUser);
    
    router.put('/api/edit-user', userController.handleEditNewUser);
    
    router.delete('/api/delete-user', userController.handleDeleteUser);
    //viết theo chuẩn rest api
    /*
    lấy thông tin: get
    tạo thông tin: post
    xóa: delete
    update: push
    */

    return app.use("/", router);
}

module.exports = initWebRoutes;



