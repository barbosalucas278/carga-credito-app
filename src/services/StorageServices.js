import { app } from "../../firebase";
import uuid from "react-native-uuid";

const storage = app.storage("gs://usuarios-pps-81d8e.appspot.com");
/**
 *
 * @param {string} imgRefName ruta donde se va a guardar la iamgen en el storage
 * @param {Blob} blob imagen pasada como un blob
 * @returns
 */
export const guardarImagenStorage = async (imgRefName, blob) => {
  try {
    const docName = uuid.v4().toString();
    const ref = storage.ref(imgRefName + "/" + docName);
    await ref.put(blob);
    const respuesta = { ref: ref, docName: docName };
    return respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
};
