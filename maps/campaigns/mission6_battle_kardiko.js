Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander!"),
	},
	{
		"instructions": markForTranslation("This is it. Labrynna has amassed their army, here at the Kardiko Plains. Our allies' armies are on their way as we speak, and reinforcements of our own are inbound. We will crush the Labrynnian army where they stand, eliminating them from the playing field for year to come."),
	},
	{
		"instructions": markForTranslation("Captain Krin is with us, as well as many elite soldiers and champions from throughout Hyrule. Our scouts report that leading the enemy army is Vire, a demonic servant of General Onox."),
	},
	{
		"instructions": markForTranslation("Our allies' armies will be here shortly, but if we can finish the enemy before they arrive, all the better."),
	},
	{
		"instructions": markForTranslation("Most likely, the Labrynnian army has reinforcements as well, so we need to hurry before they get here, lest the tide of battle turn against us. Forward, unto victory!"),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.playerID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "Krin"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We have lost Captain Krin. Without him, we cannot win this battle. Order the retreat."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(5, () => "Mission Failed", () => "");
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

Trigger.prototype.GoronsI = function()
{
	let infIntrudersB = ["units/goron/goron_firewarrior_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 50, 2);
	this.WarningMessage(markForTranslation("The Goron armies are here! We will crush the enemy underfoot!"));
	return;
};

Trigger.prototype.GoronsII = function()
{
	let infIntrudersB = ["units/goron/goron_giant_melee"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 20, 2);
};

Trigger.prototype.GoronsIII = function()
{
	let infIntrudersB = ["units/goron/goron_battlebro_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 30, 2);
};

Trigger.prototype.GoronsIIII = function()
{
	let infIntrudersB = ["units/goron/goron_rubyguard_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 40, 2);
};

Trigger.prototype.GoronsIIIII = function()
{
	let infIntrudersB = ["units/goron/goron_shieldbreaker_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["A"]),pickRandom(infIntrudersB), 25, 2);
};

Trigger.prototype.LanayruI = function()
{
	let infIntrudersB = ["units/lanayru/lanayru_wavewarrior_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 40, 3);
	this.WarningMessage(markForTranslation("The Lanayru have arrived! With dragons?!"));
	return;
};

Trigger.prototype.LanayruII = function()
{
	let infIntrudersB = ["units/lanayru/lanayru_silverarcher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 40, 3);
};

Trigger.prototype.LanayruIII = function()
{
	let infIntrudersB = ["units/lanayru/lanayru_tridenteer_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 40, 3);
};

Trigger.prototype.LanayruIIII = function()
{
	let infIntrudersB = ["units/lanayru/lanayru_arachdervish_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 40, 3);
};

Trigger.prototype.LanayruIIIII = function()
{
	let infIntrudersB = ["units/lanayru/lanayru_gleeoklingA_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["B"]),pickRandom(infIntrudersB), 6, 3);
};

Trigger.prototype.KokiriI = function()
{
	let infIntrudersB = ["units/kokiri/infantry_spearman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersB), 40, 4);
	this.WarningMessage(markForTranslation("The Kokiri have arrived! All of our able allies are here, to battle!"));
	return;
};

Trigger.prototype.KokiriII = function()
{
	let infIntrudersB = ["units/kokiri/infantry_archer_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersB), 40, 4);
};

Trigger.prototype.KokiriIII = function()
{
	let infIntrudersB = ["units/kokiri/kokiri_dekutree_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersB), 5, 4);
};

Trigger.prototype.KokiriIIII = function()
{
	let infIntrudersB = ["units/kokiri/kokiri_grovewatch_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersB), 20, 4);
};

Trigger.prototype.KokiriIIIII = function()
{
	let infIntrudersB = ["units/kokiri/kokiri_emarcher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["C"]),pickRandom(infIntrudersB), 20, 4);
};

Trigger.prototype.LabrynnaI = function()
{
	let infIntrudersB = ["units/labrynna/infantry_spearman_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersB), 20, 5);
	this.WarningMessage(markForTranslation("Damn, the enemy reinforcements have arrived! No matter, we will win this war!"));
	return;
};

Trigger.prototype.LabrynnaII = function()
{
	let infIntrudersB = ["units/labrynna/labrynna_poacher_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersB), 5, 5);
};

Trigger.prototype.LabrynnaIII = function()
{
	let infIntrudersB = ["units/labrynna/labrynna_cannon_b"]
	var intruders = TriggerHelper.SpawnUnitsFromTriggerPoints(
			pickRandom(["E"]),pickRandom(infIntrudersB), 1, 5);
};

var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
cmpTrigger.state = "start";
cmpTrigger.playerID = 1;
cmpTrigger.enemyID = 3;
cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
cmpTrigger.DoAfterDelay(50000, "GoronsI", {});
cmpTrigger.DoAfterDelay(50000, "GoronsII", {});
cmpTrigger.DoAfterDelay(50000, "GoronsIII", {});
cmpTrigger.DoAfterDelay(50000, "GoronsIIII", {});
cmpTrigger.DoAfterDelay(50000, "GoronsIIIII", {});

cmpTrigger.DoAfterDelay(75000, "LanayruI", {});
cmpTrigger.DoAfterDelay(75000, "LanayruII", {});
cmpTrigger.DoAfterDelay(75000, "LanayruIII", {});
cmpTrigger.DoAfterDelay(75000, "LanayruIIII", {});
cmpTrigger.DoAfterDelay(75000, "LanayruIIIII", {});

cmpTrigger.DoAfterDelay(90000, "LabrynnaI", {});
cmpTrigger.DoAfterDelay(90000, "LabrynnaII", {});
cmpTrigger.DoAfterDelay(90000, "LabrynnaIII", {});

cmpTrigger.DoAfterDelay(100000, "KokiriI", {});
cmpTrigger.DoAfterDelay(100000, "KokiriII", {});
cmpTrigger.DoAfterDelay(100000, "KokiriIII", {});
cmpTrigger.DoAfterDelay(100000, "KokiriIIII", {});
cmpTrigger.DoAfterDelay(100000, "KokiriIIIII", {});
