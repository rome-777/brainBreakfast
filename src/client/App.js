import React, { Fragment } from 'react';
import { default as AppBar } from './components/AppBar';
import { default as ChatBox } from './components/ChatBox';

export default function App() {
	return (
		<Fragment>
            <AppBar/>
			<ChatBox/>
		</Fragment>
	);
}

