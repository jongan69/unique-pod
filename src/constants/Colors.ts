// These are really bad

const tintColorLight =  "#d75555";
const tintColorDark =   "#d75555";

export default {
  light: {
    primary: "#d75555",
    secondary: "rgb(199, 199, 204)",
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#d75555",
    secondary: "rgb(199, 199, 204)",
    text: "#ffffff",
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: "#d75555",
    secondary: "rgb(199, 199, 204)",
    background: "#000",
    card: "#ffffff",
    text: "#ffffff",
    textLight: "#fff",
    border: "rgb(199, 199, 204)",
    notification: "#d75555",
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: "#d75555",
    secondary: "rgb(199, 199, 204)",
    background: "#ffffff",
    card: "#ffffff",
    text: "#000",
    textLight: "#000",
    border: "rgb(199, 199, 204)",
    notification: "#d75555",
  },
};
