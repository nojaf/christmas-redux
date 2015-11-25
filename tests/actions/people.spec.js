import configureStore from "../../src/store/configureStore";
import actions from "actions/people";

describe("invoking actions", () => {
	it("should add a newPerson", () => {
		const initialState = {people:{persons:[]}, router:null};
		Object.freeze(initialState);
		const store = configureStore(initialState, false);

		store.dispatch(actions.addPerson("Hank"));
		const state = store.getState(); 
		expect(state.people.persons[0]).to.equal("Hank");
	})

	it("should remove a person", () => {
		const initialState = {people:{persons:["Hank","James","Paul"]}};
		Object.freeze(initialState);
		const store = configureStore(initialState, false);

		store.dispatch(actions.removePerson(0));
		const state = store.getState();
		expect(state.people.persons.length).to.equal(2);		
	});

	it("should generate a result", () => {
		const initialState = {"people":{"persons":["Hank","James"]}};
		Object.freeze(initialState);
		const store = configureStore(initialState, false);
		
		store.dispatch(actions.generate());
		const state = store.getState();
		assert.isNotNull(state.people.results);
	});
});