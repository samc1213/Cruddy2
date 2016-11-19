import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import ThingAttributes from '../containers/ThingAttributes'
import AddThingAttribute from '../containers/AddThingAttribute'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ThingAttributes />
    <AddThingAttribute />
  </div>
)

export default App
