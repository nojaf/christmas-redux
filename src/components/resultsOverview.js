import React from "react";

function renderEmptyItem(){
	return <p></p>;
}

function renderResultTable(results, persons){
	let rows = [];
	results.forEach((key, value) => {
		rows.push(<tr key={key}>
					<td>{getNameFromId(key,persons)}</td>
					<td>koopt voor</td>
					<td>{getNameFromId(value, persons)}</td>
				</tr>)
	});

	return (<table className="table table-striped">
			<thead>
				<tr>
					<th>Results</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>)
}

function getNameFromId(id, persons){
	return persons.find(p => p.id === id).name;
}

// destructure thing
// (props) => { } -> 
// (let results = props.results) - ish
const ResultsOverview = ({results, persons}) => {
	return (results ? renderResultTable(results, persons) : renderEmptyItem());
};

export default ResultsOverview;