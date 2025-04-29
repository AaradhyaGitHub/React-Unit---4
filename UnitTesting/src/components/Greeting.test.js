import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// The three A's of testing:

// Arrange: Set up the test data, test conditions and test environment
// Act: Run logic that should be tested (ex: execute function)
// Assert: Compare execution results with expected results

describe("Greeting Component", () => {
  test("renders hello world as a text", () => {
    //Arrannge:
    render(<Greeting />);

    //Act:
    //....nothing here

    //Assert: Test whether hello world is rendered as a text:
    const helloWorldElement = screen.getByText("Hello World", { exact: true });
    expect(helloWorldElement).toBeInTheDocument();

    // get functions -> throws error, query functions don't do that
    // find functions -> returns a promise
  });

  test("renders Good to see ya mate if button was not clicked", () => {
    //Arrannge:
    render(<Greeting />);

    //Act:
    //....nothing here

    //Assert
    const paragraphElement = screen.getByText("Good to see ya mate", {
      exact: false
    });
    expect(paragraphElement).toBeInTheDocument();
  });

  test("render Howdy señor! if button was clicked", () => {
    // Arrange
    render(<Greeting />);

    //Act:
    //Click the button
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert:
    const updatedParagraphElement = screen.getByText("Howdy señor!");
    expect(updatedParagraphElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    //Arrange
    render(<Greeting />);

    //Act:
    //Click the button
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert:
    const updatedParagraphElement = screen.queryByText("Good to see ya mate", {
      exact: false
    });
    expect(updatedParagraphElement).toBeNull();
  });
});
