import { BoxProps } from "./Interfaces";

/** Colored box presentation
 *
 * Props:
 * - id (unique)
 * - width
 * - height
 * - backgroundColor
 * - remove (function to call)
 *
 * BoxList -> Box
 */

// Write this as an extension of BoxInterface from BoxList.tsx

function Box({ id, width = 5, height = 5, backgroundColor = "green", remove }: BoxProps) {
  /** Remove a box. */
  function handleRemove() {
    remove(id);
  }

  return (
    <div className="Box">
      <div
        className="Box-box"
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor: backgroundColor,
        }}
      />
      <button className="Box-removeBtn" onClick={handleRemove}>
        Remove The Box!
      </button>
    </div>
  );
}

export default Box;
