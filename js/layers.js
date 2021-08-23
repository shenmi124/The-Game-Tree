addLayer("$", {
    name: "$", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R-$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF6F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "$", description: "$: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades: {
		11:{
		title: "start",
		description: "You found a free idle game",
		cost: new Decimal(0),
		},
		12:{
		title: "java?",
		description: "You can buy some coffee to stay up late to play The Game Tree (sleep time 12 hours> 9 hours).",
		cost: new Decimal(5),
		unlocked(){
			return hasUpgrade("$",11)
		},
		},
		13:{
		title: "Don't sleep in hell!",
		description: "You can buy a new bed to Improve sleep quality (sleep time 9 hours> 6 hours).",
		cost: new Decimal(20),
		unlocked(){
			return hasUpgrade("$",12)
		},
		},
		14:{
		title: "Adrenaline",
		description: "You can buy some adrenalines to Improve sleep quality (sleep time 6 hours> 3 hours).",
		cost: new Decimal(200),
		unlocked(){
			return hasUpgrade("$",13)
		},
		},
		21:{
		title: "Investment is risky",
		description: "You can buy a new bed to Improve sleep quality (sleep time 9 hours> 6 hours).",
		cost: new Decimal(50),
		unlocked(){
		return hasUpgrade("$",12)
		},
		},
		},
		milestones: {
		0: {
        requirementDescription: "75$",
        effectDescription: "Get 1% $ every second",
        done() { return player.$.points.gte(75) },
		unlocked(){
		return hasUpgrade("$",21)
		},
		},
		}
})


addLayer("w", {
    name: "wood",
    symbol: "V-W",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF8000",
    requires: new Decimal(5), 
    resource: "wood",
    baseResource: "wood", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.55,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [
        {key: "w", description: "w: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
		title: "wood!",
		description: "You got wood, which makes you feel excited, you want to spend more time playing this game",
		cost: new Decimal(5),
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.05)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.1);
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		12:{
		title: "Crafts",
		description: "The effect in the up, down, left, and right directions is increased by the power of 0.05",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		13:{
		title: "The Game Tree is AWESOME!",
		description: "“wood” again" ,
		cost: new Decimal(15),
		unlocked(){
		return hasUpgrade("w",11)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.05)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.1);
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		14:{
		title: "Only used three times",
		description: "Make wood_pickaxe",
		cost: new Decimal(new Decimal("50")),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		15:{
		title: "too much!",
		description: "You can sell your woods(not made)",
		cost: new Decimal (50),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		},
		clickables: {
		11: {
		getClickableState(layer){
		if ("w" >= 3){}
		},
        display() {return "3wood -> 2$"},
		unlocked(){
		return hasUpgrade("w",15)
		},
		},
		}
})