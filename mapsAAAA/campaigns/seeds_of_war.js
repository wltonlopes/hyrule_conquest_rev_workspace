Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Hello Commander! Welcome to our Outpost. We'll get right into the briefing."),
	},
	{
		"instructions": markForTranslation("Recently, a group of Scrubs have rebeled against King Kah-Doh-Kan. They burned several villages and have been harrasing the other races, giving us a bad name!"),
	},
	{
		"instructions": markForTranslation("The King has ordered us to rebuild one of the towns that they destroyed. Several Underlings survived the latest attack, but they are scattered throughout the area."),
	},
	{
		"instructions": markForTranslation("Select the scattered Underlings and order them to move to the camp."),
	},
	{
		"instructions": markForTranslation("When they arrive at your base, order them to build a house."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "House"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once the house is built, order the all of your soldiers and workers to chop the nearest trees."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && msg.cmd.target &&
			    TriggerHelper.GetResourceType(msg.cmd.target).specific == "tree")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We will need more workers in order to rebuild the town. Train a batch of Underlings."),
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
		"instructions": markForTranslation("Order all five of your new Underlings to build a nut farm next to the civic centre."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Field"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Train a batch of Scrublings. They will provide ranged support for our troops in case of a raid."),
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
		"instructions": markForTranslation("It won't be long before the rebels get word of our presence. Build a Lookout Post at the border. Once it's built, turret four Scrublings in it."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Tower"))
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("It is starting to get a little cramped, we should build another house."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "House"))
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("It is time to prepare for battle. Build a barracks to train troops faster."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Barracks"))
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once the barracks is done, train some Guardlings."),
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
		"instructions": markForTranslation("Build two more Lookout Posts along the border."),
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
			return TriggerHelper.HasDealtWithTech(this.playerID, "deku/phase_town");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "CivilCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Train another batch of Guardlings."),
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
		"instructions": markForTranslation("Build a Beetle Barn."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Stable"))
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Commander, we managed to capture some Orhat Beetles! Order our handlers in the Beetle Barn to train them for battle."),
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
		"instructions": markForTranslation("Orhat Beetles are much faster than regular troops, plus their horned heads and tough shells make for strong assault troops."),
	},
	{
		"instructions": markForTranslation("Order some Scrublings to turret the Beetles. They'll provide excellent raiding troops for this mission."),
	},
	{
		"instructions": markForTranslation("Train as many Scrublings and Guardlings as we can, then order them to group into one formation on the road."),
	},
	{
		"instructions": markForTranslation("Order the Orhat Beetles and their riders to begin probing for the enemy's location. Once they find it, train some more Guardlings and Scrublings and launch an assault on the enemy. Try to kill some of their workers and any lone soldiers, but beware losing too many troops."),
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
	},
	{
		"instructions": markForTranslation("Our scouts report a force of soldiers are headed our way. Prepare for battle."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Market"))
				this.LaunchAttack();
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Defend against the rebel scum!"),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We've beaten back the rebels, but we've suffered losses. Train a batch of Guardlings to help replace them."),
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
		"instructions": markForTranslation("Build a Nut Carver's workshop so we can upgrade the troops."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Forge"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Order our nut carvers to research Sharpnuts, to increase the damage done by our Scrublings."),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "deku/attack_sharpnuts");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "Forge"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once you meet the City Phase requirements, advance to City Phase."),
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
		"instructions": markForTranslation("We should train some more Scrublings or Guardlings while we wait for our influence to grow."),
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
		"instructions": markForTranslation("Now that we are in City Phase, build a Loggery nearby and then use it to construct a Scrub Ram."),
		"Init": function()
		{
			this.ramCount = 0;
		},
		"IsDone": function()
		{
			return this.ramCount = 1;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate == "units/deku/deku_scrubram")
				this.ramCount += msg.count;
			if (this.IsDone())
			{
				this.NextGoal();
			}
		}
	},
	{
		"instructions": [
			markForTranslation("Finally, we are ready to drive the rebels from this area! Gather our troops and launch an attack on those traitors!.")
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
		"instructions": markForTranslation("Victory! All of the rebels have been slain, and we have rebuilt the town. King Kud-Loh-Kan will be pleased with your success."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(1, () => "Seeds of War completed", () => "");
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

{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.playerID = 1;
	cmpTrigger.enemyID = 2;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}
