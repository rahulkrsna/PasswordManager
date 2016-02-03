var argv = require("yargs")
	.command("hello","Greets the user", function(yargs) {
		yargs.options({
			name: {
				demand: true, // args make sure the args are passed
				alias: 'n',
				description: "Your first name goes here",
				type: 'string'
			},
			lastname: {
				demand: true,
				alias: 'l',
				description: "Your last name goes here",
				type: 'string'
			},
		}).help("help");
	})
	.help("help")
	.argv;

var command = argv._[0]
// console.log(argv);
// console.log(argv._.length);


// if (argv._.length > 1) {
// 	console.log(argv._[0] + " " + argv._[1]);
// 	console.log(argv._)
// }
if ( command === "hello" && typeof argv.name === "string" && typeof argv.lastname === 'string')  {
	console.log(command + " " + argv.name + " " + argv.lastname);
} else if ( command === "hello" && typeof argv.name === "string")  {
	console.log(command + " " + argv.name);
} else if (command === "hello" ){
	console.log(command + " world");
}


console.log('---------\t END \t-------------');