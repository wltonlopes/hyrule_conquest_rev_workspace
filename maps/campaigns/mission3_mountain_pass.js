Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome Commander."),
	},
	{
		"instructions": markForTranslation("As you know, our scouting parties were discovered by Hylian troops. They have increased their defences along that border, so it is not an option for our invasion."),
	},
	{
		"instructions": markForTranslation("Because of this, General Onox has ordered us to search for an alternative route, through the northern mountains of Hyrule. We are ordered to locate and secure a minor, little known border pass, allowing reinforcements to enter behind us."),
	},
	{
		"instructions": markForTranslation("We have orders to locate and kill their captain, as well as any soldiers in our way. However, General Onox wants us to leave their sentry towers, as they are a major defense line that will serve us well after we win this war."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "HylianCaptain"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Their captain is dead, leaving them in retreat. Good work. You'll go far if you keep this up."),
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
