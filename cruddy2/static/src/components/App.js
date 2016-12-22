import React, { PropTypes } from 'react'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}
	logout() {
		this.props.logoutUser();
	}
  render(){
  	console.log(this.props.loggedInUser);
  	if ((this.props.params.websiteName != null) && (this.props.params.thingId !=null))
  	{
  		var returnstring = '/'+String(this.props.params.websiteName)+'/createthinginstance/'+String(this.props.params.thingId)
  		var newinstancebutton = <li style={{float:'right', paddingTop:'5px', paddingBottom:'5px'}}> <a href={returnstring}> New Thing Instance </a> </li> 
  	}
  	if (this.props.loggedInUser != null)
  	{
  		var username = <p className="dropdown-item">Logged in as {this.props.loggedInUser}</p>;
  		var login = <a className="dropdown-item" href="/" onClick={this.logout}>Logout</a>;
  		var dashboardOption = <a className="dropdown-item" href="/dashboard">My Dashboard</a>;
  	}
  	else
  	{
  		var login = <a className="dropdown-item" href="/login">Login</a>;
  	}
   	if (['/creatething', '/login', '/dashboard', '/'].indexOf(this.props.location.pathname) >= 0)
  	{
  		var nav = <li className="nav-item dropdown float-*-right">
		      <a className="nav-link dropdown-toggle" id="supportedContentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
		      <div className="dropdown-menu" aria-labelledby="supportedContentDropdown">
		      	{username}
		      	{login}
		        {dashboardOption}
		      </div>
    		</li>;
  	}

    return (
    	<div>
	    <nav className="navbar navbar-light bg-faded">
	      <div className="container-fluid">
	      <div className="navbar-header">
	        <a className="navbar-brand" href="/">Cruddy2</a>
	      </div>
	      <ul className="nav navbar-nav float-*-right">
	        {nav}
	      </ul>
	      <ul className="nav navbar-nav navbar-right">
	        {newinstancebutton}
	      </ul>
	      </div>
	    </nav>
	  <div>  
	    {this.props.children}
	  </div>
	  </div>
    )
  }
}

export default App
