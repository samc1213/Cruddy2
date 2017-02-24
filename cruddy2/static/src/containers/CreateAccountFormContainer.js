import { connect } from 'react-redux'
import CreateAccountForm from '../components/CreateAccountForm'
import * as facade from '../facade'


const mapDispatchToProps = (dispatch) => (
  {
    submitCreateAccount: (firstname, lastname, username, password) => {
    	dispatch(facade.submitCreateAccount(firstname, lastname, username, password))
    }
  }
)

const CreateAccountFormContainer = connect(
  null,
  mapDispatchToProps
)(CreateAccountForm)

export default CreateAccountFormContainer
