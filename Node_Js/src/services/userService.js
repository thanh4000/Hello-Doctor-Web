import db from "../models/index"
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //trả về biến userData cho controller, 
            //controller trả về cho phía người dùng?
            let userData = {};

            let isExist = await checkUserEmail(email);
            if(isExist) {
                //user already exist
                //compare password
                resolve();

                isExist = await compareUserPassword(password);
                if(isExist) {
                    //Login success
                    resolve();
                }
                else {
                    //Login failed
                    userData.errCode = 1;
                    userData.errMessage = `Wrong password`;
                    resolve();
                }
            } 
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Email isn't exist!`;
                resolve(userData);
            }
        } catch(e) {
            reject(e)
        }
    })
} 

let compareUserPassword = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = hashUserPassword(data.password);
            let user = await db.User.findOne({
                where: {email : userEmail},
            })
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