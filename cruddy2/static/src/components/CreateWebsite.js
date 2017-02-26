import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'
import Walkthrough from './Walkthrough'
import NewWebsiteViewArea from './NewWebsiteViewArea'
import CreateThingContainer from '../containers/CreateThingContainer'


class CreateWebsite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {websiteTypeId: 0, websiteNameVisibility: 'block', websiteTypeVisibility: 'none', websiteName: ''}
    this.handleWebsiteNameChange = this.handleWebsiteNameChange.bind(this);
    this.handleWebsiteNameKeyDown = this.handleWebsiteNameKeyDown.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.trueSubmit = this.trueSubmit.bind(this);
    this.changeState = this.changeState.bind(this);
    document.title = 'Create a New Website - Cruddy2'
  }



  changeState(newState) {
    this.props.changeState(newState);
  }

  trueSubmit(event) {
     this.props.submitCreateWebsite(this.state.websiteTypeId, this.props.websiteName, this.props.loggedInUser);
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  handleWebsiteNameKeyDown(event) {
    if (event.keyCode == 13) {
      this.props.changeState('websiteType')
    }
  }

  handleWebsiteNameChange(event) {
    this.setState({websiteName: event.target.value});
    this.props.getCurrentWebsiteName(event.target.value);
  }

  componentDidMount() {
    this.props.changeState('websiteName')
  }

  render(){
      return(

        <div>

        <form id="newwebsiteform" encType="multipart/form-data" style={{textAlign:'center'}} onSubmit={this.handleFormSubmit}>
          <NewWebsiteViewArea currentState={this.props.currentState} stateName='websiteName'>
            <Walkthrough bigText="Create Your Website" helpText="Create your website here." />
            <div>
              <label> Website Name </label>
              <input type="text" name="websitename" value={this.state.websiteName} onChange={this.handleWebsiteNameChange} onKeyDown={this.handleWebsiteNameKeyDown}/>
              <p style={{marginBottom: '4px'}}> Your website will be available at: <br />
                {`http://www.cruddy2.herokuapp.com/${this.state.websiteName}`}</p>
              <a className="btn btn-primary" onClick={() => { this.changeState('websiteType')}}> Submit </a>
            </div>
          </NewWebsiteViewArea>

            <input type="hidden" name="username" value = {this.props.loggedInUser} />
            <input type="hidden" name="websitetypeid" value={this.state.websiteTypeId} />
          <NewWebsiteViewArea currentState={this.props.currentState} stateName='websiteType'>
            <div is id="myCarousel" class="carousel slide" style={{width: '30%', margin:'auto'}} data-interval="false">
              <h4 className="text-xs-center"> What would you like your website to look like? </h4>

              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img src="/images/ExampleCard.png" alt="Card" />
                  <div className="text-xs-center">Card View</div>
                </div>
                <div className="carousel-item">
                  <img src="/images/ExampleTable.png" alt="Chania" />
                  <div className="text-xs-center">Table View</div>
                </div>
              </div>
              <a className="left carousel-control" style={{left:'-15%', backgroundImage:'none'}} href="#myCarousel" role="button" data-slide="prev">
                <span style={{color: 'black', position:'absolute', top:'45%', height:'10%', left: '-3px'}}><i className="fa fa-caret-square-o-left" aria-hidden="true"></i></span>
              </a>

              <a className="right carousel-control" style={{right:'-15%', backgroundImage:'none'}} href="#myCarousel" role="button" data-slide="next">
                <span style={{color: 'black', position:'absolute', top:'45%', height:'10%', right:'-3px'}}><i className="fa fa-caret-square-o-right" aria-hidden="true"></i></span>
              </a>
              <a style={{position:'absolute', top:'400px', left:'35%', width:'30%'}} className="btn btn-primary" onClick={() => { this.trueSubmit(); this.changeState('firstThing') }}> Submit </a>
            </div>
            </NewWebsiteViewArea>
            <NewWebsiteViewArea currentState={this.props.currentState} stateName='firstThing'>
              <CreateThingContainer />
            </NewWebsiteViewArea>
          </form>
        </div>
    );
    }
  }



export default CreateWebsite
