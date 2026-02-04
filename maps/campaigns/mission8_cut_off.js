Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Commander! It's good to see that you made it here alive."),
	},
	{
		"instructions": markForTranslation("A major avalanche has cut us off from the rest of the survivors."),
	},
	{
		"instructions": markForTranslation("We'll need to find an alternate path, but we need to be careful, these mountains are crawling with wolves and bears."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "UrsaWagon"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("We found the others! Now to get back to Labrynna..."),
		"Init": function()
		{
			let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
			cmpEndGameManager.MarkPlayerAndAlliesAsWon(1, () => "Mission Completed", () => "");
		}
	}
];

{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.playerID = 1;
	cmpTrigger.enemyID = 0;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}
