var TriggerHelperHC = {};

TriggerHelperHC.PlayUnitSound = function (data)
{
    let cmpUnitAI = Engine.QueryInterface(data.entity, IID_UnitAI);
    if (!cmpUnitAI)
        return;

    cmpUnitAI.PlaySound(data.name);
}

TriggerHelperHC.DestroyEnt = function (ent)
{
    Engine.DestroyEntity(ent);
}

TriggerHelperHC.SetInvulnerability = function (ent, state)
{
    let cmpArmour = Engine.QueryInterface(ent, IID_Resistance);
    if (!cmpArmour)
        return;
    cmpArmour.SetInvulnerability(state);
}

TriggerHelperHC.WalkCommand = function (x, z, entities, playerID, queue, type = "walk")
{
    let cmd = {};
    cmd.type = type;
    cmd.x = x;
    cmd.z = z;
    cmd.entities = entities;
    cmd.queued = queue;
    ProcessCommand(playerID, cmd);
}

TriggerHelperHC.AttackCommand = function (x, z, entities, playerID, queue, type = "attack-walk")
{
    let cmd = {};
    cmd.type = type;
    cmd.x = x;
    cmd.z = z;
    cmd.entities = entities;
    cmd.targetClasses = { "attack": ["Unit", "Structure"] };
    cmd.allowCapture = false;
    cmd.queued = queue;
    ProcessCommand(playerID, cmd);
}

TriggerHelperHC.SetAIStance = function (name, entities, playerID, type = "stance")
{
    let cmd = {};
    cmd.type = type;
    cmd.entities = entities;
    cmd.name = name;
    ProcessCommand(playerID, cmd);
}

TriggerHelperHC.ConstructCommand = function (x, z, angle, template, playerID, type = "construct") {

    let cmd = {};
    cmd.type = type;
    cmd.entities = [this.Agitha];
    cmd.template = template;
    cmd.x = x;
    cmd.z = z;
    cmd.angle = angle;
    cmd.autorepair = angle;
    cmd.autocontinue = angle;
    cmd.queued = angle;
    ProcessCommand(playerID, cmd);
}

TriggerHelperHC.RevealMap = function (data)
{
    let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
    cmpRangeManager.SetLosRevealAll(-1, data.state);
}

TriggerHelperHC.StopCinematicCamera = function (cmpCinemaManager)
{
    cmpCinemaManager.Stop();
}

TriggerHelperHC.UpdateSingle = function (ent)
{
    if (Engine.QueryInterface(ent, IID_Health) == undefined) return ent;
    return undefined;
}

TriggerHelperHC.TrainUnits = function (facility, template) {
    let cmpQueue = Engine.QueryInterface(facility, IID_ProductionQueue);
    if (cmpQueue) {
        cmpQueue.AddItem(template, "unit", 1);
    }
}

TriggerHelperHC.UpdateList = function (list)
{
    let removedIndices = [];
    for (let i = 0; i < list.length; i++) {
        let ent = list[i];
        if (Engine.QueryInterface(ent, IID_Health) == undefined) // could make this based on SetRemove parameter inside the unit arrays later
            removedIndices.push(i);
    }
    this.RemoveIndices(removedIndices, list);
}

// update a given list by deleting removed game elements from it
TriggerHelperHC.RemoveIndices = function (removedIndices, originList)
{
    // while splicing, an element is taken from a list, and every element above it is dropped down by 1 index position
    // this removal system works because the index list provided is always organized from the lowest to the highest index
    // if you take away for example index 8 first, and index 4 afterward, index 4 will be decreased by count and become index 3 instead of 4
    // This is a problem because index 4 actually hasnt been decreased by the removal of index 8, because it only dropped down all elements above index 8 and not below

    let count = 0;
    for (let index of removedIndices)
    {
        let newIndex = +index - +count; // for every element deleted, the indices all go down by 1, so cancel that by adding 1 back for every iteration
        originList.splice(newIndex, 1); // splice element
        count += 1; // keep track of the iteration count for valid splicing
    }
    return originList;
}

TriggerHelperHC.SquareVectorDistance = function (a, b)
{
    return Math.euclidDistance2DSquared(a[0], a[1], b[0], b[1]);
}

/**
* Get all entities within this battalion
*/
TriggerHelperHC.GetBattalion = function (ent, cmpPlayer){
    let cmpBattalion = Engine.QueryInterface(ent, IID_Battalion);
    if(cmpBattalion == undefined)
        return;

    let battalionID = cmpBattalion.ownBattalionID;
    if (battalionID == undefined)
        return;

    return cmpPlayer.allBattalions.get(battalionID);
}

/**
* Filter a selection of entities down to each first individual of a battalion
*/
TriggerHelperHC.RunAsBattalion = function (entities)
{
    let BattalionIndices = [];
    for (let ent of entities) // get all the battalions present in the selection of entities
    {
        let cmpBattalion = Engine.QueryInterface(ent, IID_Battalion);
        if(cmpBattalion == undefined)
            continue;

        let battalionID = cmpBattalion.ownBattalionID;
        if (battalionID == undefined)
            continue;

        if (BattalionIndices.indexOf(battalionID) == -1) // this battalion wasnt added yet,
            BattalionIndices.push(battalionID); // so push to the indices list
    }
    let allBattalions = QueryOwnerInterface(entities[0]).allBattalions;
    let entityList = [];
    for (let index of BattalionIndices) // make a new list of every first entity inside the battalions and return that as the result 
    {
        let entity = allBattalions.get(index);
        if (entity != undefined) // it could be that the battalion was destroyed, but not yet removed
            entityList.push(entity[0]);
    }

    return entityList;
}

// spawns a full battalion and returns the entities within it
TriggerHelperHC.SpawnBattalion = function (template, owner, x, z, actorseed = -1)
{
    let ent = Engine.AddEntity(template);
    let cmpEntPosition = Engine.QueryInterface(ent, IID_Position);
    if (!cmpEntPosition) { Engine.DestroyEntity(ent); return; }

    let cmpEntOwnership = Engine.QueryInterface(ent, IID_Ownership);
    if (cmpEntOwnership)
        cmpEntOwnership.SetOwner(owner);

    let cmpPlayer = QueryOwnerInterface(ent);
    if (!cmpPlayer) { 
        Engine.DestroyEntity(ent); 
        return; 
    }

    let battalionID = cmpPlayer.AddBattalion([ent], actorseed);
    cmpEntPosition.JumpTo(x, z);
    cmpPlayer.ReplenishBattalionToFull(battalionID);
    return this.GetBattalion(ent, cmpPlayer);
}

// spawns (and potentially destroys) a vision object for a player at a specific location
TriggerHelperHC.SpawnVision = function (data)
{
    let ent = Engine.AddEntity("other/map_revealer_" + data.size); // small, medium or large
    let cmpEntPosition = Engine.QueryInterface(ent, IID_Position);
    if (!cmpEntPosition) {
        Engine.DestroyEntity(ent);
        return;
    }

    let cmpEntOwnership = Engine.QueryInterface(ent, IID_Ownership);
    if (cmpEntOwnership)
        cmpEntOwnership.SetOwner(data.owner);

    cmpEntPosition.JumpTo(data.x, data.z);

    if (data.resetDelay > 0)
        Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger).DoAfterDelay(data.resetDelay, "DestroyEnt", ent);

    return ent;
}

TriggerHelperHC.GetPlayerEntitiesByName = function(name, playerID)
{
    let entities = TriggerHelper.GetEntitiesByPlayer(playerID);
    let entsWithName = [];
    for(let ent of entities){
        let cmpIdentity = Engine.QueryInterface(ent, IID_Identity);
        if(cmpIdentity && cmpIdentity.GetGenericName() == name){
            entsWithName.push(ent);
        }          
    }

    return entsWithName;
};

Engine.RegisterGlobal("TriggerHelperHC", TriggerHelperHC);