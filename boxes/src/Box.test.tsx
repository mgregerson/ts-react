import Box from "./Box";
import { render, fireEvent } from "@testing-library/react";

const mock = jest.fn();

describe("Box Component", function () {
  it("renders without crashing", function () {
    render(
      <Box id={1} width={5} height={5} backgroundColor="pink" remove={mock} />
    );
  });
  it("matches snapshot", function () {
    const { container } = render(
      <Box id={1} width={5} height={5} backgroundColor="pink" remove={mock} />
    );
    expect(container).toMatchSnapshot();
  });
  it("Displays a box on the page with appropriate styling", function () {
    const { container } = render(
      <Box id={1} width={5} height={5} backgroundColor="pink" remove={mock} />
    );
    const box = container.querySelector(".Box-box") as HTMLElement;
    const computedStyle = window.getComputedStyle(box);

    expect(computedStyle.backgroundColor).toEqual("pink");
    expect(computedStyle.width).toEqual("5em");
    expect(computedStyle.height).toEqual("5em");
  });
  it("Calls the remove function on click of the button", function () {
    const { container } = render(
      <Box id={1} width={5} height={5} backgroundColor="pink" remove={mock} />
    );
    const button = container.querySelector(".Box-removeBtn") as HTMLElement;
    fireEvent.click(button);
    expect(mock).toHaveBeenCalled();
  });
});
