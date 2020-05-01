import React from "react";
import axios from "axios";
import styles from "./Business.module.css";
import CourtContainer from "./CourtContainer/CourtContainer";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';


class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      showThings: true,
      profileComplete: null,
      employees: "",
      timeOpen: "7:00 AM",
      timeClose: "8:30 PM",
      loading: false
    }; 
  }


  

  render() {
    return (
      <React.Fragment>
        {this.state.loading && !this.props.user && <Spinner/>}
        {!this.state.loading && (
          <div id={styles.businessContainer}>
            <div>
              <div style={{ overflow: "auto" }}>
                <AdminBooking
                  onDateClick={this.onDateClick}
                  employees={this.state.employees}
                />
              </div>
              <CourtContainer
                dateChosen={this.props.dateChosen.toDateString()}
                openTime={this.state.timeOpen}
                closeTime={this.state.timeClose}
                numberColumns={6}
                businessName={"Moorestown Field Club"}
              />
            </div>
          </div>
        )}{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken,
    employee: state.authReducer.employee,
    bookAThing: state.booleanReducers.bookAThing,
    user: state.authReducer.user,
    dateChosen: state.dateReducer.dateChosen
  };
};

export default withRouter(connect(mapStateToProps)(Business));
