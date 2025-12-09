const g_NaturalColor = "255 255 255 255"; // pure white

StatusBars.prototype.AddStealthIcon = function (cmpOverlayRenderer, yoffset)
{
    if (!this.enabled)
        return 0; // dont show this unit if it isnt Selected/Enabled

    //Check if the unit has stealth first
    let cmpVisibility = Engine.QueryInterface(this.entity, IID_Visibility);
    if (cmpVisibility == undefined || cmpVisibility.hasStealth != true)
        return 0;

    // Get the correct icon based on whether the unit is currently stealthed or not
    let iconPath = "art/textures/ui/session/auras/stealth_icon.dds";
    if (cmpVisibility.stealthed == false)
        iconPath = "art/textures/ui/session/auras/stealth_icon_off.dds";

    // World-space offset from the unit's position
    let offset = { "x": 0, "y": +this.template.HeightOffset + yoffset, "z": 0 };
    let iconSize = +this.template.BarWidth * 1.25; // Icon Size
    let xoffset = -iconSize * (1 - 1) * 0.6;
    cmpOverlayRenderer.AddSprite(
        iconPath,
        { "x": xoffset - iconSize / 2, "y": yoffset },
        { "x": xoffset + iconSize / 2, "y": iconSize + yoffset },
        offset,
        g_NaturalColor
    );
    xoffset += iconSize * 1.2;
    return iconSize + this.template.BarHeight / 2;
};
