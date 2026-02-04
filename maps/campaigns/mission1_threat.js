Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander."),
	},
	{
		"instructions": markForTranslation("Lately, we have been getting reports of Labrynnian scouts in the area."),
	},
	{
		"instructions": markForTranslation("Since you're a junior commander, Captain Krin has put you in charge of this mission, which should be relatively easy."),
	},
	{
		"instructions": markForTranslation("Captain Krin wants us to locate one of these scout parties and teach them a lesson."),
	},
	{
		"instructions": markForTranslation("They most likely traveled here in some sort of transport, so find it and destroy it. They won't dare stick around after that."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "Transport"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The scouts have been routed. You did a good job, for a rookie."),
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
	cmpTrigger.enemyID = 2;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}
