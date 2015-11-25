import React from "react";

const PeopleOverview = ({items, itemClickHandler}) => {
const liItems = items.map((item) => {
			return <li key={item + new Date()} className="list-group-item">
						<span>{item}</span> 
						<i onClick={itemClickHandler.bind(this,item)} className="glyphicon glyphicon-remove remove"></i>
					</li>
		});

		return <ul className="list-group">{liItems}</ul>
};

export default PeopleOverview;