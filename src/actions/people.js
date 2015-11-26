import {
	ADD_PERSON,
	GENERATE,
	DELETE_PERSON
}
from "../constants";

export default {
  addPerson: (value) => ({type:ADD_PERSON, payload:{value}}),
  generate: () => ({type:GENERATE}),
  removePerson:(index) => ({type:DELETE_PERSON, payload:{index}})
};
