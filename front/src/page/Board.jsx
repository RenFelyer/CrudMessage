import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useSubscription } from "react-stomp-hooks";
import { listMessage } from "../api/Message";
import Message from "../component/Message";
import "./Board.css";

const Board = () => {
	const [message, setMessage] = useState([]);
	const [current, setCurrent] = useState(0);
	const [fetching, setFetching] = useState(true);
	const [last, setLast] = useState(false);

	useSubscription("/message/create", ({ body }) => setMessage([JSON.parse(body), ...message]));

	useSubscription("/message/update", ({ body }) => {
		let newMessage = JSON.parse(body);
		setMessage(message.map((value) => value.id === newMessage.id ? newMessage : value));
	});

	useSubscription("/message/delete", ({ body }) => {
		body = Number(body);
		setMessage(message.filter((value) => value.id !== body));
	});

	useEffect(() => {
		if (fetching)
			listMessage(current).then(value => {
				setMessage([...message, ...value.content]);
				setCurrent(value => value + 1);
				setLast(last ? true : value.last);
			}).finally(() => {
				setFetching(false)
			});
		// eslint-disable-next-line
	}, [fetching]);

	const handlerScroll = event => {
		if (event.target.scrollHeight - (event.target.scrollTop + window.innerHeight) < 100 && !last)
			setFetching(true);
	}

	return (
		<>
			<div className="board" onScroll={handlerScroll}>
				{message.map((value, key) => <Message key={key} message={value} />)}
			</div>
			<Outlet />
		</>
	);
}


export default Board;