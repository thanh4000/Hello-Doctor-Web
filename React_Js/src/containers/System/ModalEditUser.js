import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {emitter} from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

   constructor(props) {
        super(props);
        this.state = {
          id: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
        };

       
   }

   //lắng nghe sự kiện emit từ component cha
   //không cần lắng nghe sự kiện emitter vì đã có sẵn data
   

    componentDidMount() {
      let user = this.props.currentUser;
      if(user && !_.isEmpty(user)) {
        this.setState({
          id: user.id,
          email: user.email,
          password: 'hardcode',
          firstName: user.firstName,
          lastName:  user.lastName,
          phoneNumber: user.phoneNumber,
          address: user.address,
        })
      }
      console.log('didmount editModal ', this.props.currentUser); 
      
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
     
      let copyState = {...this.state}
      copyState[id] = event.target.value;
    
      this.setState({
        ...copyState,
      });
    }

    checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["email", "password", "firstName", "lastName", "address"];
      
      for(let i = 0; i < arrInput.length; i++)
      {
        console.log("check inside loop: ",  this.state[arrInput[i]], arrInput[i])
        if(this.state[arrInput[i]] === "")
        {
          isValid = false;
          alert("Mising paramenter: " + arrInput[i]);
          break;
        }
      }
      return isValid;
    }

    handleSaveUser = () => {
      console.log("checkValidate: ", this.checkValidateInput());
      let isValid = this.checkValidateInput();
      if(isValid)
      {
        //call api edit user
        // console.log("check props: ", this.props);
        this.props.editUser(this.state);
        // console.log("check state save changes: ", this.state);
      }
    }


    render() {
        console.log("check editModal props from parent: ", this.props);
        console.log("check child open editModal:", this.props.isOpenModalEditUser);
        return (
          <Modal
            isOpen={this.props.isOpen}
            toggle={() => {
              this.toggle();
            }}
            className="modal-user-container"
            size="lg"
            centered
          >
            <ModalHeader
              toggle={() => {
                this.toggle();
              }}
            >
              Edit a user
            </ModalHeader>
            <ModalBody>
              <div className="modal-user-body">
              <div className="input-container col-6">
                    <label>Email</label>
                    <input type="email" 
                    onChange={(event) => {this.handleOnchangeInput(event, "email")}} 
                    value = {this.state.email}
                    disabled
                  />
                  </div>
                  <div className="input-container col-6">
                    <label>Password</label>
                    <input 
                      type="password" 
                      onChange={(event) => {this.handleOnchangeInput(event, "password")}} 
                      value = {this.state.password}
                      disabled
                    />
                  </div>

                <div className="input-container">
                  <label>First name</label>
                  <input 
                    type="text" 
                    onChange={(event) => {this.handleOnchangeInput(event, "firstName")}}
                    value = {this.state.first}
                  />
                </div>
                
                <div className="input-container">
                  <label>Last name</label>
                  <input 
                    type="text" 
                    onChange={(event) => {this.handleOnchangeInput(event, "lastName")}} 
                    value = {this.state.last}
                  />
                </div>

                <div className="input-container ">
                  <label>Phone number</label>
                  <input 
                    type="text" 
                    onChange={(event) => {this.handleOnchangeInput(event, "phoneNumber")}} 
                    value = {this.state.phoneNumber}
                  />
                </div>

                <div className="input-container">
                  <label>Address</label>
                  <input 
                    type="text" 
                    onChange={(event) => {this.handleOnchangeInput(event, "address")}} 
                    value = {this.state.address}
                  />
                </div>
              </div>

            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className='px-3'
                onClick={() => {
                  this.handleSaveUser();
                }}
              >
                Save Changes
              </Button>{" "}
              <Button
                color="secondary"
                className='px-3'
                onClick={() => {
                  this.toggle();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



