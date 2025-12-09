Attack.prototype.GetKnockback = function (type, isSplash)
{
    if (!isSplash)
    {
        let Knockback = this.template[type].Knockback;
        if (Knockback)
        {
            let horizontal = ApplyValueModificationsToEntity("Attack/" + type + "/Knockback/Horizontal", +Knockback.Horizontal, this.entity);

            let vertical = Knockback.Vertical;
            if (vertical)
                vertical = ApplyValueModificationsToEntity("Attack/" + type + "/Knockback/Vertical", +vertical, this.entity);

            return { "horizontal": horizontal, "vertical": vertical };
        }
    }
    else
    {
        let Knockback = this.template[type]["Splash"].Knockback;
        if (Knockback)
        {
            let horizontal = ApplyValueModificationsToEntity("Attack/" + type + "/Splash/Knockback/Horizontal", +Knockback.Horizontal, this.entity);

            let vertical = Knockback.Vertical;
            if (vertical)
                vertical = ApplyValueModificationsToEntity("Attack/" + type + "/Splash/Knockback/Vertical", +vertical, this.entity);

            return { "horizontal": horizontal, "vertical": vertical };
        }
    }

    return null;
}

Attack.prototype.GetStun = function (type, isSplash)
{
    if (!isSplash)
    {
        let Stun = this.template[type].Stun;
        if (Stun)
        {
            let time = ApplyValueModificationsToEntity("Attack/" + type + "/Stun/Time", +Stun.Time, this.entity);
            let chance = ApplyValueModificationsToEntity("Attack/" + type + "/Stun/Chance", +Stun.Chance, this.entity);
            return { "time": time, "chance": chance };
        }
    }
    else
    {
        let Stun = this.template[type]["Splash"].Stun;
        if (Stun)
        {
            let time = ApplyValueModificationsToEntity("Attack/" + type + "/Splash/Stun/Time", +Stun.Time, this.entity);
            let chance = ApplyValueModificationsToEntity("Attack/" + type + "/Splash/Stun/Chance", +Stun.Chance, this.entity);
            return { "time": time, "chance": chance };
        }
    }

    return null;
};
