import React from 'react';
import { connect } from 'react-redux';

const Pagination = (props) => {
	return (
		<div className='c-pagination'>
			<button type='button' disabled={!props.offset || props.offset <= 0} onClick={props.prev} className='c-pagination__btn'>Previous</button>
			<button type='button' disabled={!(props.offset + props.limit < props.count)} onClick={props.next} className='c-pagination__btn'>Next</button>
		</div>
	);
};

const mapStateToProps = state => ({
	offset: state.products.offset,
	limit: state.products.limit,
	count: state.products.count
});

export default connect(mapStateToProps)(Pagination);