import bcrypt from "bcryptjs";

//cập nhật db để up vào db
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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

      resolve("oke! create a new user succeed!");
    } catch (e) {
      reject(e);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        //db.User.findAll : từ db, model tên User, tìm kiếm tất cả đối tượng
        //giúp ẩn bới các thuộc tính ko cần khi hiển thị
        raw: true,
      });
      
      //resolve giống hàm return
      resolve(users);
    } catch(e) {
      //nếu có lỗi xảy ra, nhảy ngay vào hàm catch->thấy đc lỗi
      reject(e);
    }
  })
}

let getUserInfoById = (userId) => {
  return new Promise (async(resolve, reject) => {
    try{
      let user = await db.User.findOne({
        where: {id: userId},
        raw: true
      })

      if(user) {
        resolve(user);
      }
      else {
        resolve([])
      }

    }catch(e) {
      reject(e);
    }
  })
}

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await db.User.findOne({
        where: {id: data.id}
      })   
      if(user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }else {
        resolve();
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
              message: `User isn't exist!`
          });
      }
      else {
          console.log("deleted user!");
          await user.destroy();
          resolve({
              errCode: 0,
              message: `Ok! Delete user success!`
          });
      }
    } 
    catch(e) {
      reject(e);
    }
  })
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData, 
  deleteUser: deleteUser,
};
