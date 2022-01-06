import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
	return (
		<div className='o-breadcrumbs'>
			<Link to='Products' /><Link to='/home'>Home</Link> / <Link to='/categories'>Category</Link> / Thingy
		</div>
	);
}

export default Breadcrumbs;