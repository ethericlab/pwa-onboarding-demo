import React, { useState } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import { useGesture } from "react-use-gesture";
import { clamp, range } from "../../utils";
import { PageIndicator } from "../PageIndicator/PageIndicator";
import s from "./PageView.module.scss";
import { Spacer } from "../Spacer";
import { Button } from "../Button/Button";

const MIN_VELOCITY = 0.2;
const MIN_SCREEN_PROGRESS = 0.3

export const PageView = ({ children }) => {
  const pages = React.Children.toArray(children);

  const [{ progress }, setProgress] = useSpring(() => ({
    progress: 0
  }));
  const [pageProps, setPage] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    display: "block"
  }));
  const [currentPage, _setCurrentPage] = useState(0);
  const setCurrentPage = page => {
    _setCurrentPage(page);
    setProgress({
      progress: page
    });
    setPage(i => {
      if (i < currentPage - 1 || i > currentPage + 1)
        return { display: "none" };
      const x = (i - page) * window.innerWidth;
      console.log(`page ${i} -> ${x}\n`);
      return { x, display: "block" };
    });
  };

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], vxvy: [xVelocity] }) => {
      const dragEnd = !down;
      // Compute clamped xDelta so that we just scroll max 1 page at a time
      const clampedXDelta = clamp(
        xDelta,
        -window.innerWidth,
        window.innerWidth
      );
      // Get the current screen scroll progress (from 0 to 1 or -1, ie from 0% to 100% or -100%)
      // Multiply the x delta by -1 because pages scroll the opposite way of x coordinate value
      let screenScrollProgress = (clampedXDelta * -1) / window.innerWidth;

      // Do not go to next page if the drag length was too small or velocity too low
      if (dragEnd && Math.abs(screenScrollProgress) < MIN_SCREEN_PROGRESS && Math.abs(xVelocity) < MIN_VELOCITY) {
        screenScrollProgress = 0;
      }

      // Get the new intermediate progress by adding current local progress to page number
      let newProgress = clamp(
        currentPage + screenScrollProgress,
        0,
        pages.length - 1
      );

      // console.log(`newProgress: ${newProgress}, xDelta: ${clampedXDelta}`)

      // On drag end - calculate the new page
      if (dragEnd) {
        // If we scrolled to fast on a mobile device - add 0.5 to be sure to transition to next page
        if (Math.abs(xVelocity) > MIN_VELOCITY) newProgress += 0.5 * (xDir > 0 ? -1 : 1);

        const newPage = clamp(Math.round(newProgress), 0, pages.length - 1);
        setCurrentPage(newPage);
      } else {
        setProgress({
          progress: newProgress
        });
        setPage(i => {
          // If the page is outside the currentPage +- 1 range - hide it altogether, since it won't be visible anyway
          if (i < currentPage - 1 || i > currentPage + 1)
            return { display: "none" };

          // Compute x delta for first and last pages so that they overscroll to only 1/3 (0.3) of the window width
          let xDelta = clampedXDelta;
          if (currentPage === 0 && i === currentPage && xDir > 0 && screenScrollProgress < 0) {
            xDelta = clamp(xDelta, 0, 0.3 * window.innerWidth);
          } else if (currentPage === pages.length - 1 && i === currentPage && xDir < 0 && screenScrollProgress > 0) {
            xDelta = clamp(xDelta, -0.3 * window.innerWidth, 0);
          }

          // Compute the x offset of the page at index `i`]
          let x =
            (i - currentPage) * window.innerWidth + xDelta;

          return { x, display: "block" };
        });
      }
    }
  );

  return (
    <animated.div
      className={s.backgroundContainer}
      style={{
        background: progress.interpolate({
          range: range(0, pages.length - 1, true),
          output: pages.map(_ => _.props.color || "#fff")
        })
      }}
      {...bind()}
    >
      <div className={s.container}>
        <Spacer />

        <div className={s.pageContainer}>
          {React.Children.map(children, (child, idx) => {
            const { x, display } = pageProps[idx];
            return (
              <animated.div
                key={idx}
                className={s.pageWrapper}
                style={{
                  display,
                  transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
                }}
              >
                {child}
              </animated.div>
            );
          })}
        </div>

        <Spacer />

        <PageIndicator
          page={currentPage}
          count={pages.length}
          onChange={() => {}}
        />

        <Spacer />

        <Button className={s.ctaButton}>Get Started</Button>
      </div>
    </animated.div>
  );
};
