import React, { createContext, useReducer } from 'react';
import { popupReducer } from '../../Reducer/popupReducer';
import { IAppContextProps } from '../AppContext.types';
import { IPopupState } from "./PopupContext.types";

export const PopupContext = createContext<any>({});

const PopupContextProvider = ({ children }: IAppContextProps) => {

    const initialValue: IPopupState = {
        isPopupOpen: false,
        actionType: "delete",
        typeOfFile: "project",
        selectedData: {
            id: 0,
            type: "",
            name: ""
        }
    }

    const [popupState, popupDispatch] = useReducer(popupReducer, initialValue);

    return (
        <PopupContext.Provider value={{ popupState, popupDispatch }}>
            {children}
        </PopupContext.Provider>
    );
};

export default PopupContextProvider;