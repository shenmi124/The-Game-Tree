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
                ${(hasAchievement('ha', 11) ? 'have 114514 Wood'+'<br>' +'Is it necessary to take such a foul-smelling achievement?' : '')}
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
                ${(hasAchievement('ha', 12) ? 'have 666 Blood'+'<br>' +'And no demons' : '')}
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
                ${(hasAchievement('ha', 13) ? 'have 2368 Wood in s 22challenge'+'<br>' +'Backpack, inventory, hands are all wood' : '')}
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
		16: {
            name: "classic",
            done() {
				return options.theme == themes[2];
			},
            tooltip() {
                return `<div style="font-size: 14px">classic<br>
                ${(hasAchievement('ha', 16) ? 'Use "TheGameTree" as themes'+'<br>' +'This is great, isn\'t it?' : '')}
                </div>`;
            },
            onComplete() {
                player.ha.points  = player.ha.points.add(1)
            },
		},
		17: {
            name: "Long time changes",
            done() {
				return options.CTa ? "":true
			},
            tooltip() {
                return `<div style="font-size: 14px">Long time changes<br>
                ${(hasAchievement('ha', 17) ? 'Hide the previous era: OFF'+'<br>' +'I can\'t figure out what to say' : '')}
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


addLayer("ct", {
    name: "Changing Times",
    symbol: "CT1",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0080FF",
    resource: "Changing Times",
    type: "none",
    row: "side", 
    layerShown(){return options.CTa ? (hasAchievement('ct', 17)) ? false:true :true},
	tooltip() {
        return ("Changing Times 1")
    },
	achievementPopups: true,
    achievements: {
        11: {
            name(){return (hasAchievement('ct', 11)) ? "wood":"wood"},
            done() {
                return player.w.points >= 1
				},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 11) ? 'Get wood'+'<br>' +'The most important resource' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
			style() {return {'border-color': "#FFFFFF" }}
        },
		12: {
            name(){return (hasAchievement('ct', 11)) ? "stone":"Undiscovered era"},
            done() {
				return player.s.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 12) ? 'Get stone'+'<br>' +'Transition section' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		13: {
            name(){return (hasAchievement('ct', 12)) ? "attack":"Undiscovered era"},
            done() {
				return player.a.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 13) ? 'Get attack'+'<br>' +'fighting' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		14: {
            name(){return (hasAchievement('ct', 13)) ? "copper":"Undiscovered era"},
            done() {
				return player.cr.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 14) ? 'Get copper'+'<br>' +'Metal!' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		15: {
            name(){return (hasAchievement('ct', 13)) ? "blood":"Undiscovered era"},
            done() {
				return player.b.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 15) ? 'Get blood'+'<br>' +'The red liquid given to you by the enemy after the battle' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		16: {
            name(){return (hasAchievement('ct', 15)) ? "coal":"Undiscovered era"},
            done() {
				return player.c.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 16) ? 'Get coal'+'<br>' +'What\'s this' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		17: {
            name(){return (hasAchievement('ct', 110)) ? "iron":"Undiscovered era"},
            done() {
				return player.i.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 17) ? 'Get iron'+'<br>' +'Changing times' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
			style() {return {'border-color': "#F9F900" }}
        },
		18: {
            name(){return (hasAchievement('ct', 15)) ? "blood magic":"Undiscovered era"},
            done() {
				return player.bm.points >= 1
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 18) ? 'Get blood magic'+'<br>' +'magic?' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
		19: {
            name: "Time placeholder",
            done() {
				return true
			},
			tooltip() {return "In the era of isolation, prevent the chaos of time and space"},
			style() {return {'border-color': "#0080FF",'background': "#0072E3" }}
        },
		110: {
            name(){return (hasAchievement('ct', 14) && hasAchievement('ct', 16)) ? "depth":"Undiscovered era"},
            done() {
				return player.d.points >= 0.01
			},
            tooltip() {
                return `<div style="font-size: 14px">
                ${(hasAchievement('ct', 110) ? 'Get depth'+'<br>' +'Can you dig into China/U.S.?' : '')}
                </div>`;
            },
            onComplete() {
                player.ct.points  = player.ct.points.add(1)
            },
        },
	},
	tabFormat: [
        ["display-text",
            function() { return `You have ${player.ct.points} logo of this era` },
            { "color": '#0080FF', "font-size": "32px", "font-family": "Comic Sans MS" }],
        "blank",
        "blank",
        "blank",
        "blank",
		["row", [["achievement", 19],"blank","blank",["achievement", 19],"blank","blank",["achievement", 11],"blank","blank",["achievement", 19],"blank","blank",["achievement", 19]]],
		"blank",
		["row", [["achievement", 19],"blank","blank",["achievement", 13],"blank","blank",["achievement", 12],,"blank","blank",["achievement", 14],"blank","blank",["achievement", 19]]],
		"blank",
		["row", [["achievement", 16],"blank","blank",["achievement", 15],"blank","blank",["achievement", 19],"blank","blank",["achievement", 19],"blank","blank",["achievement", 19]]],
		"blank",
		["row", [["achievement", 19],"blank","blank",["achievement", 18],"blank","blank",["achievement", 110],"blank","blank",["achievement", 19],"blank","blank",["achievement", 19]]],
		"blank",
		["row", [["achievement", 19],"blank","blank",["achievement", 19],"blank","blank",["achievement", 17],"blank","blank",["achievement", 19],"blank","blank",["achievement", 19]]],
	],
})

