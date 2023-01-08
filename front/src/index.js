import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.css';
import { MessageProvider } from './api/Message';


ReactDOM.createRoot(document.getElementById('root')).render(
	<MessageProvider>
		<RouterProvider router={router} />
	</MessageProvider>
);

