import React, { Fragment } from 'react';
import { default as Bar } from './components/AppBar';
import { default as ChatBox } from './components/ChatBox';

export default function App() {
	return (
		<Fragment>
            <Bar/>
			<ChatBox/>
		</Fragment>
	);
}

