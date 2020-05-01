import React from "react";
import styles from "./AdminBooking.module.css";
import { connect } from "react-redux";
import {
  BOOKING_TYPE,
  TIME_SELECTED,
  EMPLOYEE_CHOSEN,
  EMPLOYEE_SHIFT_ERROR,
  HIDE_DROP_DOWN,
  BREAK_ALERT,
  ONE_SHIFT_ONE_BREAK,
  ONE_SHIFT_NO_BREAK,
  TWO_SHIFTS_NO_BREAK,
  TWO_SHIFTS_ONE_BREAK,
  TWO_SHIFTS_TWO_BREAKS
} from "../../../actions/actions";
import Calendar from "../../Calendar/Calendar";
import Axios from "axios";

class AdminBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelected: "",
      timeChosen: "1 Hour",
      bookingType: "",
      employees: [],
      hideTimeSelector: false
    };      
    this.selectTime = this.selectTime.bind(this);
  }



  componentDidMount() {
    if (this.props.businessId) {
    Axios.post('/api/employees_dates/dates', {date: this.props.date.toDateString(), businessId: this.props.businessId}).then(
      response => {
          this.setState({employees: response.data.availableEmployees})
      }
    )
  }
}
  

  selectTime(timeChosen) {
    return () => {
      this.setState({ timeChosen });
      this.props.getTimeChosen(timeChosen);
    };
  }

  selectBookingType(bookingType) {
    return () => {
      this.setState({ bookingType });
      this.props.getBookingType(bookingType);
    };
  }

  render() {
    return (
      <div id={styles.bookingHolder} onClick={this.props.hideDropDown}>
        <div
         id={styles.divWhereWidthChanges}
        >
          <div id={styles.coolContainer}>
          <Calendar/>
          </div>
          <div id={styles.coolContainer}>
          <div className={styles.bookingHolderContainer}> 
            {(this.state.hideTimeSelector || this.props.user) && this.props.bookingType.bookingType && 
            this.props.bookingType.bookingType.timeDuration && <p style={{zIndex: 300, background: 'white', border: '1px solid light gray', position: 'absolute', padding: '27px 0px', width: '240px', textAlign: 'center', bottom: '0'}}>Time Duration: {this.props.bookingType.bookingType.timeDuration}</p>}
           <p style={{ marginBottom: "-8px" }}>Choose Time Amount</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.props.times.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                        this.state.timeChosen === element ? "navy" : "",
                      color: this.state.timeChosen === element ? "white" : ""
                    }}
                    onClick={this.selectTime(element)}
                    className={styles.itemPTag}
                  >
                    {element}
                  </p>
                );
              })}
            </div>
          </div>
          </div>
       
        </div>
      </div>
    );
  }
}

AdminBooking.defaultProps = {
  times: [
    
    "30 Minutes",  
    "1 Hour",  
    "1 Hour 30 Minutes",
  ],
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    admin: state.authReducer.admin,
    bookingType: state.bookingInfoReducer.bookingType,
    employeeChosen: state.bookingInfoReducer.employeeChosen,
    timeChosen: state.bookingInfoReducer.timeSelected,
    date: state.dateReducer.dateChosen
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
    setBreakAlert: (obj) => dispatch({type: BREAK_ALERT, payload: obj}),
    setEmployeeShiftError: (trueOrFalse) => dispatch({type: EMPLOYEE_SHIFT_ERROR, payload: trueOrFalse}),
    getBookingType: bookingType =>
      dispatch({ type: BOOKING_TYPE, payload: { bookingType } }),
    getTimeChosen: timeChosen =>
      dispatch({ type: TIME_SELECTED, payload: { timeSelected: timeChosen } }),
    getEmployeeChosen: employeeChosen =>
      dispatch({ type: EMPLOYEE_CHOSEN, payload: { employeeChosen } }),
    setOneShiftOneBreak: (onlyShiftStarts, onlyShiftEnds, onlyBreakStarts, onlyBreakEnds) =>
      dispatch({type: ONE_SHIFT_ONE_BREAK, payload: {onlyBreakStarts, onlyShiftEnds, onlyBreakEnds, onlyShiftStarts}}),
    setOneShiftNoBreak: (onlyShiftStarts, onlyShiftEnds) => 
      dispatch({type: ONE_SHIFT_NO_BREAK, payload: {onlyShiftStarts, onlyShiftEnds}}),
    setTwoShiftsNoBreak: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds) =>
      dispatch({type: TWO_SHIFTS_NO_BREAK, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds}}),
    setTwoShiftsOneBreak: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, onlyBreakStarts, onlyBreakEnds) => 
      dispatch({type: TWO_SHIFTS_ONE_BREAK, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, onlyBreakStarts, onlyBreakEnds}}),
    setTwoShiftsTwoBreaks: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, firstBreakStarts, firstBreakEnds, secondBreakStarts, secondBreakEnds) => 
      dispatch({type: TWO_SHIFTS_TWO_BREAKS, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, firstBreakStarts, firstBreakEnds, secondBreakStarts, secondBreakEnds}})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooking);
