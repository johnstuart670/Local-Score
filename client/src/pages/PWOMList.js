import React from 'react';
import PWOM from './PWOM';

const PWOMList = props => {

	if (props.props.queriesComplete && typeof props.props.PWOO !== "undefined") {
		return props.props.PWOM.map((each, i) => {
		return	<PWOM data={each} key = {i} />
		})
	} else {
		return <div>There are no transactions waiting on me.</div>
	}
}


export default PWOMList