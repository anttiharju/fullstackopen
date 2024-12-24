import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Works again :)',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText(
    'Works again :)', { exact: false }
  )

  expect(element).toBeDefined()
})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})
