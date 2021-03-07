import { createStore } from "redux";
import globalStateReducer from "./reducers/globalStateReducer";

const globalStore = createStore(globalStateReducer)

export default globalStore
