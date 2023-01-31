interface IPopupState {
  isPopupOpen: boolean; //true false
  actionType: string; //create,rename,delete
  typeOfFile: string; //project/exercise/table
  selectedData: {
    id: number;
    type: string;
    name: string;
  };
}

interface IPopupAction {
  type: string;
  payload: {}
}

export const popupReducer = (state: IPopupState, action: IPopupAction) => {
  switch (action.type) {
    case "setPopup":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
