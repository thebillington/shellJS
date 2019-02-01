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

// Array to store all previous instructions
var instructions = [];

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
	tab + tab + "-open [project name] -- Open the website (or find out install info for) a project",
	tab + tab + "-tech [technology name] -- List all projects built using a specific technology",
	tab + tab + "e.g. 'projects -info skazka'"
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
		"shellJS is a website built in JavaScript that simulates an interactive shell. The project was built as an overhaul to my personal website.",
		"https://github.com/thebillington/shellJS",
		["link","http://thebillington.co.uk"]
	],
	[
		"skazka",
		"A narrative led, dungeon-crawling gameboy game",
		["C", "GBDK"],
		"skazka (Russian for 'fairytale') is a game built for the Global Game Jam 2019, where the theme was 'what home means to you'.<br><br>I managed a team of 2 artists, 2 narrative designers, 2 programmers, 1 musician and myself to bring the project together. My role within the project was that of project lead/lead programmer and I ensured that all of the assets and narrative were in place, before tying together the technologies built by my 2 programmers into the final game. Over the course of 48 hours we built the game from the ground up, creating an engine in C to help us handle dungeon crawling gameplay, artwork displayed on screen and narrative.",
		"https://github.com/thebillington/Skazka",
		["instruction","To play, you must download the <b>.gb</b> file from the repository and open this in a real-hardware gameboy emulator. Alternatively you can flash to a cart and play on real hardware."]
	],
	[
		"VehicleGame",
		"A C++ implementation of OpenGL to create a 3D driving game",
		["C++", "OpenGL", "GLEW", "GLFW3", "GLM", "stb_image"],
		"Vehicle Game is a C++ implementation of OpenGL to create a 3D driving game. The project was built for my Christmas project 2018 over the space of 10 days. I built from the ground up, creating all of the meshes, textures and physics.",
		"https://github.com/thebillington/VehicleGame",
		["instruction","To run the game you must install GLEW, GLFW2, GLM and stb_image and link these as dependencies within the project. For more info, you can view the <b>compile.sh</b> script in the repo to see how to compile on MacOSX."]
	],
	[
		"1978-SpaceInvaders",
		"A version of space invaders built in conjunction with the Sandwell Academy '1978' project",
		["Python", "tphysics"],
		"The 1978 project celebrated the achievements first black players ever to grace the Premier League; Brendon Batson, Laurie Cunningham and Cyril Regies, also known as 'The Three Degrees'.<br><br>The 1978 play was written entirely by students of Sandwell Academy, and alongside the show, every lesson turned to a 1978 based curriculum for the week to allow students better understand the era.<br><br>Space Invaders was released in 1978, therefore I created a python library, built on top of tphysics, to allow students to create their own Space Invader game.",
        "https://github.com/thebillington/SpaceInvaders",
		["instruction","Download the python files and execute using a Python3 shell, such as the one built into IDLE."]
	],
	[
		"90sSteam",
		"A 90s version of the steam client with classic games reimagined for 2018...",
		["JavaScript", "p5.js"],
		"90s Steam is a website built for the Great Uni Hack Manshester 2018, submitted to the 'reimagined websites' category. As part of the project I built reimagined versions of classic games, such as 'Trump Invaders' and 'Brexit Pong'. The website was built in jest and has no political agenda.",
        "https://github.com/thebillington/guh18",
		["link","http://retrogamestrade.com/"]
	],
	[
		"TerrainGame",
		"A fighting game that is a crossover of Worms and Super Smash Bros.",
		["Python", "Pygame"],
		"Terrain game was a project that I built as part of the first Intergalactic Game Jam.<br><br>For the jam, we built a platforming game with destructable terrain. Solving the problem of doing individual physics updates for lots of pixels was highly difficult and taught me a lot about advanced, pixel on pixel collision detection.",
        "https://github.com/thebillington/TerrainGame",
		["instruction","Download the repository and install pygame in python3. Then run <b>terrainCollision.py</b>"]
	],
	[
		"BAB",
		"The Binary Assembler Bot is an assembly programming game",
		["JavaScript", "p5.js"],
		"The Binary Assembler Bot is a game designed to teach students the principles of Computer Science. The game is not yet fully fledged, but has a principle design finished and the ability to give the 'bab' simple commands.",
        "https://github.com/thebillington/bab",
		["link","http://billyrebecchi.co.uk/bab/"]
	],
	[
		"Seasons",
		"Seasons is a vibrant and atmospheric platforming game built for browser",
		["JavaScript", "p5.js"],
		"Seasons was built for the Games Plus Jam game jam in February 2018. The game is one of the largest projects I have undertaken and I am incredibly proud of the finished product. The game was built by a team of 2. I built the principle engine, including physics, rendering, level loading and sound, whilst my teammate worked on creating objects, to populate the game and making the actual levels. Despite minor bugs, the finished product is a polished concept piece.",
        "https://github.com/thebillington/seasons",
		["link","https://thebillington.itch.io/seasons"]
	],
	[
		"Automatron",
		"Automatron is a factory floor programming game, where you program 'workers' to move packages",
		["JavaScript", "p5.js", "PHP"],
		"Automatron is a game built for the Global Game Jam 2018, where the theme was 'transmission'. The aim of the game is to move 'packets' to 'receivers' by using a series of Automatrons - small robots that can be given paths to follow. The game was built solo over the course of 48 hours, and included a PHP server to handle level data, allowing for community created levels.",
        "https://github.com/thebillington/Automatron",
		["link","http://automatron.co.uk/"]
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
	var raw = document.getElementById("shellInput").value.toLowerCase();
	cmd = raw.split(" ");
	document.getElementById("shellInput").value = "";
	replaceCommand(raw);
	
	// Add the command to the start of the instructions array
	instructions.unshift(raw);
	
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
				println("Projects-info-usage:");
				println("-------------------");
				println(tab + "-info [project name] -- Find out more information about a specific project");
				println("Err: Please specify a project name");
				print("<br>");
			}
			else {
				printProjectInfo(cmd[2]);
			}
		}
		else if (cmd[1] == "-repo") {
			if (cmd.length == 2) {
				println("Projects-repo-usage:");
				println("-------------------");
				println(tab + "-repo [project name] -- Open the repository for a specific project");
				println("Err: Please specify a project name");
				print("<br>");
			}
			else {
				openProjectRepo(cmd[2]);
			}
		}
		else if (cmd[1] == "-open") {
			if (cmd.length == 2) {
				println("Projects-open-usage:");
				println("-------------------");
				println(tab + "Open the website (or find out install info for) a project");
				println("Err: Please specify a project name");
				print("<br>");
			}
			else {
				openProject(cmd[2]);
			}
		}
		else if (cmd[1] == "-tech") {
			if (cmd.length == 2) {
				println("Projects-tech-usage:");
				println("-------------------");
				println(tab + "List all projects built using a specific technology");
				println("Err: Please specify a technology name");
				print("<br>");
			}
			else {
				openProjectsTech(cmd[2]);
			}
		}
	}
	else if (cmd[0] != "") {
		println("--Err: '" + raw + "' was not recognised as an internal command");
		println("--Tip: Type 'help' to see a list of valid commands");
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
			println(tab + "Name: " + projects[i][0]);
			println(tab + "Brief: " + projects[i][1]);
			println(tab + "Technology used:")
			for (var j = 0; j < projects[i][2].length; j++) {
				println(tab + tab + "- " + projects[i][2][j]);
			}
			println(tab + projects[i][3]);
			println(tab + "Repo: <a href='" + projects[i][4] + "' target='_blank'>" + projects[i][4] + "</a>");
			
		}
	}
	// If the project doesn't exist, error
	if(!exists) {
		println("Error: Project '" + proj + "' doesn't exist, check your spelling");
	}
	print("<br>");
	
}

// Function to print a specific project
function openProjectRepo(proj) {
	
	// State whether the project exists or not
	exists = false;
	
	// Iterate over each project
	for(var i = 0; i < projects.length; i++) {
		
		// If the project name matches
		if (projects[i][0].toLowerCase() == proj.toLowerCase()) {
			
			// Set exists to true
			exists = true;
			
			// Open the repo
			window.open(projects[i][4], "_blank");
			
		}
	}
	// If the project doesn't exist, error
	if(!exists) {
		println("Error: Project '" + proj + "' doesn't exist, check your spelling");
	}
	print("<br>");
	
}

// Function to print a specific project
function openProject(proj) {
	
	// State whether the project exists or not
	exists = false;
	
	// Iterate over each project
	for(var i = 0; i < projects.length; i++) {
		
		// If the project name matches
		if (projects[i][0].toLowerCase() == proj.toLowerCase()) {
			
			// Set exists to true
			exists = true;
			
			// Check whether the project is playable or instructional
			if (projects[i][5][0] == "link") {
			
				// Open the repo
				window.open(projects[i][5][1], "_blank");
				
			}
			else {
				println(projects[i][0]+"-instructions:");
				println("-------------------");
				println(tab + projects[i][5][1]);
			}
			
		}
	}
	// If the project doesn't exist, error
	if(!exists) {
		println("Error: Project '" + proj + "' doesn't exist, check your spelling");
	}
	print("<br>");
	
}

// Function to print all the projects built using a specific technology
function openProjectsTech(tech) {
	
	// State whether the project exists or not
	exists = false;
	
	println("Project-list:");
	println("-------------");
	
	// Iterate over each project
	for(var i = 0; i < projects.length; i++) {
		
		// Look at each technology
		for (var j = 0; j < projects[i][2].length; j++) {
		
			// If the project name matches
			if (projects[i][2][j].toLowerCase() == tech.toLowerCase()) {
				
				// Set exists to true
				exists = true;
				
				// Print the project details
				println(tab + projects[i][0] + " - " + projects[i][1]);
			}
			
		}
	}
	// If the project doesn't exist, error
	if(!exists) {
		println("Error: No projects built using technology '" + tech + "'");
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
	
	// IE window.event compatability
	e = e || window.event;
	
	// Check for enter key press
	if (e.keyCode == 13) {
		instructionCounter = -1;
		executeCommand();
	}
	
	// Check for up key press
	if (e.keyCode == 38 && instructions.length > 0) {
		
		// Increment instruction counter if required
		if (instructionCounter < instructions.length - 1) {
			instructionCounter++;
		}
		
		// Set the input box to the correct input
		document.getElementById("shellInput").value = instructions[instructionCounter];
		
	}
	
	// Check for down key press
	if (e.keyCode == 40 && instructions.length > 0) {
		
		// Increment instruction counter if required
		if (instructionCounter > 0) {
			instructionCounter--;
		
			// Set the input box to the correct input
			document.getElementById("shellInput").value = instructions[instructionCounter];
		}
		else {
			document.getElementById("shellInput").value = "";
		}
		
	}
	
}