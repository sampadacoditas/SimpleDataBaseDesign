export interface IState {
  toggleTheme: object;
  popupData: object;
  loginData: object;
}

export type ActionType =
  | "setPopupData"
  | "setTheme"
  | "setLoginData";

export interface IAction {
  type: ActionType;
  payload?: any;
}

export const appReducer = (state: IState, action: IAction) => {
  const { payload } = action;

  switch (action.type) {

    case "setPopupData": {
      return {
        ...state,
        popupData: {
          showMessage: payload.showMessage,
          message: payload.message,
          status: payload.status
        },
      };
    }

    case "setTheme": {
      return {
        ...state,
        toggleTheme: {
          theme: payload.theme
        }
      };
    }

    case "setLoginData": {
      return {
        ...state,
        loginData: {
          isLogin: payload.isLogin
        }
      };
    }

    default: {
      return state;
    }
  }
};
