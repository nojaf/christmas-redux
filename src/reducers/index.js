import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import people from "./people";

export default combineReducers({
  people,
  router: routerStateReducer
});
