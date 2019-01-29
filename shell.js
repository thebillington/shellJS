// Variable to hold the shell
var shell;
var bootSequenceCounter;
var input;

// Store whether output is currently allowed
var output = false;

// Store the shell output
var shellPrompt = '<input style="width: 80%;" type="text" id="shellInput" onblur="focusInput()" value="">';

// Store a tab
var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

// Array to store all of the boot sequence messages
bootMessages = [
	["Inititialising...", 3000],
	["Detecting peripherals...", 1000],
	["Building profile...", 2000],
	["Loading project information...", 1000],
	["<br>Welcome to thebillingtonOS", 1000]
];

// Array to store all of the help messages
helpMessages = [
	"Built-in-commands:",
	"------------------",
	tab + "help -- View a list of built in commands",
	tab + tab + "[command] -- type 'help [command]' to find out more information about a specific command",
	tab + "clear -- Clear the shell window",
	tab + "about -- Find out more information about me",
	tab + "projects -- See a list of projects that I have worked on"
];

// Array to store all of the help messages for the clear function
clearHelpMessages = [
	"Clear-usage:",
	"------------------",
	tab + "clear -- Removes all output from the shell window"
];

// Array to store all of the help messages for the about function
aboutHelpMessages = [
	"About-usage:",
	"------------------",
	tab + "about -- Lists key information about me, my skills, my hobbies and my work"
];

// Array to store all of the about me messages
aboutMessages = [
	"About-me:",
	"---------",
	tab + "Name: Billy Rebecchi",
	tab + "Qualifications:",
	tab + tab + "- PGCE Secondary Computer Science and ICT (Leeds Trinity University)",
	tab + tab + "- BSc Computer Science (Game Engineering) (Newcastle University)",
	tab + "Expertise:",
	tab + tab + "- 3 years experience delivering A-Level and GCSE Computer Science within UK schools",
	tab + tab + "- 15 years programming experience"
];

// Array to hold a list of projects


// Function to handle loading all document elements on body load
function setup() {
	
	// Fetch the shell
	shell = document.getElementById("shell");
	
	// Initiate boot sequence
	bootSequenceCounter = 0;
	boot();
	
}

// Function to output the boot messages
function boot() {
	
	// Check whether we have output all the boot sequence
	if (bootSequenceCounter == bootMessages.length) {
	
		// Start the shell execution loop
		main();
		return;
		
	}
	
	// Load the next boot message
	println(bootMessages[bootSequenceCounter][0]);
	setTimeout(boot, bootMessages[bootSequenceCounter][1]);
	bootSequenceCounter++;
	
}

// Function to hold all of the logic for the shell execution
function main() {
	
	// Output the shell message
	println("C:/> " + shellPrompt);
	focusInput();
	
}

// Create a function to output a message to shell
function print(msg) {
	
	// Output the message
	shell.innerHTML += msg;
	
}

// Create a function to output a message to shell
function println(msg) {
	
	// Output the message
	shell.innerHTML += "<p>" + msg + "</p>";
	
}

// Function to focus on the input box
function focusInput() {
	document.getElementById("shellInput").focus();
}

// Function to execute a command
function executeCommand() {
	
	// Get the command from the input dialogue box
	var raw = document.getElementById("shellInput").value;
	cmd = raw.split(" ");
	document.getElementById("shellInput").value = "";
	replaceCommand(raw);
	
	// Check the command
	if (cmd[0] == "help") {
		if (cmd.length == 1) {
			printArray(helpMessages);
		}
		else if (cmd[1] == "clear") {
			printArray(clearHelpMessages);
		}
		else if (cmd[1] == "about") {
			printArray(aboutHelpMessages);
		}
	}
	else if (cmd[0] == "clear") {
		shell.innerHTML = "";
	}
	else if (cmd[0] == "about") {
		printArray(aboutMessages);
	}
	else if (cmd[0] != "") {
		println("--Err: '" + cmd + "' was not recognised as an internal command");
	}
	
	// Get ready for another command
	main();
	focusInput();
	
}

// Function to print an array
function printArray(arr) {
	
	// Iterate over the array and print each item
	for(var i = 0; i < arr.length; i++) {
		println(arr[i]);
	}
	print("<br>");
	
}

// Function to replace the input text with the input command
function replaceCommand(cmd) {
	
	// Remove the input box from the previous command
	shell.innerHTML = shell.innerHTML.replace(shellPrompt, cmd);
	
}

// Set the key capture function to handle enter press
document.onkeydown = function(e) {
	
	// Capture all key presses
	e = e || window.event;
	
	// Check for enter key press
	if (e.keyCode == 13) {
		executeCommand();
	}
	
}