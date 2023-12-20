import './toDoApp.css'
import { Image, Alert, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

import ToDoAppIntroduction from './toDoAppIntro'
import AddTodoItemContent from './addTodoItemContent'
import TodoItemsContent from './todoItemsContent'
import ClearpointFooter from './clearpointFooter'

const axios = require('axios')

const ToDoApp = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    // todo
  }, [])

  const addNewItem = (testData) => {
    setItems([...items, testData])
  }

  return (
    <div className="App">
      <Container>
        <ToDoAppIntroduction />
        <Row>
          <Col>
            <AddTodoItemContent addNew={addNewItem} setItems={setItems} items={items} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoItemsContent setItems={setItems} items={items} />
          </Col>
        </Row>
      </Container>
      <ClearpointFooter />
    </div>
  )
}

export default ToDoApp
