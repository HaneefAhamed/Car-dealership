import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../components/Layout';
import {
	createUser,
	clearUserErrors,
	login
} from '../actions/userActions';

class AuthEntry extends Component {

	constructor(props) {
		super(props);
		this.state = {
			homeRedirect: false,
			newUserData: {
				firstName: '',
				lastName: '',
				address: '',
				city: '',
				zipcode: '',
				state_id:'',
				phone: '',
				email: '',
				password: '',
				passwordVerify: ''
			},
			businessData: {
				businessName: '',
				fax: '',
				website: ''
			},
			loginData: {
				email: '',
				password: ''
			},
			showBusinessInputs: false,
			createUserError: [],
			loginErrors: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.validateNewUser = this.validateNewUser.bind(this);
		this.login = this.login.bind(this);
		this.handleBusinessChange = this.handleBusinessChange.bind(this);
	}

	componentDidMount() {
		if (!this.props.token) {
			this.setState({ homeRedirect: true });
		}
	}

	handleChange(field, value) {

		this.props.clearUserErrors();

		this.setState({
			createUserError: []	
		});

		this.setState();
		const obj = this.state.newUserData;
		obj[field] = value;
		this.setState({
			newUserData: obj
		});
	}

	handleBusinessChange(field, value) {

		this.props.clearUserErrors();

		this.setState({
			createUserError: []
		});

		const obj = this.state.businessData;
		obj[field] = value;
		this.setState({
			businessData: obj
		});
	}

	handleLoginChange(field, value) {

		this.props.clearUserErrors();

		this.setState({
			loginErrors: []	
		});

		const obj = this.state.loginData;
		obj[field] = value;
		this.setState({
			loginData: obj
		});
	}

	validateNewUser() {
		
		this.props.clearUserErrors();

		this.setState({
			createUserError: []	
		});

		let errors = [];

		Object.entries(this.state.newUserData).forEach(([key, value]) => {
			if (!value) {
				errors.push(`Please enter a ${key} value.`);
			}
		});

		if (this.state.newUserData.password !== this.state.newUserData.passwordVerify) {
			errors.push('Passwords do not match.');
		}

		if (this.state.newUserData.password && (this.state.newUserData.password.length < 6 || this.state.newUserData.password.length > 20 )) {
			errors.push('Password length must be between 6 and 20 characters.');
		}

		var phoneFormat = /^[\+]?[0-9]{0,2}[0-9]{10}$/;
		if (!phoneFormat.test(this.state.newUserData.phone)){
			errors.push('Invalid phone number format entered. For US numbers, enter 10 digits with no delimiters. For International numbers, include "+[country code]" without brackets then 10 digits');
		}

		var emailFormat = /.+@.+/; //tests for format [non-empty string]@[non-empty string]
		if (!emailFormat.test(this.state.newUserData.email)){
			errors.push('Invalid email address format entered. Please include an @ symbol in your input');
		}

		if (this.state.showBusinessInputs) {
			Object.entries(this.state.businessData).forEach(([key, value]) => {
				if (key !== 'fax' && !value) {
					errors.push(`${key} is a required field.`);
				}
			});
		}

		this.setState({
			createUserError: errors
		});

		if (errors.length === 0) { //add user to database
			this.props.createUser({ ...this.state.newUserData, ...this.state.businessData });
		}
	}

	login() {

		this.props.clearUserErrors();

		this.setState({
			loginErrors: []	
		});

		let errors = [];

		if (!this.state.loginData.email) {
			errors.push('An email is required.')
		}

		if (!this.state.loginData.password) {
			errors.push('A password is required.')
		}

		this.setState({
			loginErrors: errors
		});

		if (errors.length === 0) {
			this.props.login(this.state.loginData);
		}
	}

	componentWillUnmount() {
		this.props.clearUserErrors();
	}

	render() {

		if (this.props.token) {
			return <Redirect to='/home' />;
		}

		return (
			<Layout>
				<div className='c-auth'>
					<div className='c-auth__signup'>
						<h2>Sign up!</h2>
						{this.props.userId ? <p className='o-success-msg'>Account was created successfully. Login to continue.</p> : null}
						<form>
							<label>
								First Name
								<input type='text' onChange={(evt) => this.handleChange('firstName', evt.target.value )} />
							</label>
							<label>
								Last Name
								<input type='text' onChange={(evt) => this.handleChange('lastName', evt.target.value )} />
							</label>
							<label>
								Address
								<input type='text' onChange={(evt) => this.handleChange('address', evt.target.value )} />
							</label>
							<label>
								City
								<input type='text' onChange={(evt) => this.handleChange('city', evt.target.value )} />
							</label>
							<label>
								Zipcode
								<input type='number' onChange={(evt) => this.handleChange('zipcode', evt.target.value )} />
							</label>
							<label>
								State
								<select value = {this.state.state_id} onChange={(evt) => this.handleChange('state_id', evt.target.value )}>
									<option value="1">Alabama</option>
									<option value="2">Alaska</option>
									<option value="3">Arizona</option>
									<option value="4">Arkansas</option>
									<option value="5">California</option>
									<option value="6">Colorado</option>
									<option value="7">Connecticut</option>
									<option value="8">Delaware</option>
									<option value="9">District of Columbia</option>
									<option value="10">Florida</option>
									<option value="11">Georgia</option>
									<option value="12">Hawaii</option>
									<option value="13">Idaho</option>
									<option value="14">Illinois</option>
									<option value="15">Indiana</option>
									<option value="16">Iowa</option>
									<option value="17">Kansas</option>
									<option value="18">Kentucky</option>
									<option value="19">Louisiana</option>
									<option value="20">Maine</option>
									<option value="21">Maryland</option>
									<option value="22">Massachusetts</option>
									<option value="23">Michigan</option>
									<option value="24">Minnesota</option>
									<option value="25">Mississippi</option>
									<option value="26">Missouri</option>
									<option value="27">Montana</option>
									<option value="28">Nebraska</option>
									<option value="29">Nevada</option>
									<option value="30">New Hampshire</option>
									<option value="31">New Jersey</option>
									<option value="32">New Mexico</option>
									<option value="33">New York</option>
									<option value="34">North Carolina</option>
									<option value="35">North Dakota</option>
									<option value="36">Ohio</option>
									<option value="37">Oklahoma</option>
									<option value="38">Oregon</option>
									<option value="39">Pennsylvania</option>
									<option value="40">Puerto Rico</option>
									<option value="41">Rhode Island</option>
									<option value="42">South Carolina</option>
									<option value="43">South Dakota</option>
									<option value="44">Tennessee</option>
									<option value="45">Texas</option>
									<option value="46">Utah</option>
									<option value="47">Vermont</option>
									<option value="48">Virginia</option>
									<option value="49">Washington</option>
									<option value="50">West Virginia</option>
									<option value="50">Wisconsin</option>
									<option value="50">Wyoming</option>
								</select>
							</label>
							<label>
								Phone
								<input type='tel' onChange={(evt) => this.handleChange('phone', evt.target.value )} />
							</label>
							<label>
								Email
								<input type='email' onChange={(evt) => this.handleChange('email', evt.target.value )} />
							</label>
							<label>
								Password
								<input type='password' onChange={(evt) => this.handleChange('password', evt.target.value )} />
							</label>
							<label>
								Re-enter password
								<input type='password' onChange={(evt) => this.handleChange('passwordVerify', evt.target.value )} />
							</label>
							<label>
								<strong>Is this a business account?</strong>
								<input type='checkbox' onChange={(evt) => this.setState({ showBusinessInputs: evt.target.checked })} />
							</label>
						</form>
						{this.state.showBusinessInputs ? ( //show business inputs if checkbox
							<>
								<label>
									Business Name
									<input type='text' onChange={(evt) => this.handleBusinessChange('businessName', evt.target.value )} />
								</label>
								<label>
									Fax
									<input type='text' onChange={(evt) => this.handleBusinessChange('fax', evt.target.value )} />
								</label>
								<label>
									Website
									<input type='text' onChange={(evt) => this.handleBusinessChange('website', evt.target.value )} />
								</label>
							</>
						) : null}
						<button type='button' onClick={this.validateNewUser}>Sign up</button>
						{this.state.createUserError.map((error, idx) => <p className='o-error-msg' key={idx}>{error}</p>)}
						<p className='o-error-msg'>{this.props.error ? `Error: ${this.props.error}` : null}</p>
						{this.props.userId ? <p className='o-success-msg'>Account was created successfully. Login to continue.</p> : null}
					</div>
					<div className='c-auth__login'>
						<h2>Log in!</h2>
						<form>
							<label>
								Email
								<input type='text' onChange={(evt) => this.handleLoginChange('email', evt.target.value )} />
							</label>
							<label>
								Password
								<input type='password' onChange={(evt) => this.handleLoginChange('password', evt.target.value )} />
							</label>
							<button type='button' onClick={this.login}>Login</button>
						</form>
						{this.state.loginErrors.map((error, idx) => <p className='o-error-msg' key={idx}>{error}</p>)}
						<p className='o-error-msg'>{this.props.error ? `Error: ${this.props.error}` : null}</p>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	error: state.user.error,
	userId: state.user.newUser,
	token: state.user.token
});

export default connect(mapStateToProps, {
	createUser,
	clearUserErrors,
	login
})(AuthEntry);