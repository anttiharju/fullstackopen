import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Works again :)',
    important: true
  }

  render(<Note note={note} />)

  const element = await screen.findByText('Works again :)')

  expect(element).toBeDefined()
})
