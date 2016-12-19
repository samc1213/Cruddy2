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
				
          <form action="/api/postnewwebsite" method="POST" encType="multipart/form-data">
            <label> Website Name </label>
            <input type="text" name="websitename"/>
            <input type="hidden" name="username" value = {this.props.loggedInUser} />
            <input type="hidden" name="websitetypeid" value="0" />
            
						<h4 className="text-xs-center"> What would you like your website to look like? </h4>
          <div id="myCarousel" className="carousel slide">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            </ol>

            <div className="carousel-inner" style={{'width': '300px', margin: 'auto'}} role="listbox">
              <div className="carousel-item active">
        				<CraigslistCardPreview thingAttributeNames={['Make', 'Model', 'Year']} thingAttributeExamples={['Toyota', 'Corolla', '1995']}
								thingAttributeTypeIds={['0', '0', '0']} isPreview={true} />
								<div className="text-xs-center">Card View</div>
              </div>
            </div>
            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span style={{color: 'black'}}>previous</span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span style={{color: 'black'}}>next</span>
              <span className="sr-only">Next</span>
            </a>
          </div>
            <button  className="btn btn-primary" type="submit" > Submit </button>
          </form>
        </div>
    );
    }
  }



export default CreateWebsite
