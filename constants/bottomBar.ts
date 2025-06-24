export const animationConfig = {
  tabView: {
    scale: 1.1,
  },
  swipeUp: {
    translateY: 0,
    opacity: 1,
  },
  minimizedState: {
    translateY: 50,
    scale: 0.7,
    opacity: 0.8,
  },
  openMenu: {
    translateY: -350,
    opacity: 1,
    scale: 1.2,
  },
  begin: {
    translateY: 40,
    opacity: 0.5,
    scale: 0.8,
  },
  normalState: {
    opacity: 1,
    translateY: 0,
    scale: 1,
  },
};

export type BottomBarState =
  | "minimizedState"
  | "normalState"
  | "openMenu"
  | "swipeUp"
  | "begin"
  | "tabView";
// This file contains the animation configurations for the bottom bar in the IonBrowser app.
