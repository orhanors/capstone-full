import mongoose, { model } from "mongoose";
import redis from "redis";
//import { CacheOptions } from "../../types/mongoose";
type CacheOptions = { key?: string };
const client = redis.createClient();

const getCache = function (
	hashKey: string,
	key: string
): Promise<string | null> {
	return new Promise((res, rej) => {
		client.hget(hashKey, key, (err, val) => {
			if (err) rej(err);
			else res(val);
		});
	});
};

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options: CacheOptions = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || "");

	return this; //make cache() chainable
};

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		//NO CACHE

		return exec.apply(this);
	}
	const key = JSON.stringify({
		...this.getQuery(),
		collection: this.model.collection.name,
	});

	const cacheValue = await getCache(this.hashKey, key);

	if (cacheValue) {
		console.log("DATA FROM CACHE");
		const doc = JSON.parse(cacheValue);

		//convert plain object to mongoose object
		return Array.isArray(doc)
			? doc.map((d) => new this.model(d))
			: new this.model(doc);
	}

	const result = await exec.apply(this);

	client.hset(this.hashKey, key, JSON.stringify(result));
	return result;
};

/**
 *
 * @param hashKey hashkey to remove
 */
const clearHash = (hashKey: string) => {
	client.del(JSON.stringify(hashKey));
};

export { clearHash };
