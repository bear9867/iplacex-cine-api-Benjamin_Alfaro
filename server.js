import express, { urlencoded} from "express"
import cors from "cors"
import client from './src/common/db.js'
import actorRoutes from './src/Actor/actorRoutes.js'
import peliculaRoutes from './src/Pelicula/peliculaRoutes.js'

const PORTS = 3000 || 4000
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.all('/',(req, res) => {return res.status(200).send('Bienvenido a la API REST de Benjamin Alfaro')})
app.use('/api', peliculaRoutes)
app.use('/api', actorRoutes)

await client.connect()
.then(() => {
    console.log('Conectado al cluster de Atlas de MongoDB')
    app.listen(PORTS, () => { console.log
         (`Servidor corriendo en
             http://localhost:${PORTS}`) })
 })
.catch((error) => {
    console.error('Error al conectar al cluster de Atlas de MongoDB', error)
})