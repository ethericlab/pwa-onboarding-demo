import React from "react";
import { range } from "../../utils";
import s from "./PageIndicator.module.scss";

export const PageIndicator = ({ page, count, onChange }) => {
  const getActiveItemPosition = () => {
    const offset = page * (100 / (count - 1));
    const widthOffset = 5 * (offset / 100);
    return `calc(${offset}% - ${widthOffset}px)`;
  };

  return (
    <div
      className={s.pageIndicator}
      style={{ width: count * 5 + (count - 1) * 15 }}
    >
      <span
        className={s.activeItem}
        style={{
          left: getActiveItemPosition()
        }}
      >
        <span className={s.left} />
        <span className={s.center} />
        <span className={s.right} />
      </span>
      {range(0, count).map(idx => (
        <span key={idx} className={s.item} onClick={() => onChange(idx)} />
      ))}
    </div>
  );
};
