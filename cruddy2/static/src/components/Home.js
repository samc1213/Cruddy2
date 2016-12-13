import React, { PropTypes } from 'react'

class Home extends React.Component {
  render(){
      return(
      	<div>
        <div className="header-content">
            <div className="header-content-inner">
                <h1 style={{textAlign:"center"}}>Build Your Own Data-Driven Websites!</h1>
                <hr />
                <p style={{textAlign:"center"}}>Cruddy2 helps you build beautiful websites with the ease of Wordpress, but the functionality of Google Forms</p>
            </div>
        </div>
        <div style={{textAlign:"center"}}>
        <a className="btn btn-primary" href="/createaccount" role="button">Sign Up</a>
        </div>
        </div>
    );
    }
}

export default Home
