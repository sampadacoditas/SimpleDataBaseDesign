export interface IContext {
    popupState: IPopupState,
    popupDispatch: (action: IPopupAction) => void
}

export interface IPopupState {
    isPopupOpen: boolean; //true false
    actionType: string; //create,rename,delete
    typeOfFile: string; //project/exercise/table
    selectedData: {
        id: number;
        type: string;
        name: string;
    };
}

export interface IPopupAction {
    type: string;
    payload: {}
}