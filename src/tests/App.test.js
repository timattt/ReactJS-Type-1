import {fireEvent, render, screen} from '@testing-library/react';
import AppWrapper from "../App";
import '@testing-library/jest-dom'

test('home', () => {
  render(<AppWrapper />);
  const linkElement = screen.getAllByText(/Home/);
  expect(linkElement[0]).toBeInTheDocument()
});

test('login', () => {
    render(<AppWrapper />);
    fireEvent(
        screen.getByText(/Login/),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )
    const linkElement = screen.getAllByText(/Name/);
    expect(linkElement[0]).toBeInTheDocument()
});