import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getProductDetails,
	getCategoriesById
} from '../actions/productsActions';

import {
	addToCart
} from '../actions/cartActions';

// import ShoppingCart from '../components/ShoppingCart';
import Layout from '../components/Layout';
import Placeholder from '../bmw.jpg';
class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homeRedirect: false,
			loginRedirect: false,
			error: ''
		}
		this.addtoCart = this.addtoCart.bind(this);
	}

	componentDidMount() {
		const productId = this.props.match && this.props.match.params && this.props.match.params.productId;
		this.props.getProductDetails(productId);
	}

	componentDidUpdate(prevProps) {
		const oldProductId = prevProps.match && prevProps.match.params && prevProps.match.params.productId;
		const currProductId = this.props.match && this.props.match.params && this.props.match.params.productId;
		if (oldProductId !== currProductId) {
			this.props.getProductDetails(currProductId);
		}

		if ((prevProps.productDetails && prevProps.productDetails.category_id) !== (this.props.productDetails && this.props.productDetails.category_id)) {
			this.props.getCategoriesById(this.props.productDetails.category_id);
		}
	}

	addtoCart(details) {

		this.setState({ error: '' })

		if (!this.props.token) {
			this.setState({ loginRedirect: true });
		}

		if (!(this.props.items.find(item => details.product_id === item.product_id))) {
			this.props.addToCart(details);
		} else {
			this.setState({ error: 'That item is already in your cart.' });
		}
	}

  render() {
		let details = this.props.productDetails;
		if (this.state.loginRedirect) {
			return <Redirect to='/login'/>;
		}
		return (
			<Layout>
				<div className='o-breadcrumbs'>
					<Link to='Products' /><Link to='/home'>Home</Link> / <Link to={`/home?cat=${details.category_id}`}>{details.category_name}</Link> / {details.name}
				</div>
				<p className='o-error-msg'>{this.state.error}</p>
				<div className="c-details">
					<div className='c-details__img'><img src={details.imgUrl || Placeholder} alt={this.props.name} /></div>
					<div className='c-details__about'>
						<h2>{details.name}</h2>
						<p>{details.description}</p>
						<p># in stock: {details.quantity_remaining || details.quantity_remaining === 0 || details.quantity_remaining === '0' ? (
							details.quantity_remaining
						) : 'Unknown'}</p>
						<button disabled={details.quantity_remaining === 0 || !details.quantity_remaining} className='o-btn-block' type='button' onClick={() => this.addtoCart(details)}>Add to Cart</button>
					</div>
				</div>
				{this.props.relatedCategories && this.props.relatedCategories.length > 0 ? (
					<div className='c-related'>
						<h2>{`Other popular items in category "${details.category_name}"`}:</h2>
						<div className='c-related__items'>
							{this.props.relatedCategories.map(product => (
								<div className="c-details" key={product.product_id}>
									<div className='c-details__about'>
										<img src={product.imgUrl || Placeholder} alt={product.name} />
										<Link to={`/products/id/${product.product_id}`}><h2>{product.name}</h2></Link>
										<p># in stock: {product.quantity_remaining || product.quantity_remaining === 0 || product.quantity_remaining === '0' ? (
											product.quantity_remaining
										) : 'Unknown'}</p>
										<button className='o-btn-block' disabled={!(product.quantity_remaining)} type='button' onClick={() => this.addtoCart(product)}>Add to Cart</button>
									</div>
								</div>
							))}
						</div>
					</div>
				) : null}
			</Layout>
    );
  }
}

const mapStatetoProps = state => ({
	productDetails: state.products.productDetails,
	relatedCategories: state.products.relatedCategories,
	token: state.user.token,
	items: state.cart.items
});

export default connect(mapStatetoProps, {
	getProductDetails,
	getCategoriesById,
	addToCart
})(ProductDetails);

