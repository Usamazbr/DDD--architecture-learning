/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontSize: {
        xl10: "10rem",
        xl11: "11rem",
        xl12: "12rem",
        xl13: "13rem",
        xl15: "15rem",
        xl18: "18rem",
        xl20: "20rem",
        xl25: "25rem",
        xl30: "30rem",
      },
      height: {
        100: "26rem",
        110: "29rem",
        120: "31rem",
        130: "34rem",
        140: "37rem",
        150: "39rem",
        160: "41rem",
        200: "52rem",
      },
      width: {
        100: "26rem",
        110: "29rem",
        120: "31rem",
        130: "34rem",
        140: "37rem",
        150: "39rem",
        160: "41rem",
        200: "52rem",
      },
    },
  },
  plugins: [],
};
