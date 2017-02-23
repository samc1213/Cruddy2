import React, { PropTypes } from 'react'
import ThingAttributeDisplayer from '../ThingAttributeDisplayer'


class Home extends React.Component {
  render(){
      return(
        <div>
          <div className="jumbotron" style={{background: "url('/images/r8edit.jpg') no-repeat center center", width:'100%', height:'100%', color:'white', marginBottom: '0px'}}>
              <div className="container">
                <h1 className="display-3"  style={{fontWeight:'bold'}}>It's your domain.</h1>
                <p style={{fontSize:"1.4em"}}>Create your own data-driven website, no coding required.</p>
                <p><a className="btn btn-primary btn-lg" href="/createaccount" role="button" style={{backgroundColor:"rgb(219, 0, 3)", border:'2px solid rgb(219, 0, 3)', color:'black'}}>Sign Up &raquo;</a></p>
              </div>
          </div>
          <div className="row" style={{height:'200px', backgroundColor: 'rgba(235, 235, 235, 1)', borderBottom  :'1px solid rgb(135, 135, 135)'}}>
            <div style={{padding: '25px'}}>
              <div className="col-md-6" style={{height: '150px', display: 'flex', justifyContent:'center', flexDirection:'column' }}>
                <h1>Step One:</h1>
                <h3>Create your website name.</h3>
                <p>You get your own cruddy2 domain name all to yourself!</p>
              </div>
              <div className="col-md-6 text-xs-center" style={{height: '150px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                <img style={{ width: '70%', maxHeight:'180px' }} src="/images/websitename.gif" />
              </div>
            </div>
          </div>
          <div className="row" style={{height:'200px'}}>
            <div style={{padding: '25px'}}>
              <div className="col-md-6 text-xs-center" style={{height: '150px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                <img style={{ width: '70%', maxHeight:'180px' }} src="/images/websitetype.gif" />
              </div>
              <div className="col-md-6" style={{height: '150px', display: 'flex', justifyContent:'center', flexDirection:'column' }}>
                <h1>Step Two:</h1>
                <h3>Define your layout.</h3>
                <p>We're constantly adding more templates for you to get started with.</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row" style={{height:'300px', backgroundColor: 'rgba(235, 235, 235, 1)', borderBottom  :'1px solid rgb(135, 135, 135)', borderTop  :'1px solid rgb(135, 135, 135)'}}>
            <div style={{padding: '25px'}}>
              <div className="col-md-6" style={{height: '250px', display: 'flex', justifyContent:'center', flexDirection:'column' }}>
                <h1>Step Three:</h1>
                <h3>Define your data model.</h3>
                <p>Your data model defines what you want your users to be able to represent.</p>
              </div>
              <div className="col-md-6 text-xs-center" style={{height: '250px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                <img style={{ maxWidth: '70%', maxHeight:'250px' }} src="/images/thingdefinition.gif" />
              </div>
            </div>
          </div>
        </div>
    );
    }
}


export default Home
