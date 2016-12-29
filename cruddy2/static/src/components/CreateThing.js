import React from 'react'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'
import Walkthrough from './Walkthrough'


class CreateThing extends React.Component {
  componentDidMount() {
    this.props.getCurrentWebsiteName(this.props.params.websiteName);
  }

  render(){
    console.log()
      return(
        <div>
          <Walkthrough bigText="Define Your Data Model" helpText="Be sure to put in examples, so that you can see what an instance of your Thing would look like!" />
          <div className="col-md-6">
            <NewThingFormContainer />
          </div>
          <div className="col-md-6">
            <ThingInstanceViewPreviewContainer style={{position:'fixed'}}/>
          </div>
        </div>
    );
    }
  }



export default CreateThing
