import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", function () {
    render(<NewBoxForm createBox={jest.fn} />);
});

it("matches initial form snapshot", function () {
    const { asFragment } = render(<NewBoxForm createBox={jest.fn} />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches data-entered snapshot", function () {
  const { container } = render(<NewBoxForm createBox={jest.fn} />);

  const heightInput = container.querySelector("[name=height]") as HTMLElement;
  const widthInput = container.querySelector("[name=height]") as HTMLElement;
  const bgColorInput = container.querySelector("[name=backgroundColor]") as HTMLElement;

  fireEvent.input(heightInput, { target: { value: "7" } });
  fireEvent.input(widthInput, { target: { value: "8" } });
  fireEvent.input(bgColorInput, { target: { value: "firebrick" } });

  expect(container).toMatchSnapshot();
});

it("submitting form works", function () {
    const mockCreateBox = jest.fn();
    const { container } = render(<NewBoxForm createBox={mockCreateBox} />);

    const heightInput = container.querySelector("[name=height]") as HTMLElement;
    const widthInput = container.querySelector("[name=height]") as HTMLElement;
    const bgColorInput = container.querySelector("[name=backgroundColor]") as HTMLElement;

    fireEvent.change(heightInput, { target: { value: "7" } });
    fireEvent.change(widthInput, { target: { value: "8" } });
    fireEvent.change(bgColorInput, { target: { value: "firebrick" } });

    expect(mockCreateBox).toHaveBeenCalledTimes(0);

    fireEvent.click(container.querySelector(".NewBoxForm-addBtn") as HTMLElement);

    expect(mockCreateBox).toHaveBeenCalledTimes(1);

    // expect all form inputs to be empty
    expect(container.querySelectorAll("input[value='']")).toHaveLength(3);
});

it("won't submit invalid data", function () {
    const mockCreateBox = jest.fn();
    const { container } = render(<NewBoxForm createBox={mockCreateBox} />);

    const heightInput = container.querySelector("[name=height]") as HTMLElement;

    fireEvent.input(heightInput, { target: { value: "7" } });

    expect(mockCreateBox).toHaveBeenCalledTimes(0);

    fireEvent.click(container.querySelector(".NewBoxForm-addBtn") as HTMLElement);

    const badDataP = container.querySelector(".bad") as HTMLElement;
    expect(badDataP.textContent).toEqual("\"BAD DATA\"");
});