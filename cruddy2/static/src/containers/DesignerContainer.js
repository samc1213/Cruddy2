import { connect } from 'react-redux'
import Designer from '../components/Designer'

import * as facade from '../facade'

function mapStateToProps(state) {
  return{
    websiteName : state.websiteName,
  }

}

 const mapDispatchToProps = (dispatch) => (
  {
    submitWebsiteDesign: (layout, websiteName) => {
      dispatch(facade.submitWebsiteDesign(layout, websiteName))
    }
  }
)


const DesignerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Designer)

export default DesignerContainer
