import './toDoApp.css'
import { Image, Alert, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const AddTodoItemContent = (props) => {
  const [description, setDescription] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()

    const toDoItem = {
      id: uuidv4(),
      description: description,
      isCompleted: false,
    }

    UpdateDB(toDoItem)

    props.setItems([...props.items, toDoItem])
  }

  const UpdateDB = async (dataToPost) => {
    try {
      axios({
        method: 'post',
        url: 'http://localhost:80/api/TodoItems',
        data: dataToPost,
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleClear(event) {
    setDescription('Enter description...')
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  return (
    <Container>
      <Form onSubmit={handleAdd}>
        <h1>Add Item</h1>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="Enter description..."
              onChange={handleDescriptionChange}
              value={description}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
            <Button variant="primary" onClick={() => handleClear()}>
              Clear
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default AddTodoItemContent
