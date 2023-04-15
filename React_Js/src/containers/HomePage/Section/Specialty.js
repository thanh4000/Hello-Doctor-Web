import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "./Specialty.scss";


// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "green" }}
//             onClick={onClick}
//         />
//     );
// }

class specialty extends Component {

     

  render() {
    
    
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className="section-body">
                    <Slider {...this.props.settings}>
                        {console.log(this.props.settings)}
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 1</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 2</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 3</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 4</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 5</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-imge section-specialty" alt="" />
                            <div>Cơ Xương Khớp 6</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
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
    
  };
};

//giúp kết nối giữa react và redux vs nhau
export default connect(mapStateToProps, mapDispatchToProps)(specialty);
