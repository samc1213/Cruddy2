import { connect } from 'react-redux'
import CreateWebsite from '../components/CreateWebsite'

const mapStateToProps = (state) => ({
 	loggedInUser: state.loggedInUser
 })

const CreateWebsiteViewContainer = connect(
  mapStateToProps,
  undefined
)(CreateWebsite)

export default CreateWebsiteViewContainer
