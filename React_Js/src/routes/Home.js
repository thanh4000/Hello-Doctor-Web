import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        // check tiếp đã login hay chưa?
        const { isLoggedIn } = this.props;

        //nếu đã login rồi thì redirect đến route: /system/user-manage
        //nếu chưa thì redirect đến route: '/login'
        //vầy file login thì sẽ ứng với component nào?
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
