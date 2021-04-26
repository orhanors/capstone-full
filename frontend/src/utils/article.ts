import { IArticle } from "../types/article.d";
export const getFirstImg = (article: IArticle) => {
	const imgRegex = /<img[^>\/]*src=("(?:[^\"]*)"|'(?:[^\']*)'|(?:[^=<>\s\"\'`]+))/;

	const imgUrlString = article.content.match(imgRegex);
	const imgUrl = imgUrlString?.[1].substring(1, imgUrlString?.[1].length - 1);
	return imgUrl;
};
