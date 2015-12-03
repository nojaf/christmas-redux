import {default as peopleReducer, initialStateProvider} from "reducers/people";
import {ADD_PERSON, DELETE_PERSON, GENERATE} from "constants";
import Immutable from "immutable";

describe("people reducers", () => {

	describe("passed an unkown type", () => {
		it("should return the previous state", () => {
			const state = initialStateProvider();
			const newState = peopleReducer(state, {type:"SometingElse"});
			assert.equal(state, newState);
		});
	})

	describe("passed an ADD_PERSON type", () => {
		it("should add a new person", () => {
			const state = initialStateProvider();
			const newState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			assert.deepEqual({name:"Jimmy",id:1}, newState.get("persons").get(0));
		});

		it("should not add an existing name", () => {
			const state = initialStateProvider();
			const addedState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			const newState = peopleReducer(addedState, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			assert.equal(addedState, newState);			
		})

		it("should clear the results when adding a person", () => {
			const state = initialStateProvider();
			const onePersonState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			const twoPersonState = peopleReducer(onePersonState, {type:ADD_PERSON, payload:{"value":"Gilles"}});
			const newState = peopleReducer(twoPersonState, {type:ADD_PERSON, payload:{"value":"Gilles"}});
			assert.equal(newState.get("results").size, 0);		
		});

		it("should give the new person a higher id then the last", () => {
			const state = initialStateProvider();
			const onePersonState = peopleReducer(state, {type:ADD_PERSON, payload:{"value":"Jimmy"}});
			const twoPersonState = peopleReducer(onePersonState, {type:ADD_PERSON, payload:{"value":"Gilles"}});
			assert.isTrue(twoPersonState.get("persons").get(0).id < twoPersonState.get("persons").get(1).id);
		});
	});

	describe("passed a DELETE_PERSON type", () => {
		it("should remove a person", () => {
			const state = Immutable.Map({
				persons:Immutable.List([{name:"Alice", id:1},{name:"Bob",index:2},{name:"Freddie", index:3}])
			});

			const newState = peopleReducer(state, {type:DELETE_PERSON, payload:{"index":2}});
			assert.deepEqual({name:"Freddie",index:3}, newState.get("persons").last());
		});

		it("should clear the results when removing a person", () => {
			const state = Immutable.Map({
				persons:Immutable.List([{id:1},{id:2},{id:3}]), 
				results:new Map()
			});
			Object.freeze(state);

			const newState = peopleReducer(state, {type:DELETE_PERSON, payload:{"index":0}});
			assert.equal(newState.get("results").size, 0);
		});
	});

	describe("passed a GENERATE type", () => {
		it("should generate a resultset", () => {
			const state = initialStateProvider().set("persons", Immutable.List([
					{id:1, name:"Dave"},
					{id:2, name: "Hanna"}
				]));

			const newState = peopleReducer(state, {type:GENERATE});
			assert.equal(newState.get("results").size, 2);
		});

		it("should generate a matching circle", () => {
			const state = initialStateProvider().set("persons", Immutable.List([
				{
					name:"Dave",
					id:1
				},
				{
				 	name:"Hanna",
				 	id:2
				},
				{
					name:"Henry",
					id:3
				}]));

			const newState = peopleReducer(state, {type:GENERATE});
			newState.get("results").forEach((key,value) => {
				assert.notDeepEqual(key, newState.get("results").get(key));
			});
		});

		function onlyUnique(value, index, self) { 
		    return self.indexOf(value) === index;
		}

		it("should not contain duplicate values", () => {
			const state = initialStateProvider()
							.set("persons", Immutable.List(["James","Harvey","Bruce","Alfred"]));

			const newState = peopleReducer(state, {type:GENERATE});
			const uniqueValues = Array.from(newState.get("results").values()).filter(onlyUnique);
			assert.equal(newState.get("results").size, uniqueValues.length);
		});
	});
});