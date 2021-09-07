addLayer("$", {
    name: "$", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R-$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
		doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="s") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="a") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="bm") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="c") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="i") keep.push("points","best","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("$", keep)
		},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "$", description: "$: Reset for $ points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
			description: "You can unlock a milestone",
			cost: new Decimal(25),
			unlocked(){
			return hasUpgrade("$",12)
			},
			},
			22:{
				title: "too much?",
				description: "You can buy some woods",
				cost: new Decimal(30),
			unlocked(){
				return hasUpgrade("$",13)
			},
			},
		},
		milestones: {
			0: {
				requirementDescription: "50$",
				effectDescription: "Get 5% $ every second",
				unlocked(){return hasUpgrade("$",21)},
				done() {
					return player.$.points.gte(50) && hasUpgrade("$",21)},
				},
		
			},
		clickables: {
			11: {
				display() {return "3$ -> 5wood"},
				unlocked(){
					return hasUpgrade("$",22)
				},
				canClick() {
					let $c = player[this.layer].points
					if ($c >= 3) 
					if (!inChallenge('s',11))
					if (!inChallenge('s',12))
					if (!inChallenge('s',21))
					if (!inChallenge('s',22))
					return $c
				},
				onClick(){
					player.$.points = player.$.points.sub(3)
					player.w.points = player.w.points.add(5)
				},
			},
			12: {
				display() {return "30$ -> 50wood"},
				unlocked(){
					return hasUpgrade("$",22)
				},
				canClick() {
					let $c = player[this.layer].points
					if ($c >= 30) 
					if (!inChallenge('s',11))
					if (!inChallenge('s',12))
					if (!inChallenge('s',21))
					if (!inChallenge('s',22))
					return $c
				},
				onClick(){
					player.$.points = player.$.points.sub(30)
					player.w.points = player.w.points.add(50)
				},
			},
			13: {
				display() {return "500$ -> 5stone"},
				unlocked(){
					return (hasUpgrade("w",33) && player.s.unlocked)
				},
				canClick() {
					let $c = player[this.layer].points
					if ($c >= 300) 
					if (!inChallenge('s',11))
					if (!inChallenge('s',12))
					if (!inChallenge('s',21))
					if (!inChallenge('s',22))
					if (!inChallenge('c',11))
					return $c
				},
				onClick(){
					player.$.points = player.$.points.sub(500)
					player.s.points = player.s.points.add(5)
				},
			},
			14: {
				display() {return "5000$ -> 1coal"},
				unlocked(){
					return (hasUpgrade("c",14) && player.c.unlocked)
				},
				canClick() {
					let $c = player[this.layer].points
					if ($c >= 5000) 
					if (!inChallenge('s',11))
					if (!inChallenge('s',12))
					if (!inChallenge('s',21))
					if (!inChallenge('s',22))
					return $c
				},
				onClick(){
					player.$.points = player.$.points.sub(5000)
					player.c.points = player.c.points.add(1)
				},
			},
		},
		passiveGeneration() { return hasMilestone("$", 0)?0.05:0 }
})


addLayer("w", {
    name: "wood",
    symbol: "V-W",
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
			if (hasUpgrade("w", 25)) keep.push("upgrades");
			if (resettingLayer=="a") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="bm") keep.push("points","best","total","milestones","upgrades");
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
    hotkeys: [
        {key: "w", description: "w: Reset for w points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
			title: "wood!",
			description: "You got wood, which makes you feel excited, you want to spend more time playing this game",
			cost: new Decimal(3),
			effect() {
				let eff = player[this.layer].points.add(1).pow(0.19)
				if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.3);
				if (hasUpgrade('w', 13)) eff = eff.times(upgradeEffect('w', 13));
				if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
				eff = softcap(eff,new Decimal(5),0.2)
				eff = softcap(eff,new Decimal(10),0.11)
				eff = softcap(eff,new Decimal(20),0.05)
				return eff
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
			},
		12:{
		title: "Crafts",
		description: "The upgrade effect in the left and right directions is increased by the power of 0.07",
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		13:{
		title: "The Game Tree is AWESOME!",
		description: "Strengthen “wood!”" ,
		cost: new Decimal(5),
		unlocked(){
		return hasUpgrade("w",11)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.08)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.15);
		if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		14:{
		title: "Only used three times",
		description: "Make wooden_pickaxe",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		15:{
		title: "too much!",
		description: "You can sell your woods",
		cost: new Decimal (30),
		unlocked(){
		return hasUpgrade("w",13)
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
		cost: new Decimal (40),
		unlocked(){
			return hasChallenge("s",11)
		},
		},
		22:{
		title: "fast!",
		description: "wood requires -1",
		cost: new Decimal (45),
		unlocked(){
			return hasChallenge("s",12)
		},
		},
		23:{
		title: "Really too much!",
		description: "You can sell your woods, but more cost-effective",
		cost: new Decimal (77),
		unlocked(){
			return hasChallenge("s",12)
		},
		},
		24:{
		title: "Soon",
		description: "Each wood upgrade will increase the production Time by 0.05 times",
		cost: new Decimal (88),
		unlocked(){
			return hasChallenge("s",21)
		},
		effect() {
			let eff = player.w.upgrades.length * 0.05 + 1
			return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		25:{
			title: "The End?",
			description: "keep wood upgrade",
			cost: new Decimal (233),
			unlocked(){
			return hasChallenge("s",21)
			}, 
		},
		31:{
			title: "wooden_axe",
			description: "wood requires -1",
			cost: new Decimal (500),
			unlocked(){
				return hasUpgrade("b",13)
			}, 
			},
		32:{
			title: "big wood bed",
			description: "A good rest makes it easier for you to dig stones",
			cost: new Decimal (750),
			unlocked(){
				return hasUpgrade("b",13)
			}, 
		},
		33:{
			title: "Buy and sell",
			description: "With real money",
			cost: new Decimal (1000),
			unlocked(){
				return hasUpgrade("b",13)
			}, 
		},
		34:{
			title: "Planks",
			description: "A wooden house can make you better fight(ATK best + 1)",
			cost: new Decimal (1500),
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
			description: "coal and charcoal?(unlock coal upgrade)",
			cost: new Decimal (2500),
			unlocked(){
				return hasUpgrade("cr",11)
			}, 
		},
		},
		clickables: {
		11: {
        display() {return "5wood -> 2$"},
		unlocked(){
		return hasUpgrade("w",15)
		},
		canClick() {
		let wc = player[this.layer].points
		if (wc >= 5) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(5)
		player.$.points = player.$.points.add(2)
		},
		},
		12: {
        display() {return "25wood -> 13$"},
		unlocked(){
		return hasUpgrade("w",23)
		},
		canClick() {
		let wc = player[this.layer].points
		if (wc >= 25) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(25)
		player.$.points = player.$.points.add(13)
		},
		},
		13: {
			display() {return "10000wood -> 7000$"},
			unlocked(){
				return hasUpgrade("w",33)
			},
			canClick() {
				let wc = player[this.layer].points
				if (wc >= 10000) 
				return true
			},
			onClick(){
				player.w.points = player.w.points.sub(10000)
				player.$.points = player.$.points.add(7000)
			},
		},
		},
		passiveGeneration() { return hasUpgrade("c", 21)?0.09:0 },
		passiveGeneration() { return hasUpgrade("s", 13)?0.01:0 },
})


addLayer("s", {
    name: "stone",
    symbol: "V-S",
    position: 0,
    startData() { return {
        unlocked:false,
		points: new Decimal(0),
    }},
    color: "#ADADAD",
    requires:function (){
		let sr = new Decimal(20)
		if (hasUpgrade('w',32)) sr = sr.sub(5)
		if (hasUpgrade('cr',12)) sr = sr.sub(5)
		if (hasChallenge("c",11)) sr = sr.sub(2)
		if (inChallenge("c",11)) sr = sr.mul(3)
		if (inChallenge("c",12)) sr = sr.mul(3.5)
		return sr
	},
    resource: "stone",
    baseResource: "wood", 
    baseAmount() {return player.w.points},
    type: "normal",
    exponent: 0.5,
	branches: ["w"],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("c",12)) keep.push("challenges");
			if (layers[resettingLayer].row > this.row) layerDataReset("s", keep);
		},
    row: 1, 
    hotkeys: [
        {key: "s", description: "s: Reset for s points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("w",14))},
			milestones: {
		0: {
			requirementDescription: "1stone",
			effectDescription: "Unlock a new challenge & wood consumption divided by 1.5",
		done() {
			return player.s.points.gte(1)},
		},
		},
			challenges: {
		11: {
			name: "No wood in the mine",
			challengeDescription: "This makes you negative, the Time acquisition is only 75%",
			unlocked() { return hasMilestone("s",0) },
			canComplete: function() {return player.w.points.gte(20)},
			goalDescription:"20 wood",
			rewardDescription: "Unlock a new wood upgrade",
			},
		12: {
			name: "No wood in the mine2.0",
			challengeDescription: "This makes you negative, the Time acquisition is only 65%, the Wood base is *2",
			unlocked() { return hasChallenge("s",11) },
			canComplete: function() {return player.w.points.gte(20)},
			goalDescription:"20 wood",
			rewardDescription: "Unlock two new wood upgrade",
			},
		21: {
			name: "No wood in the mine3.0",
			challengeDescription: "This makes you negative, the Time acquisition is only 55%, the Wood base is *3",
			unlocked() { return hasChallenge("s",12) },
			canComplete: function() {return player.w.points.gte(35)},
			goalDescription:"35 wood",
			rewardDescription: "Unlock two new wood upgrade",
			},
		22: {
			name: "No wood in the mine4.0",
			challengeDescription: "This makes you negative, the Time acquisition is only 45%, the Wood base is *4",
			unlocked() { return hasChallenge("s",21) },
			canComplete: function() {return player.w.points.gte(60)},
			goalDescription:"60 wood",
			rewardDescription: "Unlock three new rows",
			},
			},
		upgrades:{
			11:{
				title: "stone!",
				description: "You got stone, which makes you feel excited, you want to spend more time playing this game (Time acquisition is 200%)",
				cost: new Decimal(1),
			},
			12:{
				title: "axe",
				description: "Make stone_axe (Improve wood acquisition)",
				cost: new Decimal(3),
			},
			13:{
				title: "Stone house",
				description: "Fire prevention, It’s also a solid defense(ATK best +1)",
				cost: new Decimal(3),
				unlocked(){
					return hasChallenge("c",11)
				},
				effect(){
					let eff = new Decimal(0)
					if (hasUpgrade("s",13)) eff = new Decimal(1)
					return eff
				},
			},
			14:{
				title: "Many axes",
				description: "Get 1% wood every second",
				cost: new Decimal(99),
				unlocked(){
					return hasChallenge("c",11)
				},
			},
			15:{
				title: "Compression technology",
				description: "You can compress your stone(画大饼)",
				cost: new Decimal(81),
				unlocked(){
					return hasChallenge("c",11)
				},
			},
		}
})


addLayer("a", {
    name: "attack",
    symbol: "V-A",
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
	branches: ["b"],
	update(diff) {
		player.a.atk = player.a.atk.add(player.a.points.add(buyableEffect('b',14)).add(upgradeEffect("w",34)).add(upgradeEffect("s",13)).pow(2).mul(diff));
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
			if (resettingLayer=="c") keep.push("points","best","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("a", keep)
		},
    layerShown(){return player[this.layer].unlocked || (hasChallenge("s",22))},
		clickables: {
			11: {
				display() {return  'You hava ' + format(player.a.atk) + " ATK <br> You get " + format(player.a.points.add(buyableEffect('b',14)).add(upgradeEffect("w",34)).add(upgradeEffect("s",13)).pow(2))+ "/sec"},
				canClick(){return true}
			},
			21: {
				title:"kill it! *1 ",
				display() {return  "- 100 ATK<br>get 0~1000 blood<br>0.1% get copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1001)
					let cm = Math.floor(Math.random() * 1000)
					player.a.atk = player.a.atk.sub(100)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			22: {
				title:"kill it! *10 ",
				display() {return  "- 1000 ATK<br>get 0~10000 blood<br>1% get copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10001)
					let cm = Math.floor(Math.random() * 100)
					player.a.atk = player.a.atk.sub(1000)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			23: {
				title:"kill it! *100 ",
				display() {return  "- 10000 ATK<br>get 0~100000 blood<br>10% get copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 10000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 100001)
					let cm = Math.floor(Math.random() * 10)
					player.a.atk = player.a.atk.sub(10000)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.cr.points = player.cr.points.add(1)};
					return bm + cm
				},
			},
			24: {
				title:"kill it! *1000 ",
				display() {return  "- 100000 ATK<br>get 0~1000000 blood<br>100% get copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1000001)
					player.a.atk = player.a.atk.sub(100000)
					player.b.points = player.b.points.add(bm);
					player.cr.points = player.cr.points.add(1);
					return bm + cm
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(1)
				},
			},
			25: {
				title:"kill it! *10000 ",
				display() {return  "- 1000000 ATK<br>get 0~10000000 blood<br>1000% get copper"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10000001)
					player.a.atk = player.a.atk.sub(1000000)
					player.b.points = player.b.points.add(bm);
					player.cr.points = player.cr.points.add(10);
					return bm + cm
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(2)
				},
			},
		},
})


addLayer("b", {
    name: "blood",
    symbol: "V-B",
    position: 0.1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	resource: "blood",
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("bm", 12)) keep.push("buyables","upgrades");
			if (resettingLayer=="s") keep.push("points","best","total","milestones","upgrades","buyables");
			if (layers[resettingLayer].row > this.row) layerDataReset("b", keep)
		},
    color: "#CE0000",
    type: "none",
    row: 0, 
    layerShown(){ return (hasChallenge("s",22))},
	upgrades:{
		11:{
			title: "Magic?",
			description: "Blood, blood, I need blood. OH!,I still need an altar",
			cost: new Decimal(666),
		},
		12:{
			title: "Blood stone",
			description: "Soak stone in blood, The blood will corrode the stone part",
			cost: new Decimal(10000),
			unlocked(){
				return hasUpgrade("bm" ,13)
			},
		},
		13:{
			title: "Blood wood",
			description: "Soak wood in blood, unlock wood upgrade",
			cost: new Decimal(20000),
			unlocked(){
				return hasUpgrade("bm" ,14)
			},
		},
		14:{
			title: "Blood copper",
			description: "Soak copper in blood, unlock copper upgrade",
			cost: new Decimal(50000),
			unlocked(){
				return hasUpgrade("bm" ,14)
			},
		},
	},
	buyables: {
		11: {
			cost(x) { 
				return new Decimal(1000).add(29000*x)
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
		},
		12: {
			cost(x) { 
				return new Decimal(1000).add(29000*x)
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
						eff = softcap(eff,new Decimal(2),0.7)
						eff = softcap(eff,new Decimal(5),0.15)
						eff = softcap(eff,new Decimal(10),0.05)
						return eff
					}
				
				},
		},
		13: {
			cost(x) { 
				return new Decimal(1000).add(29000*x)
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
		},
		14: {
			cost(x) { 
				return new Decimal(1000).add(29000*x)
			},
			title:"Strength Rune I",
			display() { return "ATK best gained based on blood increase<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:+"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",34)},
			effect:function(x){
				{
					let eff = new Decimal(1*x).mul(player[this.layer].points*0.00003*(x+1))
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
		},
		21: {
			cost(x) { 
				return new Decimal(1000).add(80000*x*x)
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
		},
		22: {
			cost(x) { 
				return new Decimal(1000).add(80000*x*x)
			},
			title:"Endurance Rune II",
			display() { return "Time gained based on blood magic increase<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",42)},
			effect:function(x){
					{
						let eff = new Decimal(1).mul(player.bm.points*0.02*(x+1)).add(1*x)
						eff = softcap(eff,new Decimal(2),0.15)
						eff = softcap(eff,new Decimal(3),0.1)
						eff = softcap(eff,new Decimal(5),0.05)
						return eff
					}
				
			},
			},
		23: {
			cost(x) { 
				return new Decimal(1000).add(80000*x*x)
			},
			title:"Speed Rune II",
			display() { return "Reduce the number of blood attack to get the base<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:-"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",43)},
			effect:function(x){
				{
					let eff = new Decimal(0.1*x)
					return eff
				}
				
			},
		},
		24: {
			cost(x) { 
				return new Decimal(1000).add(80000*x*x)
			},
			title:"Strength Rune II",
			display() { return "“kill it” Extra give Blood<br>"+"cost:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"Currently:+"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 3,
			unlocked(){return hasUpgrade("bm",44)},
			effect:function(x){
				{
					let eff = new Decimal(1+0.25*x)
					return eff
				}
				
			},
		},
	}
})


addLayer("bm", {
    name: "blood magic",
    symbol: "V-BM",
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
	branches: ["b"],
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
			if (resettingLayer=="c") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="i") keep.push("points","best","total","milestones","upgrades");
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
		},
		12:{
			title: "Immortal",
			description: "Keep blood on buyables & upgrade",
			cost: new Decimal(30),
		},
		13:{
			title: "soak",
			description: "Soak your resources in blood",
			cost: new Decimal(20),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(1))
			},
		},
		14:{
			title: "expand",
			description: "Soak more resources",
			cost: new Decimal(40),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(2))
			}
		},
		15:{
			title: "Increase",
			description: "Soak more more resources",
			cost: new Decimal(75),
			unlocked(){
				return (getBuyableAmount("b", 21).gte(3))
			}
		},
		31:{
			title: "Efficiency Rune I",
			description: "Unlock Efficiency Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		32:{
			title: "Endurance Rune I",
			description: "Unlock Endurance Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		33:{
			title: "Speed Rune I",
			description: "Unlock Speed Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		34:{
			title: "Strength Rune I",
			description: "Unlock Strength Rune I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		41:{
			title: "Efficiency Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(50),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		42:{
			title: "Endurance Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(50),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		43:{
			title: "Speed Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(50),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		44:{
			title: "Strength Rune II",
			description: "Unlock Efficiency Rune II",
			cost: new Decimal(50),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
	},
})


addLayer("cr", {
    name: "copper",
    symbol: "V-CR",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF9224",
    requires: new Decimal(0), 
    resource: "copper",
    type: "none",
    row: 2, 
	branches: ["s","a"],
    layerShown(){return (hasChallenge("s",22))},
		upgrades:{
			11:{
				title:"copper_axe",
				description:"Make copper_axe(unlock two upgrades)",
				cost:new Decimal(15),
				unlocked(){return hasUpgrade("b",14)},
			},
			12:{
				title:"copper_pickaxe",
				description:"Make copper_pickaxe(stone requires -5)",
				cost:new Decimal(15),
				unlocked(){return hasUpgrade("b",14)},
			},
		},
})


addLayer("c", {
    name: "coal",
    symbol: "V-C",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		t: new Decimal(0)
    }},
    color: "#3C3C3C",
    requires:function(){
		let cr = new Decimal(30)
		if (hasChallenge("c",11)) cr = cr.sub(2) 
		if (hasChallenge("c",12)) cr = cr.sub(5) 
		return cr
	},
    resource: "coal",
    baseResource: "stone", 
    baseAmount() {return player.s.points},
    type: "normal",
    exponent: 0.85,
	branches: ["s","b"],
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
			if (resettingLayer=="i") keep.push("points","best","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
		},
    layerShown(){return (hasUpgrade("b",12)) || player[this.layer].unlocked},
		upgrades:{
			11:{
				title:"Torch",
				description:"Light up here.",
				cost:new Decimal(1),
			},
			12:{
				title:"No wood in the mine.but...",
				description:"unlock c challenge",
				cost:new Decimal(2),
				unlocked(){return hasUpgrade("c",11)},
			},
			13:{
				title:"No wood but have torches",
				description:"keep s challenge",
				cost:new Decimal(10),
				unlocked(){return hasChallenge("c",12)},
			},
			14:{
				title:"Coal merchant",
				description:"Sell and buy ​​some coal",
				cost:new Decimal(30),
				unlocked(){return hasChallenge("c",12)},
			},
			21:{
				title:"Light up here",
				description:"No zombies will bother you logging.(get 9% wood every second)",
				cost:new Decimal(40),
				currencyDisplayName:"torch",
				unlocked(){return hasChallenge("c",12)},
				canAfford:function(){return (player.c.t >= 40)},
				pay:function(){
					player.c.t = player.c.t.sub(40)
				},
			}
		},
		clickables: {
			11: {
				display() {return  'You hava ' + format(player.c.t) + "torch"},
				canClick(){return true}
			},
			12: {
				display() {return "make torch(1coal + 1000wood = 4torch)"},
				unlocked(){
					return hasUpgrade("c",11)
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
			21: {
				display() {return "10coal -> 30000$"},
				unlocked(){
					return hasUpgrade("c",14)
				},
				canClick() {
					let cc = player[this.layer].points
					if (cc >= 10) 
					return cc
				},
				onClick(){
					player.c.points = player.c.points.sub(10)
					player.$.points = player.$.points.add(30000)
				},
			},
		},
		challenges:{
			11: {
				name: "No wood in the mine. but have ore",
				challengeDescription: "you find stone, the Time acquisition is only 50%, the stone best * 3",
				unlocked() { return hasUpgrade("c",12) },
				canComplete: function() {return player.s.points.gte(30)},
				goalDescription:"30 stone",
				rewardDescription: "Unlock s upgrade, stone best - 2.",
			},
			12: {
				name: "No wood in the mine. but have ore2.0",
				challengeDescription: "you find coal, the Time acquisition is only 40%, the stone best * 3.5",
				unlocked() { return hasChallenge("c",11) },
				canComplete: function() {return player.s.points.gte(75)},
				goalDescription:"75 stone",
				rewardDescription: "Unlock c upgrade, coal best - 5.",
			},
		},
})


addLayer("i", {
    name: "iron",
    symbol: "V-I",
    position: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#F0F0F0",
    requires: new Decimal(30), 
    resource: "iron",
    baseResource: "copper", 
    baseAmount() {return player.cr.points},
    type: "normal",
    exponent: 2,
	branches: ["cr"],
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
    layerShown(){return false},
})


addLayer("ha", {
    name: "Hidden Achievement",
    symbol: "HA",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "yellow",
    resource: "Hidden Achievement",
    type: "none",
    row: "side", 
    layerShown(){return true},
	tooltip() {
        return ("Hidden Achievements")
    },
	achievementPopups: true,
    achievements: {
        11: {
            name: "yeeeeeeeee",
            done() {
                return player.w.points == 114514
				},
            tooltip() {
                return `<div style="font-size: 14px">yeeeeeeeee<br>
                ${(hasAchievement('ha', 11) ? 'have 114514 wood'+'<br>' +'Is it necessary to take such a foul-smelling achievement?' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
        },
		12: {
            name: "Demon",
            done() {
				return player.b.points == 666
			},
            tooltip() {
                return `<div style="font-size: 14px">Demon<br>
                ${(hasAchievement('ha', 12) ? 'have 666 blood'+'<br>' +'And no demons' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
        },
		13: {
            name: "Enough!",
            done() {
				return (player.w.points >= 2368 && inChallenge("s",22))
			},
            tooltip() {
                return `<div style="font-size: 14px">Enough!<br>
                ${(hasAchievement('ha', 13) ? 'have 2368 wood in s 22challenge'+'<br>' +'Backpack, inventory, hands are all wood' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
        },
		14: {
            name: "The pinnacle of immorality",
            done() {
				return player.devSpeed > 1
			},
            tooltip() {
                return `<div style="font-size: 14px">The pinnacle of immorality<br>
                ${(hasAchievement('ha', 14) ? 'Play games by speeding up'+'<br>' +'stop!!!' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
        },
		15: {
            name: "The pinnacle of morality",
            done() {
				return player.devSpeed < 1
			},
            tooltip() {
                return `<div style="font-size: 14px">The pinnacle of morality<br>
                ${(hasAchievement('ha', 15) ? 'Play games by slowing down'+'<br>' +'st.OH!You go on.' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
        },
    },
	tabFormat: [
        ["display-text",
            function() { return `you find ${player.ha.achievements.length} Hidden Achievements` },
            { "color": 'yellow', "font-size": "32px", "font-family": "Comic Sans MS" }],
        "blank",
        "blank",
        "blank",
        "blank",
        "achievements",
    ],
})

