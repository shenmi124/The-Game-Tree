addLayer("i", {
    name: "iron",
    symbol: "I",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F0F0F0",
    requires:function(){
		let ir = new Decimal(50)
		if (hasUpgrade("i",53)){ir = ir.mul(0.5)}
		if (hasUpgrade("fm",22)){ir = ir.sub(upgradeEffect("fm",22))}
		return ir
	},
    resource: "iron",
    baseResource: "copper", 
    baseAmount() {return player.cr.points},
    type: "static",
	canBuyMax:function(){
		let icym = 1
		if(hasMilestone("i",0)){icym + 2}
		return icym
	},
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
    layerShown(){return hasMilestone("d",4) || hasMilestone("i",0)},
		milestones:{
			0: {
				requirementDescription: "get iron",
				effectDescription: "Unlock THE TECH TREE!Time to get * 20.You can buy 3 irons at a time<br>Congratulations on entering a new era, this will be a great feat",
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
				description:"You find that fire can attach to metal",
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
				description:"You find that water can attach to metal",
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
			23:{
				title:"move fire",
				description:"unlock fire magic upgrades",
				cost:function(){
					let ic = new Decimal(1)
					if (hasUpgrade("i",17)) ic = ic.mul(10)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[16],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("fm",15)
				},
			},
			51:{
				title:"Fire can kill",
				description:"Fill the runes with fire.Keep all when attack and iron reset.",
				cost:function(){
					let ic = new Decimal(2)
					if (hasUpgrade("i",52)) ic = ic.mul(5)
					if (hasUpgrade("i",53)) ic = ic.mul(5)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					if (hasUpgrade("i",17)) ic = ic.mul(10)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[23],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",23)
				},
			},
			52:{
				title:"use",
				description:"\"Fan\" gets 200 coal when using wood",
				cost:function(){
					let ic = new Decimal(2)
					if (hasUpgrade("i",51)) ic = ic.mul(5)
					if (hasUpgrade("i",53)) ic = ic.mul(5)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					if (hasUpgrade("i",17)) ic = ic.mul(10)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[23],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",23)
				},
			},
			53:{
				title:"fire magic > fire",
				description:"It is more efficient to use fire magic as fuel.Iron gain base halved",
				cost:function(){
					let ic = new Decimal(2)
					if (hasUpgrade("i",51)) ic = ic.mul(5)
					if (hasUpgrade("i",52)) ic = ic.mul(5)
					if (hasUpgrade("i",12)) ic = ic.mul(1000)
					if (hasUpgrade("i",17)) ic = ic.mul(10)
					return ic
				},
				style() {return {'border-color': "#F0F0F0" }},
				req:[23],
				branches() { 
					let col = hasUpgrade(this.layer, this.id) ? "#77df5f" : "#9c7575"
					return this.req.map(x => [x, col]) 
				},
				unlocked(){
					return hasUpgrade("i",23)
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
		"blank",
		["row", [["upgrade", 23]]],
		"blank",
		["row", [["upgrade", 51],"blank","blank",["upgrade", 52],"blank","blank",["upgrade", 53]]],
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
		get: new Decimal(1),
		fa: new Decimal(0),
		fan: new Decimal(0),
    }},
    color: "#f35d2f",
    requires: new Decimal(1000), 
    resource: "fire magic",
			doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="i") keep.push("points","base","total","milestones","upgrades","buyables","f");
			if (layers[resettingLayer].row > this.row) layerDataReset("fm", keep)
		},
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
	update(diff) {
		player.fm.f = player.fm.f.add(player.fm.get.mul(player.fm.points).mul(0.1).mul(upgradeEffect('fm', 12)).mul(diff))
		player.fm.f = player.fm.f.add(player.fm.get.mul(player.fm.points).mul(0.1).mul(upgradeEffect('fm', 32)).mul(diff))
	},
    layerShown(){return hasUpgrade("i",16)},
		clickables:{
			11:{
				title:"Fan<br>",
				display(){return "The flame is burning<br>You will get Fire every time you fan<br>You have "+format(player.fm.f)+" fire"},
				canClick(){return true},
				onClick(){
					player.fm.f = player.fm.f.add(player.fm.get.mul(player.fm.points).mul(0.1))
				},
				style() {return {'height': "145px",'width': '250px' }},
				unlocked(){return player.fm.fan == 0}
			},
			12:{
				title:"Fan<br>",
				display(){return "The flame is burning<br>The wood is burning<br>You will get Fire every time you fan<br>You have "+format(player.fm.f)+" fire<br>need 1000000wood"},
				canClick(){return player.w.points.gte(1000000)},
				onClick(){
					player.fm.f = player.fm.f.add(player.fm.get.mul(player.fm.points))
					player.w.points = player.w.points.sub(1000000)
					if (hasUpgrade("i",42)){player.c.points = player.c.points.add(200)}
				},
				style() {return {'height': "145px",'width': '250px' }},
				unlocked(){return player.fm.fan == 1},
			},
			13:{
				title:"Fan<br>",
				display(){return "The flame is burning<br>The coal is burning<br>You will get Fire every time you fan<br>You have "+format(player.fm.f)+" fire<br>need 2000coal"},
				canClick(){return player.c.points.gte(2000)},
				onClick(){
					player.fm.f = player.fm.f.add(player.fm.get.mul(20).mul(player.fm.points))
					player.c.points = player.c.points.sub(2000)
				},
				style() {return {'height': "145px",'width': '250px' }},
				unlocked(){return player.fm.fan == 2},
			},
			21:{
				display(){return "<h1>Switch<h1>"},
				canClick(){return true},
				onClick(){
					player.fm.fan = player.fm.fan.add(1)
					if (player.fm.fan.gte(2) && !hasUpgrade("fm",24)){player.fm.fan = new Decimal(0)}
					if (player.fm.fan.gte(3)){player.fm.fan = new Decimal(0)}
				},
				style() {return {'width': '200px' }},
				unlocked(){return hasUpgrade("fm",14)}
			},
		},
		upgrades:{
			11:{
				title:"Large folding fan",
				description:"Fire gets more",
				cost:new Decimal(1),
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				effect(){
					if (hasUpgrade("fm",11)){player.fm.get = new Decimal(1.1)}
				},
			},
			12:{
				title:"Strong wind",
				description:"Automatically click \"Fan\" every 100 seconds",
				cost:new Decimal(5),
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("fm",11)},
				effect(){
					let eff = 0
					if (hasUpgrade("fm",12)){eff = new Decimal(0.01)}
					return eff
				},
			},
			13:{
				title:"Fire attack",
				description:"Use fire to burn the enemy, gain 1.5 times effect the Strength Rune II, and unlock the new ATK attack",
				cost:new Decimal(10),
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("fm",12)},
				effect(){
					let eff = 1
					if (hasUpgrade("fm",13)){eff = 1.5}
					return eff
				},
			},
			14:{
				title:"fuel",
				description:"Use wood as fuel, \"fan\" gets *10 when using fuel",
				cost:new Decimal(20),
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("fm",13)},
			},
			15:{
				title:"it's time",
				description:"Use your fire to promote the tech tree(new upgrades)",
				cost:new Decimal(200),
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("fm",14)},
			},
			21:{
				title:"Collaboration",
				description:"Currently useless?<br>Check back after unlocking other layers",
				cost:function(){
					let ic = new Decimal(500)
					if (hasUpgrade("fm",21)) ic = ic.mul(2)
					if (hasUpgrade("fm",22)) ic = ic.mul(2)
					if (hasUpgrade("fm",23)) ic = ic.mul(2)
					if (hasUpgrade("fm",24)) ic = ic.mul(2)
					return ic
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("i",23)},
			},
			22:{
				title:"Premium fuel",
				description:"Fire reduces iron acquisition base",
				cost:function(){
					let ic = new Decimal(500)
					if (hasUpgrade("fm",21)) ic = ic.mul(2)
					if (hasUpgrade("fm",22)) ic = ic.mul(2)
					if (hasUpgrade("fm",23)) ic = ic.mul(2)
					if (hasUpgrade("fm",24)) ic = ic.mul(2)
					return ic
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("i",23)},
				effect(){
					let eff = player.fm.f.pow(0.32).min(15)
					return eff
				},
				effectDisplay() { return "-"+format(upgradeEffect(this.layer, this.id)) }, 
			},
			23:{
				title:"Big stove",
				description:"Unlock a series of upgrades about the stove",
				cost:function(){
					let ic = new Decimal(500)
					if (hasUpgrade("fm",21)) ic = ic.mul(2)
					if (hasUpgrade("fm",22)) ic = ic.mul(2)
					if (hasUpgrade("fm",23)) ic = ic.mul(2)
					if (hasUpgrade("fm",24)) ic = ic.mul(2)
					return ic
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				canAfford:function(){return (player.fm.f >= 500)},
				unlocked(){return hasUpgrade("i",23)},
			},
			24:{
				title:"move fuel",
				description:"Use coal as fuel, \"fan\" gets *200 when using fuel ",
				cost:function(){
					let ic = new Decimal(500)
					if (hasUpgrade("fm",21)) ic = ic.mul(2)
					if (hasUpgrade("fm",22)) ic = ic.mul(2)
					if (hasUpgrade("fm",23)) ic = ic.mul(2)
					if (hasUpgrade("fm",24)) ic = ic.mul(2)
					return ic
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return hasUpgrade("i",23)},
			},
			31:{
				title:"Endless fire",
				description:"Maybe you can use these fires to get some bonuses(unlock buyables)",
				cost:function(){
					return new Decimal(2500)
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return player.s.sef.gte(1)},
				effect(){
					let eff = 0
					if(hasUpgrade("i",31)){eff = 1}
					return eff
				},
				effectDisplay() { return "+ "+format(upgradeEffect(this.layer, this.id)) },
			},
			32:{
				title:"dry",
				description:"Automatically click \"Fan\" every 10 seconds(need \"Strong wind\")",
				cost:function(){
					return new Decimal(2500)
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return player.s.sef.gte(1)},	
				effect(){
					let eff = new Decimal(0).add()
					return eff
				},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id)) },
			},
			33:{
				title:"no make",
				description:"no make",
				cost:function(){
					return new Decimal(114514)
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return player.s.sef.gte(1)},	
				effect(){
					let eff = new Decimal(0).add()
					return eff
				},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id)) },
			},
			34:{
				title:"no make",
				description:"no make",
				cost:function(){
					return new Decimal(114514)
				},
				currencyDisplayName:"fire",
				currencyInternalName: "f",
				currencyLayer: "fm",
				unlocked(){return player.s.sef.gte(1)},	
				effect(){
					let eff = new Decimal(0).add()
					return eff
				},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id)) },
			},
		},
		tabFormat: [
		"main-display",
		"prestige-button",
		"blank",
		"blank",
		"clickables",
		"blank",
		["row", [["upgrade", 31]]],
		["row", [["upgrade", 21],["upgrade", 11],["upgrade", 22]]],
		["row", [["upgrade", 32],["upgrade", 12],["upgrade", 15],["upgrade", 13],["upgrade", 33]]],
		["row", [["upgrade", 23],["upgrade", 14],["upgrade", 24]]],
		["row", [["upgrade", 34]]],
		],
})

