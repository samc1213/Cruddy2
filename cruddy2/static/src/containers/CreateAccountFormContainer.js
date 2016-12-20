import { connect } from 'react-redux'
import CreateAccountForm from '../components/CreateAccountForm'
import * as actions from '../actions/index'


const mapDispatchToProps = (dispatch) => (
  {
    submitCreateAccount: (firstname, lastname, username, password) => {
    	dispatch(actions.submitCreateAccount(firstname, lastname, username, password))
    }
  }
)

const CreateAccountFormContainer = connect(
  null,
  mapDispatchToProps
)(CreateAccountForm)

export default CreateAccountFormContainer
