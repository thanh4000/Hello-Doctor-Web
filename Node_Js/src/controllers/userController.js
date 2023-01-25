import userService from "../services/userService";

let handleLogin = async (req, res) => {
    //truyền lên body, lấy email người dùng
    let email = req.body.email;
    
    console.log('yourEmail', email);

    let password = req.body.password;
 
    //bỏ trường hợp email bằng null, undefined, "" (rỗng)
    //thay vì if(email === '' || email === 'undefined' || email === null )
    if(!email || !password) {
        return res.status(500).json({
            //trả về mã lỗi 1
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    //
    //check email exist
    //compare password

    //có 2 ngoại lệ 1 email không có trong hệ thống
    //password không đúng, chỉ bắt khi biết email có trong hệ thống
    
    //return userInfor
    //acess_token: JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        //nếu trường hợp có biến userData thì trả về
        //nếu không thì trả về {}
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All, id
    console.log('id: ', req.query.id);
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users: [],
        })
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        users,
    })
}

let handleCreateNewUser = async (req, res) => {
    let data = req.body;

    let message = await userService.createNewUser(data);

    console.log('message: ', message);

    return res.status(200).json(message);
}

let handleEditNewUser = async (req, res) => {
    let data = req.body;
    let message = await userService.editUser(data);
    console.log('message: ', message);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let userId = req.body.id;

    if(!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
        })
    }
    let message = await userService.deleteUser(userId);
    console.log('message: ', message);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditNewUser: handleEditNewUser,
    handleDeleteUser: handleDeleteUser,
}