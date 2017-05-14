import React from 'react'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'
import Walkthrough from './Walkthrough'


class CreateThing extends React.Component {
  render(){
      return(
        <div>
          <Walkthrough bigText="Define Your Data Model" />
          <div className="col-md-12">
            <NewThingFormContainer />
          </div>
        </div>
    );
    }
  }

export default CreateThing
