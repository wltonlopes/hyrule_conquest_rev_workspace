/**
 * Holds a list of wanted plans to train or construct
 */
SCRUB.Queue = function()
{
	this.plans = [];
	this.paused = false;
	this.switched = 0;
};

SCRUB.Queue.prototype.empty = function()
{
	this.plans = [];
};

SCRUB.Queue.prototype.addPlan = function(newPlan)
{
	if (!newPlan)
		return;
	for (let plan of this.plans)
	{
		if (newPlan.category === "unit" && plan.type == newPlan.type && plan.number + newPlan.number <= plan.maxMerge)
		{
			plan.addItem(newPlan.number);
			return;
		}
		else if (newPlan.category === "technology" && plan.type === newPlan.type)
			return;
	}
	this.plans.push(newPlan);
};

SCRUB.Queue.prototype.check= function(gameState)
{
	while (this.plans.length > 0)
	{
		if (!this.plans[0].isInvalid(gameState))
			return;
		let plan = this.plans.shift();
		if (plan.queueToReset)
			gameState.ai.queueManager.changePriority(plan.queueToReset, gameState.ai.Config.priorities[plan.queueToReset]);
	}
};

SCRUB.Queue.prototype.getNext = function()
{
	if (this.plans.length > 0)
		return this.plans[0];
	return null;
};

SCRUB.Queue.prototype.startNext = function(gameState)
{
	if (this.plans.length > 0)
	{
		this.plans.shift().start(gameState);
		return true;
	}
	return false;
};

/**
 * returns the maximal account we'll accept for this queue.
 * Currently all the cost of the first element and fraction of that of the second
 */
SCRUB.Queue.prototype.maxAccountWanted = function(gameState, fraction)
{
	let cost = new API3.Resources();
	if (this.plans.length > 0 && this.plans[0].isGo(gameState))
		cost.add(this.plans[0].getCost());
	if (this.plans.length > 1 && this.plans[1].isGo(gameState) && fraction > 0)
	{
		let costs = this.plans[1].getCost();
		costs.multiply(fraction);
		cost.add(costs);
	}
	return cost;
};

SCRUB.Queue.prototype.queueCost = function()
{
	let cost = new API3.Resources();
	for (let plan of this.plans)
		cost.add(plan.getCost());
	return cost;
};

SCRUB.Queue.prototype.length = function()
{
	return this.plans.length;
};

SCRUB.Queue.prototype.hasQueuedUnits = function()
{
	return this.plans.length > 0;
};

SCRUB.Queue.prototype.countQueuedUnits = function()
{
	let count = 0;
	for (let plan of this.plans)
		count += plan.number;
	return count;
};

SCRUB.Queue.prototype.hasQueuedUnitsWithClass = function(classe)
{
	return this.plans.some(plan => plan.template && plan.template.hasClass(classe));
};

SCRUB.Queue.prototype.countQueuedUnitsWithClass = function(classe)
{
	let count = 0;
	for (let plan of this.plans)
		if (plan.template && plan.template.hasClass(classe))
			count += plan.number;
	return count;
};

SCRUB.Queue.prototype.countQueuedUnitsWithMetadata = function(data, value)
{
	let count = 0;
	for (let plan of this.plans)
		if (plan.metadata[data] && plan.metadata[data] == value)
			count += plan.number;
	return count;
};

SCRUB.Queue.prototype.Serialize = function()
{
	let plans = [];
	for (let plan of this.plans)
		plans.push(plan.Serialize());

	return { "plans": plans, "paused": this.paused, "switched": this.switched };
};

SCRUB.Queue.prototype.Deserialize = function(gameState, data)
{
	this.paused = data.paused;
	this.switched = data.switched;
	this.plans = [];
	for (let dataPlan of data.plans)
	{
		let plan;
		if (dataPlan.category == "unit")
			plan = new SCRUB.TrainingPlan(gameState, dataPlan.type);
		else if (dataPlan.category == "building")
			plan = new SCRUB.ConstructionPlan(gameState, dataPlan.type);
		else if (dataPlan.category == "technology")
			plan = new SCRUB.ResearchPlan(gameState, dataPlan.type);
		else
		{
			API3.warn("SCRUB deserialization error: plan unknown " + uneval(dataPlan));
			continue;
		}
		plan.Deserialize(gameState, dataPlan);
		this.plans.push(plan);
	}
};
