Engine.LoadLibrary("rmgen");
Engine.LoadLibrary("rmgen-common");
Engine.LoadLibrary("rmbiome");

function* GenerateMap(mapSettings)
{
	setBiome("generic/temperate");

	const tPrimary = ["temp_mud_a"];
	const tGrass = ["temp_mud_a"];
	const tPineForestFloor = "temp_mud_a";
	const tForestFloor = ["temp_mud_a"];
	const tCliff = ["temp_mud_a"];
	const tCity = ["temp_mud_a"];
	const tGrassPatch = ["temp_mud_a"];

	const aTreeA = "actor|flora/trees/oak.xml";
	const aTreeB = "actor|flora/trees/oak_large.xml";
	const aTreeC = "actor|flora/trees/pine.xml";
	const aTreeD = "actor|flora/trees/oak_new.xml";

	const aTrees = [aTreeA, aTreeB, aTreeC, aTreeD];

	const pForest = [
		tPineForestFloor + TERRAIN_SEPARATOR, tForestFloor,
		tPineForestFloor + TERRAIN_SEPARATOR, tForestFloor,
		tPineForestFloor + TERRAIN_SEPARATOR, tForestFloor,
		tForestFloor
	];

	const heightRavineValley = 30;
	const heightLand = 30;
	const heightRavineHill = 30;
	const heightHill = 30;
	const heightOffsetRavine = 30;

	globalThis.g_Map = new RandomMap(heightHill, tPrimary);

	const numPlayers = getNumPlayers();
	const mapSize = g_Map.getSize();
	const mapCenter = g_Map.getCenter();

	const clPlayer = g_Map.createTileClass();
	const clHill = g_Map.createTileClass();
	const clForest = g_Map.createTileClass();
	const clForestJoin = g_Map.createTileClass();
	const clRock = g_Map.createTileClass();
	const clMetal = g_Map.createTileClass();
	const clFood = g_Map.createTileClass();
	const clBaseResource = g_Map.createTileClass();
	const clHillDeco = g_Map.createTileClass();
	const clExplorable = g_Map.createTileClass();

	g_Map.log("Creating the central dip");
	createArea(
		new ClumpPlacer(diskArea(fractionToTiles(0.44)), 0.94, 0.05, 0.1, mapCenter),
		[
			new LayeredPainter([tCliff, tGrass], [3]),
			new SmoothElevationPainter(ELEVATION_SET, heightLand, 3)
		]);
	yield 5;

	g_Map.log("Finding hills");
	const noise0 = new Noise2D(20);
	for (let ix = 0; ix < mapSize; ix++)
		for (let iz = 0; iz < mapSize; iz++)
		{
			const position = new Vector2D(ix, iz);
			const h = g_Map.getHeight(position);
			if (h > heightRavineHill)
			{
				clHill.add(position);

				// Add hill noise
				const x = ix / (mapSize + 1.0);
				const z = iz / (mapSize + 1.0);
				const n = (noise0.get(x, z) - 0.5) * heightRavineHill;
				g_Map.setHeight(position, h + n);
			}
		}

	const [playerIDs, playerPosition] =
		playerPlacementByPattern(
			mapSettings.PlayerPlacement,
			fractionToTiles(0.35),
			fractionToTiles(0.1),
			randomAngle(),
			undefined);

	function distanceToPlayers(x, z)
	{
		let r = 10000;
		for (let i = 0; i < numPlayers; i++)
		{
			const dx = x - tilesToFraction(playerPosition[i].x);
			const dz = z - tilesToFraction(playerPosition[i].y);
			r = Math.min(r, Math.square(dx) + Math.square(dz));
		}
		return Math.sqrt(r);
	}

	function playerNearness(x, z)
	{
		const d = fractionToTiles(distanceToPlayers(x, z));

		if (d < 13)
			return 0;

		if (d < 19)
			return (d-13)/(19-13);

		return 1;
	}

	yield 10;

	placePlayerBases({
		"PlayerPlacement": [playerIDs, playerPosition],
		"BaseResourceClass": clBaseResource,
		// Playerclass marked below
		"CityPatch": {
			"outerTerrain": tCity,
			"innerTerrain": tCity,
			"radius": scaleByMapSize(5, 6),
			"smoothness": 0.05
		}
		// No decoratives
	});

	g_Map.log("Marking player territory");
	for (let i = 0; i < numPlayers; ++i)
		createArea(
			new ClumpPlacer(250, 0.95, 0.3, 0.1, playerPosition[i]),
			new TileClassPainter(clPlayer));

	yield 30;

	for (let ix = 0; ix < mapSize; ix++)
		for (let iz = 0; iz < mapSize; iz++)
		{
			const position = new Vector2D(ix, iz);
			const h = g_Map.getHeight(position);

			if (h > 35 && randBool(0.1) ||
			    h < 15 && randBool(0.05) && clHillDeco.countMembersInRadius(position, 1) == 0)
				g_Map.placeEntityAnywhere(
					pickRandom(aTrees),
					0,
					randomPositionOnTile(position),
					randomAngle());
		}

	const explorableArea = createArea(
		new MapBoundsPlacer(),
		undefined,
		[
			new HeightConstraint(15, 45),
			avoidClasses(clPlayer, 1)
		]);

	new TileClassPainter(clExplorable).paint(explorableArea);

	yield 70;

	g_Map.log("Creating grass patches");
	for (const size of [scaleByMapSize(3, 48), scaleByMapSize(5, 84), scaleByMapSize(8, 128)])
		createAreas(
			new ClumpPlacer(size, 0.3, 0.06, 0.5),
			new TerrainPainter([tGrass, tGrassPatch]),
			avoidClasses(clForest, 0, clHill, 2, clPlayer, 5),
			scaleByMapSize(15, 45));

	g_Map.log("Creating chopped forest patches");
	for (const size of [scaleByMapSize(20, 120)])
		createAreas(
			new ClumpPlacer(size, 0.3, 0.06, 0.5),
			new TerrainPainter(tForestFloor),
			avoidClasses(clForest, 1, clHill, 2, clPlayer, 5),
			scaleByMapSize(4, 12));

	yield 75;

	placePlayersNomad(clPlayer, avoidClasses(clForest, 1, clMetal, 4, clRock, 4, clHill, 4, clFood, 2));

	return g_Map;
}
