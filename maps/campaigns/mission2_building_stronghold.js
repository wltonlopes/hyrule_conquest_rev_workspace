Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander!"),
	},
	{
		"instructions": markForTranslation("With the recent sightings, and our disposal of, Labrynnian scouts, the King has reason to believe that Queen Ambi plans to invade Hyrule."),
	},
	{
		"instructions": markForTranslation("Captain Krin wants us to build a stronghold here, to help deter further scouts and future raids."),
	},
	{
		"instructions": markForTranslation("But be warned, Labrynna may send a raiding party to try to stop us."),
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_town_generic")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Ahh, good, our outpost is growing. Keep up the good work."),
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_city_generic")
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Perfect. Our settlement is much too large for Labrynna to dare attack without an entire army, and such an action would be a full-on declaration of war..."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(1, () => "Mission Completed", () => "");
		}
	}
];

	Trigger.prototype.AttackI = function()
{
	let infIntrudersB = ["units/labrynna/infantry_maceman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 10, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("A"))
		{
			if (TriggerHelper.GetOwner(target) != playerID)
				continue;
			var cmpPosition = Engine.QueryInterface(target, IID_Position);
			if (!cmpPosition || !cmpPosition.IsInWorld)
				continue;
			// store the x and z coordinates in the command
			cmd = cmpPosition.GetPosition();
			break;
		}
		if (!cmd)
			continue;
		cmd.type = "attack-walk";
		cmd.entities = intruders[origin];
		cmd.targetClasses = { "attack": ["Unit", "Structure"] };
		cmd.allowCapture = true;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};

Trigger.prototype.AttackII = function()
{
	let infIntrudersC = ["units/labrynna/infantry_swordsman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersC), 15, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("A"))
		{
			if (TriggerHelper.GetOwner(target) != playerID)
				continue;
			var cmpPosition = Engine.QueryInterface(target, IID_Position);
			if (!cmpPosition || !cmpPosition.IsInWorld)
				continue;
			// store the x and z coordinates in the command
			cmd = cmpPosition.GetPosition();
			break;
		}
		if (!cmd)
			continue;
		cmd.type = "attack-walk";
		cmd.entities = intruders[origin];
		cmd.targetClasses = { "attack": ["Unit", "Structure"] };
		cmd.allowCapture = true;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};


var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
cmpTrigger.state = "start";
cmpTrigger.playerID = 1;
cmpTrigger.enemyID = 2;
cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
cmpTrigger.DoAfterDelay(150000, "AttackI", {});
cmpTrigger.DoAfterDelay(450000, "AttackII", {});
cmpTrigger.DoAfterDelay(750000, "AttackI", {});
cmpTrigger.DoAfterDelay(1050000, "AttackII", {});
