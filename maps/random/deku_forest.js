Engine.LoadLibrary("rmgen");
Engine.LoadLibrary("rmgen-common");
Engine.LoadLibrary("rmbiome");

function* GenerateMap(mapSettings)
{
	setBiome("generic/temperate");

	const tPrimary = ["temp_mud_a", "temp_plants_bog"];
	const tGrass = ["temp_mud_a", "temp_plants_bog", "temp_plants_bog"];
	const tPineForestFloor = "temp_plants_bog";
	const tForestFloor = [tPineForestFloor, tPineForestFloor, "temp_plants_bog"];
	const tCliff = ["temp_mud_a"];
	const tCity = ["new_alpine_citytile", "new_alpine_grass_dirt_a"];
	const tGrassPatch = ["temp_mud_a"];

	const oUnderling = "gaia/deku_underling";
	const oBaba = "gaia/deku_baba";
	const oPikit = "gaia/deku_pikit";
	const oDeku = "gaia/deku_spearman";
	const oScrub = "gaia/deku_scrubling";
	const oDeer = "gaia/fauna_deer";
	const oBeetle = "gaia/deku_orhat";
	const oPig = "gaia/fauna_pig";
	const oBerryBush = "gaia/fruit/berry_01";
	const oMetalSmall = "gaia/ore/alpine_small";
	const oMetalLarge = "gaia/ore/temperate_large";
	const oStoneSmall = "gaia/rock/alpine_small";
	const oStoneLarge = "gaia/rock/temperate_large";

	const oOak = "gaia/tree/oak";
	const oOakLarge = "gaia/tree/oak_large";
	const oPine = "gaia/tree/pine";
	const oAleppoPine = "gaia/tree/fir";

	const aTreeA = "actor|flora/trees/oak.xml";
	const aTreeB = "actor|flora/trees/oak_large.xml";
	const aTreeC = "actor|flora/trees/pine.xml";
	const aTreeD = "actor|flora/trees/oak_new.xml";

	const aTrees = [aTreeA, aTreeB, aTreeC, aTreeD];

	const aSmallDekuFlower = "actor|flora/flower/deku_flower_smallA.xml";
	const aLargeDekuFlower = "actor|flora/flower/deku_flower_bigA.xml";

	const pForest = [
		tPineForestFloor + TERRAIN_SEPARATOR + oOak, tForestFloor,
		tPineForestFloor + TERRAIN_SEPARATOR + oPine, tForestFloor,
		tPineForestFloor + TERRAIN_SEPARATOR + oAleppoPine, tForestFloor,
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
		},
		"StartingAnimal": {
			"template": oPig
		},
		"Berries": {
			"template": oBerryBush,
			"minCount": 3,
			"maxCount": 3
		},
		"Mines": {
			"types": [
				{ "template": oMetalLarge },
				{ "template": oStoneLarge }
			],
			"distance": 16
		},
		"Trees": {
			"template": oOak,
			"count": 2
		}
		// No decoratives
	});

	g_Map.log("Marking player territory");
	for (let i = 0; i < numPlayers; ++i)
		createArea(
			new ClumpPlacer(250, 0.95, 0.3, 0.1, playerPosition[i]),
			new TileClassPainter(clPlayer));

	yield 30;

	g_Map.log("Creating hills");
	for (const size of
		[
			scaleByMapSize(50, 800),
			scaleByMapSize(50, 400),
			scaleByMapSize(10, 30),
			scaleByMapSize(10, 30)
		])
	{
		const mountains = createAreas(
			new ClumpPlacer(size, 0.1, 0.2, 0.1),
			[
				new LayeredPainter([tCliff, [tForestFloor, tForestFloor, tCliff]], [2]),
				new SmoothElevationPainter(ELEVATION_SET, heightHill, size < 50 ? 2 : 4),
				new TileClassPainter(clHill)
			],
			avoidClasses(clPlayer, 8, clBaseResource, 2, clHill, 5),
			scaleByMapSize(1, 4));

		if (size > 100 && mountains.length)
			createAreasInAreas(
				new ClumpPlacer(size * 0.3, 0.94, 0.05, 0.1),
				[
					new LayeredPainter([tCliff, tForestFloor], [2]),
					new SmoothElevationPainter(ELEVATION_MODIFY, heightOffsetRavine, 3)
				],
				stayClasses(clHill, 4),
				mountains.length * 2,
				20,
				mountains);

		const ravine = createAreas(
			new ClumpPlacer(size, 0.1, 0.2, 0.1),
			[
				new LayeredPainter([tCliff, tForestFloor], [2]),
				new SmoothElevationPainter(ELEVATION_SET, heightRavineValley, 2),
				new TileClassPainter(clHill)
			],
			avoidClasses(clPlayer, 6, clBaseResource, 2, clHill, 5),
			scaleByMapSize(1, 3));

		if (size > 150 && ravine.length)
		{

			// Place noise
			createAreasInAreas(
				new ClumpPlacer(size * 0.3, 0.94, 0.05, 0.1),
				[
					new LayeredPainter([tCliff, tForestFloor], [2]),
					new SmoothElevationPainter(ELEVATION_SET, heightRavineValley, 2)
				],
				[avoidClasses(clHillDeco, 2), stayClasses(clHill, 0)],
				ravine.length * 2,
				20,
				ravine);

			createAreasInAreas(
				new ClumpPlacer(size * 0.1, 0.3, 0.05, 0.1),
				[
					new LayeredPainter([tCliff, tForestFloor], [2]),
					new SmoothElevationPainter(ELEVATION_SET, heightRavineHill, 2),
					new TileClassPainter(clHill)
				],
				[avoidClasses(clHillDeco, 2), borderClasses(clHill, 15, 1)],
				ravine.length * 2,
				50,
				ravine);
		}
	}

	yield 50;

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

	yield 55;

	// Add some general noise - after placing height dependant trees
	for (let ix = 0; ix < mapSize; ix++)
	{
		const x = ix / (mapSize + 1.0);
		for (let iz = 0; iz < mapSize; iz++)
		{
			const position = new Vector2D(ix, iz);
			const z = iz / (mapSize + 1.0);
			const h = g_Map.getHeight(position);
			const pn = playerNearness(x, z);
			const n = (noise0.get(x, z) - 0.5) * 10;
			g_Map.setHeight(position, h + (n * pn));
		}
	}

	yield 60;

	g_Map.log("Creating forests");
	const [protoPorestTrees, stragglerTrees] = getTreeCounts(10000, 10000, 1.5);
	const [forestTreesJoin, forestTrees] = getTreeCounts(protoPorestTrees, protoPorestTrees, 0.25);

	const treeNum = forestTrees / scaleByMapSize(20, 70);
	createAreasInAreas(
		new ClumpPlacer(forestTrees / treeNum, 0.1, 0.1, Infinity),
		[
			new TerrainPainter(pForest),
			new TileClassPainter(clForest)
		],
		avoidClasses(clPlayer, 20, clBaseResource, 4, clForest, 0),
		treeNum,
		100,
		[explorableArea]
	);

	const joinNum = forestTreesJoin / (scaleByMapSize(4, 6) * numPlayers);
	createAreasInAreas(
		new ClumpPlacer(forestTreesJoin / joinNum, 0.1, 0.1, Infinity),
		[
			new TerrainPainter(pForest),
			new TileClassPainter(clForest),
			new TileClassPainter(clForestJoin)
		],
		[
			avoidClasses(clPlayer, 15, clBaseResource, 4, clForestJoin, 5),
			borderClasses(clForest, 1, 4)
		],
		joinNum,
		100,
		[explorableArea]
	);

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

	g_Map.log("Creating metal mines");
	createBalancedMetalMines(
		oMetalSmall,
		oMetalLarge,
		clMetal,
		[
			stayClasses(clExplorable, 1),
			avoidClasses(clForest, 0, clPlayer, scaleByMapSize(15, 25), clHill, 1)
		]
	);


	g_Map.log("Creating stone mines");
	createBalancedStoneMines(
		oStoneSmall,
		oStoneLarge,
		clRock,
		[
			stayClasses(clExplorable, 1),
			avoidClasses(clForest, 0, clPlayer, scaleByMapSize(15, 25), clHill, 1, clMetal, 10)
		]
	);

	yield 80;

	g_Map.log("Creating wildlife");
	let group = new SimpleGroup(
		[new SimpleObject(oBaba, 4, 5, 3, 6)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 4, clForest, 0, clPlayer, 0, clBaseResource, 20),
		20 * numPlayers, 300,
		[explorableArea]
	);

	group = new SimpleGroup(
		[new SimpleObject(oUnderling, 3, 4, 2, 5)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 0, clForest, 0, clPlayer, 15, clBaseResource, 15),
		10 * numPlayers, 200,
		[explorableArea]
	);
	
	group = new SimpleGroup(
		[new SimpleObject(oDeer, 5, 7, 0, 4)],
		true, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 0, clForest, 0, clPlayer, 0, clBaseResource, 20),
		3 * numPlayers, 100,
		[explorableArea]
	);
	
	group = new SimpleGroup(
		[new SimpleObject(oDeku, 2, 3, 1, 4)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 0, clForest, 0, clPlayer, 15, clBaseResource, 15),
		5 * numPlayers, 100,
		[explorableArea]
	);
	
	group = new SimpleGroup(
		[new SimpleObject(oScrub, 3, 4, 2, 5)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 0, clForest, 0, clPlayer, 15, clBaseResource, 15),
		8 * numPlayers, 100,
		[explorableArea]
	);

	group = new SimpleGroup(
		[new SimpleObject(oBeetle, 1, 1, 0, 4)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 4, clForest, 0, clPlayer, 50),
		scaleByMapSize(3, 12), 200,
		[explorableArea]
	);
	
	group = new SimpleGroup(
		[new SimpleObject(oPikit, 1, 1, 0, 4)],
		false, clFood
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 4, clForest, 0, clPlayer, 50),
		scaleByMapSize(3, 12), 200,
		[explorableArea]
	);

	yield 85;

	g_Map.log("Creating berry bush");
	group = new SimpleGroup(
		[new SimpleObject(oBerryBush, 5, 7, 0, 4)],
		true, clFood
	);
	createObjectGroupsDeprecated(group, 0,
		avoidClasses(clForest, 0, clPlayer, 20, clHill, 4, clFood, 20),
		randIntInclusive(3, 12) * numPlayers + 2, 50
	);
	
	createObjectGroupsByAreasDeprecated(
		group, 0,
		avoidClasses(clForest, 0),
		scaleByMapSize(5, 50), 50,
		[explorableArea]
	);

	yield 90;

	g_Map.log("Creating straggler trees");
	const types = [oOak, oOakLarge, oPine, oAleppoPine];
	const stragglerNum = Math.floor(stragglerTrees / types.length);
	for (const type of types)
		createObjectGroupsByAreasDeprecated(
			new SimpleGroup([new SimpleObject(type, 1, 1, 0, 3)], true, clForest),
			0,
			avoidClasses(
				clForest, 4,
				clHill, 5,
				clPlayer, 10,
				clBaseResource, 2,
				clMetal, 5,
				clRock, 5),
			stragglerNum, 20,
			[explorableArea]);

	yield 95;

	g_Map.log("Creating small deku flowers");
	group = new SimpleGroup(
		[new SimpleObject(aSmallDekuFlower, 1, 2, 0, 1, -Math.PI / 8, Math.PI / 8)]
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 2, clPlayer, 2),
		scaleByMapSize(50, 300), 20,
		[explorableArea]
	);

	g_Map.log("Creating large deku flowers");
	group = new SimpleGroup(
		[new SimpleObject(aLargeDekuFlower, 1, 1, 0, 1, -Math.PI / 8, Math.PI / 8)]
	);
	createObjectGroupsByAreasDeprecated(group, 0,
		avoidClasses(clHill, 2, clPlayer, 2),
		scaleByMapSize(15, 150), 10,
		[explorableArea]
	);

	placePlayersNomad(clPlayer, avoidClasses(clForest, 1, clMetal, 4, clRock, 4, clHill, 4, clFood, 2));

	return g_Map;
}
