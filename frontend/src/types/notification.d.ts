export interface INotification {
	message: string;
	link?: { to: string; content: string };
	undo?: boolean;
	behavior?: "good" | "bad" | "warning" | string; //Default "good"
	show?: boolean;
	product?: { id: string; price: number; qty?: number };
	time?: number;
}
