import React, {Component} from 'react'
import LocalStorageService from '../../services/LocalStorageService';

class SearchResult extends Component {

	constructor() {
		super();
	}

	renderDetail() {
		var results = LocalStorageService.get("search_result");
		console.log(results);
		var {searchInformation} = results;
		if (searchInformation.totalResults > 0) {
			console.log("1122");
			var {items} = results;
			var results = items.map(function (object) {
					return (<div><div className="text-success result-title">{object.htmlTitle}</div>
				<div className="text-muted result-url"><a href={object.link} target="_blank">{object.link}</a></div>
				<p className="result-snippet">{object.snippet}</p></div>
									);
			});
			return results;
		}else{
			return <div className="text-center">Not found</div>
		}
	}

	render() {

		return (
			<div className = "search_result_page">
					<div className="container">
						<div className="row">
							<div className="col-md-10">
								{this.renderDetail()}
							</div>
						</div>
					</div>
			</div>
		)
	}
};

module.exports = SearchResult;
