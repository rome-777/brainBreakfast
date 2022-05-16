import React, { useState, useEffect, useReducer, Fragment } from 'react';
import { ChatBox, AppBar } from './components';

export default function App() {
	return (
		<Fragment>
            <AppBar/>
			<ChatBox/>
		</Fragment>
	);
}

