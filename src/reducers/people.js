import { createReducer } from '../utils';
import { ADD_PERSON, DELETE_PERSON, GENERATE} from "../constants";

function addPerson(initialState, payload) {
	if(nameAlreadyExists(initialState.persons || [],payload.value)) {
		return initialState;
	}

	const newPerson = {
		name:payload.value,
		id:nextId(initialState.persons || [])
	}

	return {
		...initialState, 
		persons: [...(initialState.persons || []), newPerson],
		results:null
	};
}

function nameAlreadyExists(persons, name){
	return persons.some(p => p.name === name);
}

function nextId(persons){
	const ids = persons.map(p => p.id);
	return (ids.length !== 0 ? Math.max(...ids) + 1 : 1);
}

function deletePerson(initialState, payload){
	const persons = [].concat(initialState.persons.slice(0,payload.index), initialState.persons.slice(payload.index+1));
	return {
			...initialState,
			persons,
			results:null
		};
}

function generateResult(initialState, payload){
	const results = determineOrder(initialState.persons);
	return {
		...initialState,
		results
	}
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