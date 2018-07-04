import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Fa, Button, Input, FormInline } from 'mdbreact';


class BoardingSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: "",
			roast: "DARK",
			ground: "GROUND"
		}
		this.onClick1 = this.onClick1.bind(this);
		this.onClick2 = this.onClick2.bind(this);
		this.onClick3 = this.onClick3.bind(this);
		this.onClick4 = this.onClick4.bind(this);

	}

	onClick1() {
		this.setState({ roast: "DARK" });
	}

	onClick2() {
		this.setState({ roast: "LIGHT" });
	}

	onClick3() {
		this.setState({ ground: "GROUND" });
	}
	onClick4() {
		this.setState({ ground: "WHOLE" });
	}

	handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };


	render() {
		return (
			<Container>
				<Card>
					{/* product name */}
<div className="row">
<div className="col">
<Input label="Product Name" value={this.state.product} onChange={this.handleInputChange}/>
</div>
</div>

					{/* type */}
					<div className="row">
					<div className="col-6 text-center">
						<h6>Roast:</h6>
						<Input onClick={this.onClick1} checked={this.state.roast === "DARK" ? true : false} label="Dark Roast" type="radio" id="dark"  />
						<Input onClick={this.onClick2} checked={this.state.roast === "LIGHT" ? true : false} label="Light Roast" type="radio" id="light" />
					</div>
					<div className="col-6 text-center">
					<h6>Grind Type:</h6>
						<Input onClick={this.onClick3} checked={this.state.ground === "GROUND" ? true : false} label="Ground" type="radio" id="ground" />
						<Input onClick={this.onClick4} checked={this.state.ground === "WHOLE" ? true : false} label="Whole Bean" type="radio" id="whole"  />
					</div>
					</div>
					<Button block color="primary">Submit Product</Button>
				</Card>
			</Container>

		);
	}
}


export default BoardingSurvey;