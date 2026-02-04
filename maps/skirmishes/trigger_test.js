{   
    var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
    // manual list of ids that need to be turreted by the AI at the start
    cmpTrigger.turretObjects = [
        { ent: 624, amount: 9 }
    ];
    cmpTrigger.garrisonObjects = [
        { ent: 624, amount: 20 }
    ];
}

Trigger.prototype.Test = function (data)
{
    for (let data of this.turretObjects)
    {
        TriggerHelper.SpawnTurretedUnits(data.ent, "units/hylian/infantry_archer_b", data.amount, 1); // spawn archers inside all towers and buildings that require it
    };
    for (let data of this.garrisonObjects)
    {
        TriggerHelper.SpawnGarrisonedUnits(data.ent, "units/hylian/infantry_spearman_b", data.amount, 1); // spawn spearman inside all towers and buildings that require it
    }
}

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
cmpTrigger.DoAfterDelay(1000, "Test", {});
cmpTrigger.DoAfterDelay(150000, "AttackI", {});
cmpTrigger.DoAfterDelay(450000, "AttackII", {});
cmpTrigger.DoAfterDelay(750000, "AttackI", {});
cmpTrigger.DoAfterDelay(1050000, "AttackII", {});
