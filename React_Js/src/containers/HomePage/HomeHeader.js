import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHospitalAlt, faHospitalSymbol, faHospitalUser, faHospitalWide, faMicroscope, faMobilePhone, faPhoneAlt, faPhotoVideo, faProcedures, faQuestion, faSearch, faTooth, faUserDoctor } from "@fortawesome/free-solid-svg-icons";



import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <button class="buger-bar">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </button>
            <div className="header-logo">
              <img src="" alt="" />

              {/* css inline display bloc */}
              
            </div>
            
          </div>
          <div className="center-content">
            <div className="child-content">
              <div><b>Chuyên khoa</b></div>
              <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
            </div>
            <div className="child-content">
              <div><b>Cơ sở y tế</b></div>
              <div className="sub-title">chọn bệnh viện phòng khám</div>
            </div>
            <div className="child-content">
              <div><b>Bác sĩ</b></div>
              <div className="sub-title">Chọn bác sĩ giỏi</div>
            </div>
            <div className="child-content">
              <div><b>Gói khám</b></div>
              <div className="sub-title">Khám sức khỏe tổng quát</div>
            </div>
          </div>
            
          <div className="right-content">
            <div className="support">
              <FontAwesomeIcon className="icon-question" icon={faQuestion  }></FontAwesomeIcon>
              Hỗ trợ VN
            </div>
          </div>
        </div>
        </div>

        <div className="home-header-banner">          
          <div className="content-up">
            <div className="title-1">NỀN TẢNG Y TẾ</div>
            <div className="title-2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            
            <div className="search">
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input type="text"  placeholder="Tìm chuyên khoa khám bệnh"/>
            </div>
          </div>

          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faHospitalAlt} />
                </div>
                <div className="text-child">Khám Chuyên Khoa</div>
              </div>

              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faMobilePhone} />
                </div>
                <div className="text-child">Khám Từ Xa</div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faProcedures} />
                </div>
                <div className="text-child">Khám Tổng Quát</div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faMicroscope} />
                </div>
                <div className="text-child">Xét Nghiệm Y Học</div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faUserDoctor} />
                </div>
                <div className="text-child">Sức Khỏe Tinh Thần</div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faTooth} />
                </div>
                <div className="text-child">Khám Nha Khoa</div>
              </div>
              
            </div>  
          </div>
          
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
