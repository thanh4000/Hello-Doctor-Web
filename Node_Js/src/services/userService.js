import db from "../models/index"
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if(userId === "ALL") {
                users = await db.User.findAll({
                    // attributes: ['id', 'email', 'roleId'],
                    // raw: true,
                    attributes: {
                        exclude: ['password'],
                    }
                });
            } 
            else if(userId && userId !== "ALL") {
                users = await db.User.findOne({
                    // attributes: ['id', 'email', 'roleId'],
                    where: {id: userId},
                    // raw: true,
                    attributes: {
                        exclude: ['password'],
                    }
                });
            }
            console.log(users);
            resolve(users);
        }
        catch(e) {
            reject(e);
        }
   
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        //await chờ để sử dụng hàm thư viện băm mật khẩu ra đã
        let hashPassword = await bcrypt.hashSync(password, salt);
        //trả về hashPassword
        resolve(hashPassword);
      } catch (e) {
        //bắt exception
        reject(e);
      }
    });
  };

  //create a function to make sure data is not null before create a new user
let checkData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(data.email === null || data.email === undefined || data.email === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email has to be not empty!'
                });
            }
            if(data.password === null || data.password === undefined || data.password === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your password has to be not empty!'
                });
            }
            if(data.firstName === null || data.firstName === undefined || data.firstName === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your firstName has to be not empty!'
                });
            }
            if(data.lastName === null || data.lastName === undefined || data.lastName === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your lastName has to be not empty!'
                });
            }
            if(data.address === null || data.address === undefined || data.address === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your address has to be not empty!'
                });
            }
            if(data.phoneNumber === null || data.phoneNumber === undefined || data.phoneNumber === "") {
                resolve({
                    errCode: 1,
                    errMessage: 'Your phoneNumber has to be not empty!'
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'ok!'
            });
        } catch(e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            let checkDataMessage = checkData(data);
            if(check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already exist!'
                });
            }
            //check data is not null
            else if(checkDataMessage.errCode > 0) {
                console.log(checkDataMessage);
                resolve(checkDataMessage);
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                //chuẩn bị map đến table
                //create = create into user
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === 1 ? true : false ,
            
                    roleId: data.roleId
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Ok! create new user success!'
                });
            }
        } catch(e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'User id is required!'
                });
            }

            //không check data is not null
            //vì nếu để trống 1 thuộc tính thì sequelize sẽ không update
            // let checkDataerrMessage = checkData(data);
            // if(checkDataerrMessage.errCode !== 0) {
            //     console.log(checkDataerrMessage);
            //     resolve(checkDataerrMessage);
            // }

          let user = await db.User.findOne({
            where: {id: data.id},
            raw: false
          })   
          if(user) {
            user.email = data.email;
            user.firstName =  data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            await user.save();
            resolve({
                errCode: 0,
                errMessage: `Ok! Updated user success!`
            });
          }else {
            resolve({
                errCode: 1,
                errMessage: `User's not found!`
            });
          }
          
        }catch(e) {
          reject(e);
        }
      }); 
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: {id: userId}
        })
        if(!user) {
            console.log("user isn't exist!");
            resolve({
                errCode: 2,
                errMessage: `User isn't exist!`
            });
        }
        else {
            console.log(user);
            await db.User.destroy({
                where: {id: userId}
            });
            
            resolve({
                errCode: 0,
                errMessage: `Ok! Deleted user success!`
            });
        }
      } 
      catch(e) {
        reject(e);
      }
    })
  }

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
}