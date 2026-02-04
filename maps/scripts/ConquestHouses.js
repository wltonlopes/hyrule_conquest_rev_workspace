{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.ConquestAddVictoryCondition({
		"classFilter": ["House", "CivilCentre+!Foundation"],
		"defeatReason": markForTranslation("%(player)s has been defeated (lost all houses).")
	});
	cmpTrigger.ConquestAddVictoryCondition({
		"classFilter": ["ConquestCritical House", "ConquestCritical CivilCentre+!Foundation"],
		"defeatReason": markForTranslation("%(player)s has been defeated (lost all houses and critical units).")
	});
}
