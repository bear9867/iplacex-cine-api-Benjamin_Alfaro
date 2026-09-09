import express from 'express';
import peliculaController from './Pelicula/peliculaCollection.js';
import actorController from './Actor/actorCollection.js';

const routes = express.Router();


routes.post('/pelicula', peliculaController.handleInsertPeliculaRequest);
routes.get('/peliculas', peliculaController.handleGetPeliculasRequest);
routes.get('/pelicula/:id', peliculaController.handleGetPeliculaByIdRequest);
routes.put('/pelicula/:id', peliculaController.handleUpdatePeliculaByIdRequest);
routes.delete('/pelicula/:id', peliculaController.handleDeletePeliculaByIdRequest);


routes.post('/actor', actorController.handleInsertActorRequest);
routes.get('/actores', actorController.handleGetActoresRequest);


routes.get('/actor/:id', actorController.handleGetActorByIdRequest);

/*Modifique la ruta ya que si la coloco como la pauta, 
quedan dos rutas practicamente iguales porque se ingresa dos veces /actor/id ya sea de la pelicula u actor
y ahi empieza el problema*/

routes.get('/actor/pelicula/:id', actorController.handleGetActoresByPeliculaIdRequest);


export default routes;