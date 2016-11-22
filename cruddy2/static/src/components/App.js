import React from 'react'
import Footer from './Footer'
import NewThingFormContainer from '../containers/NewThingFormContainer'
import ThingInstanceViewPreviewContainer from '../containers/ThingInstanceViewPreviewContainer'


class App extends React.Component {
  render(){
      return(
        <div>
          <div>
            <NewThingFormContainer  />
          </div>
          <div>
            <ThingInstanceViewPreviewContainer />
          </div>
        </div>
    );
    }
  }

export default App
