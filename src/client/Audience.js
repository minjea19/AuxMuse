import React, { Component } from "react";
import openSocket from "socket.io-client";
import axios from 'axios';
import './static/Audience.css';
import logo from './static/pictures/auxmuse_logo.png';
import request_text from './static/pictures/requestsong.png';



const socket = openSocket("http://localhost:5000/");

class Audience extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    song: "",
      showAllRequests: false,
      waiting: false,
      showWait: false,
      showSuccess: false,
      message: ""
    };
    
  }

  handleSongChange = e =>{
		this.setState({
      song: e.target.value,
		});
  };

  sendRequest = e =>{
    e.preventDefault();

    if(!this.state.showWait && this.state.song!=""){
      //First send the song request to the Socket
      console.log(this.state.song);
      socket.emit('client', {text: this.state.song});
      this.setState({
        showWait: true,
        showSuccess: true,
        song: ""
      });

    
      //Reset the input field and let the user know to wait til requesting again
      setTimeout(() => {
        this.setState({
          showSuccess: false,
          showWait: false
        });
      }, 5000);
    }
    else{
      console.log("Please wait til requesting another song");
    }
	}
  render() {
    return (
      <div className="audience">
        <span className="compatible">auxMuse is only available on mobile at the moment!</span>
       
        {this.state.showSuccess?
          (
            <div className={this.state.showSuccess ? "msg_popup active" :"msg_popup inactive"}>
              <span className="msg_first">Sucessfully Requested!</span>
            </div>):
          (<div></div>)}

          <div className="queue_wait"></div>
          <form class="addsong_form" >
            <img className="auxmuse_logo" src={logo}/>
            <img className="requestsong_text" src={request_text}/>
            <label>
              <input class="addsong_input" type="text" placeholder="Song Artist and Name" value={this.state.song || ''}  onChange={this.handleSongChange} />
            </label>
					  <button class="addsong_input_button" type="submit" onClick={this.sendRequest}>REQUEST</button>
				  </form>
          {this.state.showWait?
          (<span className="warning_msg">Please wait 5 seconds before requesting another song.</span>
            ):
          (<div></div>)}
          
      </div>
    );
  }
}
export default Audience;
