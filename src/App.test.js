import { render, screen } from '@testing-library/react'
import ToDoApp from './components/ToDo/toDoApp'

test('renders the footer text', () => {
  render(<ToDoApp />)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeInTheDocument()
})
