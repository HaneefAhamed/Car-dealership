import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { getItemsFromCart } from '../actions/cartActions';
import styled from 'styled-components';

const styles = {
	textAlign: `left`,
	borderBottom: 'solid 1px rgba(0,0,0,.1)',
	padding: '0 4rem',
	background: 'var(--Cosmos)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	height: 60,
    minHeight: 60,
};

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { 

		 };
	}

	// componentDidUpdate(prevProps) {
	// 	if (this.props.currentUser && this.props.currentUser.firstName) {
	// 		this.props.getItemsFromCart();
	// 	}
	// }

	render() {
		return (
			<header style={styles}>
				{/* <Link to={'/'}><h1>Robot &amp; Components Store</h1></Link> */}
				{/* <Container> */}
				<Link to='/home'><a>
				<img src="/images/logo1.svg" alt="Newton-logo" /></a></Link>
				{/* <Link to='/home'>Home</Link> */}
				{/* <RightMenu> */}
				{this.props.currentUser && this.props.currentUser.firstName ? <Link to='/history'>Order History</Link> : null}
				{this.props.currentUser && this.props.currentUser.firstName ? <Link to='/checkout'>My Cart {this.props.items && this.props.items.length > 0 ? `(${this.props.items.length})` : null}</Link> : null}
				{this.props.currentUser && this.props.currentUser.firstName ? (<p>{`Hello, ${this.props.currentUser.firstName}!`}  (<button onClick={this.props.logout} style={{ color: 'black'}} className='o-btn-link'>logout</button>)</p>) : (<Link to='/login'>Register/Log in</Link>)}
				{/* </Container> */}
				{/* </RightMenu> */}
			</header>
		);
	}
}

// const Container = styled.div `
// 	position: fixed;
// 	min-height: 60px;
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	padding: 0 20px;
// 	top: 0;
// 	left: 0;
// 	right: 0;
// 	z-index: 1;

// 	background-color: rgba( 255, 255, 255, 0.5);
// 	box-shadow: 0 35px 55px rgba(0, 0, 0, 0.1);

// 	@media(max-width: 400px){
// 		min-height: 40px;
// 		padding: 0 10px;
// 		a{
// 			img{
// 				width: 75px;
// 			}
// 		}
// 	}
// `

// const RightMenu = styled.div `
// 	display: flex;
// 	align-items: center;
// 	a{
// 		color: black;
// 		font-weight: 600;
// 		text-transform: uppercase;
// 		margin-right: 10px;
// 		white-space: nowrap;
// 	}
// 	@media(max-width: 400px){
// 		a{
// 			font-size: 12px;
// 		}
// 	}
// `

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	items: state.cart.items
});

export default connect(mapStateToProps, { logout, getItemsFromCart })(Header);