import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService} from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'

import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrUsers: [],
           isOpenModalUser: false,
        };
    }

    async componentDidMount() {
      await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async() => {
      let response = await getAllUsers('ALL');
        if(response && response.errCode === 0)
        {
            this.setState({
                arrUsers:  response.users
            })
            
        }
    }

    handAddNewUser = () => {
      this.setState({
        isOpenModalUser: true,
      })
    }

    toggleUserModal = () => {
      this.setState({
        isOpenModalUser: !this.state.isOpenModalUser,
      })
    }

    createNewUser = async (data) => {
      try {
        let response = await createNewUserService(data);
        console.log('respone create user: ', response);
        if(response && response.errCode > 0)
        {
          alert(response.errMessage);
        } else {
          await this.getAllUsersFromReact();
          this.setState({
            isOpenModalUser: false,
          })
        }
      } catch(e) {

      }
      console.log("check data from child and message: ", data);
    }

    /* Life cycle
    Run component nó sẽ chạy trình tự như sau:
    1. run constructor-> init state

    2. Did mount (set state trc khi nó render ra màn hình) 
    dùng để thay đổi giá trị cuả state

    Mount: born, Unmount: die

    3. render
    */

    render() {
      
      let arrUsers = this.state.arrUsers;
      console.log('check arrUsers: ', arrUsers);
        return (
          <div className="user-container">
            <ModalUser 
              isOpen = {this.state.isOpenModalUser}
              toggleFromParent = {this.toggleUserModal}
              createNewUser = {this.createNewUser}
            />
            <div className="title text-center">Manage user with Tony</div>
            <div className='mx-1'>
              <button className='btn btn-primary px-3 d-flex align-items-center'
              onClick={() => this.handAddNewUser()}>
                <FontAwesomeIcon className='px-1' icon={faPlus} />
                
                <p className='d-inline m-0'>Add New Person</p>
              </button>
            </div>
            <div className="users-table mt-3 mx-1">
              <table id="customers">
                <tr>
                  <th>Email</th>
                  
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Address</th>
                 <th>Actions</th>
                </tr>
              
                {
                    arrUsers && arrUsers.map((item, index) => {
                      return (
                        <tr>
                        <td>{item.email}</td>
                       
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button className='btn-edit'>
                            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>    
                          </button>
                          
                          <button className='btn-delete'>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                        </tr>
                      )
                    })
                  }
                
              </table>
            </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

/**


 */