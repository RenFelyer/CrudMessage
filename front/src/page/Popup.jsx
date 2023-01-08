import { Outlet, useNavigate } from "react-router";

const Popup = () => {
	const navigate = useNavigate();

	return (
		<div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/10" onClick={() => navigate("/")}>
			<div children={<Outlet />} onClick={e => e.stopPropagation()} className="w-full sm:w-[640px] p-2 bg-gray-500 rounded" />
		</div>
	);
}

export default Popup;