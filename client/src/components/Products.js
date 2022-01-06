import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import { history } from '../CustomBrowserWrapper';
import Item from './Item';
import Pagination from './Pagination';
import {
	fetchAllProducts,
	updateLimit,
	updateOffset,
	updateCategoryId
} from '../actions/productsActions';

class Products extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			limit: 21,
			count: 0,
			offset: 0,
			price: 'ASC'
		}

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount() {
		const urlParams =  queryString.parse(this.props.location && this.props.location.search);
		
		if (urlParams.limit) this.props.updateLimit(parseInt(urlParams.limit, 10));
		if (urlParams.offset) this.props.updateOffset(parseInt(urlParams.offset, 10));
		if (urlParams.cat) this.props.updateCategoryId(urlParams.cat);

		this.props.fetchAllProducts();
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.priceSort !== this.props.priceSort) || (prevProps.query !== this.props.query) || (prevProps.categoryId !== this.props.categoryId)) {
			this.props.updateOffset(0);
			this.props.fetchAllProducts();
		}
	}

	prev() {
    if (this.props.offset > 0) {
			history.push(`/home?limit=${this.props.limit}&offset=${parseInt(this.props.offset, 10) - parseInt(this.props.limit, 10)}`);
			this.props.updateOffset(this.props.offset - this.props.limit);
      this.props.fetchAllProducts();
    }
	}
	
	next() {
    if (this.props.offset + this.props.limit < this.props.count) {
			history.push(`/home?limit=${this.props.limit}&offset=${parseInt(this.props.offset, 10) + parseInt(this.props.limit, 10)}`);
			this.props.updateOffset(this.props.offset + this.props.limit);
			this.props.fetchAllProducts();
    }
  }

	render() {
		if (this.props.products && this.props.products.length > 0) {
			return (
				<main>
					<div className='c-products'>
						{this.props.products.map(item => <Item key={item.product_id} {...item} />)}
					</div>
					<Pagination next={this.next} prev={this.prev}/>
				</main>
			);
		} else {
			return <p className='c-products--none'>No items were found that match that search. Clear some filters to try again.</p>;
		}
	}
}

const mapStateToProps = state => ({
	priceSort: state.products.priceSort,
	products: state.products.products,
	limit: state.products.limit,
	offset: state.products.offset,
	count: state.products.count,
	query: state.products.query,
	categoryId: state.products.categoryId
});

export default connect(mapStateToProps, {
	fetchAllProducts,
	updateLimit,
	updateOffset,
	updateCategoryId
})(Products);