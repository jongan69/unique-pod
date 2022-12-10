// These are really bad

const tintColorLight =  "#FFD700";
const tintColorDark =   "#FFD700";

export default {
  light: {
    primary: "#FFD700",
    secondary: "rgb(199, 199, 204)",
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#FFD700",
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
    primary: "#FFD700",
    secondary: "rgb(199, 199, 204)",
    background: "#000",
    card: "#ffffff",
    text: "#ffffff",
    textLight: "#fff",
    border: "rgb(199, 199, 204)",
    notification: "#FFD700",
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: "#FFD700",
    secondary: "rgb(199, 199, 204)",
    background: "#ffffff",
    card: "#ffffff",
    text: "#000",
    textLight: "#000",
    border: "rgb(199, 199, 204)",
    notification: "#FFD700",
  },
};
