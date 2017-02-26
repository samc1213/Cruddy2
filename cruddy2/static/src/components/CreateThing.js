import React from 'react'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'
import Walkthrough from './Walkthrough'


class CreateThing extends React.Component {
  render(){
    console.log()
      return(
        <div>
          <Walkthrough bigText="Define Your Data Model" helpText="Be sure to put in examples, so that you can see what an instance of your Thing would look like!" />
          <div className="col-md-6">
            <NewThingFormContainer />
          </div>
          <div className="col-md-6">
            <div className="col-md-2"></div>
            <div className="col-md-8"><ThingInstanceViewPreviewContainer /></div>
            <div className="col-md-2"></div>
          </div>
        </div>
    );
    }
  }

export default CreateThing
