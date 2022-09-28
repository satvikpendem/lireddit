import { keyframes, style } from "@vanilla-extract/css";

export const _root = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const _field = style({
  height: "2rem",
  padding: "0.5rem",
  width: "100%",
});

export const _spacer = style({
  height: "20px",
});

export const _label = style({
  fontWeight: "bold",
  marginBottom: "5px",
});

export const _error = style({
  color: "red",
  fontStyle: "italic",
});

export const _primaryButton = style({
  height: "2rem",
  width: "100%",
  backgroundColor: "#1b1b1b",
  color: "white",
  fontWeight: "bold",
  borderRadius: "5px",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: "2px solid black",
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const _loading = style({
  border: "3px solid #ffffff",
  borderTop: "3px solid #000000",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  animation: `${rotate} 2s linear infinite`,
});

export const _secondaryButtonGroup = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
});

export const _secondaryButton = style([_primaryButton, {
  color: "black",
  backgroundColor: "white",
  border: "2px solid black",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
}]);
