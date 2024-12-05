import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import user_routes from './user/routes'
import qr_routes from './qrkode/routes'

env.config()

const app = express()
const PORT = process.env.PORT

app.use(
    cors({
      origin: "*"
    })
  );
app.use(express.json());

app.use('/api', user_routes)
app.use('/api', qr_routes)


app.listen(PORT, ()=>{
    console.info("Server running on PORT: " + PORT)
})