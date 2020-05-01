import React from "react";
import styles from "./TryingToBookHelper.module.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import OtherAlert from "../../../../OtherAlerts/OtherAlerts";
import { connect } from "react-redux";

const TryingToBookHelper = props => {
  const [playerName, setPlayerName] = React.useState("");
  const [players, setPlayers] = React.useState([props.user.user.fullName]);
  const [addedPlayers, setAddedPlayers] = React.useState(
    props.user
      ? [{ name: props.user.user.userName, id: props.user.user.id }]
      : []
  );
  const [addError, setAddError] = React.useState(false);

  function addPlayer(event) {
    event.preventDefault();
    if (playerName !== "") {
      let newPlayers = [...players, playerName];
      setPlayers(newPlayers)
    }
  }


  const getplayerName = event => {
    setPlayerName(event.target.value);
  };

  console.log(players.length)

  return (
    <div id={styles.mainHelper}>
     
      <div>
        <OtherAlert
          showAlert={addError === true}
          alertType={"error"}
          alertMessage={"Player already added"}
        />
        <form>
          <p style={{marginLeft: '20px'}}
            id={
             true
                ? styles.errorAnimation
                : ""
            }
          >
            Add 1-3 Players and Proceed to Click Finish
          </p>
       
          <input
            style={{ marginTop: "10px", fontSize: '16px' }}
            onChange={getplayerName}
            id={styles.helperInput}
          />
          <button
            disabled={players.length === 4 || !playerName}  
            onClick={addPlayer}
            style={{ marginLeft: "20px", height: "28px", width: "60px", cursor: players.length === 4 || !playerName ? 'not-allowed' : "pointer" }}
          >
            Add
          </button>
        </form>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      {!props.finish && (
        <button
          disabled={players.length === 1 || players.length > 4}
          onClick={props.setFinish(players)}
          style={{
            cursor: players.length === 1 || players.length > 4 ? 'not-allowed' : 'pointer',
            height: '30px', 
            right: "-3px",
            top: "-27px",
            width: "100px"
          }}
        >
          Finish
        </button>
      )}
      </div>
      <div
        style={{
          borderTop: "1px solid darkgray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "180px"
        }}
      >
        <p style={{ paddingTop: "10px", textDecoration: "underline" }}>
          Players Added
        </p>
        <div id={styles.playerWrapDiv}>
          {players.map(addedPlayer => {
            return (
              <p
                style={{
                  fontSize: addedPlayers.length > 7 ? "12px" : "14px",
                  marginTop: "6px"
                }}
              >
                {addedPlayer}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    admin: state.authReducer.admin
  };
};

export default withRouter(connect(mapStateToProps)(TryingToBookHelper));
