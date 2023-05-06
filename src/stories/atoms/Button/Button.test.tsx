import Button from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Компанента Button', () => {
  test('Renter Button with children', () => {
    render(<Button>Button</Button>)
    const textChildren = screen.getByText(/Button/i)
    const notIsText = screen.queryByText(/some text/i)
    const btn = screen.getByRole('button')
    expect(textChildren).toBeInTheDocument()
    expect(notIsText).toBeNull()
    expect(btn).toBeInTheDocument()
    expect(btn).toMatchSnapshot()
  })
})
