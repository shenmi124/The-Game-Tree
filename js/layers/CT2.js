addLayer("i", {
    name: "iron",
    symbol: "I",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F0F0F0",
    requires: new Decimal(50), 
    resource: "iron",
    baseResource: "copper", 
    baseAmount() {return player.cr.points},
    type: "static",
    exponent: 1,
	base:2,
	branches: [["cr","#F0F0F0"]],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 3, 
    hotkeys: [
        {key: "i", description: "i: Reset for i points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("d",4) || player.i.points >= 0.01},
		milestones:{
			0: {
				requirementDescription: "get iron",
				effectDescription: "Unlock THE TECH TREE!Time to get * 20.<br>Congratulations on entering a new era, this will be a great feat",
				done() {
					return player.i.points.gte(1)
				},
				unlocked(){
					return hasMilestone("i",0)
				},
			},
		},
		upgrades:{
			11:{
				title:"Changing times",
				description:"Keep the tech tree, i milestones forever and i points",
				cost:new Decimal(0),
				style() {return {'border-color': "#F0F0F0" }},
				unlocked(){
					return hasMilestone("i",0)
				},
			},
			12:{
				title:"technology era",
				description:"Use iron to make high-strength equipment to explore the world",
				cost:function(){
					let ic = new Decimal(0)
					if (hasUpgrade("i",13)) ic = ic.add(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[11],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",11)
				},
			},
			13:{
				title:"Age of magic",
				description:"Extract elements from iron to explore magic",
				cost:function(){
					let ic = new Decimal(0)
					if (hasUpgrade("i",12)) ic = ic.add(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[11],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",11)
				},
			},
			14:{
				title:"Tin",
				description:"When he meets copper, he turns into bronze",
				cost:function(){
					let ic = new Decimal(1)
					if (hasUpgrade("i",15)) ic = ic.mul(10)
					if (hasUpgrade("i",13)) ic = ic.mul(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[12],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",12)
				},
			},
			15:{
				title:"Gold",
				description:"Precious metals",
				cost:function(){
					let ic = new Decimal(1)
					if (hasUpgrade("i",14)) ic = ic.mul(10)
					if (hasUpgrade("i",13)) ic = ic.mul(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[12],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",12)
				},
			},
			16:{
				title:"Fire magic",
				description:"You find that metal can attach to fire",
				cost:function(){
					let ic = new Decimal(1)
					if (hasUpgrade("i",17)) ic = ic.mul(10)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[13],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",13)
				},
			},
			17:{
				title:"Water magic",
				description:"You find that metal can attach to water",
				cost:function(){
					let ic = new Decimal(1)
					if (hasUpgrade("i",16)) ic = ic.mul(10)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[13],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",13)
				},
			},
		},
		tabFormat: [
		"main-display",
		"prestige-button",
		"milestones",
		["row", [["upgrade", 11]]],
		"blank",
		["row", [["upgrade", 12],"blank","blank",["upgrade", 13]]],
		"blank",
		["row", [["upgrade", 14],"blank","blank",["upgrade", 15],"blank","blank",["upgrade", 16],"blank","blank",["upgrade", 17]]],
		],
})


addLayer("fm", {
    name: "fire magic",
    symbol: "FM",
    position: 4,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		f: new Decimal(0),
    }},
    color: "#f35d2f",
    requires: new Decimal(10000), 
    resource: "fire magic",
    baseResource: "blood magic", 
    baseAmount() {return player.bm.points},
    type: "normal",
    exponent: 0.3,
	branches: [["bm","#f35d2f"]],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 2, 
    hotkeys: [
        {key: "F", description: "shift+f: Reset for fm points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("i",16)},
		clickables:{
			11:{
				title:"Fan<br>",
				display(){return "The flame is burning<br>You will get Fire every time you fan<br>You have "+format(player.fm.f)+" fire"},
				canClick(){return true},
				onClick(){
					player.fm.f = player.fm.f.add(0.1)
				},
				style() {return {'height': "145px",'width': '250px' }}
			},
		},
})

