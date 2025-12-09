Trigger.prototype.InitGodslayerGame = function(msg)
{
	let cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
	let godslayerGarrison = cmpEndGameManager.GetGameSettings().godslayerGarrison;

	let playersCivs = [];
	for (let playerID = 1; playerID < TriggerHelper.GetNumberOfPlayers(); ++playerID)
		playersCivs[playerID] = QueryPlayerIDInterface(playerID, IID_Identity).GetCiv();

	// Get all hero templates of these civs
	let heroTemplates = {};
	let cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
	for (let templateName of cmpTemplateManager.FindAllTemplates(false))
	{
		if (!templateName.startsWith("units/"))
			continue;

		let identity = cmpTemplateManager.GetTemplate(templateName).Identity;
		let classes = GetIdentityClasses(identity);

		if (classes.indexOf("Titan") == -1 ||
		    playersCivs.every(civ => civ != identity.Civ))
			continue;

		if (!heroTemplates[identity.Civ])
			heroTemplates[identity.Civ] = [];

		if (heroTemplates[identity.Civ].indexOf(templateName) == -1)
			heroTemplates[identity.Civ].push({
				"templateName": godslayerGarrison ? templateName : "ungarrisonable|" + templateName,
				"classes": classes
			});
	}

	// Sort available spawn points by preference
	let spawnPreferences = ["CivilCentre", "Structure", "Ship"];
	let getSpawnPreference = entity => {

		let cmpIdentity = Engine.QueryInterface(entity, IID_Identity);
		if (!cmpIdentity)
			return -1;

		let classes = cmpIdentity.GetClassesList();

		for (let i in spawnPreferences)
			if (classes.indexOf(spawnPreferences[i]) != -1)
				return spawnPreferences.length - i;
		return 0;
	};

	// Attempt to spawn one hero per player
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	for (let playerID = 1; playerID < TriggerHelper.GetNumberOfPlayers(); ++playerID)
	{
		let spawnPoints = cmpRangeManager.GetEntitiesByPlayer(playerID).sort((entity1, entity2) =>
			getSpawnPreference(entity2) - getSpawnPreference(entity1));

		// Spawn the hero on land as close as possible
		if (!godslayerGarrison && TriggerHelper.EntityMatchesClassList(spawnPoints[0], "Ship"))
		{
			let shipPosition = Engine.QueryInterface(spawnPoints[0], IID_Position).GetPosition2D();

			let distanceToShip = entity =>
				Engine.QueryInterface(entity, IID_Position).GetPosition2D().distanceToSquared(shipPosition);

			spawnPoints = TriggerHelper.GetLandSpawnPoints().sort((entity1, entity2) =>
				distanceToShip(entity1) - distanceToShip(entity2));
		}

		this.godslayerTitans[playerID] = this.SpawnGodslayerTitan(playerID, heroTemplates[playersCivs[playerID]], spawnPoints);
	}
};

/**
 * Spawn a random titan at one of the given locations (which are checked in order).
 * Garrison it if the location is a ship.
 *
 * @param spawnPoints - entity IDs at which to spawn
 */
Trigger.prototype.SpawnGodslayerTitan = function(playerID, heroTemplates, spawnPoints)
{
	for (let heroTemplate of shuffleArray(heroTemplates))
		for (let spawnPoint of spawnPoints)
		{
			let cmpPosition = Engine.QueryInterface(spawnPoint, IID_Position);
			if (!cmpPosition || !cmpPosition.IsInWorld())
				continue;

			// Consider nomad maps where units start on a ship
			let isShip = TriggerHelper.EntityMatchesClassList(spawnPoint, "Ship");
			if (isShip)
			{
				let cmpGarrisonHolder = Engine.QueryInterface(spawnPoint, IID_GarrisonHolder);
				if (cmpGarrisonHolder.IsFull() ||
				    !MatchesClassList(heroTemplate.classes, cmpGarrisonHolder.GetAllowedClasses()))
					continue;
			}

			let hero = TriggerHelper.SpawnUnits(spawnPoint, heroTemplate.templateName, 1, playerID);
			if (!hero.length)
				continue;

			hero = hero[0];

			if (isShip)
			{
				let cmpUnitAI = Engine.QueryInterface(hero, IID_UnitAI);
				cmpUnitAI.Garrison(spawnPoint);
			}

			return hero;
		}

	error("Couldn't spawn hero for player " + playerID);
	return undefined;
};

Trigger.prototype.RenameGodslayerTitan = function(data)
{
	let index = this.godslayerTitans.indexOf(data.entity);
	if (index != -1)
		this.godslayerTitans[index] = data.newentity;
};

Trigger.prototype.CheckGodslayerDefeat = function(data)
{
	if (data.entity == this.godslayerTitans[data.from])
		TriggerHelper.DefeatPlayer(
			data.from,
			markForTranslation("%(player)s has been defeated (lost titan)."));
};

{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.godslayerTitans = [];
	cmpTrigger.DoAfterDelay(0, "InitGodslayerGame", {});
	cmpTrigger.RegisterTrigger("OnOwnershipChanged", "CheckGodslayerDefeat", { "enabled": true });
	cmpTrigger.RegisterTrigger("OnEntityRenamed", "RenameGodslayerTitan", { "enabled": true });
}
