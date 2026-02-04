Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander!"),
	},
	{
		"instructions": markForTranslation("Labrynna has managed to take Eagle Pass, the main passage through our northern mountains."),
	},
	{
		"instructions": markForTranslation("Over the past few days, they have pushed farther into our lands, taking many small villages and settlements."),
	},
	{
		"instructions": markForTranslation("King Kazaak has sent messengers to the Lanayru and Gorons, as well as the Kokiri. All of them are mustering armies to help us, but they will not arrive for another few days."),
	},
	{
		"instructions": markForTranslation("We need to keep the Labrynnian army from advancing any farther, until they are ready, at which point we will fall back to a battle line which is being prepared."),
	},
	{
		"instructions": markForTranslation("Labrynna will send many raids and armies against us, until they can overwhelm us. We need to destroy their forward camp, giving us some breathing room."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Yes, success! We have destroyed their headquarters. Now our allies will have some time to finish the defenses and gather their armies for the massive battle which is now at hand..."),
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
			pickRandom(["B"]),pickRandom(infIntrudersB), 12, 0);

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
		cmd.allowCapture = false;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};

Trigger.prototype.AttackII = function()
{
	let infIntrudersC = ["units/labrynna/infantry_swordsman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersC), 12, 0);

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
		cmd.allowCapture = false;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};

Trigger.prototype.AttackIII = function()
{
	let infIntrudersC = ["units/labrynna/labrynna_poacher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersC), 10, 0);

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
		cmd.allowCapture = false;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};

Trigger.prototype.AttackIIII = function()
{
	let infIntrudersC = ["units/labrynna/labrynna_cannon_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersC), 2, 0);

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
		cmd.allowCapture = false;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};

Trigger.prototype.AttackIIIII = function()
{
	let infIntrudersC = ["units/labrynna/labrynna_steamtank_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersC), 1, 0);

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
		cmd.allowCapture = false;
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
cmpTrigger.DoAfterDelay(150000, "AttackII", {});
cmpTrigger.DoAfterDelay(450000, "AttackI", {});
cmpTrigger.DoAfterDelay(450000, "AttackII", {});
cmpTrigger.DoAfterDelay(450000, "AttackIII", {});
cmpTrigger.DoAfterDelay(1000000, "AttackI", {});
cmpTrigger.DoAfterDelay(1000000, "AttackII", {});
cmpTrigger.DoAfterDelay(1000000, "AttackIII", {});
cmpTrigger.DoAfterDelay(1000000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(1500000, "AttackI", {});
cmpTrigger.DoAfterDelay(1500000, "AttackII", {});
cmpTrigger.DoAfterDelay(1500000, "AttackIII", {});
cmpTrigger.DoAfterDelay(1500000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(2000000, "AttackI", {});
cmpTrigger.DoAfterDelay(2000000, "AttackII", {});
cmpTrigger.DoAfterDelay(2000000, "AttackIII", {});
cmpTrigger.DoAfterDelay(2000000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(2000000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(2500000, "AttackI", {});
cmpTrigger.DoAfterDelay(2500000, "AttackII", {});
cmpTrigger.DoAfterDelay(2500000, "AttackIII", {});
cmpTrigger.DoAfterDelay(2500000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(2500000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(3000000, "AttackI", {});
cmpTrigger.DoAfterDelay(3000000, "AttackII", {});
cmpTrigger.DoAfterDelay(3000000, "AttackIII", {});
cmpTrigger.DoAfterDelay(3000000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(3000000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(3500000, "AttackI", {});
cmpTrigger.DoAfterDelay(3500000, "AttackII", {});
cmpTrigger.DoAfterDelay(3500000, "AttackIII", {});
cmpTrigger.DoAfterDelay(3500000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(3500000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(4000000, "AttackI", {});
cmpTrigger.DoAfterDelay(4000000, "AttackII", {});
cmpTrigger.DoAfterDelay(4000000, "AttackIII", {});
cmpTrigger.DoAfterDelay(4000000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(4000000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(5000000, "AttackI", {});
cmpTrigger.DoAfterDelay(5000000, "AttackII", {});
cmpTrigger.DoAfterDelay(5000000, "AttackIII", {});
cmpTrigger.DoAfterDelay(5000000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(5000000, "AttackIIIII", {});
