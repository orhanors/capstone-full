import {
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
} from "react-redux";

import { RootState } from "../_setup/configuration/reducer";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
