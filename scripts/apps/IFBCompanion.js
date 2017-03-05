var nKey = "normalBosses";
var pKey = "preferredBosses";
var bKey = "bannedBosses";

var allBosses = [
    "Araxxi",
    "Helwyr",
    "Chaos Elemental",
    "Commander Zilyana",
    "King Black Dragon",
    "Kree'arra",
    "Kalphite King",
    "General Graardor",
    "Vorago",
    "Har-Aken",
    "Nex",
    "Nex: AoD",
    "Telos",
    "Corporeal Beast",
    "DKS",
    "Twin Furies",
    "Giant Mole",
    "Gregorovic",
    "Legiones",
    "Queen Black Dragon",
    "Vindicta and Gorvek",
    "K'ril Tsutsaroth",
    "Kalphite Queen"
];


var normalBosses = null;
var preferredBosses = null;
var bannedBosses = null;

var prefer = function (bossList, bossName) {
    moveBoss(bossList, preferredBosses, bossName);
};

var ban = function (bossList, bossName) {
    moveBoss(bossList, bannedBosses, bossName);
};

var reset = function (bossList, bossName){
    moveBoss(bossList, normalBosses, bossName);
};

var moveBoss = function (src, dest, name){
    var srcI = src.indexOf(name);
    var destI = dest.indexOf(name);
    if (srcI == -1) return;
    src = src.splice(srcI, 1);
    if (destI != -1) return;
    dest.push(name);
};

var save = function () {
    localStorage[pKey] = JSON.stringify(preferredBosses);
    localStorage[nKey] = JSON.stringify(normalBosses);
    localStorage[bKey] = JSON.stringify(bannedBosses);

};

var load = function () {
    normalBosses = JSON.parse(localStorage[nKey]);
    preferredBosses = JSON.parse(localStorage[pKey]);
    bannedBosses = JSON.parse(localStorage[bKey]);
    if (normalBosses == null) normalBosses = allBosses;
    if (preferredBosses == null) preferredBosses = [];
    if (bannedBosses == null) bannedBosses = [];
};

var clear = function () {
    localStorage[pKey] = null;
    localStorage[nKey] = null;
    localStorage[bKey] = null;
};

var pickRandom = function () {
    var nSize = normalBosses.length;
    var pSize = preferredBosses.length;

    var totalWeight = nSize + pSize*2;

    var randomPick = Math.floor(Math.random() * totalWeight);

    var isNormal = randomPick < nSize;

    var index = isNormal ? randomPick : Math.floor((randomPick - nSize) / 2);

    return isNormal ? normalBosses[index] + ":n" : preferredBosses[index] + ":p";
};