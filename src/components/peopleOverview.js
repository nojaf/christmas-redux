import React from "react";

const PeopleOverview = ({items, itemClickHandler}) => {
const liItems = items.map((item,index) => {
			return <li key={item.id} className="list-group-item">
						<span>{item.name}</span> 
						<i onClick={itemClickHandler.bind(this,index)} className="glyphicon glyphicon-remove remove"></i>
					</li>
		});

		return <ul className="list-group">{liItems}</ul>
};

export default PeopleOverview;