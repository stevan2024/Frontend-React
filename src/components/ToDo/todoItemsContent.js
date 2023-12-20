import './toDoApp.css'
import { Image, Alert, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const TodoItemsContent = (props) => {
  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    try {
      // const testData = [{
      //  "id": "0b74e8d1-af62-4b12-9951-3e9037864069",
      //  "description": "hello task",
      // "isCompleted": false
      // },
      //  {
      //  "id": "4E7F7080-C7D6-42E6-BC4A-30EA8C90E595",
      // "description": "hello task 2",
      // "isCompleted": false
      // },
      //];

      axios
        .get('http://localhost:80/api/TodoItems')
        .then((response) => {
          props.setItems(response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const UpdateIteminDB = async (id, dataToPut) => {
    var url = 'http://localhost:80/api/TodoItems/' + id

    try {
      axios({
        method: 'put',
        url: url,
        data: dataToPut,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMarkAsComplete(item) {
    try {
      // make a copy of the items state
      var newItems = Array.from(props.items)

      var foundIndex = -1

      // find item to update in new state
      for (var i = 0; i < newItems.length; i++) {
        if (newItems[i].id === item.id) {
          foundIndex = i
          break
        }
      }

      newItems[foundIndex].isCompleted = true

      // update items state to the new state
      props.setItems(newItems)

      //TODO:Update DB - doesnt work
      //UpdateIteminDB(item.id, newItems)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>
        Showing {props.items.length} Item(s){' '}
        <Button variant="primary" className="pull-right" onClick={() => getItems()}>
          Refresh
        </Button>
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              {item.isCompleted && <td>Complete</td>}
              {!item.isCompleted && <td>Not Complete</td>}
              <td>
                <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                  Mark as completed
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TodoItemsContent
