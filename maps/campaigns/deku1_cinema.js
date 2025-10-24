Trigger.prototype.CounterMessage = function(data)
{
	var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	cmpGUIInterface.PushNotification({
		"players": [1, 2], 
		"message": markForTranslation("Cutscene starts after 3 seconds"),
		translateMessage: true
	});
};

Trigger.prototype.StartCutscene = function(data)
{
	var cmpCinemaManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_CinemaManager);
	if (!cmpCinemaManager)
		return;
	cmpCinemaManager.AddCinemaPathToQueue("test");
	cmpCinemaManager.Play();
};

var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
cmpTrigger.DoAfterDelay(0, "CounterMessage", {});
cmpTrigger.DoAfterDelay(3000, "StartCutscene", {});
