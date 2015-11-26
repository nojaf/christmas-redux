import actions from "actions/people";
import {ADD_PERSON, DELETE_PERSON, GENERATE} from "constants";

describe("invoking actions", () => {
	it("should return a ADD_PERSON with value", () => {
		const action = actions.addPerson("Hank");
		expect(action.type).to.equal(ADD_PERSON);
		expect(action.payload.value).to.equal("Hank");
	})

	it("should return DELETE_PERSON with index", () => {
		const action = actions.removePerson(0);
		expect(action.type).to.equal(DELETE_PERSON);
		expect(action.payload.index).to.equal(0);
	});

	it("should return GENERATE without payload", () => {
		const action = actions.generate();
		expect(action.type).to.equal(GENERATE);
		expect(action.payload).to.undefined;
	});
});