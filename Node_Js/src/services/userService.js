import db from "../models/index"
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //trả về biến userData cho controller, 
            //controller trả về cho phía người dùng?
            let userData = {};

            let isExist = await checkUserEmail(email);
            //tồn tại thời điểm kiểm tra có người xóa bảng
            //ghi của user đó nên check lại để tránh lỗi
            if(isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    //where {email: usermail}
                    where: {email: email},
                    raw: true, //chỉ khi raw = true thì dữ liệu lấy ở dạng obj
                });
                if(user) {
                    //compare password 
                    //bcrypt.compareSync("not bacon", hash); // true
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'oke';
                        
                        console.log(user);
                        delete user.password;
                        userData.User = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                     
                } else {
                    //return error
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                    
                }
                resolve(userData);
            } 
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Email isn't exist!`;
            }
            resolve(userData);
        } catch(e) {
            reject(e)
        }
    })
} 

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try{
            //khi truy cập vao db phải viết đúng tên model
            let user = await db.User.findOne({
                where: {email : userEmail},
            })
            if(user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
}