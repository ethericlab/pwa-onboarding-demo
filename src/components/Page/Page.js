import React from "react";
import s from "./Page.module.scss";

export const Page = ({ color, style, children }) => (
  <article className={s.page} style={style}>
    {React.Children.map(children, child => {})}
    {children}
  </article>
);

export const Image = ({ src, alt }) => (
  <figure className={s.image}>
    <img src={src} alt={alt} />
  </figure>
);

export const Title = ({ children }) => <h1 className={s.title}>{children}</h1>;

export const Text = ({ children }) => <p className={s.text}>{children}</p>;
