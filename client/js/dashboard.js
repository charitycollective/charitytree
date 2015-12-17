"use strict";
var React = require('react');

import {About} from './dashboard/about.js';
import {Projects} from './dashboard/projects.js';

var Dashboard = exports.Dashboard = React.createClass({
  componentDidMount: function() {
    this.getData();
  },

  getInitialState: function() {
    return {
      orgData: {},
      view: ''
    }
  },

  getData: function() {
    $.ajax({
      method: 'GET',
      url: '/dashboard_data',
      success:function(response){
        console.log('Dashboard Data: ', response.results);
        this.setState({ view: 'about', orgData: response.results });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    })
  },

  showOrgDashboard: function() {
  },

  showDonorDashboard: function() {
  },

  updatePageView: function(view) {
    console.log(view);
    this.setState({ view: view });
  },

  render: function() {
    var view;
    switch (this.state.view) {
      case 'about':
        var orgInfo = {
          name: this.state.orgData.name,
          username: this.state.orgData.username,
          about: this.state.orgData.about,
          areas_of_focus: this.state.orgData.areas_of_focus,
          address: this.state.orgData.address
        }
        console.log("About: " + orgInfo.about)
        view = <About postData={this.postData} orgInfo={orgInfo} />
        break;
      case 'projects':
        view = <Projects postData={this.postData} projects={this.state.orgData.projects} />
        break;
      case 'media':
        view = <Media postData={this.postData} media={this.state.orgData.media} />
        break;
      case 'endorsements':
        view = <Endorsements postData={this.postData} endorsements={this.state.orgData.endorsements} />
        break;
      default:
        view = <div><p>"Nothing to display"</p></div>
    };
    return (
      <div>
        <div className="db_menu"><DashboardMenu updatePageView={this.updatePageView} /></div>
        <div className="view">{view}</div>
      </div>
    )
  }
});

var DashboardMenu = React.createClass({
  goToPage: function(e) {
    e.preventDefault();
    this.props.updatePageView(e.target.innerHTML.toLowerCase());
  },

  render: function() {
    return (
      <div>
        <ul>
          <li><a href="#" onClick={this.goToPage}>About</a></li>
          <li><a href="#" onClick={this.goToPage}>Projects</a></li>
          <li><a href="#" onClick={this.goToPage}>Media</a></li>
          <li><a href="#" onClick={this.goToPage}>Endorsements</a></li>
        </ul>
      </div>
    )
  }
});
