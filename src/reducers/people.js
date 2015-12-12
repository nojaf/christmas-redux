import { createReducer } from '../utils';
import { ADD_PERSON, DELETE_PERSON, GENERATE} from "../constants";
import Immutable from "immutable";

function addPerson(initialState, payload) {
	if(nameAlreadyExists(initialState.get("persons"), payload.value)) {
		return initialState;
	}

	const newPerson = {
		name:payload.value,
		id:nextId(initialState.get("persons"))
	}

	return initialState
			.set("persons", initialState.get("persons").push(newPerson))
			.set("results", Immutable.Map());
}

function nameAlreadyExists(persons = Immutable.List(), name){
	return persons.some(p => p.name === name);
}

function nextId(persons = Immutable.List()){
	const ids = persons.map(p => p.id);
	return (ids.size !== 0 ? Math.max(...ids) + 1 : 1);
}

function deletePerson(initialState, payload){
	return initialState
			.set("persons", initialState.get("persons").filter(p => p.index !== payload.index))
			.set("results", Immutable.Map());
}

function generateResult(initialState, payload){
	return initialState
			.set("results", determineOrder(initialState.get("persons")));
}

function determineOrder(persons){
	let resultMap = new Immutable.Map();
	const randomPersonArray = shuffle(persons.toArray());
	for (var i = randomPersonArray.length - 1; i > -1; i--) {
		if(i > 0){
		 	resultMap = resultMap.set(randomPersonArray[i].id, randomPersonArray[i -1].id);
		}else{
			resultMap = resultMap.set(randomPersonArray[0].id, randomPersonArray[randomPersonArray.length -1].id);
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

export function initialStateProvider(){
	return Immutable.Map({
		"persons":Immutable.List(),
		"results":Immutable.Map()
	});
}

const initialState = initialStateProvider();
export default createReducer(initialState, {
	[ADD_PERSON]: (state, payload) => addPerson(state, payload), 
	[DELETE_PERSON]: (state, payload) => deletePerson(state, payload),
	[GENERATE]: (state, payload) => generateResult(state, payload)
});