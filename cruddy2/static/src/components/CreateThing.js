import React from 'react'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'


class CreateThing extends React.Component {
  componentDidMount() {
    this.props.getCurrentWebsiteName(this.props.params.websiteName);
  }

  render(){
    console.log()
      return(
        <div>
				<h1 className="text-xs-center">What Thing you want to represent in your website {this.props.params.websiteName}? </h1>
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
