import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "../containers/Auth/Login";

import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";

import HomePage from "../containers/HomePage/HomePage"



class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        {/* 
                lúc vào phải bọc 1 cái router
                Muốn giữ data của màn hình thì dùng history
                chức năng lưu lại lịch sử -> đỡ phải gọi APIs nhìu lần
                 */}
        <Router history={history}>
          <div className="main-container">
            {/* check có login hay ko
                        nếu loggin r thì render ra header*/}
            {this.props.isLoggedIn && <Header />}

            <span className="content-container">
              <Switch>
                {/* có 3 route: HOME, LOGIN, SYSTEM */}
                <Route path={path.HOME} exact component={Home} />

                {/* userIsNotAuthenticated: sử dụng hàm bọc xem thử
                                người dùng đã đăng nhập hay chưa 
                                nó chạy vào đường path rồi mới chạy đến câu lệnh component*/}
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />

                {/* khai báo path.SYSTEM: trong file constant */}
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                 <Route
                  path={path.HOMEPAGE}
                  component={HomePage}
                />
              </Switch>
            </span>

            <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
