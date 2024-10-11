// client.ts
import { createClient } from "@sanity/client"

export default createClient({
  projectId: "lyf5ckxz", // you can find this in sanity.json
  apiVersion: "2021-08-31",
  dataset: "production", // or the name you chose in step 1
  token: process.env.SANITY_API_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true // `false` if you want to ensure fresh data
})
