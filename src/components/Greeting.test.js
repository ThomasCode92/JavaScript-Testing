import { fireEvent, render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  test("should render 'Hello World' as a Text", () => {
    render(<Greeting />);

    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("should render'good to see you' if the button was NOT clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText('good to see you', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test("should render 'Changed' if the button is clicked", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const outputElement = screen.getByText('changed', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test("should not render 'good to see you' if the button was NOT clicked", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const outputElement = screen.queryByText('good to see you', {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
