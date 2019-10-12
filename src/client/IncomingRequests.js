import React, { Component } from "react";
import openSocket from "socket.io-client";
import axios from 'axios';
import './static/IncomingRequests.css';
import incoming_text from './static/pictures/incoming.png';


const socket = openSocket("http://localhost:5000/");

class IncomingRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_requests: [],
    };
    /*
    connect(message => {
      console.log("connectededed");
    });*/
  }

  componentDidMount = () => {
    socket.on('chat', message => {
      this.setState({
        all_requests: this.state.all_requests.concat(message.text)
      })
    });
  }

  render() {
    return (
      <div className="requests">
          <div class="requests_center">
            <img className="incoming_text" src={incoming_text}/>
            <div class="requested_songs">
              {this.state.all_requests.map(function(item, i){return 	<li key={i}>{item}</li>})}
            </div>
          </div>
      </div>
    );
  }
}
export default IncomingRequests;
