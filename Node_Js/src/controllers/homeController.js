
// ?
import db from '../models/index'
import CRUDservice from '../services/CRUDservice';

import CRUD from "../services/CRUDservice"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            //chuyển 1object json thành tring
            data: JSON.stringify(data)
        });
    }catch(e) {
        console.log(e);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async(req, res) => {
    let message = await CRUDservice.createNewUser(req.body);

    console.log(message);
    //req.body: các tham số lấy được từ 
    //client gửi lên server
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log('-----------------------');
    console.log(data);
    console.log('-----------------------');

    return res.render('./displayCRUD.ejs', {
        //cách truyền dữ liệu liệu cho file ejs 
        //ejs sẽ hiểu dataTable là biến data ở phía trên
            dataTable: data,
    });
}  

let getEditCRUD = async (req, res) => {
    //query ra thuộc tính id từ đường link request
    let userId = req.query.id;
    
    if(userId) {
        //chọc vào db lấy r người dùng có cùng số id
        let userData = await CRUDservice.getUserInfoById(userId);
        
        //render ra 1 trang cho cho người dùng cập nhật các thuộc tính
        return res.render('editCRUD.ejs', {
            user: userData,
        });
    } 
    else 
    {
        return res.send("User Not Found, Cannot edit!");    
    }
    // return res.send("User Not Found, Cannot edit!");    
}

let putCRUD = async (req, res) => {
    //lấy các dữ liệu từ form edit-crud
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    //sau khi upate thì hiển thị lại danh sách các user
    return allUsers;
    res.redirect('/get-crud');
}

let deleteCRUD = async (req, res) => {
    //vd: delete-crud?id=1
    //dấu '?' là muốn tìm kiếm chỗ res.query
    let userId = req.query.id;

    if(!userId) {
           return res.status(200).json({
               errCode: 1,
               errMessage: 'Missing required parameter!',
           })
       }
       let message = await CRUDservice.deleteUser(userId);
       console.log('message: ', message);
       return res.status(200).json(message);
}

/*
object thì có key vs value
export ra 1 object có thể xuất ra nhìu 
hàm 
*/
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}