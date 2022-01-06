import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { history } from '../CustomBrowserWrapper';

import {
	getItemsFromCart,
	completePurchase,
	removeFromCart
} from '../actions/cartActions';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = { //construct state variables
			cartRedirect: false,
			error: null,
			invalid: false,
			items: [],
			shipping: {
				address: '',
				city: '',
				zip: '',
				state: ''
			},
			payment: {
				cardNumber: '',
				exp: '',
				code: '',
				fullname: ''
			}
		};
		this.validateInput = this.validateInput.bind(this);
		this.updatePayment = this.updatePayment.bind(this);
		this.updateShipping = this.updateShipping.bind(this);
		this.populateAddress = this.populateAddress.bind(this);
	}

	componentDidMount() {
		this.props.getItemsFromCart();
		this.setState({ items: this.props.items });
	}

	componentDidUpdate(prevProps) {
		console.log(this.props.items.length)
		if (prevProps.items.length !== this.props.items.length) {
			console.log('updated')
			this.setState({ items: this.props.items });
		}

		if (this.props.purchaseId && this.props.purchaseId !== prevProps.purchaseId) {
			this.setState({ transactionComplete: true });
		}
	}

	populateAddress() { //autofill shipping info button
		if (localStorage.getItem('token')) {
			axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
		} else {
			delete axios.defaults.headers.common['x-access-token'];
		}

		axios.get('/api/users/me').then(response => {
			const me = response && response.data && response.data[0];
			const obj = this.state.shipping; //retrieve current shipping information from db
			console.log(me)
			obj['city'] = me.city;
			obj['zip'] = me.zipcode;
			obj['address'] = me.address;
			obj['state'] = me.state_id;
			console.log(obj)
			this.setState({ shipping: obj }); //update shipping info to user's account info
		});
	}

	updatePayment(field, value) {
		let obj = this.state.payment;
		obj[field] = value;
		this.setState({
			payment: obj
		});

		console.log(this.state.payment)
	}

	updateShipping(field, value) {
		let obj = this.state.shipping;
		obj[field] = value;
		this.setState({
			shipping: obj
		});
		console.log(this.state.shipping)
	}

	deleteItem(id) {
		this.props.removeFromCart(id);
		history.push('/checkout');
	}

	validateInput(value, product) {
		let products = [];
		products = this.state.items.filter(item => item.product_id !== product.product_id);

		let thisProduct = this.state.items.find(item => item.product_id === product.product_id);

		if (value > product.quantity_remaining) {
			thisProduct.quantity = parseInt(product.quantity_remaining, 10);
		} else if (value) {
			thisProduct.quantity = parseInt(value, 10);
		} else {
			thisProduct.quantity = '';
		}

		products.push(thisProduct);

		this.setState({ items: products });
}

	render() {
		if (this.state.cartRedirect) {
			return <Redirect to='/checkout' />;
		}

		if (this.state.transactionComplete) {
			return <Redirect to='/purchase-summary' />;
		}
		
		return ( //render shopping cart page
			<>
				<h2>Items</h2>
				{this.props.items && this.props.items.length > 0 ? (
					<>
						<div className='c-cart__items'>
							{
								this.state.items.sort(function(a,b) {
									if (a.name < b.name) return -1;
									if (a.name > b.name) return 1;
									return 0;
								}).map(item => { //create list of items in alphabetical order
									return (
										<ul className='c-cart__item'key={item.product_id}>
											{item.name}
											<ol>
												<input type="number" value={item.quantity}
													max={item.quantity_remaining} onChange={(evt) => {
														this.validateInput(evt.target.value, item)}}
													placeholder="quantity" />
													({item.quantity_remaining} remaining)
													<button style={{ marginLeft: '2rem'}} onClick={() => this.deleteItem(item.product_id)} className='o-error-msg'>DELETE</button>
											</ol>
										</ul>
									);
								})
							}
							<p>{this.state.error}</p>
						</div>
						<hr />
						<h2>Payment Information</h2>
						<div className='c-cart__payment'>
							<input type='text' placeholder='full name as appears on card' onChange={(evt) => this.updatePayment('fullname', evt.target.value)} value={this.state.payment.fullname} />
							<input type="number" placeholder="XXXX XXXX XXXX XXXX" onChange={(evt) => this.updatePayment('cardNumber', evt.target.value)} value={this.state.payment.cardNumber} />
							<input type='date' placeholder='expiration date' onChange={(evt) => this.updatePayment('exp', evt.target.value)} value={this.state.payment.exp} />
							<input type='text' placeholder='security code' onChange={(evt) => this.updatePayment('code', evt.target.value)} value={this.state.payment.code} />
						</div>
						<hr/>
						<h2>Shipping</h2>

						<div className='c-card_shipping'>
							<button onClick={this.populateAddress}>Use Address on File</button>
							<div>
								<input type='text' onChange={(evt) => this.updateShipping('address', evt.target.value)} placeholder='address' value={this.state.shipping.address}/>
								<input type='text' onChange={(evt) => this.updateShipping('city', evt.target.value)} placeholder='city' value={this.state.shipping.city} />
								<input type='text' onChange={(evt) => this.updateShipping('zip', evt.target.value)} placeholder='zip' value={this.state.shipping.zip} />
								<input type='text' onChange={(evt) => this.updateShipping('state', evt.target.value)} placeholder='state' value={this.state.shipping.state} />
							</div>
						</div>
						<button onClick={() => {
							// console.log(this.state.items)
							const obj = this.state.items;
							this.props.completePurchase({
								payment: this.state.payment,
								items: obj,
								shipping: this.state.shipping
							})
						}} type='button'>Complete Purchase</button>
					</>
				) : <p>No items in cart.</p>}
			</>
		);
	}
}

const mapStateToProps = state => ({
	items: state.cart.items,
	purchaseId: state.cart.purchaseId
});

export default connect(mapStateToProps, {
	getItemsFromCart,
	completePurchase,
	removeFromCart
})(ShoppingCart);