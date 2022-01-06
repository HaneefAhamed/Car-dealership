import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	updatePriceSort,
	updateQuery,
	getAllCategories,
	updateCategoryId
} from '../actions/productsActions';

const inputStyles = {
	width: '100%',
	padding: `1rem`,
	marginBottom: '.5rem'
};


class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAdvanced: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
		this.handleCatChange = this.handleCatChange.bind(this);
	}

	componentDidMount() {
		this.props.getAllCategories();
	}

	handleChange(evt) {
		this.props.updatePriceSort(evt.target.value);
	}

	handleCatChange(evt) {
		this.props.updateCategoryId(evt.target.value);
	}

	handleQuery(evt) {
		this.props.updateQuery(evt.target.value);
	}

	render() {
		return (
			<aside className='c-filters'>
				
				<input style={inputStyles} type="search" onChange={this.handleQuery} placeholder='Search for Luxury Vehicles' />
				
				<button style={{display: 'block', padding: 0}} className='o-btn-link' type='button' onClick={() => this.setState({ showAdvanced: !this.state.showAdvanced })}>{this.state.showAdvanced ? `Hide Filters` : `Filter Selection`}</button>
				
				{this.state.showAdvanced ? <div className='c-filters__adv'>
					{/* categories */}
					<div>
						<label>
							<strong style={{ display: 'block', marginBottom: '1rem'}}>Search Brands:</strong>
							<div className='c-filters__input'>
								<input onChange={this.handleCatChange} type='radio' checked={!this.props.categoryId} value=""/> None
							</div>
							{this.props.categories.map(category => {
								return (
									<div key={category.category_id} className='c-filters__input'>
										<input onChange={this.handleCatChange} type='radio' checked={category.category_id === this.props.categoryId} value={category.category_id}/> {category.category_name}
									</div>
									);
								})
							}
						</label>
					</div>
					{/* price sort */}
					<div>
						<label>

							<strong style={{ display: 'block', marginBottom: '1rem'}}>Order by:</strong>
							
							<div className='c-filters__input'>
								<input onChange={this.handleChange} type='radio' value='ASC' checked={this.props.priceSort === 'ASC'}/> Price (low)
							</div>
							
							<div className='c-filters__input'>
								<input onChange={this.handleChange} type='radio' value='DESC' checked={this.props.priceSort === 'DESC'}/> Price (high)
							</div>

						</label>
					</div>
					
					
				</div> : null}
			</aside>
		)
	}
}

const mapStateToProps = state => ({
	priceSort: state.products.priceSort,
	categories: state.products.categories,
	categoryId: state.products.categoryId
});

export default connect(mapStateToProps, {
	updatePriceSort,
	updateQuery,
	getAllCategories,
	updateCategoryId
})(Filters);