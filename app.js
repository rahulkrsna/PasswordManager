console.log('\t Password Manager\n');

// require : built in nodejs function, used to access the module we need
var crypto = require("crypto-js");
var storage = require('node-persist');
storage.initSync();

// storage.setItemSync('name', 'Rahul');
// var name = storage.getItemSync('name');
// console.log(name);

/*
storage.setItemSync('accounts', [{
	username: 'Rahul',
	balance: 500
}]);
*/
// var accounts = storage.getItemSync('accounts');

/*
accounts.push({
	username: 'Rahul',
	balance: 500
});

accounts.push({
	username: 'Vasantham',
	balance: 1500
});

storage.setItemSync('accounts', accounts);
*/
// console.log(accounts)

function getAccounts(masterPWD) {
	// fetch Accounts
	var encryptedAccounts = storage.getItemSync("passwordManagedAccounts");
	var accounts;
	
	// decrypt
	if ( typeof encryptedAccounts !== "undefined" ) {
		/*
			var bytes = crypto.AES.decrypt(encryptedAccounts,masterPWD);
			var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
		*/
		accounts = JSON.parse(crypto.AES.decrypt(encryptedAccounts,masterPWD).toString(crypto.enc.Utf8));
	} 
	
	// return accounts array	
	return accounts;
}

function saveAccounts(accounts,masterPWD) {

	// encrypt accounts
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPWD);

	// save
	storage.setItemSync("passwordManagedAccounts",encryptedAccounts.toString());
}

/*
Account
1. name (facebook, twitter, bing, google)
2. username
3. password
*/
function createAccount(account, masterPWD) {
	
	var accounts = getAccounts(masterPWD);
	
	if( typeof accounts === "undefined") {
		accounts = [];
	}
	accounts.push(account);
	console.log(accounts);
	
	//Save accounts
	saveAccounts(accounts,masterPWD);
	
	return accounts;
}

function getAccount(accountName, masterPWD) {
	
	var matchedAccounts = [];
	var accounts = getAccounts(masterPWD);
	
	if ( typeof accounts !== "undefined" ) {
		accounts.forEach( function(account) {
			
			// var account = decryptMessage(encryptedAccount, masterPWD);
			if (account.name === accountName) {
				matchedAccounts.push(account);
			}
		});
	}
	return matchedAccounts;
}

// var secretKey = "Password";
function encryptMessage(input, secretKey) {

	var message;
	if(typeof input === 'object') {
		message = JSON.stringify(input);
	} else {
		message = input;
	}
	var encryptedMsg =  crypto.AES.encrypt(message,secretKey); 
	return encryptedMsg;
}

function decryptMessage(input, secretKey) {
	
	return JSON.parse(crypto.AES.decrypt(input,secretKey).toString(crypto.enc.Utf8));
}
/*
var rahulGoogleAccount = {
	name: "Google",
	username: "rahul",
	password: "rahul"
};

var ramYahooAccount = {
	name: "Yahoo",
	username: "ram",
	password: "ram"
};

var ramGoogleAccount = {
	name: "Google",
	username: "ram",
	password: "ram"
};

// createAccount(rahulGoogleAccount);
// createAccount(ramGoogleAccount);
// createAccount(ramYahooAccount);

googleAccounts = getAccount("Google");
console.log(googleAccounts);

yahooAccounts = getAccount("Yahoo");
console.log(yahooAccounts);

twitterAccounts = getAccount("Twitter");
console.log(twitterAccounts);
*/


// ============================== Stage-2 ==========================//

/*
	Create 2 commands, create, get
	create - create an account
	get - get an account

	Create
		-name : account name (Twitter, Google, Facebook)
		-username
		-password

	Get
		-name : account name (Twitter, Google, Facebook)
*/
var argv = require("yargs")
	.command("create","create and save a new account", function(yargs){
		yargs.options({
			name: {
				demand: true,
				type: "string",
				description: "account name (Facebook, Twitter, Google)",
				alias: 'n'
			},
			username: {
				demand: true,
				type: 'string',
				description: "username to be provided here",
				alias: 'u'
			},
			password: {
				demand: true,
				type: 'string',
				description: "password for the account",
				alias: 'p'
			},
			masterPWD: {
				demand: true,
				type: 'string',
				description: "Master Password",
				alias: 'm'
			}
		}).help("help");
	})
	.command("get","Get the existing account", function(yargs) {
		yargs.options({
			name: {
				demand: true,
				type: "String",
				description: "account name (Facebook, Twitter, Google)",
				alias: 'n'
			},
			masterPWD: {
				demand: true,
				type: 'string',
				description: "Master Password",
				alias: 'm'
			}
		}).help("help");
	})
	.help("help")
	.argv;
	
	var command = argv._[0];
		
	if(command === "create") {
		if(argv.name.length > 0 && argv.username.length > 0) {
			try {
				createAccount({
					name: argv.name,
					username: argv.username,
					password: argv.password
				}, argv.masterPWD)
				console.log("Account Created");
			} catch (e) {
				console.log("Error in Account Creation: " + e.message);
			}
		} else {
			console.log("Account Details are incomplete.")
		}
	} else if (command === "get") {
		if(argv.name.length > 0) {
			try {
				matchedAccounts = getAccount(argv.name,  argv.masterPWD);
			
				if (matchedAccounts.length > 0) {
					console.log(matchedAccounts);
				} else {
					console.log("No matching accounts found!!!");
				}
			} catch (e) {
				console.log("Error in Get Account: " + e.message )
			}
			
			
		}
	}
		
console.log('\t----------------------');