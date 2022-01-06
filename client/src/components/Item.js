import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Placeholder from '../bmw.jpg';

class Item extends Component {
	state = {
		itemRedirect: false
	}
	render() {
		let href = `/products/id/${this.props.product_id}`;

		if (this.state.itemRedirect) {
			return <Redirect to={href} />;
		}

		return (
			<div className='c-products__item'>
				<img onClick={() => this.setState({ itemRedirect: true })} src={Placeholder} alt={this.props.name} />
				<Link to={href}><h2>{this.props.name}</h2></Link>
				<p>{`$${this.props.price.toFixed(2)}`}</p>
				<p>Stock: {this.props.quantity_remaining || this.props.quantity_remaining === 0 || this.props.quantity_remaining === '0' ? (
							this.props.quantity_remaining
						) : 'Out of Stock'}</p>
			</div>
		);
	}
}

export default Item;