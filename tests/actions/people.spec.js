import actions from "actions/people";
import {ADD_PERSON, DELETE_PERSON, GENERATE} from "constants";

describe("actions", () => {
	describe("invoking action addPerson", () => {
		it("should return a ADD_PERSON with value", () => {
			const action = actions.addPerson("Hank");
			expect(action.type).to.equal(ADD_PERSON);
			expect(action.payload.value).to.equal("Hank");
		});
	});

	describe("invoking action removePerson", () => {
		it("should return DELETE_PERSON with index", () => {
			const action = actions.removePerson(0);
			expect(action.type).to.equal(DELETE_PERSON);
			expect(action.payload.index).to.equal(0);
		});
	});

	describe("invoking action generate", () => {
		it("should return GENERATE without payload", () => {
			const action = actions.generate();
			expect(action.type).to.equal(GENERATE);
			expect(action.payload).to.undefined;
		});
	});
});
