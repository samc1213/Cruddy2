import React from 'react'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'


class CreateThing extends React.Component {
  render(){
      return(
        <div>
          <div className="col-md-6">
            <NewThingFormContainer />
          </div>
          <div className="col-md-6">
            <ThingInstanceViewPreviewContainer />
          </div>
        </div>
    );
    }
  }



export default CreateThing
