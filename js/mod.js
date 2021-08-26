let modInfo = {
	name: "游戏树",
	id: "Gamemod",
	author: "nobody",
	pointsName: "时间",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Literally nothing",
}

let changelog = `<h1>更新日志:</h1><br>
<h2>获得升级</h2><br>
	<h3>v0.2</h3><br>
		- 增加 “s”层。<br>
		- $层里程碑0效果介绍修正<br>
<h2>虚拟与现实？</h2><br>
	<h3>v0.1.3.2</h3><br>
		- “w”升级11&12指数+0.5
	<h3>v0.1.3.1</h3><br>
		- “太多了!”已经做好<br>
	<h3>v0.1.2.1</h3><br>
		- 修复$层里程碑0没有效果<br>
		- 修复“w”层的显示bug<br>
	<h3>v0.1.2</h3><br>
		- ”太多了!“有了一个按钮，但是没有用<br>
		- 修复 "工艺品" 的bug并且修改数值<br>
	<h3>v0.1.1</h3><br>
	    - “w”价格公式放缓，“原木！”，“游戏树真的太棒了（强调）！”公式得到了改进 <br>
		- “w”层新增2个升级<br>
	<h3>v0.1</h3><br>
		- 增加 “$”层。<br>
		- 增加 “w”层。`


let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
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