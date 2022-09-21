import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  lineHeight: 2,
  fontFamily:
    "--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});
