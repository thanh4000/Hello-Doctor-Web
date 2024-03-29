import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";

import "./HomePage.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow /> 
  }
    return (
        <>
            <HomeHeader />
            <Specialty settings = {settings}/>
            <MedicalFacility settings = {settings}/>
            <OutStandingDoctor settings = {settings}/>
            
            <HandBook settings = {settings}></HandBook>
            <div style={{height: '500px'}}></div>
        </>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
