import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import Add from "./component/Add";
import Edit, { loaderEdit } from "./component/Edit";
import Plus from "./component/Plus";
import Board from "./page/Board";
import Popup from "./page/Popup";

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Board />} errorElement={<Navigate to="/" />}>
		<Route index element={<Plus />} />
		<Route element={<Popup />}>
			<Route path="add" element={<Add />} />
			<Route path="edit/:id" element={<Edit />} loader={loaderEdit} />
		</Route>
	</Route>
));

export default router;