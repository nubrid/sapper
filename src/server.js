import dotenv from "dotenv"

dotenv.config()

/* eslint-disable no-console, import/no-extraneous-dependencies, import/first, unicorn/prevent-abbreviations */

// NOTE: SAPPER (20201017)
import sirv from "sirv"
import polka from "polka"
import compression from "compression"
import * as sapper from "@sapper/server"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err)
  })
