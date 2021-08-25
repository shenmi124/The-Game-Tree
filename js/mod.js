let modInfo = {
	name: "The Game Tree",
	id: "Gamemod",
	author: "mysterious_124",
	pointsName: "time",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.3.1",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
<h2>Getting an Upgrade</h2><br>
	<h3>v0.2.3.1</h3><br>
		- Fix the bug
	<h3>v0.2.3</h3><br>
		- Added two upgrades in "w"<br>
		- Added one challenge in "s"<br>
	<h3>v0.2.2</h3><br>
		- Added one upgrade in "$"<br>
		- Modify a series of data<br>
		- Added one challenge in "s"<br>
		- Fix the bug “10wood -> 3$” cannot be purchased before 10wood<br>
	<h3>v0.2.1</h3><br>
		- “10wood -> 3$” effect modification<br>
		- Added s0milestone & one challenge in "s"<br>
		- Added one upgrades in "w"<br>
		- Modify a series of w upgrade costs<br>
	<h3>v0.2</h3><br>
		- Added s.<br>
		- $0milestone effectDescription correction<br>
<h2>Virtual and reality?</h2><br>
	<h3>v0.1.3.2</h3><br>
		- "w" upgrades 11&12 index +0.5<br>
	<h3>v0.1.3.1</h3><br>
		- "too much!" is ready<br>
	<h3>v0.1.2.1</h3><br>
		- Fix the bug that $0milestone has no effect<br>
		- Fix the display bug of w layer purchase<br>
	<h3>v0.1.2</h3><br>
		- "too much!" has an butten, but cannot be clicked
		- Fix "Crafts" bug and made a numerical modification
		- Added one upgrades&milestones in "$"<br>
	<h3>v0.1.1</h3><br>
	    - "w" The price formula has slowed down, and the "wood", "The Game Tree is AWESOME!" formula has been improved <br>
		- Added two upgrades in "w"<br>
	<h3>v0.1</h3><br>
		- Added $.<br>
		- Added w.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("$", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	
	let gain = new Decimal(0.5)
		if (hasUpgrade('$', 12)) gain = new Decimal(0.6)
		if (hasUpgrade('$', 13)) gain = new Decimal(0.75)
		if (hasUpgrade('$', 13)) gain = new Decimal(0.875)
		if (hasUpgrade('w', 11)) gain = gain.times(upgradeEffect('w', 11))
		if (hasUpgrade('s',11)) gain = gain.mul(1.5)
		if (inChallenge('s',11)) gain = gain.mul(0.3)
		if (inChallenge('s',12)) gain = gain.mul(0.3)
		if (inChallenge('s',21)) gain = gain.mul(0.2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
