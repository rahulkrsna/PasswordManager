console.log("\tExmaple-Try-Catch.js");


// Stage -1 
/*
try {
	throw new Error("Unable to do the job you wanted");
} catch (e) {
	// console.log("Something went wrong!");
	console.log(e.message);
} finally {
	console.log("Finally block executed");
}*/


// Stage-2
function doWork() {
	throw new Error("Unable to do the work asked for!");
}

try {
	doWork();
} catch (e) {
	console.log(e.message);
}

console.log("\tEND");