import express from 'express';
import actorController from './actorCollection.js';

const routes = express.Router();

routes.post('/actor', actorController.handleInsertActorRequest);
routes.get('/actores', actorController.handleGetActoresRequest);


routes.get('/actor/:id', actorController.handleGetActorByIdRequest);

/*Modifique la ruta ya que si la coloco como la pauta, 
quedan dos rutas practicamente iguales porque se ingresa dos veces /actor/id ya sea de la pelicula u actor
y ahi empieza el problema*/

routes.get('/actor/pelicula/:id', actorController.handleGetActoresByPeliculaIdRequest);


export default routes;