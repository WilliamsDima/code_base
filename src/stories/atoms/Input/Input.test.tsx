import Input from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Компанента Input', () => {
  test('Input event', () => {
    render(<Input alt="test-input" value={'test'} />)
    const input = screen.getByAltText('test-input')
    expect(input).toBeInTheDocument()
    expect(screen.getByAltText('test-input')).toHaveValue('test')
  })
})
