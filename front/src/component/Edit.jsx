import { useLoaderData, useNavigate, useParams } from "react-router";
import { readMessage, updateMessage } from "../api/Message";

const Edit = () => {
	const { id } = useParams();
	const [data] = useLoaderData();
	const navigate = useNavigate();

	const handlerSubmit = event => {
		const title = event.target.title.value;
		const content = event.target.content.value;
		event.preventDefault();
		if (title.length > 0 && content.length > 0)
			updateMessage(id, title, content);
		navigate('/');
	}

	return (
		<form className="text-black flex flex-col gap-2" onSubmit={handlerSubmit}>
			<h2 className="text-center text-2xl font-bold"> Message {id} </h2>
			<input
				name="title" defaultValue={data.title}
				type={"text"} placeholder="Title"
				className="text-black outline-none p-2"
			/>
			<input
				name="content" defaultValue={data.content}
				type={"text"} placeholder="Content"
				className="text-black outline-none p-2"
			/>
			<input className="bg-cyan-600 hover:bg-cyan-500 p-2" type={"submit"} value="Edit" />
		</form>
	)
}

export const loaderEdit = async ({ params }) => {
	return [await readMessage(params.id)];
}

export default Edit;