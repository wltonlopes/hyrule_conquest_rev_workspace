GORO.launchAttackMessages = {
	"hugeAttack": [
		markForTranslation("Brother, I am preparing to crush the enemy. Join me against %(_player_)s!"),
		markForTranslation("Soon, the enemy will perish Brother. Help me destroy %(_player_)s, and we will feast!"),
		markForTranslation("Brother, let us annihilate the enemy together. Help me attack %(_player_)s.")
	],
	"other": [
		markForTranslation("I am launching an attack against %(_player_)s, Brother"),
		markForTranslation("Brother, I have just sent an army against %(_player_)s."),
		markForTranslation("Brother, I am sending an army against %(_player_)s. Join me!")
	]
};

GORO.answerRequestAttackMessages = {
	"join": [
		markForTranslation("Let me regroup my army, Brother, and I will then join you against your foe."),
		markForTranslation("Of course, Brother. May our victory be glorious!"),
		markForTranslation("The enemy will cower before our rage Brother.")
	],
	"decline": [
		markForTranslation("Soon Brother, but not yet, as my armies are scattered."),
		markForTranslation("I am afraid I cannot help you, Brother, as my troops are not ready."),
		markForTranslation("Sorry Brother, but I cannot join you this time.")
	],
	"other": [
		markForTranslation("Oh, I am sorry Brother, but I am attacking %(_player_2)s right now."),
		markForTranslation("I am invading %(_player_2)s Brother, so I cannot help you this time.")
	]
};

GORO.sentTributeMessages = [
	markForTranslation("Here is a gift for you Brother. Make good use of it, and may our empires prosper."),
	markForTranslation("I see you are in a bad place, Brother. I hope that this can help you."),
	markForTranslation("Ah, Brother, you are running low on resources, maybe these will help.")
];

GORO.requestTributeMessages = [
	markForTranslation("I am in need of %(resource)s Brother, can you help?"),
	markForTranslation("Brother, I need more %(resource)s to build my army. Will you help me?"),
	markForTranslation("Brother, can you give me some %(resource)s?")
];

GORO.newTradeRouteMessages = [
	markForTranslation("Brother, I have set up a new trade route with %(_player_)s. May our empires prosper!"),
	markForTranslation("I have just sent traders to %(_player_)s. Let us join in commerce!")
];

GORO.newDiplomacyMessages = {
	"ally": [
		markForTranslation("%(_player_)s and I are now allies in war.")
	],
	"neutral": [
		markForTranslation("%(_player_)s and I are now neutral.")
	],
	"enemy": [
		markForTranslation("%(_player_)s and I are now enemies. I will destroy them!")
	]
};

GORO.answerDiplomacyRequestMessages = {
	"ally": {
		"decline": [
			markForTranslation("I cannot accept your offer to become allies, Brother."),
			markForTranslation("I must decline your offer of alliance, %(_player_)s."),
			markForTranslation("I refuse to become allies %(_player_)s.")
		],
		"declineSuggestNeutral": [
			markForTranslation("I reject your request for alliance, Brother, but we could become neutral."),
			markForTranslation("I will not become allies, %(_player_)s, but I could agree to a ceasefire.")
		],
		"declineRepeatedOffer": [
			markForTranslation("Our previous alliance did not work out, %(_player_)s. I will not make that mistake again!"),
			markForTranslation("No more alliances between us, %(_player_)s!"),
			markForTranslation("Your request for peace means nothing to me anymore, %(_player_)s!")
		],
		"accept": [
			markForTranslation("I will accept your offer to become allies, Brother. May our empires prosper!"),
			markForTranslation("Let both of our empires prosper from this peace Brother."),
			markForTranslation("I would be proud to call you my Brother. I accept your offer of peace."),
			markForTranslation("I am honored to be your ally Brother.")
		],
		"acceptWithTribute": [
			markForTranslation("I will ally with you, %(_player_)s, but only if you send me some resources to aid my cause. %(_amount_)s %(_resource_)s is enough."),
			markForTranslation("Unless you send me %(_amount_)s %(_resource_)s, an alliance won’t be formed, %(_player_)s.")
		],
		"waitingForTribute": [
			markForTranslation("Brother, my offer still stands. I will ally with you only if you gift me %(_amount_)s %(_resource_)s."),
			markForTranslation("I’m not getting any younger, Brother. Hurry up and send me %(_amount_)s %(_resource_)s.")
		]
	},
	"neutral": {
		"decline": [
			markForTranslation("I will not become neutral with you, %(_player_)s."),
			markForTranslation("I have no wish for peace.")
		],
		"declineRepeatedOffer": [
			markForTranslation("No more ceasefires. Time for war!")
		],
		"accept": [
			markForTranslation("I welcome your request for peace between our empires, Brother. I accept."),
			markForTranslation("I agree to a ceasefire, %(_player_)s.")
		],
		"acceptWithTribute": [
			markForTranslation("If you want peace, you must give me %(_amount_)s %(_resource_)s, %(_player_)s."),
			markForTranslation("%(_player_)s, if you send me %(_amount_)s %(_resource_)s, I will accept a peace agreement.")
		],
		"waitingForTribute": [
			markForTranslation("%(_player_)s, I am still waiting for the %(_amount_)s %(_resource_)s to close our treaty.")
		]
	}
};

GORO.sendDiplomacyRequestMessages = {
	"ally": {
		"sendRequest": [
			markForTranslation("Brother, I would be honored to become allies with you."),
			markForTranslation("Brother, it would help both of our empire if we formed an alliance.")
		],
		"requestExpired": [
			markForTranslation("%(_player_)s, my offer for an alliance has expired.")
		]
	},
	"neutral": {
		"sendRequest": [
			markForTranslation("Brother, I think that both of our civilizations would benefit from a temporary peace.")
		],
		"requestExpired": [
			markForTranslation("You took to long. I rescend my peace offer."),
			markForTranslation("%(_player_)s, as you have failed to respond to my request for peace between us, there will be no peace!")
		]
	}
};

GORO.emergencyMessages = {
	"enter": [
		markForTranslation("Brother, my armies have fallen while defending my country. Please honor our alliance and send help!"),
		markForTranslation("My people depend on our alliance Brother, please help them!"),
		markForTranslation("My armies have fallen Brother. Please, help me by sending some troops to drive the enemy away!"),
		markForTranslation("I need your help. Please do not let my armies fall Brother!")
	],
	"exit": [
		markForTranslation("Brother, my empire has regained it's old strength, now it is time to seek revenge together!"),
		markForTranslation("My empire has risen from the volcanic ashes. Now my Gorons are eager to fight for our alliance.")
	]
};

GORO.chatLaunchAttack = function(gameState, player, type)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.launchAttackMessages[type === GORO.AttackPlan.TYPE_HUGE_ATTACK ? "hugeAttack" : "other"]),
		"translateMessage": true,
		"translateParameters": ["_player_"],
		"parameters": { "_player_": player }
	});
};

GORO.chatAnswerRequestAttack = function(gameState, player, answer, other)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.answerRequestAttackMessages[answer]),
		"translateMessage": true,
		"translateParameters": answer != "other" ? ["_player_"] : ["_player_", "_player_2"],
		"parameters": answer != "other" ? { "_player_": player } : { "_player_": player, "_player_2": other }
	});
};

GORO.chatSentTribute = function(gameState, player)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.sentTributeMessages),
		"translateMessage": true,
		"translateParameters": ["_player_"],
		"parameters": { "_player_": player }
	});
};

GORO.chatRequestTribute = function(gameState, resource)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.requestTributeMessages),
		"translateMessage": true,
		"translateParameters": { "resource": "withinSentence" },
		"parameters": { "resource": Resources.GetNames()[resource] }
	});
};

GORO.chatNewTradeRoute = function(gameState, player)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.newTradeRouteMessages),
		"translateMessage": true,
		"translateParameters": ["_player_"],
		"parameters": { "_player_": player }
	});
};

GORO.chatNewPhase = function(gameState, phase, status)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.newPhaseMessages[status]),
		"translateMessage": true,
		"translateParameters": ["phase"],
		"parameters": { "phase": phase }
	});
};

GORO.chatNewDiplomacy = function(gameState, player, newDiplomaticStance)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": pickRandom(this.newDiplomacyMessages[newDiplomaticStance]),
		"translateMessage": true,
		"translateParameters": ["_player_"],
		"parameters": { "_player_": player }
	});
};

GORO.chatAnswerRequestDiplomacy = function(gameState, player, requestType, response, requiredTribute)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/msg " + gameState.sharedScript.playersData[player].name + " " +
			pickRandom(this.answerDiplomacyRequestMessages[requestType][response]),
		"translateMessage": true,
		"translateParameters": requiredTribute ? { "_amount_": null, "_resource_": "withinSentence", "_player_": null } : ["_player_"],
		"parameters": requiredTribute ?
			{ "_amount_": requiredTribute.wanted, "_resource_": Resources.GetNames()[requiredTribute.type], "_player_": player } :
			{ "_player_": player }
	});
};

GORO.chatNewRequestDiplomacy = function(gameState, player, requestType, status)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/msg " + gameState.sharedScript.playersData[player].name + " " +
			pickRandom(this.sendDiplomacyRequestMessages[requestType][status]),
		"translateMessage": true,
		"translateParameters": ["_player_"],
		"parameters": { "_player_": player }
	});
};

GORO.chatEmergency = function(gameState, enable)
{
	Engine.PostCommand(PlayerID, {
		"type": "aichat",
		"message": "/allies " + pickRandom(this.emergencyMessages[enable ? "enter" : "exit"]),
		"translateMessage": true
	});
};
