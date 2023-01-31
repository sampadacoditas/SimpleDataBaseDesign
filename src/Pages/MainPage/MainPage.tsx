import style from "./MainPage.module.scss";
import { createContext, useState } from "react";
import { Box } from "@mui/material";
import TableComponent from "../../Components/TableComponent/TableComponent";


export const MainPageContext = createContext<any>({});
const MainPage = () => {
	const [headerElement, setHeaderElement] = useState(<></>);

	return (
		<MainPageContext.Provider value={{ headerElement: headerElement, setHeaderElement: setHeaderElement }}>
			<Box className={style["main-page"]}>
				<Box className={style.header_bottons}>
					{headerElement}
				</Box>
				<Box className={style["screen-container"]}>
					<TableComponent />
				</Box>
			</Box>
		</MainPageContext.Provider>
	);
};

export default MainPage;
