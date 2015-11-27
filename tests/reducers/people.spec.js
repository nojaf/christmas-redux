import {default as peopleReducer} from "reducers/people";
import {ADD_PERSON, DELETE_PERSON, GENERATE} from "constants";

describe("people reducers", () => {

	describe("passed an unkown type", () => {
		it("should return the previous state", () => {
			const state = {};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:"SometingElse"});
			assert.equal(state, newState);
		});
	})

	describe("passed an ADD_PERSON type", () => {
		it("should add a new person", () => {
			const state = {};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			assert.equal("Jimmy",newState.persons[0]);
		});

		it("should clear the results when adding a person", () => {
			const state = {persons:["Tim","Peter"], results:new Map()};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Gilles"}});
			assert.isNull(newState.results);		
		});
	});

	describe("passed a DELETE_PERSON type", () => {
		it("should remove a person", () => {
			const state = {persons:["Tim", "Bob", "James"]};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:DELETE_PERSON, payload:{"index":2}});
			assert.equal("Bob", newState.persons[newState.persons.length - 1]);
		});

		it("should clear the results when removing a person", () => {
			const state = {persons:["Tim", "Dave", "Mike"], results:new Map()};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:DELETE_PERSON, payload:{"index":0}});
			assert.isNull(newState.results);
		});
	});

	describe("passed a GENERATE type", () => {
		it("should generate a resultset", () => {
			const state = {persons:["Dave", "Hanna"]};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:GENERATE});
			assert.isNotNull(newState.results);
		});

		it("should generate a matching circle", () => {
			const state = {persons:["Dave", "Hanna","Henry"]};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:GENERATE});
			newState.results.forEach((key,value) => {
				assert.notEqual(key, newState.results[key]);
			});
		});

		function onlyUnique(value, index, self) { 
		    return self.indexOf(value) === index;
		}

		it("should not contain duplicate values", () => {
			const state = {persons:["James","Harvey","Bruce","Alfred"]};
			Object.freeze(state);

			const newState = peopleReducer(state, {type:GENERATE});
			const uniqueValues = Array.from(newState.results.values()).filter(onlyUnique);
			assert.equal(newState.results.size, uniqueValues.length);
		});
	});
});