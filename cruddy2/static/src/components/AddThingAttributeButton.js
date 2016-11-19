import React, { PropTypes } from 'react'


const AddThingAttributeButton = ({ onClick }) => {
  return (
    <button
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
    >
    BUTTON WOO!
    </button>
  )
}

AddThingAttributeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AddThingAttributeButton
