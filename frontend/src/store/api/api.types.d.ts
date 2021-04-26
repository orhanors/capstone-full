export interface ApiCallType {
	url: string;
	headers?: any;
	method?: string;
	onStart: any;
	onSuccess: any;
	onError: any;
	data?: any;
}
