import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

// The three A's of testing:

// Arrange: Set up the test data, test conditions and test environment
// Act: Run logic that should be tested (ex: execute function)
// Assert: Compare execution results with expected results

describe("Greeting Component", () => {
  test("Renders hello world as a text", () => {
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
});


