declare module "mongoose" {
	export interface Query<T> {
		cache(): Query<T>;
		useCache: boolean;
		hashKey: string;
		model: import("mongoose").Model<T>;
	}
}
