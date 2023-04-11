import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHospitalAlt, faHospitalSymbol, faHospitalUser, faHospitalWide, faMicroscope, faMobilePhone, faPhoneAlt, faPhotoVideo, faProcedures, faQuestion, faSearch, faTooth, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

import { FormattedMessage } from 'react-intl';

import "./HomeHeader.scss";

import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions/appActions";



class HomeHeader extends Component {

  changeLanguage = (language) => {
    // alert(lang);
    //phần định nghĩa changeLanguageAppRedux ngay ở dưới vì vầy chỉ sử dụng 
    //được ở component này
    this.props.changeLanguageAppRedux(language);
  }

  render() {
    // console.log("check props: ", this.props);
    let language = this.props.language;
    console.log("language: ", language);

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
              <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
              <div className="sub-title"><FormattedMessage id="homeheader.searchdoctor"/></div>
            </div>
            <div className="child-content">
              <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
              <div className="sub-title"><FormattedMessage id="homeheader.select-room"/></div>
            </div>
            <div className="child-content">
              <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
              <div className="sub-title"><FormattedMessage id="homeheader.select-doc"/></div>
            </div>
            <div className="child-content">
              <div><b><FormattedMessage id="homeheader.fee"/></b></div>
              <div className="sub-title"><FormattedMessage id="homeheader.check-health"/></div>
            </div>
          </div>
            
          <div className="right-content">
            <div className="support">
              <FontAwesomeIcon className="icon-question" icon={faQuestion  }></FontAwesomeIcon>
              <FormattedMessage id="homeheader.support"/>
              <div 
                className={language === LANGUAGES.VI ?
                 'language-vi active' : 'language-vi'}>
                 <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                  </span>
                </div>
              {"|"}
              <div 
                className={language === LANGUAGES.EN ? 
                'language-en active' : 'language-en'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}> 
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="home-header-banner">          
          <div className="content-up">
            <div className="title-1"><FormattedMessage id="banner.title1"/></div>
            <div className="title-2"><FormattedMessage id="banner.title2"/></div>
            
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
                <div className="text-child"><FormattedMessage id="banner.child1"/></div>
              </div>

              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faMobilePhone} />
                </div>
                <div className="text-child"><FormattedMessage id="banner.child2"/></div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faProcedures} />
                </div>
                <div className="text-child"><FormattedMessage id="banner.child3"/></div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faMicroscope} />
                </div>
                <div className="text-child"><FormattedMessage id="banner.child4"/></div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faUserDoctor} />
                </div>
                <div className="text-child"><FormattedMessage id="banner.child5"/></div>
              </div>
              
              <div className="option-child">
                <div className="icon-child-wrapper">
                  <FontAwesomeIcon className="icon-child" icon={faTooth} />
                </div>
                <div className="text-child"><FormattedMessage id="banner.child6"/></div>
              </div>
              
            </div>  
          </div>
          
        </div>

        <div className="super-height">

        </div>
      </Fragment>
    );
  }
}


//các state của redux sẽ được map vào props của component
//thay vì phải map từ cha sang con
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};


//định nghĩa dispatch(changeLanguageApp(data))  phải đúng vs trong appActions
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  };
};

//giúp kết nối giữa react và redux vs nhau
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
