import React from 'react'
import { connect } from 'react-redux'
import { addThingAttribute } from '../actions'
import AddThingAttributeButton from '../components/AddThingAttributeButton'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(addThingAttribute())
  }
})


const AddThingAttribute = connect(null, mapDispatchToProps)(AddThingAttributeButton)

export default AddThingAttribute
