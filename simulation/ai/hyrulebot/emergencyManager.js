/**
 * Checks for emergencies and acts accordingly
 */
HYRULE.EmergencyManager = function(Config)
{
	this.Config = Config;
	this.referencePopulation = 0;
	this.referenceStructureCount = 0;
	this.numRoots = 0;
	this.hasEmergency = false;
};

HYRULE.EmergencyManager.prototype.init = function(gameState)
{
	this.referencePopulation = gameState.getPopulation();
	this.referenceStructureCount = gameState.getOwnStructures().length;
	this.numRoots = this.rootCount(gameState);
};

HYRULE.EmergencyManager.prototype.update = function(gameState)
{
	if (this.hasEmergency)
	{
		this.emergencyUpdate(gameState);
		return;
	}
	const pop = gameState.getPopulation();
	const nStructures = gameState.getOwnStructures().length;
	const nRoots = this.rootCount(gameState);
	const factors = this.Config.emergencyValues;
	if (((pop / this.referencePopulation) < factors.population || pop == 0) &&
		((nStructures / this.referenceStructureCount) < factors.structures || nStructures == 0))
		this.setEmergency(gameState, true);
	else if ((nRoots / this.numRoots) <= factors.roots || (nRoots == 0 && this.numRoots != 0))
		this.setEmergency(gameState, true);

	if (pop > this.referencePopulation || this.hasEmergency)
		this.referencePopulation = pop;
	if (nStructures > this.referenceStructureCount || this.hasEmergency)
		this.referenceStructureCount = nStructures;
	if (nRoots > this.numRoots || this.hasEmergency)
		this.numRoots = nRoots;
};

HYRULE.EmergencyManager.prototype.emergencyUpdate = function(gameState)
{
	const pop = gameState.getPopulation();
	const nStructures = gameState.getOwnStructures().length;
	const nRoots = this.rootCount(gameState);
	const factors = this.Config.emergencyValues;

	if ((pop > this.referencePopulation * 1.2 &&
		nStructures > this.referenceStructureCount * 1.2) ||
		nRoots > this.numRoots)
	{
		this.setEmergency(gameState, false);
		this.referencePopulation = pop;
		this.referenceStructureCount = nStructures;
		this.numRoots = nRoots;
	}
};

HYRULE.EmergencyManager.prototype.rootCount = function(gameState)
{
	let roots = 0;
	gameState.getOwnStructures().toEntityArray().forEach(ent => {
		if (ent?.get("TerritoryInfluence")?.Root === "true")
			roots++;
	});
	return roots;
};

HYRULE.EmergencyManager.prototype.setEmergency = function(gameState, enable)
{
	this.hasEmergency = enable;
	HYRULE.chatEmergency(gameState, enable);
};

HYRULE.EmergencyManager.prototype.Serialize = function()
{
	return {
		"referencePopulation": this.referencePopulation,
		"referenceStructureCount": this.referenceStructureCount,
		"numRoots": this.numRoots,
		"hasEmergency": this.hasEmergency
	};
};

HYRULE.EmergencyManager.prototype.Deserialize = function(data)
{
	for (const key in data)
		this[key] = data[key];
};
