/**
 * IMPORTANT: Remember to update session/top_panel/BuildLabel.xml in sync with this.
 */
var g_ProjectInformation = {
	"organizationName": {
		"caption": translate("BLACK FOREST PRODUCTIONS")
	},
	"productLogo": {
		"sprite": "0ADLogo"
	},
	"productBuild": {
		"caption": getBuildString()
	},
	"productDescription": {
		"caption": setStringTags(translate("Alpha V: Lanayru"), { "font": "sans-bold-16" }) + "\n\n" +
			translate("Notice: This mod is under development and their may be errors. Play at your own risk!")
	}
};

var g_CommunityButtons = [
	{
		"caption": translate("Hyrule Website"),
		"tooltip": translate("Click to open HyruleConquest.com in your web browser."),
		"size": "8 100%-148 50%-4 100%-116",
		"onPress": () => {
			openURL("https://hyruleconquest.com/");
		}
	},
	{
		"caption": translate("Chat"),
		"tooltip": translate("Click to open the 0 A.D. IRC chat in your browser (#0ad on webchat.quakenet.org). It is run by volunteers who do all sorts of tasks, it may take a while to get your question answered. Alternatively, you can use the forum (see Website)."),
		"size": "50%+4 100%-148 100%-8 100%-116",
		"onPress": () => {
			openURL("https://webchat.quakenet.org/?channels=0ad");
		}
	},
	{
		"caption": translate("Report a Glitch"),
		"tooltip": translate("Click to visit Hyrule Conquest Help to report a bug, crash, or error."),
		"size": "8 100%-112 50%-4 100%-80",
		"onPress": () => {
			openURL("https://hyruleconquest.com/Help/Errors/");
		}
	},
	{
		"caption": translateWithContext("Frequently Asked Questions", "FAQ"),
		"tooltip": translate("Click to visit the Frequently Asked Questions page in your browser."),
		"size": "50%+4 100%-112 100%-8 100%-80",
		"onPress": () => {
			openURL("https://hyruleconquest.com/Help/FAQ");
		}
	},
	{
		"caption": translate("Donate Rupees"),
		"tooltip": translate("Help with the project expenses by donating."),
		"size": "8 100%-40 100%-8 100%-8",
		"onPress": () => {
			openURL("https:///hyruleconquest.com/Help/Donate/");
		}
	}
];
