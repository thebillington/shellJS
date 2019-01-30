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
	tab + "clear -- Clear the shell window",
	tab + "about -- Find out more information about me",
	tab + "projects -- See a list of projects that I have worked on",
	tab + tab + "-info [project name] -- Find out more information about a specific project",
	tab + tab + "-repo [project name] -- Open the repository for a specific project",
	tab + tab + "-open [project name] -- Open the website (or find out install info for) a project"
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
projects = [
	[
		"shellJS",
		"A JavaScript bash shell",
		["JavaScript", "HTML", "CSS"],
		"shellJS is a website built in JavaScript that simulates a bash shell. The project was built as an overhaul to my personal website.",
		"https://github.com/thebillington/shellJS",
		["link","http://thebillington.co.uk"]
	],
	[
		"skazka",
		"A narrative led, dungeon-crawling gameboy game",
		["C", "GBDK"],
		"skazka (Russian for 'fairytale') is a game built for the Global Game Jam 2019.<br>I managed a team of 2 artists, 2 narrative designers, 2 programmers, 1 musician and myself to bring the project together.<br>My role within the project was that of prpject lead/lead programmer and I ensured that all of the assets and narrative were in place, before tying together the technologies built by my 2 programmers into the final game.<br>Over the course of 48 hours we built the game from the ground up, creating an engine in C to help us handle dungeon crawling gameplay, artwork displayed on screen and narrative.",
		"https://github.com/thebillington/Skazka",
		["instruction","To play, you must download the <b>.gb</b> file from the repository and open this in a real-hardware gameboy emulator. Alternatively you can flash to a cart and play on real hardware."]
	]
];

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
		printArray(helpMessages);
	}
	else if (cmd[0] == "clear") {
		shell.innerHTML = "";
	}
	else if (cmd[0] == "about") {
		printArray(aboutMessages);
	}
	else if (cmd[0] == "projects") {
		if (cmd.length == 1) {
			printProjectSummary();
		}
		else if (cmd[1] == "-info") {
			if (cmd.length == 2) {
				println("Project-info-usage:");
				println("-------------------");
				println(tab + "-info [project name] -- Find out more information about a specific project");
				println("Err: Please specify a project name");
				print("<br>");
			}
			else {
				printProjectInfo(cmd[2]);
			}
		}
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

// Function to print the list of projects
function printProjectSummary() {
	
	println("Project-list:");
	println("-------------");
	
	// Iterate over each project
	for(var i = 0; i < projects.length; i++) {
		println(tab + projects[i][0] + " - " + projects[i][1]);
	}
	print("<br>");
	
}

// Function to print a specific project
function printProjectInfo(proj) {
	
	// State whether the project exists or not
	exists = false;
	
	// Iterate over each project
	for(var i = 0; i < projects.length; i++) {
		
		// If the project name matches
		if (projects[i][0].toLowerCase() == proj.toLowerCase()) {
			
			// Set exists to true
			exists = true;
			
			// Print the project details
			println(projects[i][0]+"-info:");
			println("-------------------");
			println("Name: " + projects[i][0]);
			println("Brief: " + projects[i][1]);
			println("Technology used:")
			for (var j = 0; j < projects[i][2].length; j++) {
				println(tab + "- " + projects[i][2][j]);
			}
			println(projects[i][3]);
			println("Repo: <a href='" + projects[i][4] + "' target='_blank'>" + projects[i][4] + "</a>");
			
		}
	}
	// If the project doesn't exist, error
	if(!exists) {
		println("Error: Project '" + proj + "' doesn't exist, check your spelling");
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