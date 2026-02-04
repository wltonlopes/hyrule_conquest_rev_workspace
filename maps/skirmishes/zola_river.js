Trigger.prototype.AttackI = function()
{
	let infIntrudersB = ["units/zola/support_female_citizen"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 15, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("C"))
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
	let infIntrudersB = ["units/zola/support_female_citizen"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 15, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("D"))
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
cmpTrigger.DoAfterDelay(100000, "AttackI", {});
cmpTrigger.DoAfterDelay(200000, "AttackI", {});
cmpTrigger.DoAfterDelay(300000, "AttackI", {});
cmpTrigger.DoAfterDelay(400000, "AttackI", {});
cmpTrigger.DoAfterDelay(500000, "AttackI", {});
cmpTrigger.DoAfterDelay(600000, "AttackI", {});
cmpTrigger.DoAfterDelay(700000, "AttackI", {});
cmpTrigger.DoAfterDelay(800000, "AttackI", {});
cmpTrigger.DoAfterDelay(900000, "AttackI", {});
cmpTrigger.DoAfterDelay(1000000, "AttackI", {});
cmpTrigger.DoAfterDelay(1100000, "AttackI", {});
cmpTrigger.DoAfterDelay(1200000, "AttackI", {});
cmpTrigger.DoAfterDelay(1300000, "AttackI", {});
cmpTrigger.DoAfterDelay(1400000, "AttackI", {});
cmpTrigger.DoAfterDelay(1500000, "AttackI", {});
cmpTrigger.DoAfterDelay(1600000, "AttackI", {});
cmpTrigger.DoAfterDelay(1700000, "AttackI", {});
cmpTrigger.DoAfterDelay(1800000, "AttackI", {});
cmpTrigger.DoAfterDelay(1900000, "AttackI", {});
cmpTrigger.DoAfterDelay(2000000, "AttackI", {});
cmpTrigger.DoAfterDelay(100000, "AttackII", {});
cmpTrigger.DoAfterDelay(200000, "AttackII", {});
cmpTrigger.DoAfterDelay(300000, "AttackII", {});
cmpTrigger.DoAfterDelay(400000, "AttackII", {});
cmpTrigger.DoAfterDelay(500000, "AttackII", {});
cmpTrigger.DoAfterDelay(600000, "AttackII", {});
cmpTrigger.DoAfterDelay(700000, "AttackII", {});
cmpTrigger.DoAfterDelay(800000, "AttackII", {});
cmpTrigger.DoAfterDelay(900000, "AttackII", {});
cmpTrigger.DoAfterDelay(1000000, "AttackII", {});
cmpTrigger.DoAfterDelay(1100000, "AttackII", {});
cmpTrigger.DoAfterDelay(1200000, "AttackII", {});
cmpTrigger.DoAfterDelay(1300000, "AttackII", {});
cmpTrigger.DoAfterDelay(1400000, "AttackII", {});
cmpTrigger.DoAfterDelay(1500000, "AttackII", {});
cmpTrigger.DoAfterDelay(1600000, "AttackII", {});
cmpTrigger.DoAfterDelay(1700000, "AttackII", {});
cmpTrigger.DoAfterDelay(1800000, "AttackII", {});
cmpTrigger.DoAfterDelay(1900000, "AttackII", {});
cmpTrigger.DoAfterDelay(2000000, "AttackII", {});
