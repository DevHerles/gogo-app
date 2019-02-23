import React, { Component } from 'react';
import axios from 'axios';

class Odoo extends Component {
  constructor(props){
    super();
    console.log('constructor');
  };

  state = {
    config: {
      host: 'localhost',
      port: '8070',
      database: 'SAMU',
      username: 'admin',
      password: 'admin',
      sid: '',
      protocol: 'http',
    }
  };

  initializeApp = (config) => {
    config = config || {}
    this.setState({
      config: {
        host: config.host,
        port: config.port || 80,
        database: config.database,
        username: config.username || null,
        password: config.password || null,
        sid: config.sid || null,
        protocol: config.protocol || 'http',
      }
    });
  };

  signInWithEmailAndPassword = (login, password) => {
    let params = {
      db: this.state.config.database,
      login: login,
      password: password,
    }

    let json = JSON.stringify({ params: params })
    let url = `${this.state.config.protocol}://${this.state.config.host}:${this.state.config.port}/react/session/authenticate`

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': json.length
      },
      body: json,
      params: params,
    }

    return axios.post(url, options);
      //.then(response => {
        //console.log(response.data.error)
      //})
      //.catch(error => {
        //throw(error);
      //})

  }
};

export default Odoo;
