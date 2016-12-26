import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'


class CreateWebsite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {websiteNameVisibility: 'block', websiteTypeVisibility: 'none', websiteName: ''}

    this.handleWebsiteNameSubmit = this.handleWebsiteNameSubmit.bind(this);
    this.handleWebsiteNameChange = this.handleWebsiteNameChange.bind(this);
    this.handleWebsiteNameKeyDown = this.handleWebsiteNameKeyDown.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.trueSubmit = this.trueSubmit.bind(this);
  }

  trueSubmit(event) {
    console.log('trusub');
    var form = document.getElementById("newwebsiteform");
    form.submit();
  }

  handleFormSubmit(event) {
    console.log(event.target);
    event.preventDefault();
  }

  handleWebsiteNameKeyDown(event) {
    console.log(event.keyCode);
    if (event.keyCode == 13) {
      this.setState({websiteNameVisibility: 'none', websiteTypeVisibility:'block'});
    }
  }

  handleWebsiteNameSubmit(event) {
    event.preventDefault();
    console.log("cock");
    this.setState({websiteNameVisibility: 'none', websiteTypeVisibility:'block'});
  }

  handleWebsiteNameChange(event) {
    this.setState({websiteName: event.target.value});
  }

  render(){
      var img = ''
      return(

        <div>
        <h2 className="text-xs-center">Create Your Website</h2>

          <form id="newwebsiteform" action="/api/postnewwebsite" method="POST" encType="multipart/form-data" style={{textAlign:'center'}} onSubmit={this.handleFormSubmit}>
            <div style={{display: this.state.websiteNameVisibility}}>
              <label> Website Name </label>
              <input type="text" name="websitename" value={this.state.websiteName} onChange={this.handleWebsiteNameChange} onKeyDown={this.handleWebsiteNameKeyDown}/>
              <p style={{marginBottom: '4px'}}> Your website will be available at: <br />
                {`http://www.cruddy2.herokuapp.com/${this.state.websiteName}`}</p>
              <a className="btn btn-primary" onClick={this.handleWebsiteNameSubmit}> Submit </a>
            </div>

            <input type="hidden" name="username" value = {this.props.loggedInUser} />
            <input type="hidden" name="websitetypeid" value="0" />

          <div is id="myCarousel" class="carousel slide" style={{width: '30%', margin:'auto', display: this.state.websiteTypeVisibility}} data-interval="false">
            <h4 className="text-xs-center"> What would you like your website to look like? </h4>

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
            <a style={{position:'absolute', top:'300px', left:'35%', width:'30%'}} className="btn btn-primary" onClick={this.trueSubmit}> Submit </a>
          </div>
          </form>
        </div>
    );
    }
  }



export default CreateWebsite
