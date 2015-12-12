import React from "react";

function renderEmptyItem(){
	return <p></p>;
}

function renderResultTable(results, persons){
	const keys = Object.keys(results);
	const rows = keys.map(key => {
		return (<tr key={key}>
			<td>{getNameFromId(key,persons)}</td>
			<td>koopt voor</td>
			<td>{getNameFromId(results[key], persons)}</td>
		</tr>)
	})

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
	return persons.find(p => p.id === parseInt(id)).name;
}

// destructure thing
// (props) => { } -> 
// (let results = props.results) - ish
const ResultsOverview = ({results, persons}) => {
	return (Object.keys(results).length > 0 ? renderResultTable(results, persons) : renderEmptyItem());
};

export default ResultsOverview;