import React, { PropTypes } from 'react'

class Home extends React.Component {
  render(){
      return(
        <div>
          <div className="jumbotron" style={{background: "url('/r8') no-repeat center center", width:'100%', height:'100%', color:'white'}}>
              <div className="container">
                <h1 className="display-3"  style={{fontWeight:'bold'}}>It's your domain.</h1>
                <p style={{fontSize:"1.4em"}}>Tell us what matters to you. We'll handle the rest.</p>
                <p><a className="btn btn-primary btn-lg" href="/createaccount" role="button" style={{backgroundColor:"rgb(219, 0, 3)", border:"2px solid rgb(219, 0, 3)", color:'black'}}>Sign Up &raquo;</a></p>
              </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1>Step One:</h1>
              <h3>Create your website name.</h3>
              <p>You get your own cruddy2 domain name all to yourself!</p>
            </div>
            <div className="col-md-6">
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1>Step Two:</h1>
              <h3>Define your layout.</h3>
              <p></p>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
    );
    }
}

export default Home
