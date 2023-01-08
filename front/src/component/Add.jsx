import { useNavigate } from "react-router";
import { createMessage } from "../api/Message";

const Add = () => {
	const navigate = useNavigate();

	const handlerSubmit = event => {
		const title = event.target.title.value;
		const content = event.target.content.value;
		event.preventDefault();
		if (title.length > 0 && content.length > 0)
			createMessage(title, content);
		navigate('/');
	}

	return (
		<form className="text-black flex flex-col gap-2" onSubmit={handlerSubmit}>
			<h2 className="text-center text-2xl font-bold"> Message </h2>
			<input
				name="title" type={"text"} placeholder="Title"
				className="text-black outline-none p-2"
			/>
			<input
				name="content" type={"text"} placeholder="Content"
				className="text-black outline-none p-2"
			/>
			<input className="bg-cyan-600 hover:bg-cyan-500 p-2" type={"submit"} value="Created" />
		</form>
	)
}

export default Add;