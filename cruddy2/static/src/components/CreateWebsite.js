import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'


class CreateWebsite extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
      var img = ''
      return(

        <div>
        <h2 className="text-xs-center">Create Your Website</h2>

          <form action="/api/postnewwebsite" method="POST" encType="multipart/form-data" style={{textAlign:'center'}}>
            <label> Website Name </label>
            <input type="text" name="websitename"/>
            <input type="hidden" name="username" value = {this.props.loggedInUser} />
            <input type="hidden" name="websitetypeid" value="0" />

            <h4 className="text-xs-center"> What would you like your website to look like? </h4>
          <div id="myCarousel" className="carousel slide" style={{width: '30%', margin:'auto'}}>
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>

            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img src="/examplecard" alt="Card" />
                <div className="text-xs-center">Card View</div>
              </div>
              <div className="carousel-item">
                <img src="/exampletable" alt="Chania" />
                <div className="text-xs-center">Table View</div>
              </div>
            </div>
            <a className="left carousel-control" style={{left:'-15%', backgroundImage:'none'}} href="#myCarousel" role="button" data-slide="prev">
              <span style={{color: 'black', position:'absolute', top:'45%', height:'10%', left: '-3px'}}><i className="fa fa-caret-square-o-left" aria-hidden="true"></i></span>
            </a>

            <a className="right carousel-control" style={{right:'-15%', backgroundImage:'none'}} href="#myCarousel" role="button" data-slide="next">
              <span style={{color: 'black', position:'absolute', top:'45%', height:'10%', right:'-3px'}}><i className="fa fa-caret-square-o-right" aria-hidden="true"></i></span>
            </a>

            <button style={{position:'absolute', top:'175px', left:'35%', width:'30%'}} className="btn btn-primary" type="submit" > Submit </button>
          </div>

          </form>
        </div>
    );
    }
  }



export default CreateWebsite
