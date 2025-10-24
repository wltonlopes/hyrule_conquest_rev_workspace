function setupBiome_aegean()
{
	[g_Gaia.tree1, g_Gaia.tree2] = pickRandom([[
			"gaia/tree/deku_tree_A",
			"gaia/tree/deku_tree_A",
			"gaia/tree/deku_tree_A"
		]]);

	g_Gaia.tree3 = pickRandom([
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A"
	]);

	[g_Gaia.tree4, g_Gaia.tree5] = pickRandom([[
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A",
		"gaia/tree/deku_tree_A"
	]]);

	g_Gaia.fruitBush = pickRandom([
		"gaia/fruit/berry_01",
		"gaia/fruit/grapes"
	]);
}
