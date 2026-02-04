Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander!"),
	},
	{
		"instructions": markForTranslation("Now that we control a pass into Hyrule, General Onox has ordered us to take Eagle Pass, a heavily fortified outpost in high the mountains. It serves as the main entrance to Hyrule through their northern mountains"),
	},
	{
		"instructions": markForTranslation("Using the newly captured pass, General Onox has moved a force of our soldiers, lead by Captain Edgar, behind the enemy."),
	},
	{
		"instructions": markForTranslation("They will attack from behind, will you lead the main force against the gates. The General wants all of their soldiers and their civic centers destroyed, but we can leave the other defenses."),
	},
	{
		"instructions": markForTranslation("We can expect some reinforcements, though not immediantly. We will have to start the attack on our own."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("That's one down. Two more to go!"),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("There goes another. One more left."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("That's all of them. Now to mop up."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(1, () => "Mission Completed", () => "");
		}
	}
];

Trigger.prototype.WarningMessage = function(warning)
{
	let cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	cmpGUIInterface.PushNotification({
		"type": "tutorial",
		"players": [1],
		"warning": warning
	});
};

Trigger.prototype.AttackI = function()
{
	let infIntrudersB = ["units/labrynna/infantry_spearman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 20, 2);

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
	let infIntrudersC = ["units/labrynna/labrynna_lynnapike_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersC), 10, 2);

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
	let infIntrudersD = ["units/labrynna/labrynna_hero_edgar"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["D"]),pickRandom(infIntrudersD), 1, 2);

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
	let infIntrudersE = ["units/labrynna/infantry_maceman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersE), 20, 2);

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
	let infIntrudersF = ["units/labrynna/labrynna_poacher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersF), 10, 2);

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
		cmd.targetClasses = { "attack": ["Tower", "Unit"] };
		cmd.allowCapture = false;
		cmd.queued = true;
		ProcessCommand(0, cmd);
	}
};
Trigger.prototype.ReinforcementsI = function()
{
	let infIntrudersC = ["units/labrynna/infantry_maceman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersC), 15, 1);
	this.WarningMessage(markForTranslation("Reinforcements have arrived! To battle, we will win this!!!."));
	return;
};

Trigger.prototype.ReinforcementsII = function()
{
	let infIntrudersC = ["units/labrynna/infantry_spearman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersC), 30, 1);
};

Trigger.prototype.ReinforcementsIII = function()
{
	let infIntrudersC = ["units/labrynna/labrynna_poacher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersC), 10, 1);
};

var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
cmpTrigger.state = "start";
cmpTrigger.playerID = 1;
cmpTrigger.enemyID = 3;
cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
cmpTrigger.DoAfterDelay(10000, "AttackI", {});
cmpTrigger.DoAfterDelay(10000, "AttackII", {});
cmpTrigger.DoAfterDelay(10000, "AttackIII", {});
cmpTrigger.DoAfterDelay(10000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(10000, "AttackIIIII", {});

cmpTrigger.DoAfterDelay(100000, "AttackI", {});
cmpTrigger.DoAfterDelay(100000, "AttackII", {});
cmpTrigger.DoAfterDelay(100000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(100000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(100000, "ReinforcementsI", {});
cmpTrigger.DoAfterDelay(100000, "ReinforcementsII", {});
cmpTrigger.DoAfterDelay(100000, "ReinforcementsIII", {});
