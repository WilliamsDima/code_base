import { Loading } from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Компанента Loading', () => {
  test('Renter Loading', () => {
    render(<Loading active={true} />)
    const component = screen.getByLabelText('loading')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('active')
  })
})
