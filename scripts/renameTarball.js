const { rename } = require('fs');
const packageJson = require('../package.json');

const callBack = (error) => {
	if (error) {
		// Show the error 
		console.log(error);
	} else {
		// List all the filenames after renaming
		console.log("\nFile Renamed\n");
	}
};

const oldFileName = `${process.cwd()}/${packageJson.name}-${packageJson.version}.tgz`;
console.log(oldFileName);
const newFileName = `${process.cwd()}/${packageJson.name}-${packageJson.version}-static.tgz`;

rename(oldFileName, newFileName, callBack); 
