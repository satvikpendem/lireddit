import { globalStyle, style } from "@vanilla-extract/css";

export const _base = style({
  height: 40,
  width: "100%",
  backgroundColor: "tomato",
  padding: 16,

  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
});

export const _username = style({
  color: "white",
  fontWeight: "bold",
});

globalStyle(`${_base} a`, {
  color: "white",
  textDecoration: "none",
});
