import { createAction } from "@reduxjs/toolkit";
import { ApiCallType } from "./api.types";

export const apiCall = createAction<ApiCallType>("api/call");

export const apiCallSuccess = createAction<object>("api/callSuccess");
export const apiCallFailed = createAction<object>("api/callFailed");
