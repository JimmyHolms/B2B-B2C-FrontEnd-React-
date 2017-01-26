import React from 'react';

class ItemContainer extends React.Component {
	render() {
		const { triggerText, triggerTextWhenOpen, ...otherProps } = this.props;
		
		return (
			<div {...otherProps}>
				{this.props.children}
			</div>
		);
	}
}

export default ItemContainer;