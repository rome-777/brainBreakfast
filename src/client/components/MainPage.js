import '../../../public/style.css';
import React, { useState, useEffect, useReducer } from 'react';

export default function MainPage() {
	console.log('hello');
	return (
		<div id="main-page">
			<div id="nav-bar">
				Nav
			</div>
			<div id="chat-window">
				Chat
			</div>
			<div id="request-input">
				Request box
			</div>
		</div>
	);
}
