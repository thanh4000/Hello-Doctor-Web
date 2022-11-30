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
        userData
    })
}

module.exports = {
    handleLogin: handleLogin,
}