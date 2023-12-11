import { render, screen} from '@testing-library/react';
import AppWrapper from "../App";
import '@testing-library/jest-dom'

test('home', () => {
  render(<AppWrapper />);
  const linkElement = screen.getAllByText(/Home/);
  expect(linkElement[0]).toBeInTheDocument()
});