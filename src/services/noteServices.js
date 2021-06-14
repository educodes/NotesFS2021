import axios from "axios";

const URLBASE = "http://localhost:3001/notes";

export const getAllNotes = () => {
  return axios.get(URLBASE).then((response) => {
    const { data } = response;
    return data;
  });
};

export const createNote = (objNote) => {
  return axios.post(URLBASE, objNote).then((response) => {
    const { data } = response;
    return data;
  });
};

export const changeImportantOfNote = (id, modifyNote) => {
  const url = `${URLBASE}/${id}`;
  return axios.put(url, modifyNote).then((response) => {
    const { data } = response;
    return data;
  });
};
