
var defendTime = () => randFloat(4, 4);//4minutes long

Trigger.prototype.Timer = function()// Code that creates a timer
{
	if (this.state != "start")
		return;

	    let time = defendTime() * 60 * 1000;
	    Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface).AddTimeNotification({
	        "message": markForTranslation("We must survive for %(time)s more minutes!"),
	        "translateMessage": true
	    }, time);
		 this.DoAfterDelay(time, "Victory", {});
};

Trigger.prototype.Victory = function(playerID)//Makes Player 1 win.
{
	TriggerHelper.SetPlayerWon(
		1,
		n => markForPluralTranslation(
			"%(lastPlayer)s has won.).",
			"%(players)s and %(lastPlayer)s have won.",
			n),
		n => markForPluralTranslation(
			"%(lastPlayer)s has been defeated.",
			"%(players)s and %(lastPlayer)s have been defeated.",
			n));
};


Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("We don't have much time, so I'll make this brief."),
	},
	{
		"instructions": markForTranslation("The invasion was a failure. Our army was massacred. We are the only survivors."),
	},
	{
		"instructions": markForTranslation("General Onox has retreated to Eagle Pass. Captain Edgar has ordered us to cover the withdrawal of the rest of the survivors, until they can make it to Eagle Pass."),
	},
	{
		"instructions": markForTranslation("The Hylians are minutes behind us. We need to hold out until the others make it out safely. We also can't let our transport be destroyed, or we will be trapped."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.playerID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "Transport"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Damn, our transport has been destroyed. We can't escape. It was nice serving with you commander..."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(2, () => "Mission Failed", () => "");
		}
	}
];

Trigger.prototype.AttackI = function()
{
	let infIntrudersB = ["units/hylian/cavalry_maceman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 8, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("B"))
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
	let infIntrudersC = ["units/hylian/infantry_spearman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersC), 8, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("B"))
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
	let infIntrudersC = ["units/hylian/hylian_redlion_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersC), 1, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("B"))
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
	let infIntrudersC = ["units/hylian/infantry_archer_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersC), 6, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("B"))
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
	let infIntrudersC = ["units/hylian/hylian_captain_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersC), 1, 0);

	for (var origin in intruders)
	{
		var playerID = TriggerHelper.GetOwner(+origin);
		var cmd = null;
		for (var target of this.GetTriggerPoints("B"))
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
cmpTrigger.DoAfterDelay(1, "Timer", {});
cmpTrigger.DoAfterDelay(8000, "AttackI", {});
cmpTrigger.DoAfterDelay(8000, "AttackIII", {});
cmpTrigger.DoAfterDelay(50000, "AttackII", {});
cmpTrigger.DoAfterDelay(50000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(50000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(100000, "AttackI", {});
cmpTrigger.DoAfterDelay(100000, "AttackIII", {});
cmpTrigger.DoAfterDelay(100000, "AttackII", {});
cmpTrigger.DoAfterDelay(100000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(100000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(150000, "AttackI", {});
cmpTrigger.DoAfterDelay(150000, "AttackIII", {});
cmpTrigger.DoAfterDelay(150000, "AttackII", {});
cmpTrigger.DoAfterDelay(150000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(150000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackI", {});
cmpTrigger.DoAfterDelay(200000, "AttackIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackII", {});
cmpTrigger.DoAfterDelay(200000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackIIIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackI", {});
cmpTrigger.DoAfterDelay(200000, "AttackIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackII", {});
cmpTrigger.DoAfterDelay(200000, "AttackIIII", {});
cmpTrigger.DoAfterDelay(200000, "AttackIIIII", {});
