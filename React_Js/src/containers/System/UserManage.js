  import React, { Component } from 'react';
  import { FormattedMessage } from 'react-intl';
  import { connect } from 'react-redux';
  import './UserManage.scss';
  import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import {faPencilAlt, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'
  import {emitter} from '../../utils/emitter';

  import ModalUser from './ModalUser';
  import ModalEditUser from './ModalEditUser';
  class UserManage extends Component {

      constructor(props) {
          super(props);
          this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {

            }
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

      
      toggleUserModal = () => {
        this.setState({
          isOpenModalUser: !this.state.isOpenModalUser,
        })
      }
      
      
      toggleEditModal = () => {
        this.setState({
          isOpenModalEditUser: !this.state.isOpenModalEditUser,
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

            //dùng emitter để fire 1 component ở con
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
          }
        } catch(e) {

        }
        console.log("check data from child and message: ", data);
      }

      handleAddNewUser = () => {
        this.setState({
          isOpenModalUser: true,
        })
        // console.log("check add new user state", this.state.isOpenModalUser);
      }

      handleDeleteUser = async (user) => {
        console.log("delete user: ", user);
        try {
          let res = await deleteUserService(user.id);
          console.log(res);
          if(res && res.errCode > 0)
          {
            alert(res.errMessage);
          } else {
            await this.getAllUsersFromReact();
          }
        } catch(e) 
        {
          console.log('error: ', e);
        }
      }

      handleEditUser = (user) => {
        console.log("check edit user", user);
        this.setState({
          isOpenModalEditUser: true,
          userEdit: user,
        })
      }

      doEditUser = async (user) => {
       
        
        
        try {
          let res = await editUserService(user);
          if(res && res.errCode == 0)
          {
            this.setState({
              isOpenModalEditUser: false,
            })
            //fetch lại tất cả những người dùng để thấy
            //thông tin được cập nhật
            await this.getAllUsersFromReact();
          }else {
            alert(res.errMessage);
          }
        } catch(e) {
          console.log("error when saving: ", e);
        }
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
              
              {
                this.state.isOpenModalEditUser &&
                <ModalEditUser
                  isOpen = {this.state.isOpenModalEditUser}
                  toggleFromParent = {this.toggleEditModal}
                  currentUser = {this.state.userEdit}
                  editUser = {this.doEditUser}
                />
              }
              <div className="title text-center">Manage user with Tony</div>
              <div className='mx-1'>
                <button className='btn btn-primary px-3 d-flex align-items-center'
                onClick={() => this.handleAddNewUser()}>
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
                            <button className='btn-edit' onClick={() => {
                              this.handleEditUser(item);
                            }}>
                              <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>    
                            </button>
                            
                            <button 
                              className='btn-delete'
                              onClick={() => {this.handleDeleteUser(item)}}
                            >
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