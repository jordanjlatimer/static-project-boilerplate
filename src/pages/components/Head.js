import { head, link, meta, title } from "slam-js";

export function Head(){
  return(
    head(
      title("Jordan Latimer"),
      meta({ name: "viewport", content: "width=device-width, initial-scale=1, minimum-scale=1" }),
      link({ rel: "icon", href: "assets/favicon.ico" })
    )
  )
}