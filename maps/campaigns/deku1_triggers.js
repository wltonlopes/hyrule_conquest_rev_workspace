Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Hello Commander! Welcome to our Outpost. We'll get right into the brifing."),
	},
	{
		"instructions": markForTranslation("Recently, a group of Scrubs have rebeled against King Kah-Doh-Kan. They burned several villages and have been harrasing the other races, giving us a bad name!"),
	},
	{
		"instructions": markForTranslation("The King has ordered us to rebuild one of the towns that they destroyed. We have managed to gather some of the surviving villagers to help, but we should get more soon."),
	},
	{
		"instructions": markForTranslation("Order some Underlings to chop down trees those trees in the bottom right corner, near the river. We're going to need a lot of wood, both to feed our armies and to build buildings and increase our holdings here."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && msg.cmd.target &&
			    TriggerHelper.GetResourceType(msg.cmd.target).specific == "tree")
				this.NextGoal();
		}
	},
	{
		"instructions": [
			{
				"text": markForTranslation("We're going to need more soldiers to accomplish this mission. Train a batch of Guardlings."),
			}
		],
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/infantry_spearman_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
		this.trainingDone = true;
		this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Our job is to rebuild the town, so order those Guardlings to build a block of Deku Apartments nearby. Make sure it is as close to the civic center as possible, to take up little space."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "House"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("To build an army, we must be able to feed them. Order those Guardlings to build us a Nut Farm. These nuts will be our main source of food from here on out."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Field"))
				this.NextGoal();
		}
	},
	{
		"instructions": [
			{
				"text": markForTranslation("Train a batch of Scrublings. They will provide ranged support for our troops in case of a raid."),
				"hotkey": "session.batchtrain"
			}
		],
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/infantry_archer_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
		this.trainingDone = true;
		this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("It won't be long before the enemy gets word of our presence. Build a Lookout Post at the border next to the road. Once it's built, turret four Scrublings in it."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Tower"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("There's not much space in this forest. Order all of your troops to chop down the trees to the northeast, making us room for more buildings."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && msg.cmd.target &&
			    TriggerHelper.GetResourceType(msg.cmd.target).specific == "tree")
				this.NextGoal();
		}
	},
	{
		"instructions": [
			{
				"text": markForTranslation("Those rebels could attack at any time. Train another batch of Guardlings"),
				"hotkey": "session.batchtrain"
			}
		],
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/infantry_spearman_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
		this.trainingDone = true;
		this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("As soon as there is space, build a second block of Deku Apartments."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "House"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Build two more Lookout Posts in places with only a little bit of space."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Tower"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Select the Civic Center and advance to Town Phase. We're well on our way to victory!"),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "phase_town");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "CivilCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Order your troops to chop down all of the trees to the northeast (if they haven't already)."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && msg.cmd.target &&
			    TriggerHelper.GetResourceType(msg.cmd.target).specific == "tree")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Start training a batch of Underlings in the Civic Center and set its rally point to the Nut Farm."),
		"Init": function()
		{
			this.rallyPointSet = false;
			this.trainingStarted = false;
		},
		"IsDone": function()
		{
			return this.rallyPointSet && this.trainingStarted;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/support_female_citizen" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
			this.trainingStarted = true;
			if (this.IsDone())
				this.NextGoal();
		},
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type != "set-rallypoint" || !msg.cmd.data ||
			   !msg.cmd.data.command || msg.cmd.data.command != "gather" ||
			   !msg.cmd.data.resourceType || msg.cmd.data.resourceType.specific != "tree")
				return;
			this.rallyPointSet = true;
			if (this.IsDone())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Our scouts report that the rebels have located us and are preparing an attack. Ready the men as you see fit."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Tower"))
				this.NextGoal();
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/infantry_spearman_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
			this.LaunchAttack();
			this.NextGoal();
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/infantry_archer_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
			this.LaunchAttack();
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Build a Beetle Barn so we can begin launching small raids against the rebels."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Stable"))
				this.NextGoal();
		}
	},
	{
		"instructions": [
			{
				"text": markForTranslation("Commander, we managed to capture some Orhat Beetles. Order our handlers in the Beetle Barn to train them for battle."),
			}
		],
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/deku/deku_orhat_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
		this.trainingDone = true;
		this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Orhat Beetles are much faster than regular troops, plus their horned heads and tough shells make for strong assaut troops."),
	},
	{
		"instructions": markForTranslation("Order some Scrublings to turret the Beetles. They'll provide excellent raiding troops for this mission."),
	},
	{
		"instructions": markForTranslation("Train as many Scrublings and Guardlings as we can, then order them to group into one formation on the road."),
	},
	{
		"instructions": markForTranslation("Order the Orhat Beetles and their riders to begin probing for the enemy's location. Once they find it, train some more Orhat Beetles, and launch an assault on the enemy. Try to destroy the enemy base, but beware losing too many soldiers."),
		"OnOwnershipChanged": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "Beetle"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We've lost an Orhat Beetle and some troops, but cost them troops too. Order the retreat before we lose too many soldiers."),
	},
	{
		"instructions": markForTranslation("Build a Deku Mart so you can trade for needed resources"),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Market"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Our scouts report a force of soldiers are headed our way. Prepare for battle."),
		"OnResearchFinished": function(msg)
		{
			this.LaunchAttack();
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("They have arrived! Time for battle!"),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We've beaten back the rebels."),
	},
	{
		"instructions": markForTranslation("Build a Nut Carver's workshop so we can upgrade the troops."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Forge"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Order our nut carvers to research Sharpnuts, to increase th damage done by our Scrublings."),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "soldier_attack_melee_01");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "Forge"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once you meet the City Phase requirements, select your Civic Center and advance to City Phase."),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "phase_city_generic");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "CivilCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("While waiting for the phase change, you may train more soldiers at the Barracks."),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "phase_city_generic");
		},
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_city_generic")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Now that you are in City Phase, build the Arsenal nearby and then use it to construct 2 Battering Rams."),
		"Init": function()
		{
			this.ramCount = 0;
		},
		"IsDone": function()
		{
			return this.ramCount > 1;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate == "units/deku/deku_orhatgiant_b")
				this.ramCount += msg.count;
			if (this.IsDone())
			{
				this.RemoveChampions();
				this.NextGoal();
			}
		}
	},
	{
		"instructions": [
			markForTranslation("Stop all your soldiers gathering resources and instead task small groups to find the enemy Civic Center on the map. Once the enemy's base has been spotted, send your Siege Engines and all remaining soldiers to destroy it.\n"),
			markForTranslation("Female Citizens should continue to gather resources.")
		],
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivilCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The enemy has been defeated. These tutorial tasks are now completed."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(1, () => "Tutorial completed", () => "");
		}
	}
];

Trigger.prototype.LaunchAttack = function()
{
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	let entities = cmpRangeManager.GetEntitiesByPlayer(this.playerID);
	let target =
		entities.find(e => {
			let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
			return cmpIdentity && cmpIdentity.HasClass("Tower") && Engine.QueryInterface(e, IID_Position);
		}) ||
		entities.find(e => {
			let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
			return cmpIdentity && cmpIdentity.HasClass("CivilCentre") && Engine.QueryInterface(e, IID_Position);
		});

	let position = Engine.QueryInterface(target, IID_Position).GetPosition2D();

	this.attackers = cmpRangeManager.GetEntitiesByPlayer(this.enemyID).filter(e => {
		let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
		return Engine.QueryInterface(e, IID_UnitAI) && cmpIdentity && cmpIdentity.HasClass("CitizenSoldier");
	});

	ProcessCommand(this.enemyID, {
		"type": "attack-walk",
		"entities": this.attackers,
		"x": position.x,
		"z": position.y,
		"targetClasses": { "attack": ["Unit"] },
		"allowCapture": false,
		"queued": false
	});
};

Trigger.prototype.IsAttackRepelled = function()
{
	return !this.attackers.some(e => Engine.QueryInterface(e, IID_Health) && Engine.QueryInterface(e, IID_Health).GetHitpoints() > 0);
};

Trigger.prototype.RemoveChampions = function()
{
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	let champions = cmpRangeManager.GetEntitiesByPlayer(this.enemyID).filter(e => Engine.QueryInterface(e, IID_Identity).HasClass("Champion"));
	let keep = 6;
	for (let ent of champions)
	{
		let cmpHealth = Engine.QueryInterface(ent, IID_Health);
		if (!cmpHealth)
			Engine.DestroyEntity(ent);
		else if (--keep < 0)
			cmpHealth.Kill();
	}
};

{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.playerID = 1;
	cmpTrigger.enemyID = 2;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}
