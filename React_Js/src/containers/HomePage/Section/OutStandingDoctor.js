import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import './OutStandingDoctor.scss'
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  
  render() {
    return (
        <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                    <button className="btn-section">TÌM KIẾM</button>
                </div>

                <div className="section-body">
                    <Slider {...this.props.settings}>
                        {console.log(this.props.settings)}
                        <div className="section-customize">  
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                            
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 1</div>
                                </div>   
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                       
                                                
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 2</div>
                                </div>
                            </div>        
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                            
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 3</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                            
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 4</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                            
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 5</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-imge section-outstanding-doctor" alt="" />
                                </div>                            
                                <div className="position text-center">
                                    <div>Bác sĩ Nguyễn Duy Hưng 1</div> 
                                    <div>Da liễu 6</div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
