import { createReducer } from '../utils';
import { ADD_PERSON, DELETE_PERSON, GENERATE} from "../constants";
import objectAssign from "object-assign";

function addPerson(initialState, payload) {
	if(initialState.persons && initialState.persons.indexOf(payload.value) !== -1) return initialState;

	return objectAssign({}, initialState, {
		persons: [...(initialState.persons || []), payload.value],
		results:null
	});
}

function deletePerson(initialState, payload){
	const reducedPeople = [].concat(initialState.persons.slice(0,payload.index), initialState.persons.slice(payload.index+1));
	return objectAssign({}, initialState, 
		{persons:reducedPeople, results:null});
}

function generateResult(initialState, payload){
	const result = determineOrder(initialState.persons);
	return objectAssign({}, initialState, {"results":result});
}

function determineOrder(persons){
	const resultMap = new Map();
	const randomPersonArray = shuffle(persons.slice());

	for (var i = randomPersonArray.length - 1; i > -1; i--) {
		if(i > 0){
		 	resultMap.set(randomPersonArray[i], randomPersonArray[i -1]);
		}else{
			resultMap.set(randomPersonArray[0], randomPersonArray[randomPersonArray.length -1]);
		}
	};

	return resultMap;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const initialState = {
	persons:[]
};
export default createReducer(initialState, {
	[ADD_PERSON]: (state, payload) => addPerson(state, payload), 
	[DELETE_PERSON]: (state, payload) => deletePerson(state, payload),
	[GENERATE]: (state, payload) => generateResult(state, payload)
});