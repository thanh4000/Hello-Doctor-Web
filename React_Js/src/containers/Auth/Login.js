import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginApi } from "../../services/userService";

import { divide } from "lodash";


class Login extends Component {
  //khai báo các state trong này
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: ""
    };
  }

  handleOnchangeInputUserName = (even) => {
    this.setState({
      username: even.target.value,
    });
    console.log(even.target.value);
  };

  handleOnchangeInputPassword = (even) => {
    this.setState({
      password: even.target.value,
    });
    console.log(even.target.value);
  };

  handleLogin = async () => {
    console.log(
      "username: ",
      this.state.username,
      "password: ",
      this.state.password
    );
    console.log("allState: ", this.state);
   
    this.setState({
      errorMessage: "",
    }); 

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      console.log("data: ", data);
      if(data && data.errCode != 0) 
      {
        this.setState({
          errorMessage: data.message,
        });
      }
      else if(data && data.errCode === 0) 
      {
        this.props.userLoginSuccess(data.user);

        console.log("Login success!!!");
      }
    } catch(err) {
      //err.response là 1 object
      console.log("error: ", err.response.data.message);
      if(err.response.data)
      {
        this.setState({
          errorMessage: err.response.data.message,
        });
      }
    }
  };

  handleShowHiddenPassword = () => {
    this.setState({
        //gán bằng giá trị ngược lại của isShowPassword
        isShowPassword: !this.state.isShowPassword
    })
  }

  render() {
    return (
      //Viết cú pháp Jsx
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>UserName</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                //xử lí sự kiện OnChange
                onChange={(even) => this.handleOnchangeInputUserName(even)}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                //nếu biến isShowPassword mà là true thì 
                //đổi cái type thành text, ko thì password
                  type={this.state.isShowPassword ? 'text' : 'password' }
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(even) => this.handleOnchangeInputPassword(even)}
                />

                <span
                onClick={() => {this.handleShowHiddenPassword()}}
                >    
                    <i className={this.state.isShowPassword ?  "fas fa-eye" : "fas fa-eye-slash"}></i>

                    
                </span>

              </div>
            </div>

            <div style={{color: "red"}}>
              <span>{this.state.errorMessage}</span>
            </div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>

            <div className="col-12 text-center">
              <span className="text-other-login">Or sign in with:</span>
            </div>

            <div className="col-12 social-login">
              <i className="social-login-icon fab fa-google"></i>

              <i className="social-login-icon fab fa-facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//2 cái ni là của redux
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    
    // userLoginFail: () => dispatch(actions.userLoginFail()),
  
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
