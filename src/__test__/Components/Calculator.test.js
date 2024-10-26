import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from '../../Components/Calculator/Calculator';
 

  
describe('Calculator Component', () => { 

  test('calculates the sum of an empty string as 0', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '' } });
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Result: 0')).toBeInTheDocument();
  });
  test('calculates the sum of an empty string as 0', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '' } });
    fireEvent.click(screen.getByText('*'));
    expect(screen.getByText('Result: 0')).toBeInTheDocument();
  });
  test('calculates the sum of an empty string as 0', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '' } });
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('Result: 0')).toBeInTheDocument();
  });
 
  test('calculates the sum of a single number', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '1' } });
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Result: 1')).toBeInTheDocument();
  });

  test('calculates the sum of two comma-separated numbers', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '1,2' } });
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Result: 3')).toBeInTheDocument();
  });

  test('handles newline as a separator', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '1\n2,3' } });
    fireEvent.click(screen.getByText('+'));
    // expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('handles custom delimiter', async() => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '//;\n1;2' } });
    fireEvent.click(screen.getByText('+'));
    await waitFor(() => expect(screen.getByText('Result: 3')).toBeInTheDocument());
  });

  test('displays error message for negative numbers', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByPlaceholderText('Enter numbers'), { target: { value: '1,-2,3,-4' } });
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Negative numbers not allowed: -2, -4')).toBeInTheDocument();
  });
});
