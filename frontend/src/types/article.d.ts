import { IUser } from "./user";

export interface IArticle {
	_id: string;
	tags: Array<string>;
	author: IUser;
	title: string;
	content: string;
	slug: string;
}
