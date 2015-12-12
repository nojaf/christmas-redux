import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import peopleActions          from "actions/people";
import PeopleOverview         from "components/peopleOverview";
import ResultsOverview        from "components/resultsOverview";

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state, ownProps) => {
  return state.people.toJS();
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(peopleActions, dispatch);
};
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
  }

  submitForm(e){
    e.preventDefault();
    const person = this.refs.person.value;
    if(person){
      this.props.addPerson(person);
      this.refs.person.value = "";
    }
  }

  removeItem(index){
    this.props.removePerson(index);
  }

  generate(){
    this.props.generate();
  }

  render () {
    return (
      <div className='container'>
        <div className="row no-gutter">
          <h1>Verdeling kerstavond</h1>
          <div className="col-sm-6 no-padding">
            <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control"
                  ref="person"
                  autoFocus={true}
                 placeholder="Nieuwe persoon" />
              </div>
                <input type="submit" value="toevoegen" className="btn btn-primary" />
            </form>
          </div>
          <div className="col-sm-6 no-padding">
            <PeopleOverview items={this.props.persons} itemClickHandler={this.removeItem.bind(this)} />
          </div>
        </div>
        <div className="row no-gutter">
          <button style={{"marginTop":"15px"}} onClick={this.generate.bind(this)} className="btn btn-primary btn-large">Genereer</button>
        </div>
        <div className="row no-gutter">
          <ResultsOverview results={this.props.results} persons={this.props.persons} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);