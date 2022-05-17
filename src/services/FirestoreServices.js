import { app } from "../../firebase";

const firestore = app.firestore();

export const guardarFotoEnCollection = async (coleccion, docName, foto) => {
  return await firestore.collection(coleccion).doc(docName).set(foto);
};
export const agregarMensaje = async (coleccion, mensaje) => {
  /*
  addDoc(collection(database, "chats"), );
  */
  return await firestore.collection(coleccion).add(mensaje);
};
export const getAllFotosByEmail = async (
  coleccion,
  email,
  tipo,
  onResult,
  onError
) => {
  return await firestore
    .collection(coleccion)
    .where("email", "==", email)
    .where("tipo", "==", tipo)
    .onSnapshot(onResult, onError);
};
export const getUsuarioByEmail = async (email, onResult, onError) => {
  return await firestore
    .collection("usuarios")
    .where("correo", "==", email)
    .onSnapshot(onResult, onError);
};

export const getAllFotos = async (coleccion, tipo, onResult, onError) => {
  return await firestore
    .collection(coleccion)
    .where("tipo", "==", tipo)
    .onSnapshot(onResult, onError);
};
export const getAllMensajes = async (coleccion, onResult, onError) => {
  return await firestore
    .collection(coleccion)
    .orderBy("createdAt", "desc")
    .onSnapshot(onResult, onError);
};

export const updateVotos = async (coleccion, doc, email, votosAnteriores) => {
  const votosActualizados = [...votosAnteriores, email];
  return await firestore.collection(coleccion).doc(doc).update({
    votos: votosActualizados,
  });
};
export const updatePuntosUser = async (coleccion, user) => {
  console.log(user);
  return await firestore.collection(coleccion).doc(`${user.id}`).update(user);
};
export const resetPuntosUser = async (coleccion, user) => {
  console.log(user);
  return await firestore
    .collection(coleccion)
    .doc(`${user.id}`)
    .update({ puntos: 0, acum: 0, acum2: 0, acum3: 0 });
};
