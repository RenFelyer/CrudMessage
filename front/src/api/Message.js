import { StompSessionProvider } from "react-stomp-hooks";

const url = "http://localhost:8080/crud"
const apiUrl = url + "/api"
const wsUrl = url + "/ws"

export const listMessage = (page) =>
	fetch(`${apiUrl}/list?page=${page}`).then(value => value.json());

export const readMessage = (id) =>
	fetch(`${apiUrl}/read/${id}`).then(value => value.json());

export const updateMessage = (id, title, content) =>
	fetch(`${apiUrl}/update/${id}?title=${title}&content=${content}`, { method: 'PUT' });


export const deleteMessage = (id) =>
	fetch(`${apiUrl}/delete/${id}`, { method: 'DELETE' });

export const createMessage = (title, content) => {
	fetch(`${apiUrl}/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ title, content }),
	})
}

export const MessageProvider = ({children}) => 
	<StompSessionProvider 
	url={wsUrl}
	children={children}/>