import { keyframes, style } from "@vanilla-extract/css";

export const _root = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const _field = style({
  height: "2rem",
  padding: "0.5rem",
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

export const _submit = style({
  height: "2rem",
  backgroundColor: "#1b1b1b",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
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
