import { body, html } from "slam-js";
import { Head } from "./components/Head";

export default function Document(){
  return(
    html(
      Head(),
      body(
        "Hello World"
      )
    )
  )
}