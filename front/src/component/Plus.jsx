import { Link } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../assert/Plus.svg";


const Plus = () => {

	return (
		<div className="fixed right-0 bottom-0 sm:right-20 sm:bottom-20 w-16 transition-[500ms]">
			<Link to="/add" children={<PlusIcon className="hover:bg-white/50 rounded-full transition-[50ms]" />} />
		</div>
	);
}

export default Plus;