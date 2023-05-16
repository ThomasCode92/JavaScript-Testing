import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  test("should render 'Hello World' as a Text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...

    // Assert
    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
