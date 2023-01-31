import style from "./Chip.module.scss";
import { IChipProps } from "./Chip.types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Chip = ({ label, deleteFn }: IChipProps) => {
	return (
		<div className={style.container}>
			<div>{label}</div>
			<HighlightOffIcon onClick={deleteFn} className={style.btn} />
		</div>
	);
};
export default Chip;
