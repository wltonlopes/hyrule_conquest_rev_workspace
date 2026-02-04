/**
 * IMPORTANT: Remember to update session/top_panel/BuildLabel.xml in sync with this.
 */
var g_ProjectInformation = {
	"organizationName": {
		"caption": translate("BLACK FOREST PRODUCTIONS")
	},
	"organizationLogo": {
		"sprite": "WildfireGamesLogo"
	},
	"productLogo": {
		"sprite": "0ADLogo"
	},
	"productBuild": {
		"caption": getBuildString()
	},
	"productDescription": {
		"caption": setStringTags(translate("Alpha XI: Ganondorf"), { "font": "sans-bold-16" }) + "\n\n" +
			translate("Notice: This mod is under development and their may be errors. Play at your own risk!")
	}
};

var g_CommunityButtons = [
	{
		"caption": translate("Official Discord"),
		"tooltip": translate("Click to open Hyrule Conquest: Revival Discord Server in your web browser."),
		"size": "8 100%-148 50%-4 100%-116",
		"onPress": () => {
			openURL("https://discord.com/invite/EFW7v3G2cg");
		}
	},
	{
		"caption": translate("Official Forum Page"),
		"tooltip": translate("Click to visit the Wildfire Games forum page in your browser."),
		"size": "50%+4 100%-112 100%-8 100%-80",
		"onPress": () => {
			openURL("https://wildfiregames.com/forum/topic/137228-the-return-of-hyrule-conquestmy-revival-of-the-undying-nephalims-mod/");
		}
	},
	{
		"caption": translate("Official Spacebattles"),
		"tooltip": translate("Click to open Hyrule Conquest: Revival Spacebattles thread in your web browser"),
		"size": "50%+4 100%-148 100%-8 100%-116",
		"onPress": () => {
			openURL("https://forums.spacebattles.com/threads/hyrule-conquest-the-final-release-is-out.932454/page-6#post-117160019");
		}
	},
	{
		"caption": translate("Report a Glitch"),
		"tooltip": translate("Click to visit the Hyrule Conquest: Revival Discord Server to report a bug, crash, or error."),
		"size": "8 100%-112 50%-4 100%-80",
		"onPress": () => {
			openURL("https://discord.com/invite/EFW7v3G2cg");
		}
	},
	{
		"caption": translate("Donate Rupees"),
		"tooltip": translate("Help with the project expenses by donating (not yet implemented)."),
		"size": "8 100%-40 100%-8 100%-8",
		"onPress": () => {
			openURL("https:///hyruleconquest.com/Help/Donate/");
		}
	}
];
