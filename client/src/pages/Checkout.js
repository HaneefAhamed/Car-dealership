import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ShoppingCart from '../components/ShoppingCart';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<Layout>
				<ShoppingCart />
			</Layout>
		);
	}
}

export default Checkout;