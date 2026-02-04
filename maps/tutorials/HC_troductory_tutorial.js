Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome to the Hyrule Conquest: Revival tutorial."),
	},
	{
		"instructions": markForTranslation("Left-click on a Citizen and then right-click on a berry bush to make that Citizen gather food. Citizens gather vegetables faster than other units."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && msg.cmd.target &&
			    TriggerHelper.GetResourceType(msg.cmd.target).specific == "fruit")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Select the Levy Archer, right-click on a tree near the Village Hall to begin gathering wood. Soldiers gather wood faster than Citizens."),
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
				"text": markForTranslation("Select the Village Hall building and hold %(hotkey)s while clicking on the Levy Spearman icon once to begin training a batch of Levy Spearmen."),
				"hotkey": "session.batchtrain"
			}
		],
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/hylian/infantry_spearman_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				let txt = +msg.count == 1 ?
					markForTranslation("Do not forget to press the batch training hotkey while clicking to produce multiple units.") :
					markForTranslation("Click on the Levy Spearman icon.");
				this.WarningMessage(txt);
				return;
			}
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Select the two idle Citizens and build a Kingdom Housing nearby by selecting the Kingdom Housing icon. Place the Kingdom Housing by left-clicking on a piece of land."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "House"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("When they are ready, select the newly trained Levy Spearmen and assign them to build a Storehouse beside some nearby trees. They will begin to gather wood when it's constructed."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Storehouse"))
				this.NextGoal();
		}
	},
	{
		"instructions": [
			{
				"text": markForTranslation("Train a batch of Levy Archers by holding %(hotkey)s and clicking on the Levy Archer icon in the Village Hall."),
				"hotkey": "session.batchtrain"
			}
		],
		"Init": function()
		{
			this.trainingDone = false;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/hylian/infantry_archer_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				let txt = +msg.count == 1 ?
					markForTranslation("Do not forget to press the batch training hotkey while clicking to produce multiple units.") :
					markForTranslation("Click on the Levy Archer icon.");
				this.WarningMessage(txt);
				return;
			}
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Build a Urban Farm in an open space beside the Village Hall using any idle builders."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Farmstead"))
				this.NextGoal();
		},
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		}
	},
	{
		"instructions": markForTranslation("Let's wait for the Urban Farm to be built."),
		"OnTrainingFinished": function(msg)
		{
			this.trainingDone = true;
		},
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Farmstead"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The Urban Farm's builders will now automatically begin gathering food from the Urban Farm. Using the newly created group of archers, get them to build another Kingdom Housing nearby."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "House"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Train a batch of Levy Spearmen at the Village Hall. Select the Village Hall and with it selected right-click on a tree nearby. Units from the Village Hall will now automatically gather wood."),
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
			if (msg.unitTemplate != "units/hylian/infantry_spearman_b" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				let txt = +msg.count == 1 ?
					markForTranslation("Do not forget to press the batch training hotkey while clicking to produce multiple units.") :
					markForTranslation("Click on the Levy Spearman icon.");
				this.WarningMessage(txt);
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
			{
				this.WarningMessage(markForTranslation("Select the Village Hall, then hover the cursor over the tree and right-click when you see your cursor change into a wood icon."));
				return;
			}
			this.rallyPointSet = true;
			if (this.IsDone())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Build a Kingdom Barracks nearby. Whenever your population limit is reached, build an extra Kingdom Housing using any available builder units. This will be the fifth Village Phase structure that you have built, allowing you to advance to the Town Phase."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Barracks"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Select the Village Hall again and advance to Town Phase by clicking on the II icon (you have to wait for the barracks to be built first). This will allow Town Phase buildings to be constructed."),
		"IsDone": function()
		{
			return TriggerHelper.HasDealtWithTech(this.playerID, "phase_town_generic");
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "CivilCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("While waiting for the phasing up, you may reassign your idle workers to gathering the resources you are short of."),
		"IsDone": function()
		{
			let cmpPlayerManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_PlayerManager);
			let playerEnt = cmpPlayerManager.GetPlayerByID(this.playerID);
			let cmpTechnologyManager = Engine.QueryInterface(playerEnt, IID_TechnologyManager);
			return cmpTechnologyManager && cmpTechnologyManager.IsTechnologyResearched("phase_town_generic");
		},
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_town_generic")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Order the idle Levy Archers to build a Watch Tower to the north east at the edge of your territory."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Tower"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Start training a batch of Citizens in the Village Hall and set its rally point to the Urban Farm (right click on it)."),
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
			if (msg.unitTemplate != "units/hylian/support_female_citizen" || +msg.count == 1)
			{
				let cmpProductionQueue = Engine.QueryInterface(msg.trainerEntity, IID_ProductionQueue);
				cmpProductionQueue.ResetQueue();
				let txt = +msg.count == 1 ?
					markForTranslation("Do not forget to press the batch training hotkey while clicking to produce multiple units.") :
					markForTranslation("Click on the Citizen icon.");
				this.WarningMessage(txt);
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
			   !msg.cmd.data.resourceType || msg.cmd.data.resourceType.specific != "grain")
				return;
			this.rallyPointSet = true;
			if (this.IsDone())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Prepare for an attack by an enemy player. Train more soldiers using the Kingdom Barracks, and get idle soldiers to build a Kingdom Guard Tower near your Watch Tower."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Tower"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Build a Blacksmith and research the Infantry Training technology (sword icon) to improve infantry hack attack."),
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "Forge"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The enemy is coming. Train more soldiers to fight off the enemies."),
		"OnResearchFinished": function(msg)
		{
			this.LaunchAttack();
			this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Try to repel the attack."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The enemy attack has been thwarted. Now build a Kingdom Market Plaza and a Hospital while you assign new units to gather required resources."),
		"Init": function()
		{
			this.marketStarted = false;
			this.templeStarted = false;
		},
		"IsDone": function()
		{
			return this.marketStarted && this.templeStarted;
		},
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type != "repair")
				return;
			this.marketStarted = this.marketStarted || TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Market");
			this.templeStarted = this.templeStarted || TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Temple");
			if (this.IsDone())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once you meet the City Phase requirements, select your Village Hall and advance to City Phase."),
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
		"instructions": markForTranslation("While waiting for the phase change, you may train more soldiers at the Kingdom Barracks."),
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
		"instructions": markForTranslation("Now that you are in City Phase, build a Siegeworks nearby and then use it to construct 2 Siege Rams."),
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
			if (msg.unitTemplate == "units/hylian/hylian_siegeram_b")
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
			markForTranslation("Stop all your soldiers gathering resources and instead task small groups to find the enemy Village Hall on the map. Once the enemy's base has been spotted, send your Siege Rams and all remaining soldiers to destroy it.\n"),
			markForTranslation("Citizens should continue to gather resources.")
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
