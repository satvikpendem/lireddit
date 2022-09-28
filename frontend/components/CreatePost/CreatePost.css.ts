import { style } from "@vanilla-extract/css";
import { _field } from "../AuthenticationForm/AuthenticationForm.css";

export const _base = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "400px",
  margin: "0 auto",
});

export const _body = style([_field, {
  height: "100px",
}]);
