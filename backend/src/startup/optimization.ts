/**
 * - Nodejs uses default 4 thread in its thread pool
 * - 8 physical cores means 16 logical core and different machines can operates different thread sizes
 * - We can check the thread size in machine and tell the node engine to use it as effient as it can
 */

import OS from "os";

export default () => {
	process.env.UV_THREADPOOL_SIZE = OS.cpus().length;
};
