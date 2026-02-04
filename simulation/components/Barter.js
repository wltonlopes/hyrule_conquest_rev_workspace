function Barter() {}

Barter.prototype.Schema =
	"<a:component type='system'/><empty/>";

/**
 * The "true price" is a base price of Barter.prototype.DEAL_AMOUNT units of resource (for the case of some resources being of more worth than others).
 * With current bartering system only relative values makes sense so if for example stone is two times more expensive than wood,
 * there will 2:1 exchange rate.
 *
 * Keep gui/session/trade/BarterButton.js in sync with this value.
 */
Barter.prototype.DEAL_AMOUNT = 100;

/**
 * Deals per mass barter.
 * Keep gui/session/trade/BarterButton.js in sync with this value.
 */
Barter.prototype.BATCH_SIZE = 5;

/**
 * Constant part of price percentage difference between true price and buy/sell price.
 * Buy price equal to true price plus constant difference.
 * Sell price equal to true price minus constant difference.
 */
Barter.prototype.CONSTANT_DIFFERENCE = 10;

/**
 * Additional difference of prices in percents, added after each deal to specified resource price.
 */
Barter.prototype.DIFFERENCE_PER_DEAL = 2;

/**
 * Price difference percentage which restored each restore timer tick
 */
Barter.prototype.DIFFERENCE_RESTORE = 0.5;

/**
 * Interval of timer which slowly restore prices after deals
 */
Barter.prototype.RESTORE_TIMER_INTERVAL = 7000;

Barter.prototype.Init = function()
{
	this.priceDifferences = {};
	for (const resource of Resources.GetBarterableCodes())
		this.priceDifferences[resource] = 0;
};

// Add a handler for global init game event to start price fluctuations immediately
Barter.prototype.OnGlobalInitGame = function()
{
	// Set initial non-zero price differences to trigger updates
	for (const resource in this.priceDifferences) {
		// Set a small initial difference to activate price updates
		this.priceDifferences[resource] = 1;
	}
	
	// Start the price restoration timer
	this.restoreTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer).SetInterval(
		this.entity, 
		IID_Barter, 
		"ProgressTimeout", 
		this.RESTORE_TIMER_INTERVAL, 
		this.RESTORE_TIMER_INTERVAL, 
		null
	);
};

Barter.prototype.GetPrices = function(cmpPlayer)
{
	const prices = { "buy": {}, "sell": {} };
	const multiplier = cmpPlayer.GetBarterMultiplier();
	for (const resource in this.priceDifferences)
	{
		const truePrice = Resources.GetResource(resource).truePrice;
		prices.buy[resource] = truePrice * (this.DEAL_AMOUNT + this.CONSTANT_DIFFERENCE + this.priceDifferences[resource]) * multiplier.buy[resource] / this.DEAL_AMOUNT;
		prices.sell[resource] = truePrice * (this.DEAL_AMOUNT - this.CONSTANT_DIFFERENCE + this.priceDifferences[resource]) * multiplier.sell[resource] / this.DEAL_AMOUNT;
	}
	return prices;
};

Barter.prototype.ExchangeResources = function(playerID, resourceToSell, resourceToBuy, amount)
{
	if (!this.restoreTimer)
		this.restoreTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer).SetInterval(this.entity, IID_Barter, "ProgressTimeout", this.RESTORE_TIMER_INTERVAL, this.RESTORE_TIMER_INTERVAL, null);
	if (amount <= 0)
	{
		warn("ExchangeResources: incorrect amount: " + uneval(amount));
		return;
	}

	if (!(resourceToSell in this.priceDifferences))
	{
		warn("ExchangeResources: incorrect resource to sell: " + uneval(resourceToSell));
		return;
	}

	if (!(resourceToBuy in this.priceDifferences))
	{
		warn("ExchangeResources: incorrect resource to buy: " + uneval(resourceToBuy));
		return;
	}

	if (amount !== this.DEAL_AMOUNT && amount !== (this.BATCH_SIZE * this.DEAL_AMOUNT))
		return;

	const cmpPlayer = QueryPlayerIDInterface(playerID);
	if (!cmpPlayer?.CanBarter())
		return;

	const amountsToSubtract = {
		[resourceToSell]: amount
	};
	if (!cmpPlayer.TrySubtractResources(amountsToSubtract))
		return;

	const prices = this.GetPrices(cmpPlayer);
	const amountToAdd = Math.round(prices.sell[resourceToSell] / prices.buy[resourceToBuy] * amount);
	cmpPlayer.AddResource(resourceToBuy, amountToAdd);

	Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface)?.PushNotification({
		"type": "barter",
		"players": [playerID],
		"amountGiven": amount,
		"amountGained": amountToAdd,
		"resourceGiven": resourceToSell,
		"resourceGained": resourceToBuy
	});

	const cmpStatisticsTracker = QueryPlayerIDInterface(playerID, IID_StatisticsTracker);
	if (cmpStatisticsTracker)
	{
		cmpStatisticsTracker.IncreaseResourcesSoldCounter(resourceToSell, amount);
		cmpStatisticsTracker.IncreaseResourcesBoughtCounter(resourceToBuy, amountToAdd);
	}

	let randDifference;
    let moreRandomDifference = Math.random();

	if (moreRandomDifference < .1)
	{
		randDifference = randFloat(.25, .5);
	}
	else if (moreRandomDifference < .3)
	{
		randDifference = randFloat(.55, 1.05);
	}
	else if (moreRandomDifference < .5)
	{
		randDifference = randFloat(.85, 1.15);
	}
	else if (moreRandomDifference < .7)
	{
		randDifference = randFloat(.95, 1.35);
	}
	else if (moreRandomDifference < .9)
	{
		randDifference = randFloat(1.15, 1.45);
	}
	else if (moreRandomDifference < .995)
	{
		randDifference = randFloat(1.75, 2.25);
	}
	else
	{
		randDifference = randFloat(2.3, 3.25);
	}

	const difference = this.DIFFERENCE_PER_DEAL * randDifference  * amount * .1 / this.DEAL_AMOUNT;
	// Overall price difference (dynamic +/- constant) can't exceed +-99%.
	const maxDifference = this.DEAL_AMOUNT * 0.99;

	// Increase price difference for both exchanged resources.
	this.priceDifferences[resourceToSell] -= difference;
	this.priceDifferences[resourceToSell] = Math.min(maxDifference - this.CONSTANT_DIFFERENCE, Math.max(this.CONSTANT_DIFFERENCE - maxDifference, this.priceDifferences[resourceToSell]));
	this.priceDifferences[resourceToBuy] += difference;
	this.priceDifferences[resourceToBuy] = Math.min(maxDifference - this.CONSTANT_DIFFERENCE, Math.max(this.CONSTANT_DIFFERENCE - maxDifference, this.priceDifferences[resourceToBuy]));

	if (!this.restoreTimer)
		this.restoreTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer).SetInterval(this.entity, IID_Barter, "ProgressTimeout", this.RESTORE_TIMER_INTERVAL, this.RESTORE_TIMER_INTERVAL, null);
};

Barter.prototype.ProgressTimeout = function(data)
{
	let needRestore = false;
	for (const resource in this.priceDifferences)
	{


		// Params for some Randomization

		let volatile;

		// The probability that the price of a resource will be volatile when the timer is updated. 
		let randVolatile = Math.random();

		// Probability and variants for determining volatility. 
		let variants;
		let randVariants = Math.random();


		// test

		if (randVariants < .15)
		{
			variants = randFloat(0, 3);
		}
		else if (randVariants < .3)
		{
			variants = randFloat(1, 4);
		}
		else if (randVariants < .5)
		{
			variants = randFloat(2, 5);			
		}
		else if (randVariants < .7)
		{
			variants = randFloat(3, 6);
		}
		else if (randVariants < .9)
		{
			variants = randFloat(4, 7);
		}
		else if (randVariants < .95)
		{
			variants = randFloat(8, 15);
		}
		else if (randVariants < .975)
		{
			variants = randFloat(15, 30);
		}
		else
		{
			variants = randFloat(45, 80);
		}


		// The Probability of volatility and the probability for its direction: whether up or down.

		if (resource == "food" && randVolatile < .4)
		{
			volatile = Math.random() < .5 ? variants : - variants;
		}
		else if (resource == "wood" && randVolatile < .4)
		{
			volatile = Math.random() < .5 ? variants : - variants;
		}
		else if (resource == "stone" && randVolatile < .4)
		{
			volatile = Math.random() < .5 ? variants : - variants;
		}
		else if (resource == "metal" && randVolatile < .4)
		{
			volatile = Math.random() < .5 ? variants : - variants;
		}
		else if (resource == "coins" && randVolatile < .55)
		{
			volatile = Math.random() < .85 ? variants : - variants;
		}
		else if (randVolatile < .4)
		{
			volatile = Math.random() < .5 ? variants : - variants;
		}
		else
		{
			volatile = 0;
		}


		// floating prices
		this.priceDifferences[resource] += volatile;

		this.priceDifferences[resource] = Math.max(this.priceDifferences[resource], 1);

		// more random for Restore
		let randDifferenceRestore = randFloat(.5, 2.5);
		// Calculate value to restore, it should be limited to [-DIFFERENCE_RESTORE; DIFFERENCE_RESTORE] interval
		let differenceRestore = Math.min(this.DIFFERENCE_RESTORE * randDifferenceRestore, Math.max(-this.DIFFERENCE_RESTORE * randDifferenceRestore, this.priceDifferences[resource]));
		differenceRestore = -differenceRestore;
		this.priceDifferences[resource] += differenceRestore;
		// If price difference still exists then set flag to run timer again
		if (this.priceDifferences[resource] != 0)
			needRestore = true;
	}

	if (!needRestore)
	{
		Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer).CancelTimer(this.restoreTimer);
		delete this.restoreTimer;
	}
};

Engine.RegisterSystemComponentType(IID_Barter, "Barter", Barter);
