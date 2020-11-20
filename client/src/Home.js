import React from 'react';
import {Redirect} from "react-router";

function Home() { // localhost:3000/
	return <Redirect to='/tasks'/>
}

export default Home;
