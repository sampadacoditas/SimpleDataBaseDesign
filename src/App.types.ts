export interface IAppContext {
	appState: IAppState | {};
	setAppState: (data: { [key: string]: string }) => void;
}

export interface IAppState {
	page: string;
	userDetails: { [key: string]: any };
}
