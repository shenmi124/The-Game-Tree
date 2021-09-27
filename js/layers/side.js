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
            name: "Tears of the times",
            done() {
				return options.CTa ? true:""
			},
            tooltip() {
                return `<div style="font-size: 14px">Long time changes<br>
                ${(hasAchievement('ha', 17) ? 'Hide the previous era(No longer exist): OFF'+'<br>' +'Goodbye, or, never again' : '')}
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

