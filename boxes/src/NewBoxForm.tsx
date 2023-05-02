import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { NewBoxFormProps, FormDataInterface } from "./Interfaces";

/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height, width, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */


// function NewBoxForm({ createBox }: NewBoxFormProps) {
// function NewBoxForm({ createBox }: { createBox: Function; }) {
function NewBoxForm(props: { createBox: Function; }) {
  const [formData, setFormData] = useState<FormDataInterface>({
    height: "",
    width: "",
    backgroundColor: "",
  });
  const [dataIsInvalid, setDataIsInvalid] = useState(false);

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((formData: FormDataInterface) => ({
      ...formData,
      [name]: value,
    }));
  }


  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (
      formData.height === "" ||
      formData.width === "" ||
      formData.backgroundColor === ""
    ) {
      setDataIsInvalid(true);
      return;
    }

    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  }


  if (dataIsInvalid) return <p className="bad">"BAD DATA"</p>;

  return (
    <div className="NewBoxForm">
      <form className="NewBoxForm-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newBox-height">Height</label>
          <input
            id="newBox-height"
            onChange={handleChange}
            name="height"
            value={formData.height}
          />
        </div>
        <div>
          <label htmlFor="newBox-width">Width</label>
          <input
            id="newBox-width"
            onChange={handleChange}
            name="width"
            value={formData.width}
          />
        </div>
        <div>
          <label htmlFor="newBox-backgroundColor">Background Color</label>
          <input
            id="newBox-backgroundColor"
            onChange={handleChange}
            name="backgroundColor"
            value={formData.backgroundColor}
          />
        </div>
        <button className="NewBoxForm-addBtn">Add a new box!</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
