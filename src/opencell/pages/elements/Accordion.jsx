/**
 The MIT License (MIT)

 Copyright (c) 2016 Glenn Flanagan

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Collapsible from './Collapsible.jsx';

var Accordion = React.createClass({

	//Set validation for prop types
	propTypes: {
		transitionTime: React.PropTypes.number,
		easing: React.PropTypes.string,
		startPosition: React.PropTypes.number,
		classParentString: React.PropTypes.string,
		children: React.PropTypes.arrayOf(React.PropTypes.shape({
			props: React.PropTypes.shape({
				triggerText: React.PropTypes.string.isRequired,
				triggerTextWhenOpen: React.PropTypes.string
			})
		}))
	},

	getInitialState: function () {

		//Allow the start position to be set by props
		var openPosition = this.props.startPosition | 0;

		return {
			openPosition: openPosition
		}
	},

	handleTriggerClick: function (position) {
		this.setState({
			openPosition: position
		})
	},

	render: function () {

		var nodes = this.props.children.map((node, index) => {

			var triggerTextWhenOpen = (node.props.triggerTextWhenOpen) ? node.props.triggerTextWhenOpen : node.props.triggerText;

			return (<Collapsible
				key={"Collapsible"+index}
				handleTriggerClick={this.handleTriggerClick}
				open={(this.state.openPosition === index)}
				triggerText={node.props.triggerText}
				triggerTextWhenOpen={triggerTextWhenOpen}
				transitionTime={this.props.transitionTime}
				easing={this.props.easing}
				classParentString={this.props.classParentString}
				accordionPosition={index}>{node}</Collapsible>);
		});

		return (<div>{nodes}</div>);
	}

});

export default Accordion;
