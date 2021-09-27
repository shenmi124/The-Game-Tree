addLayer("w", {
    name: "wood",
    symbol: "W",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A23400",
    requires:function (){
		let wr = new Decimal(5);
		if (hasUpgrade('w',22)) wr = wr.sub(1)
		if (hasUpgrade('w',31)) wr = wr.sub(1)
		if (hasUpgrade('c',11)) wr = wr.sub(1)
		if (inChallenge('s',12)) wr = wr.mul(2)
		if (inChallenge('s',21)) wr = wr.mul(3)
		if (inChallenge('s',22)) wr = wr.mul(4)
		return wr
	},
    resource: "wood",
    baseResource: "time", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
		doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("s", 1)) keep.push("upgrades");
			if (resettingLayer=="a") keep.push("points","base","total","milestones","upgrades");
			if (resettingLayer=="bm") keep.push("points","base","total","milestones","upgrades");
			if (resettingLayer=="fm") keep.push("points","base","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("w", keep);
		},
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
		let exp = new Decimal(1)
			if(hasMilestone('s',0)) exp = exp.mul(1.5)
			if(hasUpgrade("s" ,12)) exp = exp.add(0.5)
        return exp
    },
    row: 0, 
	update(diff) {
		generatePoints("w", this.revenue(diff))
		if(player.w.points.gte(500)) {player.w.points = player.w.points.sub(player.cr.diff2.mul(500).mul(player.cr.b1).mul(diff))}
		if(player.w.points.gte(500)) {player.c.points = player.c.points.add(player.cr.diff2.mul(player.cr.b1).mul(diff))}
	},
    hotkeys: [
        {key: "w", description: "w: Reset for w points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
			title: "start",
			description: "You found a free idle game",
			cost: new Decimal(0),
			},
		12:{
			title: "wood!",
			description: "You got wood, which makes you feel excited, you want to spend more time playing this game",
			cost: new Decimal(3),
			effect() {
				let eff = player[this.layer].points.add(1).pow(0.19)
				if (hasUpgrade("w", 13)) eff = player[this.layer].points.add(1).pow(0.3);
				if (hasUpgrade('w', 14)) eff = eff.times(upgradeEffect('w', 14));
				if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
				eff = softcap(eff,new Decimal(5),0.2)
				eff = softcap(eff,new Decimal(10),0.11)
				eff = softcap(eff,new Decimal(20),0.05)
				return eff
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
			},
		13:{
		title: "Crafts",
		description: "The upgrade effect in the left and right directions is increased by the power of 0.07",
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",14)
		},
		},
		14:{
		title: "The Game Tree is AWESOME!",
		description: "Strengthen “wood!”" ,
		cost: new Decimal(5),
		unlocked(){
		return hasUpgrade("w",12)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.08)
		if (hasUpgrade("w", 13)) eff = player[this.layer].points.add(1).pow(0.15);
		if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		15:{
		title: "Only used three times",
		description: "Make wooden_pickaxe",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",14)
		},
		},
		21:{
		title: "too too much!",
		description: "Strengthen “wood” & “The Game Tree is AWESOME!”",
		effect() {
			let eff = player[this.layer].points.add(1).pow(0.035)
			return eff
		},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		cost: new Decimal (30),
		unlocked(){
			return hasChallenge("s",11)
		},
		},
		22:{
		title: "fast!",
		description: "wood requires -1",
		cost: new Decimal (40),
		unlocked(){
			return hasChallenge("s",11)
		},
		},
		23:{
		title: "You are not the only one to play",
		description: "You can buy some coffee to stay up late to play The Game Tree (sleep time 12 hours> 9 hours).",
		cost: new Decimal (65),
		unlocked(){
			return hasChallenge("s",12)
		},
		},
		24:{
		title: "Soon",
		description: "Each wood upgrade will increase the production Time by 0.05 times",
		cost: new Decimal (90),
		unlocked(){
			return hasChallenge("s",12)
		},
		effect() {
			let eff = player.w.upgrades.length * 0.05 + 1
			return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		25:{
			title: "Don't sleep in hell!",
			description: "You can buy a new bed to Improve sleep quality (sleep time 9 hours> 6 hours).",
			cost: new Decimal (100),
			unlocked(){
			return (hasChallenge("s",21) && hasUpgrade("w",23))
			}, 
		},
		31:{
			title: "wooden_axe",
			description: "wood requires -1",
			cost: new Decimal (350),
			unlocked(){
				return hasUpgrade("b",13)
			}, 
			},
		32:{
			title: "big wood bed",
			description: "A good rest makes it easier for you to dig stones",
			cost: new Decimal (1000),
			unlocked(){
				return hasUpgrade("b",13)
			}, 
		},
		33:{
			title: "magic wood",
			description: "blood magic and wood increase time production together",
			cost: new Decimal (5000),
			unlocked(){
				return hasUpgrade("b",13)
			},
			effect(){
				let eff = player.w.points.add(1).pow(0.05).add(player.bm.points.pow(0.35))
				eff = softcap(eff,new Decimal(7),0.2)
				eff = softcap(eff,new Decimal(15),0.1)
				eff = softcap(eff,new Decimal(20),0.01)
				return eff
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		34:{
			title: "Planks",
			description: "A wooden house can make you better fight(ATK base + 1)",
			cost: new Decimal (12500),
			unlocked(){
				return hasUpgrade("cr",11)
			}, 
			effect(){
				let eff = new Decimal(0)
				if (hasUpgrade("w",34)) eff = new Decimal(1)
				return eff
			},
		},
		35:{
			title: "Charcoal",
			description: "coal and charcoal?(unlock coal upgrade & coal best - 3)",
			cost: new Decimal (37500),
			unlocked(){
				return hasUpgrade("cr",11)
			}, 
		},
		},
		revenue(diff) {
			let wu = 0
			if (hasUpgrade("s",15)) wu += 1
			if (hasUpgrade("c",21)) wu += 9
			return diff * wu / 100
		},
})


addLayer("s", {
    name: "stone",
    symbol: "S",
    position: 0,
    startData() { return {
        unlocked:false,
		points: new Decimal(0),
		f: new Decimal(0),
		fc: new Decimal(0),
		m:new Decimal(0),
		mc: new Decimal(0),
		sef: new Decimal(0),
		ses: new Decimal(0),
    }},
    color: "#ADADAD",
    requires:function (){
		let sr = new Decimal(20)
		if (hasUpgrade('w',32)) sr = sr.sub(5)
		if (hasUpgrade('cr',12)) sr = sr.sub(3)
		if (hasMilestone("d",1)) sr = sr.sub(1)
		if (hasChallenge("c",11)) sr = sr.sub(1)
		if (player.s.ses.gte(1)) sr = sr.sub(1)	
		if (inChallenge("c",11)) sr = sr.mul(2.5)
		if (inChallenge("c",12)) sr = sr.mul(3)
		if (inChallenge("c",21)) sr = sr.mul(3.5)
		return sr
	},
    resource: "stone",
    baseResource: "wood", 
    baseAmount() {return player.w.points},
    type: "normal",
    exponent:function (){
		let se = 0.5
		if (hasUpgrade("c",16)) se += (upgradeEffect('c', 16))
		return se
	},
	branches: [["w","#ADADAD"]],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("c",0)) keep.push("upgrades");
			if (hasMilestone("c",1)) keep.push("milestones");
			if (hasMilestone("c",2)) keep.push("challenges");
			if (resettingLayer=="fm") keep.push("points","base","total","milestones","upgrades","challenges","sef","f","m");
			if (layers[resettingLayer].row > this.row) layerDataReset("s", keep);
		},
    row: 1, 
    hotkeys: [
        {key: "s", description: "s: Reset for s points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("w",15))},
		milestones: {
			0: {
				requirementDescription: "1stone",
				effectDescription: "Unlock a new challenge & wood consumption divided by 1.5",
				done() {
					return player.s.points.gte(1)
				},
			},
			1: {
				requirementDescription: "5stone",
				effectDescription: "Keep wood upgrade",
				done() {
					return player.s.points.gte(5) && hasChallenge("s",21)
				},
				unlocked(){return hasChallenge("s",21)}
			},	
		},
		challenges: {
			11: {
				name: "No wood in the mine",
				challengeDescription: "This makes you negative, the Time acquisition is only 80%",
				unlocked() { return hasMilestone("s",0) },
				canComplete: function() {return player.w.points.gte(5)},
				goalDescription:"5 wood",
				rewardDescription: "Unlock two new wood upgrade",
			},
			12: {
				name: "No wood in the mine2.0",
				challengeDescription: "This makes you negative, the Time acquisition is only 70%, the Wood base is *2",
				unlocked() { return hasChallenge("s",11) },
				canComplete: function() {return player.w.points.gte(10)},
				goalDescription:"10 wood",
				rewardDescription: "Unlock two new wood upgrade",
			},
			21: {
				name: "No wood in the mine3.0",
				challengeDescription: "This makes you negative, the Time acquisition is only 60%, the Wood base is *3",
				unlocked() { return hasChallenge("s",12) },
				canComplete: function() {return player.w.points.gte(15)},
				goalDescription:"15 wood",
				rewardDescription: "Unlock a new wood upgrade & stone milestone",
			},
			22: {
				name: "No wood in the mine4.0",
				challengeDescription: "This makes you negative, the Time acquisition is only 50%, the Wood base is *4",
				unlocked() { return hasChallenge("s",21) },
				canComplete: function() {return player.w.points.gte(30)},
				goalDescription:"30 wood",
				rewardDescription: "Unlock three new rows",
			},
		},
		upgrades:{
			11:{
				title: "stone!",
				description: "You got stone, which makes you feel excited, you want to spend more time playing this game (Time acquisition is 250%)",
				cost: new Decimal(1),
				effect(){
					let eff = 2.5
					if (hasUpgrade("s", 13)) eff = player[this.layer].points.mul(0.35).pow(0.35).add(2.5)
					if (eff >= 5) {eff = 5}
					return eff
				},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
			},
			12:{
				title: "axe",
				description: "Make stone_axe (Improve wood acquisition)",
				cost: new Decimal(3),
			},
			13:{
				title: "What's so exciting about this?",
				description: "“stone!”can be strengthened with the increase of stones",
				cost: new Decimal(5),
			},
			14:{
				title: "Stone house",
				description: "Fire prevention, It's also a solid defense(ATK base +1)",
				cost: new Decimal(30),
				unlocked(){
					return hasChallenge("c",11)
				},
				effect(){
					let eff = new Decimal(0)
					if (hasUpgrade("s",14)) eff = new Decimal(1)
					return eff
				},
			},
			15:{
				title: "Many axes",
				description: "Get 1% wood every second",
				cost: new Decimal(50),
				unlocked(){
					return hasChallenge("c",11)
				},
			},
			22:{
				title: "stove",
				description: "Build a furnace with some stones",
				cost: new Decimal(10000),
				unlocked(){
					return hasUpgrade("fm",23)
				},
			},
		},
		clickables:{
			11:{
				title: "<h4>Material:<h4>",
				display() {
					if (player.s.m == 1) {return"wood"}
					if (player.s.m == 10) {return"stone"}
					if (player.s.m == 100) {return"coal"}
					if (player.s.m == 1000) {return"copper"}
					if (player.s.m == 10000) {return"iron"}
					if (player.s.m == 100000) {return"fire"}
				},
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
				onClick(){
					player.s.mc = new Decimal(1)
					player.s.fc = new Decimal(0)
					return
				},
			},
			12:{
				title: "Material:",
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
			},
			13:{
				title: "<h4>fuel:<h4>",
				display() {
					if (player.s.f == 1) {return"wood"}
					if (player.s.f == 10) {return"coal"}
					if (player.s.f == 100) {return"fire"}
				},
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
				onClick(){
					player.s.mc = new Decimal(0)
					player.s.fc = new Decimal(1)
					return
				},
			},
			14:{
				title: "catalyst:",
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
			},
			15:{
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
				onClick(){
					player.s.mc = new Decimal(0)
					player.s.fc = new Decimal(0)
					return
				},
			},
			16:{
				title: "sure",
				canClick(){return true},
				unlocked(){return hasUpgrade("s",22)},
				onClick(){
					if(player.s.m == 100000 && player.s.f == 100){player.s.sef = player.s.sef.add(1)}
					if(player.s.m == 10 && player.s.f.gte(1)){player.s.ses = player.s.ses.add(1)}
					player.s.m = new Decimal(0)
					player.s.f = new Decimal(0)
					return
				}
			},
			21:{
				title: "wood",
				display:"need 100000000 wood",
				canClick(){return player.w.points.gte(100000000) && !(player.s.m == 1)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.w.points = player.w.points.sub(100000000)
					player.s.m = new Decimal(1)
					return
				},	
			},
			22:{
				title: "stone",
				display:"need 30000 stone",
				canClick(){return player.s.points.gte(30000) && !(player.s.m == 10)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.s.points = player.s.points.sub(30000)
					player.s.m = new Decimal(10)
					return
				},
			},
			23:{
				title: "coal",
				display:"need 5000 coal",
				canClick(){return player.c.points.gte(5000)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.c.points = player.c.points.sub(5000)
					player.s.m = new Decimal(100)
					return
				},
			},
			24:{
				title: "copper",
				display:"need 2000 copper",
				canClick(){return player.cr.points.gte(2000)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.cr.points = player.cr.points.sub(2000)
					player.s.m = new Decimal(1000)
					return
				},
			},
			25:{
				title: "iron",
				display:"need 1000 iron",
				canClick(){return player.i.points.gte(1000)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.i.points = player.i.points.sub(1000)
					player.s.m = new Decimal(10000)
					return
				},
			},
			26:{
				title: "fire",
				display:"need 750 fire",
				canClick(){return player.fm.f.gte(750)},
				unlocked(){return player.s.mc.gte(1)},
				onClick(){
					player.fm.f = player.fm.f.sub(750)
					player.s.m = new Decimal(100000)
					return
				},
			},
			31:{
				title: "wood",
				display:"need 100000000 wood",
				canClick(){return player.w.points.gte(100000000)},
				unlocked(){return player.s.fc.gte(1)},
				onClick(){
					player.w.points = player.w.points.sub(100000000)
					player.s.f = new Decimal(1)
					return
				},
			},
			32:{
				title: "coal",
				display:"need 5000 coal",
				canClick(){return player.c.points.gte(5000)},
				unlocked(){return player.s.fc.gte(1)},
				onClick(){
					player.c.points = player.c.points.sub(5000)
					player.s.f = new Decimal(10)
					return
				},
			},
			33:{
				title: "fire",
				display:"need 750 fire",
				canClick(){return player.fm.f.gte(750)},
				unlocked(){return player.s.fc.gte(1)},
				onClick(){
					player.fm.f = player.fm.f.sub(750)
					player.s.f = new Decimal(100)
					return
				},
			},
			91:{
				title: "Essence of Fire",
				display(){return "You have "+format(player.s.sef)+ " Essence of Fire<br>effect:unlock four upgrades.<br>\"Premium fuel\" result is multiplied by 1.2. can exceed the upper limit(fixed)"},
				canClick(){return true},
				unlocked(){return player.s.sef.gte(1)},
				effect(){
					eff = 1
					if(player.s.sef.gte(1)){eff = new Decimal(1.2)}
					return eff
					},
			},
			92:{
				title: "Stone brick",
				display(){return "You have "+format(player.s.ses)+ " Stone brick<br>effect:stone best - 1(fixed)"},
				canClick(){return true},
				unlocked(){return player.s.ses.gte(1)},
			},
		},
		tabFormat: {
		"stone":{
			content:[
				"main-display",
				"prestige-button",
				"blank",
				"blank",
				"milestones",
				"blank",
				"upgrades",
				"blank",
				"challenges",
			],
		},
		"stove":{
			unlocked(){return hasUpgrade("s",22)},
			content:[
				"blank",
				['display-text',function(){return `This is your furnace. After configuration, click "sure" to burn.`}],
				"blank",
				"blank",
				["row", [["clickable", 15],["clickable", 11],["clickable", 15]]],
				["row", [["clickable", 15],["clickable", 15],["clickable", 15]]],
				["row", [["clickable", 15],["clickable", 13],["clickable", 15]]],
				["row", [["clickable", 16]]],
				"blank",
				"blank",
				"blank",
				["row", [["clickable", 31],["clickable", 32],["clickable", 33]]],
				["row", [["clickable", 21],["clickable", 22],["clickable", 23],["clickable", 24],["clickable", 25],["clickable", 26]]],
			],
		},
		"storage":{
			unlocked(){return hasUpgrade("s",22)},
			content:[
				"blank",
				['display-text',function(){return `This is the storage room, what you burn will be here.`}],
				"blank",
				"blank",
				"blank",
				["row", [["clickable", 91],["clickable", 92]]],
			],
		},
		},
})


addLayer("a", {
    name: "attack",
    symbol: "A",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		atk: new Decimal(0),
    }},
    color: "#FFB5B5",
    requires:function (){
		let ar = new Decimal(1)
		if (getBuyableAmount("b", 23).gte(1)) ar = ar.sub(buyableEffect('b',23))
		return ar
	}, 
    resource: "attack",
    baseResource: "stone", 
    baseAmount() {return player.s.points},
    type: "static",
    exponent: 1,
	base:10,
	branches: [["b","#FFB5B5"]],
	update(diff) {
		player.a.atk = player.a.atk.add(player.a.points.add(buyableEffect('b',14)).add(buyableEffect('b',22)).add(upgradeEffect("w",34)).add(upgradeEffect("s",14)).pow(2).mul(diff));
	},
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key: "a", description: "a: Reset for a points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="c") keep.push("points","base","total","milestones","upgrades","atk");
			if (resettingLayer=="fm") keep.push("points","base","total","milestones","upgrades","atk");
			if (layers[resettingLayer].row > this.row) layerDataReset("a", keep)
		},
    layerShown(){return (hasChallenge("s",22))},
		clickables: {
			11: {
				display() {return  'You have ' + format(player.a.atk) + " ATK <br> You get " + format(player.a.points.add(buyableEffect('b',14)).add(buyableEffect('b',22)).add(upgradeEffect("w",34)).add(upgradeEffect("s",13)).pow(2))+ "/sec"},
				canClick(){return true}
			},
			12: {
				display() {return  'You have ' + format(player.c.t) + " torch"},
				canClick(){return true},
				unlocked(){return hasUpgrade("fm",13)},
			},
			21: {
				title:"kill it! *1 ",
				display() {return  "- 100 ATK<br>Get 0~1000 Blood<br>0.2% get Copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1001)
					let cm = Math.floor(Math.random() * 500)
					player.a.atk = player.a.atk.sub(100)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)));
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			22: {
				title:"kill it! *10 ",
				display() {return  "- 1000 ATK<br>Get 0~10000 Blood<br>2% get Copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10001)
					let cm = Math.floor(Math.random() * 50)
					player.a.atk = player.a.atk.sub(1000)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)));
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			23: {
				title:"kill it! *100 ",
				display() {return  "- 10000 ATK<br>Get 0~100000 Blood<br>20% get Copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 10000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 100001)
					let cm = Math.floor(Math.random() * 5)
					player.a.atk = player.a.atk.sub(10000)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)));
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			24: {
				title:"kill it! *1000 ",
				display() {return  "- 100000 ATK<br>Get 0~1000000 Blood<br>200% get Copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1000001)
					player.a.atk = player.a.atk.sub(100000)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)));
					player.cr.points = player.cr.points.add(2);
					return bm + cm
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(1)
				},
			},
			25: {
				title:"kill it! *10000 ",
				display() {return  "- 1000000 ATK<br>Get 0~10000000 Blood<br>2000% get Copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10000001)
					player.a.atk = player.a.atk.sub(1000000)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)));
					player.cr.points = player.cr.points.add(20);
					return bm
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(2)
				},
			},
			31: {
				title:"fire kill it! *1 ",
				display() {return  "- 20 torch<br>Get 0~10000 Blood<br>20% get coal<br>2% get Copper"},
				canClick() {
					let tc = player.c.t
					if (tc >= 20) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10001)
					let crm = Math.floor(Math.random() * 50)
					let cm = Math.floor(Math.random() * 5)
					player.c.t = player.c.t.sub(20)
					player.b.points = player.b.points.add(bm*(buyableEffect("b",24)))
					if (crm == 0) {player.cr.points = player.cr.points.add(1)}
					if (cm == 0) {player.cr.points = player.c.points.add(1)}
					return bm + crm + cm
				},
				unlocked(){
					return hasUpgrade("fm",13)
				},
				style() {if (player.c.t.gte(20)) return {'background-color': "#f35d2f" }}
			},
		},
})


addLayer("b", {
    name: "blood",
    symbol: "B",
    position: 0.1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	resource: "blood",
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("bm", 12) && resettingLayer=="bm") keep.push("buyables","upgrades");
			if (resettingLayer=="s") keep.push("points","base","total","milestones","upgrades","buyables");
			if (resettingLayer=="a" && hasUpgrade("i",51)) keep.push("buyables","upgrades","points");
			if (resettingLayer=="i" && hasUpgrade("i",51)) keep.push("buyables","upgrades","points");
			if (layers[resettingLayer].row > this.row) layerDataReset("b", keep)
		},
    color: "#CE0000",
    type: "none",
    row: 0, 
    layerShown(){ return (hasChallenge("s",22))},
	upgrades:{
		11:{
			title: "Magic?",
			description: "Blood, Blood, I need blood. OH!,I still need an altar",
			cost: new Decimal(666),
			style() {return {'border-color': "#CE0000" }}
		},
		12:{
			title: "Blood stone",
			description: "Soak stone in blood, The blood will corrode the stone part",
			cost: new Decimal(50000),
			unlocked(){
				return hasUpgrade("bm" ,13)
			},
			style() {return {'border-color': "#CE0000" }}
		},
		13:{
			title: "Blood wood",
			description: "Soak wood in blood, unlock wood upgrade",
			cost: new Decimal(100000),
			unlocked(){
				return hasUpgrade("bm" ,14)
			},
			style() {return {'border-color': "#CE0000" }}
		},
		14:{
			title: "Blood copper",
			description: "Soak copper in blood, unlock copper upgrade",
			cost: new Decimal(250000),
			unlocked(){
				return hasUpgrade("bm" ,15)
			},
			style() {return {'border-color': "#CE0000" }}
		},
	},
	buyables: {
		11: {
			cost(x) { 
				return new Decimal(1000).add(9000*x)
			},
			title:"Efficiency Rune I",
			display() { return "Get extra “kill it”<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:+"+format(getBuyableAmount(this.layer, this.id))+" “kill it”"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",31)},
            style() {return {'border-color': "#CE0000" }}
		},
		12: {
			cost(x) { 
				return new Decimal(1000).add(9000*x)
			},
			title:"Endurance Rune I",
			display() { return "Time gained based on blood increase<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",32)},
			effect:function(x){
					{
						let eff = new Decimal(1).mul(player[this.layer].points*0.0002*(x+1)).add(1*x)
						eff = softcap(eff,new Decimal(2),0.2)
						eff = softcap(eff,new Decimal(5),0.15)
						eff = softcap(eff,new Decimal(10),0.05)
						return eff
					}
				
				},
			style() {return {'border-color': "#CE0000" }}
		},
		13: {
			cost(x) { 
				return new Decimal(1000).add(9000*x)
			},
			title:"Speed Rune I",
			display() { return "Reduce the number of blood magic to get the base<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:-"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",33)},
			effect:function(x){
				{
					let eff = new Decimal(500*x)
					return eff
				}
				
			},
			style() {return {'border-color': "#CE0000" }}
		},
		14: {
			cost(x) { 
				return new Decimal(1000).add(9000*x)
			},
			title:"Strength Rune I",
			display() { return "ATK base gained based on blood increase<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:+"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",34)},
			effect:function(x){
				{
					let eff = new Decimal(0.8*x).mul(player[this.layer].points*0.0001*(x+1))
					eff = softcap(eff,new Decimal(1),0.8)
					eff = softcap(eff,new Decimal(2),0.7)
					eff = softcap(eff,new Decimal(3),0.6)
					eff = softcap(eff,new Decimal(4),0.5)
					eff = softcap(eff,new Decimal(5),0.4)
					eff = softcap(eff,new Decimal(6),0.3)
					eff = softcap(eff,new Decimal(7),0)
					return eff
				}
			},
			style() {return {'border-color': "#CE0000" }}
		},
		21: {
			cost(x) { 
				return new Decimal(2000).add(43000*x*x)
			},
			title:"Efficiency Rune II",
			display() { return "Unlock more BM upgrades<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/3<br>"+"Currently:+"+format(getBuyableAmount(this.layer, this.id))+" BM upgrades"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",41)},
			style() {return {'border-color': "#CE0000" }}
		},
		22: {
			cost(x) { 
				return new Decimal(2000).add(43000*x*x)
			},
			title:"Endurance Rune II",
			display() { return "ATK base gained based on Time increase<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/3<br>"+"Currently:+"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",42)},
			effect:function(x){
				{
					let eff = new Decimal(1*x).mul(player.points*0.000005*(x+1))
					eff = softcap(eff,new Decimal(1),0.85)
					eff = softcap(eff,new Decimal(2),0.75)
					eff = softcap(eff,new Decimal(3),0.65)
					eff = softcap(eff,new Decimal(4),0.55)
					eff = softcap(eff,new Decimal(5),0.45)
					eff = softcap(eff,new Decimal(6),0.35)
					eff = softcap(eff,new Decimal(7),0)
					return eff
				}
			},
			style() {return {'border-color': "#CE0000" }}
		},
		23: {
			cost(x) { 
				return new Decimal(2000).add(43000*x*x)
			},
			title:"Speed Rune II",
			display() { return "Reduce the number of blood attack to get the base<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/3<br>"+"Currently:-"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",43)},
			effect:function(x){
				{
					let eff = new Decimal(0.3*x)
					return eff
				}
				
			},
			style() {return {'border-color': "#CE0000" }}
		},
		24: {
			cost(x) { 
				return new Decimal(2000).add(43000*x*x)
			},
			title:"Strength Rune II",
			display() { return "“kill it” Extra give Blood<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/3<br>"+"Currently:+"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",44)},
			effect:function(x){
				{
					let eff = new Decimal(1+0.25*x*(upgradeEffect("fm",13)))
					return eff
				}
			},
			style() {return {'border-color': "#CE0000" }}
		},
	}
})


addLayer("bm", {
    name: "blood magic",
    symbol: "BM",
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#842a84",
    requires:function (){
		let bmr = new Decimal(2500)
		if (getBuyableAmount("b", 13).gte(1)) bmr = bmr.sub(buyableEffect('b',13))
		return bmr
	},
    resource: "blood magic",
    baseResource: "blood", 
    baseAmount() {return player.b.points},
    type: "normal",
    exponent: 1,
	branches: [["b","#842a84"]],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
	doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="c") keep.push("points","base","total","milestones","upgrades");
			if (resettingLayer=="i") keep.push("points","base","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("bm", keep)
		},
    hotkeys: [
        {key:"B", description: "shift+b: Reset for bm points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("b",11))},
	upgrades:{
		11:{
			title: "Drink?",
			description: "No,no,no. But maybe I can make some blood runes",
			cost: new Decimal(1),
			style() {return {'border-color': "#842a84" }}
		},
		12:{
			title: "Immortal",
			description: "Keep blood buyables & upgrade on reset BM",
			cost: new Decimal(30),
			style() {return {'border-color': "#842a84" }},
		},
		13:{
			title: "soak",
			description: "Soak your resources in blood",
			cost: new Decimal(20),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(1))
			},
			style() {return {'border-color': "#842a84" }}
		},
		14:{
			title: "expand",
			description: "Soak more resources",
			cost: new Decimal(40),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(2))
			},
			style() {return {'border-color': "#842a84" }}
		},
		15:{
			title: "Increase",
			description: "Soak more more resources",
			cost: new Decimal(75),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(3))
			},
			style() {return {'border-color': "#842a84" }}
		},
		31:{
			title: "Efficiency Rune I",
			description: "Unlock Efficiency Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
			style() {return {'border-color': "#842a84" }}
		},
		32:{
			title: "Endurance Rune I",
			description: "Unlock Endurance Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
			style() {return {'border-color': "#842a84" }}
		},
		33:{
			title: "Speed Rune I",
			description: "Unlock Speed Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
			style() {return {'border-color': "#842a84" }}
		},
		34:{
			title: "Strength Rune I",
			description: "Unlock Strength Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
			style() {return {'border-color': "#842a84" }}
		},
		41:{
			title: "Efficiency Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(35),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
			style() {return {'border-color': "#842a84" }}
		},
		42:{
			title: "Endurance Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(35),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
			style() {return {'border-color': "#842a84" }}
		},
		43:{
			title: "Speed Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(35),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
			style() {return {'border-color': "#842a84" }}
		},
		44:{
			title: "Strength Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(35),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
			style() {return {'border-color': "#842a84" }}
		},
	},
})


addLayer("cr", {
    name: "copper",
    symbol: "CR",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		e: new Decimal(0),
		em: new Decimal(1),
		b1: new Decimal(0),
		b2: new Decimal(0),
		diff: new Decimal(0),
		diff2: new Decimal(1),
    }},
    color: "#FF9224",
    requires: new Decimal(0), 
    resource: "copper",
    type: "none",
    row: 2, 
	branches: [["s","#FF9224"],["a","#FF9224"],["d","#272727"]],
    layerShown(){return (hasChallenge("s",22))},
	update(diff) {
		if(hasUpgrade("cr",14)) {player.cr.e = player.cr.e.add(player.cr.diff.add(0.1).mul(diff))}
		if(player.cr.e.gte(player.cr.em)){player.cr.e = player.cr.em}
		player.cr.b1 = player.cr.b1.add(player.cr.diff.sub(0.2).mul(diff))
		if(player.cr.b1 > 1){player.cr.b1 = new Decimal(1)}
		if(player.cr.b1 < 0){player.cr.b1 = new Decimal(0)}
		player.cr.b2 = player.cr.b2.add(player.cr.diff.sub(0.2).mul(diff))
		if(player.cr.b2 > 1){player.cr.b2 = new Decimal(1)}
		if(player.cr.b2 < 0){player.cr.b2 = new Decimal(0)}
		
		if(hasUpgrade("c",13)) {player.cr.points = player.cr.points.add(player.cr.diff.add(0.01).mul(diff))}
		if(hasMilestone("d",3)) {player.cr.points = player.cr.points.add(player.cr.diff.add(0.04).mul(diff))}
	},
		upgrades:{
			11:{
				title:"copper_axe",
				description:"Make copper_axe(unlock two upgrades)",
				cost:new Decimal(15),
				unlocked(){return hasUpgrade("b",14)},
			},
			12:{
				title:"copper_pickaxe",
				description:"Make copper_pickaxe(stone requires -3)",
				cost:new Decimal(15),
				unlocked(){return hasUpgrade("b",14)},
			},
			13:{
				title:"Capacitor library",
				description:"Store electricity",
				cost:new Decimal(5),
				unlocked(){return hasChallenge("c",21)},
			},
			14:{
				title:"lightning rod",
				description:"Accumulate electricity slowly",
				cost:new Decimal(5),
				unlocked(){return hasUpgrade("cr",13)},
			},
			15:{
				title:"Electric stove",
				description:"Burning with electricity!",
				cost:new Decimal(10),
				unlocked(){return hasUpgrade("cr",13)},
			},
			16:{
				title:"Mining machine",
				description:"Let me see what's underneath",
				cost:new Decimal(10),
				unlocked(){return hasUpgrade("cr",13)},
			},
			21:{
				title:"Capacitor library^2",
				description:"Store electricity^2",
				cost:new Decimal(20),
				unlocked(){return hasUpgrade("cr",13)},
				effect(){
					if (hasUpgrade("cr",21) && !hasUpgrade("cr",31)) {player.cr.em = new Decimal(4)}
				}
			},
			22:{
				title:"Mining machine MK2",
				description:"Enjoy thirty times the speed",
				cost:new Decimal(20),
				unlocked(){return hasUpgrade("cr",16)},
				effect(){
					if (hasUpgrade("cr",22) && !hasUpgrade("cr",32)) {player.d.mk = new Decimal(30)}
				}
			},
			31:{
				title:"Capacitor library^3",
				description:"Store electricity^3",
				cost:new Decimal(50),
				unlocked(){return hasUpgrade("cr",21)},
				effect(){
					if (hasUpgrade("cr",31)) {player.cr.em = new Decimal(9)}
				}
			},
			32:{
				title:"Mining machine MK3",
				description:"Enjoy seventy times the speed",
				cost:new Decimal(80),
				unlocked(){return hasUpgrade("cr",22)},
				effect(){
					if (hasUpgrade("cr",32)) {player.d.mk = new Decimal(70)}
				}
			},
		},
		clickables:{
			11:{
				title:"Fill 10% of electricity",
				canClick(){
					if(player.cr.e >= 0.1){return true}
				},
				unlocked(){return hasUpgrade("cr",15)},
				onClick(){
					player.cr.b1 = player.cr.b1.add(0.1)
					player.cr.e = player.cr.e.sub(0.1)
				},
			},
			12:{
				title:"Fill 10% of electricity",
				canClick(){
					if(player.cr.e >= 0.1){return true}
				},
				unlocked(){return hasUpgrade("cr",16)},
				onClick(){
					player.cr.b2 = player.cr.b2.add(0.1)
					player.cr.e = player.cr.e.sub(0.1)
				},
			}
		},
		bars: {
			bigBar0: {
				display() {return "You have " + format(player.cr.e) +"/"+format(player.cr.em)+" electricity"},
				direction: RIGHT,
				width: 500,
				height: 100,
				progress() { return player.cr.e / player.cr.em },
				unlocked(){return hasUpgrade("cr",13)},
				baseStyle: {
					"background-color": "#FFFFFF"
				},
				fillStyle: {
					"background-color": "#DDDD00"
				},
				textStyle: {
					"color": "#000000"
				}
			},
			bigBar1: {
				display() {return "Electric stove<br>Use electricity to turn wood into coal(500 : 1)<br>" + format(player.cr.b1) +"/1"},
				direction: RIGHT,
				width: 500,
				height: 100,
				progress() { return player.cr.b1 },
				unlocked(){return hasUpgrade("cr",15)},
				baseStyle: {
					"background-color": "#FFFFFF"
				},
				fillStyle: {
					"background-color": "#DDDD00"
				},
				textStyle: {
					"color": "#000000"
				}
			},
			bigBar2: {
				display() {return "Mining machine<br>Electric Mining Machine<br>" + format(player.cr.b2) +"/1"},
				direction: RIGHT,
				width: 500,
				height: 100,
				progress() { return player.cr.b2 },
				unlocked(){return hasUpgrade("cr",16)},
				baseStyle: {
					"background-color": "#FFFFFF"
				},
				fillStyle: {
					"background-color": "#DDDD00"
				},
				textStyle: {
					"color": "#000000"
				}
			},
		},
	tabFormat: [
        "main-display",
        "upgrades",
        "blank",
		["row", [["bar", "bigBar0"], "blank", ]],
		"blank",
		["row", [["bar", "bigBar1"], "blank", ["clickable", 11]]],
		["row", [["bar", "bigBar2"], "blank", ["clickable", 12]]],
    ]
})


addLayer("c", {
    name: "coal",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		t: new Decimal(0),
    }},
    color: "#3C3C3C",
    requires:function(){
		let cr = new Decimal(30)
		if (hasChallenge("c",12)) cr = cr.sub(2)
		if (hasChallenge("c",13)) cr = cr.sub(4)
		if (hasUpgrade("w",35)) cr = cr.sub(3)
		return cr
	},
    resource: "coal",
    baseResource: "stone", 
    baseAmount() {return player.s.points},
    type: "normal",
    exponent: 0.85,
	branches: [["s","#3C3C3C"],["b","#3C3C3C"]],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 2, 
    hotkeys: [
        {key: "c", description: "c: Reset for c points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
		doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="i") keep.push("points","base","total","milestones","upgrades","challenges");
			if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
		},
    layerShown(){return (hasUpgrade("b",12)) || player[this.layer].unlocked},
		upgrades:{
			11:{
				title:"Torch",
				description:"Light up here.<br>wood base - 1",
				cost:new Decimal(0.5),
			},
			12:{
				title:"No wood in the mine.but...",
				description:"unlock c challenge",
				cost:new Decimal(0.5),
				unlocked(){return hasUpgrade("c",11)},
			},
			13:{
				title:"Light mine",
				description:"Get 0.01 cooper /sec",
				cost:new Decimal(5),
				currencyDisplayName:"torch",
				currencyInternalName: "t",
				currencyLayer: "c",
				unlocked(){return hasUpgrade("w",35)},
			},
			15:{
				title:"matches?",
				description:"Torch making is more efficient",
				cost:new Decimal(2),
				unlocked(){return hasUpgrade("w",35)},
			},
			16:{
				title:"Rubble",
				description:"Collect excess rubble.(Each piece of coal will increase the stone index by 0.005, up to 0.25)",
				cost:new Decimal(2),
				unlocked(){return hasChallenge("c",12)},
				effect(){
					let eff = player[this.layer].points.mul(0.005)
					if (eff >= 0.25){eff = 0.25}
					return eff
				},
				effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))}, 
			},
			21:{
				title:"Light up there",
				description:"No zombies will bother you logging.(Get 9% wood every second)",
				cost:new Decimal(30),
				currencyDisplayName:"torch",
				currencyInternalName: "t",
				currencyLayer: "c",
				unlocked(){return hasChallenge("c",12)},
			}
		},
		milestones:{
			0: {
				requirementDescription: "1torch",
				effectDescription: "keep s upgrades",
				done() {
					return player.c.t.gte(1)
				},
				unlocked(){return hasUpgrade("c",11)}
			},
			1: {
				requirementDescription: "25torch",
				effectDescription: "keep s milestones",
				done() {
					return player.c.t.gte(25)
				},
				unlocked(){return hasMilestone("c",0)}
			},
			2: {
				requirementDescription: "125torch",
				effectDescription: "keep s challenges",
				done() {
					return player.c.t.gte(125)
				},
				unlocked(){return hasMilestone("c",1)}
			},
		},
		clickables: {
			11: {
				display() {return  'You have ' + format(player.c.t) + " torch"},
				canClick(){return true},
				unlocked(){
					return hasUpgrade("c",11)
				},
			},
			12: {
				display() {return "make torch(1coal + 1000wood = 4torch)"},
				unlocked(){
					return hasUpgrade("c",11) && !hasUpgrade("c",15)
				},
				canClick() {
					let cc = player[this.layer].points
					let mc = player.w.points
					if (cc >= 1)
					if (mc >= 1000)
					return cc + mc
				},
				onClick(){
					player.c.points = player.c.points.sub(1)
					player.w.points = player.w.points.sub(1000)
					player.c.t = player.c.t.add(4)
				},
			},
			13: {
				display() {return "make torch(1coal + 800wood = 6torch)"},
				unlocked(){
					return hasUpgrade("c",15)
				},
				canClick() {
					let cc = player[this.layer].points
					let mc = player.w.points
					if (cc >= 1)
					if (mc >= 800)
					return cc + mc
				},
				onClick(){
					player.c.points = player.c.points.sub(1)
					player.w.points = player.w.points.sub(800)
					player.c.t = player.c.t.add(6)
				},
			},
		},
		challenges:{
			11: {
				name: "No wood in the mine. but have ore",
				challengeDescription: "you find stone, the Time acquisition is only 80%, the stone base * 2.5",
				unlocked() { return hasUpgrade("c",12) },
				canComplete: function() {return player.s.points.gte(4)},
				goalDescription:"4 stone",
				rewardDescription: "Unlock s upgrade,stone base - 1.",
			},
			12: {
				name: "No wood in the mine. but have ore2.0",
				challengeDescription: "you find coal, the Time acquisition is only 40%, the stone base * 3.5",
				unlocked() { return hasChallenge("c",11) },
				canComplete: function() {return player.s.points.gte(10)},
				goalDescription:"10 stone",
				rewardDescription: "Unlock c upgrade,coal base - 2.",
			},
			21: {
				name: "No wood in the mine. but have ore3.0",
				challengeDescription: "you find copper, the Time acquisition is only 30%, the stone base * 4",
				unlocked() { return hasChallenge("c",12) },
				canComplete: function() {return player.s.points.gte(35)},
				goalDescription:"35 stone",
				rewardDescription: "Unlock Battery,coal base - 4.",
			},
		},
})


addLayer("d", {
    name: "depth",
    symbol: "D",
    position: -2,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		mk:new Decimal(1),
		mkm: new Decimal(980),
    }},
    color: "#272727",
    resource: "depth",
    type: "none",
    row: 0, 
    layerShown(){return hasUpgrade("cr",16)},
	update(diff) {
		player.d.points = player.d.points.add(player.cr.diff.add(player.cr.b2).mul(player.b.points >= 33 ? 0.5:1).mul(player.d.mk).mul(diff))
		if (player.d.points.gte(player.d.mkm)){player.d.points = player.d.mkm}
	},
		doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="s") keep.push("points","base","total","milestones","upgrades","challenges");
			if (resettingLayer=="a") keep.push("points","base","total","milestones","upgrades","challenges");
			if (resettingLayer=="bm") keep.push("points","base","total","milestones","upgrades","challenges");
			if (resettingLayer=="c") keep.push("points","base","total","milestones","upgrades","challenges");
			if (resettingLayer=="fm") keep.push("points","base","total","milestones","upgrades","challenges");
			if (layers[resettingLayer].row > this.row) layerDataReset("d", keep)
		},
		milestones: {
			0: {
				requirementDescription: "0.01m(soli)",
				effectDescription: "You dug the soil,wait,what?",
				done() {
					return player.d.points.gte(0.01)
				},
				unlocked(){return hasMilestone("d",0)}
			},
			1: {
				requirementDescription: "1m(stone)",
				effectDescription: "You dug the stone,uh,ok,ok.At least there is some gain.<br>stone requires - 1",
				done() {
					return player.d.points.gte(1)
				},
				unlocked(){return hasMilestone("d",1)}
			},
			2: {
				requirementDescription: "33m(rock)",
				effectDescription: "nic...that's bad<br>The geology hardens",
				done() {
					return player.d.points.gte(33)
				},
				unlocked(){return hasMilestone("d",2)}
			},
			3: {
				requirementDescription: "320m(copper)",
				effectDescription: "nice.<br>get 0.04 copper /sec",
				done() {
					return player.d.points.gte(320)
				},
				unlocked(){return hasMilestone("d",3)}
			},
			4: {
				requirementDescription: "480m(iron)",
				effectDescription: "nice!!!<br>unlock iron",
				done() {
					return player.d.points.gte(480)
				},
				unlocked(){return hasMilestone("d",4)}
			},
			5: {
				requirementDescription: "980m(Break through 0.1% of the upper mantle)",
				effectDescription: "Uh, it may not be able to break through.",
				done() {
					return player.d.points.gte(980)
				},
				unlocked(){return hasMilestone("d",5)}
			},
		},
	tabFormat: [
		"main-display",
		['display-text',function(){return `<h3>You have dug <h3> `+format(player.d.points)+` <h3>meters<h3>`}],,
		"milestones",
	]
})

