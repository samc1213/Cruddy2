import React, { PropTypes } from 'react'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'

const CustomCard = ({ cardLayout }) => {
  var rows = [];

  cardLayout.forEach((e) => rows.push(<ThingAttributeTextDisplayer value={e}/>))
  

  return (
    <div className="card" style={{textAlign:'left'}} >
      <div className="card-block">
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CustomCard
