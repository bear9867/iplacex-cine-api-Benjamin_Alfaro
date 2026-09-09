import { ObjectId} from "mongodb";
import client from "../common/db.js"
import { Actor } from "./actor.js";

const actorCollection = client.db("cine-db").collection("actores");
const peliculaCollection = client.db("cine-db").collection("peliculas");

async function handleInsertActorRequest(req, res) {
    const data = req.body;
    const actor = Actor;
    actor.idPelicula = data.idPelicula;
    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;
    let oid;
    try {
        oid = ObjectId.createFromHexString(actor.idPelicula);
    } 
    catch (e) {
        return res.status(400).send({error: "Id de película mal formado"});
    }

    const pelicula = await peliculaCollection.findOne({ _id: oid })
        .then((data) => {
            return data})
        .catch((e) => {
            return res.status(500).send({
                error: e.code})})

    if (!pelicula) {
        return res.status(404).send({error: "La película no existe"})
    }


    await actorCollection
        .insertOne(actor)
        .then((data) => {
            if (!data) {
                return res.status(400).send({error: "No se pudo insertar el actor"})
            }
            return res.status(201).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error: e.code})
        })
}



async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
        .then((data) => {return res.status(200).send(data)})
        .catch((e) => {return res.status(500).send({ error: e })})
}


async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({_id: oid})
        .then((data) => {
            if(data == null) return res.status(404).send({ data });

            return res.status(200).send(data);
        })
        .catch((e) => {return res.status(500).send({ error: e.code })})

    }catch(e){
      
        return res.status(400).send({ error: "Id mal formado" })
    }
}
async function handleGetActoresByPeliculaIdRequest(req, res) {
    const id = req.params.id;

    try {
        ObjectId.createFromHexString(id);

        await actorCollection
            .find({ idPelicula: id })
            .toArray()
            .then((data) => {

                if (data.length === 0) {
                    return res.status(404).send({
                        error: "No existen actores asociados a esta película"
                    });
                }

                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({
                    error: e.code
                });
            });

    } catch (e) {
        return res.status(400).send({
            error: "Id de película mal formado"
        });
    }
}

export default{ 
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}
