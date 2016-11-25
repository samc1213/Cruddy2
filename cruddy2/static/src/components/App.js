import React from 'react'
import Footer from './Footer'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'


class App extends React.Component {
  render(){
      return(
        <div>
          <div className="container">
            <NewThingFormContainer />
          </div>
          <div className="container">
            <ThingInstanceViewPreviewContainer />
          </div>
        </div>
    );
    }
  }



export default App
