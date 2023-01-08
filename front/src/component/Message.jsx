import { Link } from "react-router-dom";

const emptyMessage = {
	id: 7,
	title: "Title",
	content: "This is content",
	updated: "2023-01-01",
	created: "2023-01-01",
	edit: false,
}

const Message = ({ message = emptyMessage }) => {
	return (
		<div className="bg-black/50 text-white/80 px-3 py-2 sm:rounded-l-lg">
			<div className="flex justify-between">
				<div className="text-2xl ml-2">{message.title}</div>
				<div className="flex gap-2">
					<Link to={'edit/' + message.id}>edit</Link>
					<Link onClick={() => { }}>x</Link>
				</div>
			</div>
			<div>{message.content}</div>
			<div className="mt-2">{message.edit ? message.updated : message.created}</div>
		</div>
	)
}

export default Message;