import { connect } from 'react-redux'
import Designer from '../components/NewDesigner'

import * as facade from '../facade'

function mapStateToProps(state) {
  return{
    websiteName : state.websiteName,
    thingAttributes: state.thingAttributes
  }

}

 const mapDispatchToProps = (dispatch) => (
  {

    submitWebsiteDesign: (data) => {
      dispatch(facade.submitWebsiteDesign(data))
    }
  }
)


const DesignerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Designer)

export default DesignerContainer
