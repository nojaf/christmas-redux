import React from "react";

function renderEmptyItem(){
	return <p></p>;
}

function renderResultTable(results){
	let rows = [];
	results.forEach((key, value) => {
		rows.push(<tr key={key}>
					<td>{key}</td>
					<td>koopt voor</td>
					<td>{value}</td>
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

// destructure thing
// (props) => { } -> 
// (let results = props.results) - ish
const ResultsOverview = ({results}) => {
	return (results ? renderResultTable(results) : renderEmptyItem());
};

export default ResultsOverview;