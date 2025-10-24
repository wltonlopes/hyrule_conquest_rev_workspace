var g_SplashScreenFile = "gui/HC_docs/HC_info.md";

function init(data)
{
	Engine.GetGUIObjectByName("mainText").caption = Engine.TranslateLines(Engine.ReadFile(g_SplashScreenFile));
}

function closePage()
{
	Engine.PopGuiPage();
}
