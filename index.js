"use strict";

/*
===============================================================
💥┇𝐌𝐈𝐂𝐑𝐎𝐇𝐀𝐗 𝐋𝐄𝐀𝐆𝐔𝐄 #500
===============================================================

Node.js HaxBall public room.

SYSTEMS
───────────────────────────────────────────────────────────────
• User / VIP / Staff / Developer / Owner
• Micro Coins
• Daily rewards
• Shop
• Payments
• XP
• Levels
• ELO
• Ranking
• Wins / Losses
• Goals / Assists
• Pick system
• Captains
• Snake pick
• Auto balance
• Warnings
• Mute
• Kick
• Ban / Unban
• Anti spam
• Anti AFK
• Profiles
• Persistent database
• VIP expiration
• Maps x1 / x3 / x4
• Dynamic map switching
• Automatic token file
• 30 players
• Persistent levels / titles / achievements / missions / streaks

FIRST START
───────────────────────────────────────────────────────────────
If .hbtoken doesn't exist:
1. Official HaxBall token page opens.
2. Paste your token into the console.
3. Script saves it automatically.
4. From then on, npm start is enough.

===============================================================
*/

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");

const HaxballJS = require("haxball.js").default;


/* ============================================================
   CONFIG
============================================================ */

const CONFIG = {

    roomName:
        "💥┇𝐌𝐈𝐂𝐑𝐎𝐇𝐀𝐗 𝐋𝐄𝐀𝐆𝐔𝐄  #500",

    maxPlayers: 30,

    maxQueuePlayers: 20,

    queueTimeoutMs: 10 * 60 * 1000,

    discordAnnouncementInterval: 5 * 60 * 1000,

    pubMode: {
        enabled: true,
        modes: {
            2: { players: 4, map: "x1" },
            3: { players: 6, map: "x3" },
            4: { players: 8, map: "x4" },
            5: { players: 10, map: "x5" }
        },
        intermissionMs: 8000
    },

    pick: {
        minPlayers: 4,
        maxPlayers: 10
    },

    pub: {
        enabled: true,
        autoBalance: true,
        resetTeamsAfterMatch: true
    },

    elo: {
        kFactor: 32,
        minChange: 5,
        maxChange: 48
    },

    public: false,

    noPlayer: false,

    password: "microadm",

    prefix: "!",

    tokenFile:
        path.join(__dirname, ".hbtoken"),

    databaseFile:
        path.join(__dirname, "microhax-data.json"),

    stadiums: [
        "x1",
        "x3",
        "x4"
    ],

    defaultStadium: "x3",

    scoreLimit: 5,

    timeLimit: 3,


    discordInvite:
        "discord.gg/microhaxleague",

    discordAnnouncementInterval:
        5 * 60 * 1000,

    levelBaseXP:
        500,

    levelGrowth:
        1.12,

    maxLevel:
        100,

    dailyReward: 150,

    winReward: 75,

    participationReward: 15,

    goalReward: 20,

    assistReward: 15,

    XP: {
        match: 25,
        goal: 30,
        assist: 20,
        win: 100
    },

    dailyCooldown:
        24 * 60 * 60 * 1000,

    antiSpamWindow: 5000,

    antiSpamCount: 5,

    afkTime: 120000,

    warningsBeforeKick: 3,

    defaultElo: 1000,

    roles: {
        User: 0,
        VIP: 1,
        Staff: 2,
        Developer: 3,
        Owner: 4
    },

    colors: {
        user: 0xFFFFFF,
        vip: 0xD06CFF,
        staff: 0x55AAFF,
        developer: 0xFF55FF,
        owner: 0xFFAA00,
        success: 0x55FF55,
        warning: 0xFFFF55,
        error: 0xFF5555
    },

    /*
    ===========================================================
    PUT AUTH IDS HERE
    ===========================================================
    */

    owners: [
        "hkaQV9LPkf4uirgGactkB2wp8HLniYSlk-JCUhyl2Ok"
    ],

    developers: [
        "H_k10szJ8trh7qtgtzrI5EU6luiKbMVFDqtfWOUFaMQ"
    ],

    staff: [
        "-7ZWvv1ey6iMzwAO3QOc9FfPF6pZ1SMGwfeXn8h5-_U"
    ],

    vip: [
        // "VIP_AUTH"
    ]
};


/* ============================================================
   TEMP MAPS
   Later you can replace the values with your real maps.
============================================================ */

const MAPS = {
    train: '{"name":"𝘔𝘐𝘊𝘙𝘖𝘏𝘈𝘟 𝘚𝘛𝘈𝘋𝘐𝘜𝘔 (X1)_𝕄𝕀ℂℝ𝕆","width":500,"height":315,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[[-200,0]],"blueSpawnPoints":[[200,0]],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"0A0A0A","type":"none","height":315,"width":500,"kickOffRadius":95,"cornerRadius":0},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":-400,"y":-200,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","vis":true,"color":"292929","bias":0,"curve":0},{"x":400,"y":-200,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","bias":10,"curve":0},{"x":-400,"y":200,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929","vis":true,"curve":0,"bias":10},{"x":400,"y":200,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","vis":true,"curve":0},{"x":0,"y":-200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","curve":0},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"70674d","vis":false,"curve":87.5},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"c2c1be","vis":false,"curve":-87.5},{"x":0,"y":200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","vis":false},{"x":-400,"y":-82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"9e8f65","vis":true,"bias":10},{"x":-400,"y":82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"c2c1be","vis":true,"bias":10},{"x":-450,"y":-82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":-450,"y":82.1701829632,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":400,"y":-82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be","bias":10,"_data":{"mirror":{}},"_selected":true},{"x":450,"y":-82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":450,"y":82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":400,"y":82,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"9e8f65","_data":{"mirror":{}},"_selected":true},{"x":-53.74028800000002,"y":-43.74028800000001,"cMask":["c0"],"color":"9e8f65"},{"x":-53.74028800000002,"y":46.25971199999999,"cMask":["c0"],"color":"9e8f65"},{"x":-33.74028800000002,"y":26.259711999999993,"cMask":["c0"],"color":"70674d"},{"x":-33.74028800000002,"y":-8.740288000000007,"cMask":["c0"],"color":"635d4c"},{"x":-13.740288000000021,"y":-13.740288000000007,"cMask":["c0"],"color":"807352"},{"x":-13.740288000000021,"y":11.259711999999993,"cMask":["c0"],"color":"635d4c"},{"x":21.25971199999998,"y":-43.74028800000001,"cMask":["c0"],"color":"807352"},{"x":1.259711999999979,"y":-8.740288000000007,"cMask":["c0"],"color":"524e43"},{"x":1.259711999999979,"y":11.259711999999993,"cMask":["c0"],"color":"524e43"},{"x":21.25971199999998,"y":-3.7402880000000067,"cMask":["c0"],"color":"736641"},{"x":1.259711999999979,"y":26.259711999999993,"cMask":["c0"],"color":"b3b3b3"},{"x":36.25971199999998,"y":1.2597119999999933,"cMask":["c0"],"color":"b3b3b3"},{"x":1.259711999999979,"y":66.259712,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":21.25971199999998,"y":51.25971199999999,"cMask":["c0"],"color":"c9c9e7"},{"x":21.25971199999998,"y":28.759711999999993,"cMask":["c0"],"color":"c9c9e7"},{"x":36.25971199999998,"y":18.759711999999993,"cMask":["c0"],"color":"b0b0b0"},{"x":36.25971199999998,"y":46.25971199999999,"cMask":["c0"],"color":"969696"},{"x":56.25971199999998,"y":31.259711999999993,"cMask":["c0"],"color":"969696"},{"x":56.25971199999998,"y":-43.74028800000001,"cMask":["c0"],"color":"969696"},{"x":36.25971199999998,"y":-28.740288000000007,"cMask":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":57.170182963200006,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":-62.829817036799994,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":310,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","vis":false},{"x":-400.79944325897463,"y":-32.829817036799994,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":27.170182963200006,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":-2.8298170367999944,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-310,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","curve":0},{"x":399.3191269277625,"y":56.67974171291813,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-63.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-33.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":26.67974171291813,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-3.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":-80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":-400.925925925926,"y":-76.85185185185186,"_data":{"mirror":{}},"_selected":true},{"x":-400.925925925926,"y":76.85185185185186,"_data":{"mirror":{}},"_selected":true}],"segments":[{"v0":0,"v1":1,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":0,"y":-400},{"v0":2,"v1":3,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":400},{"v0":4,"v1":5,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":6,"v1":7,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":5,"v1":6,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":6,"v1":5,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":8,"v1":10,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-90},{"v0":10,"v1":11,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"x":-850},{"v0":11,"v1":9,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":0,"v1":8,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":12,"v1":13,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-85},{"v0":14,"v1":13,"curve":-45.27334332380445,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":9,"v1":2,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":16,"v1":17,"color":"9e8f65","cMask":["c0"],"x":-55},{"v0":17,"v1":18,"color":"9e8f65","cMask":["c0"]},{"v0":18,"v1":19,"color":"70674d","cMask":["c0"],"x":-35},{"v0":16,"v1":20,"color":"9e8f65","cMask":["c0"]},{"v0":19,"v1":21,"color":"635d4c","cMask":["c0"]},{"v0":20,"v1":22,"color":"807352","cMask":["c0"]},{"v0":21,"v1":23,"color":"70674d","cMask":["c0"]},{"v0":23,"v1":24,"color":"524e43","cMask":["c0"]},{"v0":22,"v1":25,"color":"736641","cMask":["c0"],"x":20},{"v0":24,"v1":25,"color":"5c502f","cMask":["c0"]},{"v0":26,"v1":27,"color":"b3b3b3","cMask":["c0"]},{"v0":26,"v1":28,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":28,"v1":29,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":29,"v1":30,"color":"c9c9e7","cMask":["c0"],"x":20},{"v0":30,"v1":31,"color":"b0b0b0","cMask":["c0"]},{"v0":31,"v1":32,"color":"969696","cMask":["c0"],"x":35},{"v0":32,"v1":33,"color":"b0b0b0","cMask":["c0"]},{"v0":33,"v1":34,"color":"969696","cMask":["c0"],"x":55},{"v0":35,"v1":34,"color":"c2c1be","cMask":["c0"]},{"v0":27,"v1":35,"color":"c2c1be","cMask":["c0"]},{"v0":12,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":9,"v1":36,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":37,"v1":8,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":9,"v1":2,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":12,"v1":1,"curve":0,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","x":795},{"v0":7,"v1":38,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":8,"v1":0,"vis":false,"color":"292929","cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":37,"v1":39,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":36,"v1":40,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":39,"v1":41,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":41,"v1":40,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":4,"v1":42,"curve":0,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":3,"v1":15,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":15,"v1":14,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":15,"v1":3,"curve":0,"vis":false,"color":"292929","cMask":["ball"]},{"v0":44,"v1":45,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":43,"v1":46,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":45,"v1":47,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":47,"v1":46,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":15,"v1":43,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":44,"v1":12,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":48,"v1":49,"curve":179.5916274174583,"vis":true,"color":"292929","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":50,"v1":51,"curve":-180.23934894619043,"vis":true,"color":"292929","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":52,"v1":53,"_data":{"mirror":{},"arc":{"a":[-400.925925925926,-76.85185185185186],"b":[-400.925925925926,76.85185185185186],"radius":null,"center":[null,null],"from":null,"to":null}},"_selected":true},{"v0":12,"v1":15,"_data":{"mirror":{},"arc":{"a":[400,-82],"b":[400,82],"radius":null,"center":[null,null],"from":null,"to":null}},"_selected":true}],"goals":[{"p0":[399.3191269277625,81.67974171291813],"p1":[399.3191269277625,-88.32025828708187],"team":"blue","color":"292929"},{"p0":[-400.79944325897463,-87.8298170368],"p1":[-400.79944325897463,82.1701829632],"team":"red","color":"979C76"}],"discs":[{"radius":5,"invMass":0,"pos":[-400,82],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[400,-200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[400,200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":5,"invMass":0,"pos":[-400,-82],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[400,-82],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[400,82],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[-400,-200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":4,"pos":[-400,200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345}],"planes":[{"normal":[0,1],"dist":-200.12656741407514,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"423255","_data":{"extremes":{"normal":[0,1],"dist":-200.12656741407514,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[-618.8399999999999,-200.12656741407514],"b":[618.8399999999999,-200.12656741407514]}}},{"normal":[0,-1],"dist":-200.13371594388823,"bCoef":1,"cMask":["ball"],"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-200.13371594388823,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[-618.8399999999999,200.13371594388823],"b":[618.8399999999999,200.13371594388823]}}},{"normal":[1,0],"dist":-482.9862137430322,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[1,0],"dist":-482.9862137430322,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[-482.9862137430322,-340.19999999999993],"b":[-482.9862137430322,340.19999999999993]}}},{"normal":[0,-1],"dist":-310,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-310,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[-618.8399999999999,310],"b":[618.8399999999999,310]}}},{"normal":[0,1],"dist":-310,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[0,1],"dist":-310,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[-618.8399999999999,-310],"b":[618.8399999999999,-310]}}},{"normal":[-1,0],"dist":-474.1746328702592,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[-1,0],"dist":-474.1746328702592,"canvas_rect":[-618.8399999999999,-340.19999999999993,618.8399999999999,340.19999999999993],"a":[474.1746328702592,-340.19999999999993],"b":[474.1746328702592,340.19999999999993]}}}],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.01,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.11,"gravity":[0,0],"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":6,"bCoef":0.4,"cMask":["all"],"damping":0.991,"invMass":1.3,"gravity":[0,0],"color":"ededeb","cGroup":["ball"]}}',
    x1: '{"name":"𝘔𝘐𝘊𝘙𝘖𝘏𝘈𝘟 𝘚𝘛𝘈𝘋𝘐𝘜𝘔 (X1)_𝕄𝕀ℂℝ𝕆","width":500,"height":315,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[[-200,0]],"blueSpawnPoints":[[200,0]],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"0A0A0A","type":"none","height":315,"width":500,"kickOffRadius":95,"cornerRadius":0},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":-400,"y":-200,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","vis":true,"color":"292929","bias":0,"curve":0},{"x":400,"y":-200,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","bias":10,"curve":0},{"x":-400,"y":200,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929","vis":true,"curve":0,"bias":10},{"x":400,"y":200,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","vis":true,"curve":0},{"x":0,"y":-200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","curve":0},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"70674d","vis":false,"curve":87.5},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"c2c1be","vis":false,"curve":-87.5},{"x":0,"y":200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","vis":false},{"x":-400,"y":-82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"9e8f65","vis":true,"bias":10},{"x":-400,"y":82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"c2c1be","vis":true,"bias":10},{"x":-450,"y":-82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":-450,"y":82.1701829632,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":400,"y":-82,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be","bias":10},{"x":450,"y":-82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":450,"y":82,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":400,"y":82,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"9e8f65"},{"x":-53.74028800000002,"y":-43.74028800000001,"cMask":["c0"],"color":"9e8f65"},{"x":-53.74028800000002,"y":46.25971199999999,"cMask":["c0"],"color":"9e8f65"},{"x":-33.74028800000002,"y":26.259711999999993,"cMask":["c0"],"color":"70674d"},{"x":-33.74028800000002,"y":-8.740288000000007,"cMask":["c0"],"color":"635d4c"},{"x":-13.740288000000021,"y":-13.740288000000007,"cMask":["c0"],"color":"807352"},{"x":-13.740288000000021,"y":11.259711999999993,"cMask":["c0"],"color":"635d4c"},{"x":21.25971199999998,"y":-43.74028800000001,"cMask":["c0"],"color":"807352"},{"x":1.259711999999979,"y":-8.740288000000007,"cMask":["c0"],"color":"524e43"},{"x":1.259711999999979,"y":11.259711999999993,"cMask":["c0"],"color":"524e43"},{"x":21.25971199999998,"y":-3.7402880000000067,"cMask":["c0"],"color":"736641"},{"x":1.259711999999979,"y":26.259711999999993,"cMask":["c0"],"color":"b3b3b3"},{"x":36.25971199999998,"y":1.2597119999999933,"cMask":["c0"],"color":"b3b3b3"},{"x":1.259711999999979,"y":66.259712,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":21.25971199999998,"y":51.25971199999999,"cMask":["c0"],"color":"c9c9e7"},{"x":21.25971199999998,"y":28.759711999999993,"cMask":["c0"],"color":"c9c9e7"},{"x":36.25971199999998,"y":18.759711999999993,"cMask":["c0"],"color":"b0b0b0"},{"x":36.25971199999998,"y":46.25971199999999,"cMask":["c0"],"color":"969696"},{"x":56.25971199999998,"y":31.259711999999993,"cMask":["c0"],"color":"969696"},{"x":56.25971199999998,"y":-43.74028800000001,"cMask":["c0"],"color":"969696"},{"x":36.25971199999998,"y":-28.740288000000007,"cMask":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":57.170182963200006,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":-62.829817036799994,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":310,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","vis":false},{"x":-400.79944325897463,"y":-32.829817036799994,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":27.170182963200006,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-400.79944325897463,"y":-2.8298170367999944,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-310,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","curve":0},{"x":399.3191269277625,"y":56.67974171291813,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-63.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-33.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":26.67974171291813,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":399.3191269277625,"y":-3.32025828708187,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":-80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"x":0,"y":80,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"}],"segments":[{"v0":0,"v1":1,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":0,"y":-400},{"v0":2,"v1":3,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":400},{"v0":4,"v1":5,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":6,"v1":7,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":5,"v1":6,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":6,"v1":5,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":8,"v1":10,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-90},{"v0":10,"v1":11,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"x":-850},{"v0":11,"v1":9,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":0,"v1":8,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":12,"v1":13,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-85},{"v0":14,"v1":13,"curve":-45.27334332380445,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":9,"v1":2,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":16,"v1":17,"color":"9e8f65","cMask":["c0"],"x":-55},{"v0":17,"v1":18,"color":"9e8f65","cMask":["c0"]},{"v0":18,"v1":19,"color":"70674d","cMask":["c0"],"x":-35},{"v0":16,"v1":20,"color":"9e8f65","cMask":["c0"]},{"v0":19,"v1":21,"color":"635d4c","cMask":["c0"]},{"v0":20,"v1":22,"color":"807352","cMask":["c0"]},{"v0":21,"v1":23,"color":"70674d","cMask":["c0"]},{"v0":23,"v1":24,"color":"524e43","cMask":["c0"]},{"v0":22,"v1":25,"color":"736641","cMask":["c0"],"x":20},{"v0":24,"v1":25,"color":"5c502f","cMask":["c0"]},{"v0":26,"v1":27,"color":"b3b3b3","cMask":["c0"]},{"v0":26,"v1":28,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":28,"v1":29,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":29,"v1":30,"color":"c9c9e7","cMask":["c0"],"x":20},{"v0":30,"v1":31,"color":"b0b0b0","cMask":["c0"]},{"v0":31,"v1":32,"color":"969696","cMask":["c0"],"x":35},{"v0":32,"v1":33,"color":"b0b0b0","cMask":["c0"]},{"v0":33,"v1":34,"color":"969696","cMask":["c0"],"x":55},{"v0":35,"v1":34,"color":"c2c1be","cMask":["c0"]},{"v0":27,"v1":35,"color":"c2c1be","cMask":["c0"]},{"v0":12,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":9,"v1":36,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":37,"v1":8,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":9,"v1":2,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":12,"v1":1,"curve":0,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","x":795},{"v0":7,"v1":38,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":8,"v1":0,"vis":false,"color":"292929","cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":37,"v1":39,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":36,"v1":40,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":39,"v1":41,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":41,"v1":40,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":4,"v1":42,"curve":0,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":3,"v1":15,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":15,"v1":14,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":15,"v1":3,"curve":0,"vis":false,"color":"292929","cMask":["ball"]},{"v0":44,"v1":45,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":43,"v1":46,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":45,"v1":47,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":47,"v1":46,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":15,"v1":43,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":44,"v1":12,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":48,"v1":49,"curve":179.5916274174583,"vis":true,"color":"292929","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":50,"v1":51,"curve":-180.23934894619043,"vis":true,"color":"292929","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"}],"goals":[{"p0":[399.3191269277625,81.67974171291813],"p1":[399.3191269277625,-88.32025828708187],"team":"blue","color":"292929"},{"p0":[-400.79944325897463,-87.8298170368],"p1":[-400.79944325897463,82.1701829632],"team":"red","color":"979C76"}],"discs":[{"radius":5,"invMass":0,"pos":[-400,82],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[400,-200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[400,200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":5,"invMass":0,"pos":[-400,-82],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[400,-82],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[400,82],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[-400,-200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":4,"pos":[-400,200],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345}],"planes":[{"normal":[0,1],"dist":-200.12656741407514,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"423255"},{"normal":[0,-1],"dist":-200.13371594388823,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"normal":[1,0],"dist":-482.9862137430322,"bCoef":0,"cMask":["all"],"cGroup":["ball"]},{"normal":[0,-1],"dist":-310,"cMask":["all"]},{"normal":[0,1],"dist":-310,"bCoef":0,"cMask":["all"],"cGroup":["ball"]},{"normal":[-1,0],"dist":-474.1746328702592,"bCoef":0,"cMask":["all"],"cGroup":["ball"]}],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.01,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.11,"gravity":[0,0],"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":6,"bCoef":0.4,"cMask":["all"],"damping":0.991,"invMass":1.3,"gravity":[0,0],"color":"ededeb","cGroup":["ball"]}}',
    x3: '{"name":"ðððððððð ððððððð|Haxgoal","width":900,"height":425,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[[-330,385]],"blueSpawnPoints":[[330,385]],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"0A0A0A","type":"none","height":346,"width":793,"kickOffRadius":95,"cornerRadius":0},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":-795,"y":-345,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","vis":true,"color":"292929","bias":0},{"x":795,"y":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","bias":10,"curve":0},{"x":-795,"y":345,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929","vis":true,"curve":0,"bias":10},{"x":795,"y":345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","vis":true,"curve":0},{"x":0,"y":-345,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929"},{"x":0,"y":-95,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"70674d","vis":false,"curve":87.5},{"x":0,"y":95,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"c2c1be","vis":false,"curve":-87.5},{"x":0,"y":345,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","vis":false},{"x":-795,"y":-85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"9e8f65","vis":true,"bias":10},{"x":-795,"y":85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"c2c1be","vis":true,"bias":10},{"x":-850,"y":-85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":-850,"y":85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":795,"y":-85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be","bias":10},{"x":845,"y":-85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":845,"y":85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":-95,"y":-5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"a89b76","curve":87.5},{"x":95,"y":-5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"5c502f","curve":87.5},{"x":-75,"y":-7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":175,"color":"a89b76"},{"x":75,"y":-7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":175,"color":"5c502f"},{"x":-95,"y":5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-87.5,"color":"ededed"},{"x":-75,"y":7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-175,"color":"ededed"},{"x":95,"y":5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-87.5,"color":"8f8f8f"},{"x":75,"y":7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"8f8f8f","curve":-175},{"x":-795,"y":-305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":795,"y":-305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":-795,"y":305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":795,"y":305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":-755,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":755,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":-755,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":755,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":795,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":420,"y":-345,"cMask":["c0"],"cGroup":["c0"],"curve":0,"color":"292929"},{"x":-420,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":795,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":420,"y":345,"cMask":["c0"],"cGroup":["c0"],"curve":0,"color":"292929"},{"x":-420,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":710,"y":-130,"cMask":["c0"],"cGroup":["c0"],"curve":-60,"color":"292929"},{"x":710,"y":130,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-60},{"x":420,"y":-95,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-80},{"x":420,"y":95,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-80},{"x":-420,"y":-95,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","curve":80,"_data":{"mirror":{}}},{"x":-420,"y":95,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","curve":80,"_data":{"mirror":{}}},{"x":-550,"y":0,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929"},{"x":-555,"y":0,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929"},{"x":795,"y":85,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"9e8f65"},{"x":-55,"y":-45,"cMask":["c0"],"color":"9e8f65"},{"x":-55,"y":45,"cMask":["c0"],"color":"9e8f65"},{"x":-35,"y":25,"cMask":["c0"],"color":"70674d"},{"x":-35,"y":-10,"cMask":["c0"],"color":"635d4c"},{"x":-15,"y":-15,"cMask":["c0"],"color":"807352"},{"x":-15,"y":10,"cMask":["c0"],"color":"635d4c"},{"x":20,"y":-45,"cMask":["c0"],"color":"807352"},{"x":0,"y":-10,"cMask":["c0"],"color":"524e43"},{"x":0,"y":10,"cMask":["c0"],"color":"524e43"},{"x":20,"y":-5,"cMask":["c0"],"color":"736641"},{"x":0,"y":25,"cMask":["c0"],"color":"b3b3b3"},{"x":35,"y":0,"cMask":["c0"],"color":"b3b3b3"},{"x":0,"y":65,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":20,"y":50,"cMask":["c0"],"color":"c9c9e7"},{"x":20,"y":27.5,"cMask":["c0"],"color":"c9c9e7"},{"x":35,"y":17.5,"cMask":["c0"],"color":"b0b0b0"},{"x":35,"y":45,"cMask":["c0"],"color":"969696"},{"x":55,"y":30,"cMask":["c0"],"color":"969696"},{"x":55,"y":-45,"cMask":["c0"],"color":"969696"},{"x":35,"y":-30,"cMask":["c0"],"color":"c2c1be"},{"x":-795,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":180},{"x":-710,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":-60},{"x":-710,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":-60},{"x":-795,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"x":-795,"y":60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":-60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":425,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","vis":false},{"x":-795,"y":-30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-425,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"x":795,"y":60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":-60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":-30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":550,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"292929"},{"x":555,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"292929"}],"segments":[{"v0":0,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":0,"y":-345},{"v0":2,"v1":3,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":345},{"v0":4,"v1":5,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":6,"v1":7,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":5,"v1":6,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":6,"v1":5,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":8,"v1":10,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-90},{"v0":10,"v1":11,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"x":-850},{"v0":11,"v1":9,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":0,"v1":8,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":12,"v1":13,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-85},{"v0":14,"v1":13,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":9,"v1":2,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":17,"v1":15,"curve":0,"vis":true,"color":"a89b76","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","y":0},{"v0":18,"v1":16,"curve":0,"vis":true,"color":"5c502f","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":17,"v1":18,"curve":175,"vis":true,"color":"9e8f65","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":19,"v1":20,"curve":0,"vis":true,"color":"ededed","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":22,"v1":21,"curve":0,"vis":true,"color":"8f8f8f","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":23,"v1":27,"curve":-90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":24,"v1":28,"curve":90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":25,"v1":29,"curve":90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":26,"v1":30,"curve":-90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":32,"v1":35,"curve":0,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":420},{"v0":36,"v1":33,"curve":0,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":31,"v1":37,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-200},{"v0":34,"v1":38,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":200},{"v0":37,"v1":38,"curve":-60,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":640},{"v0":39,"v1":40,"curve":-80,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":420},{"v0":41,"v1":42,"curve":74.63559491093426,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"_data":{"mirror":{},"arc":{"a":[-420,-95],"b":[-420,95],"curve":74.63559491093426,"radius":156.704788136802,"center":[-544.625,0],"from":-0.6513184351902633,"to":0.6513184351902633}}},{"v0":43,"v1":44,"curve":0,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":43,"v1":44,"curve":180,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":43,"v1":44,"curve":-180,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":20,"v1":22,"curve":-175,"vis":true,"color":"b3b3b3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":46,"v1":47,"color":"9e8f65","cMask":["c0"],"x":-55},{"v0":47,"v1":48,"color":"9e8f65","cMask":["c0"]},{"v0":48,"v1":49,"color":"70674d","cMask":["c0"],"x":-35},{"v0":46,"v1":50,"color":"9e8f65","cMask":["c0"]},{"v0":49,"v1":51,"color":"635d4c","cMask":["c0"]},{"v0":50,"v1":52,"color":"807352","cMask":["c0"]},{"v0":51,"v1":53,"color":"70674d","cMask":["c0"]},{"v0":53,"v1":54,"color":"524e43","cMask":["c0"]},{"v0":52,"v1":55,"color":"736641","cMask":["c0"],"x":20},{"v0":54,"v1":55,"color":"5c502f","cMask":["c0"]},{"v0":56,"v1":57,"color":"b3b3b3","cMask":["c0"]},{"v0":56,"v1":58,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":58,"v1":59,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":59,"v1":60,"color":"c9c9e7","cMask":["c0"],"x":20},{"v0":60,"v1":61,"color":"b0b0b0","cMask":["c0"]},{"v0":61,"v1":62,"color":"969696","cMask":["c0"],"x":35},{"v0":62,"v1":63,"color":"b0b0b0","cMask":["c0"]},{"v0":63,"v1":64,"color":"969696","cMask":["c0"],"x":55},{"v0":65,"v1":64,"color":"c2c1be","cMask":["c0"]},{"v0":57,"v1":65,"color":"c2c1be","cMask":["c0"]},{"v0":15,"v1":5,"curve":87.5,"vis":true,"color":"70674d","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":5,"v1":16,"curve":87.5,"vis":true,"color":"736641","cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":19,"v1":6,"curve":-87.5,"vis":true,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":6,"v1":21,"curve":-87.5,"vis":true,"color":"969696","cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":66,"v1":67,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":200},{"v0":67,"v1":68,"curve":-60,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"x":-640},{"v0":68,"v1":69,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-200},{"v0":12,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":9,"v1":70,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":71,"v1":8,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":9,"v1":2,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":12,"v1":1,"curve":0,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","x":795},{"v0":7,"v1":72,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":8,"v1":0,"vis":false,"color":"292929","cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":71,"v1":73,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":70,"v1":74,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":73,"v1":75,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":75,"v1":74,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":4,"v1":76,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":3,"v1":45,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":45,"v1":14,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":45,"v1":3,"curve":0,"vis":false,"color":"292929","cMask":["ball"]},{"v0":78,"v1":79,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":77,"v1":80,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":79,"v1":81,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":81,"v1":80,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":45,"v1":77,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":78,"v1":12,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":0,"color":"292929","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":180,"color":"292929","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":-180,"color":"292929","cMask":["c0"],"cGroup":["c0"]}],"goals":[{"p0":[805,85],"p1":[805,-85],"team":"blue","color":"292929"},{"p0":[-805,-85],"p1":[-805,85],"team":"red","color":"979C76"}],"discs":[{"radius":5,"invMass":0,"pos":[-795,85],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[-795,-345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[795,-345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[795,345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":3,"pos":[-795,345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":5,"invMass":0,"pos":[-795,-85],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[795,-85],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[795,85],"color":"969696","bCoef":0.5,"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"423255","_data":{"extremes":{"normal":[0,1],"dist":-345,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,-345],"b":[525.1413557359203,-345]}}},{"normal":[0,-1],"dist":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-345,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,345],"b":[525.1413557359203,345]}}},{"normal":[1,0],"dist":-900,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[1,0],"dist":-900,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-900,-247.98341798640683],"b":[-900,247.98341798640683]}}},{"normal":[0,-1],"dist":-425,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-425,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,425],"b":[525.1413557359203,425]}}},{"normal":[0,1],"dist":-425,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[0,1],"dist":-425,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,-425],"b":[525.1413557359203,-425]}}},{"normal":[-1,0],"dist":-900,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[-1,0],"dist":-900,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[900,-247.98341798640683],"b":[900,247.98341798640683]}}}],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.01,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.11,"gravity":[0,0],"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":6.2,"bCoef":0.4,"cMask":["all"],"damping":0.991,"invMass":1.3,"gravity":[0,0],"color":"ededeb","cGroup":["ball"]}}',
    x4: '{"name":"ðððððððð ððððððð|Haxgoal","width":900,"height":425,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[[-330,385]],"blueSpawnPoints":[[330,385]],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"0A0A0A","type":"none","height":346,"width":793,"kickOffRadius":95,"cornerRadius":0},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":-795,"y":-345,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","vis":true,"color":"292929","bias":0},{"x":795,"y":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","bias":10,"curve":0},{"x":-795,"y":345,"bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929","vis":true,"curve":0,"bias":10},{"x":795,"y":345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"292929","vis":true,"curve":0},{"x":0,"y":-345,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929"},{"x":0,"y":-95,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"70674d","vis":false,"curve":87.5},{"x":0,"y":95,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"trait":"ballArea","color":"c2c1be","vis":false,"curve":-87.5},{"x":0,"y":345,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","color":"292929","vis":false},{"x":-795,"y":-85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"9e8f65","vis":true,"bias":10},{"x":-795,"y":85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"c2c1be","vis":true,"bias":10},{"x":-850,"y":-85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":-850,"y":85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":795,"y":-85,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be","bias":10},{"x":845,"y":-85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","color":"292929"},{"x":845,"y":85,"bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"color":"292929"},{"x":-95,"y":-5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"a89b76","curve":87.5},{"x":95,"y":-5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"5c502f","curve":87.5},{"x":-75,"y":-7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":175,"color":"a89b76"},{"x":75,"y":-7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":175,"color":"5c502f"},{"x":-95,"y":5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-87.5,"color":"ededed"},{"x":-75,"y":7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-175,"color":"ededed"},{"x":95,"y":5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","curve":-87.5,"color":"8f8f8f"},{"x":75,"y":7.5,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","color":"8f8f8f","curve":-175},{"x":-795,"y":-305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":795,"y":-305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":-795,"y":305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":795,"y":305,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":-755,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":755,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":-755,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","vis":true,"curve":90},{"x":755,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"vis":true,"color":"292929","curve":-90},{"x":795,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":420,"y":-345,"cMask":["c0"],"cGroup":["c0"],"curve":0,"color":"292929"},{"x":-420,"y":345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":795,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":420,"y":345,"cMask":["c0"],"cGroup":["c0"],"curve":0,"color":"292929"},{"x":-420,"y":-345,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":0,"color":"292929"},{"x":710,"y":-130,"cMask":["c0"],"cGroup":["c0"],"curve":-60,"color":"292929"},{"x":710,"y":130,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-60},{"x":420,"y":-95,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-80},{"x":420,"y":95,"cMask":["c0"],"cGroup":["c0"],"color":"292929","curve":-80},{"x":-420,"y":-95,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","curve":80,"_data":{"mirror":{}}},{"x":-420,"y":95,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929","curve":80,"_data":{"mirror":{}}},{"x":-550,"y":0,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929"},{"x":-555,"y":0,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"color":"292929"},{"x":795,"y":85,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"9e8f65"},{"x":-55,"y":-45,"cMask":["c0"],"color":"9e8f65"},{"x":-55,"y":45,"cMask":["c0"],"color":"9e8f65"},{"x":-35,"y":25,"cMask":["c0"],"color":"70674d"},{"x":-35,"y":-10,"cMask":["c0"],"color":"635d4c"},{"x":-15,"y":-15,"cMask":["c0"],"color":"807352"},{"x":-15,"y":10,"cMask":["c0"],"color":"635d4c"},{"x":20,"y":-45,"cMask":["c0"],"color":"807352"},{"x":0,"y":-10,"cMask":["c0"],"color":"524e43"},{"x":0,"y":10,"cMask":["c0"],"color":"524e43"},{"x":20,"y":-5,"cMask":["c0"],"color":"736641"},{"x":0,"y":25,"cMask":["c0"],"color":"b3b3b3"},{"x":35,"y":0,"cMask":["c0"],"color":"b3b3b3"},{"x":0,"y":65,"bCoef":1,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":20,"y":50,"cMask":["c0"],"color":"c9c9e7"},{"x":20,"y":27.5,"cMask":["c0"],"color":"c9c9e7"},{"x":35,"y":17.5,"cMask":["c0"],"color":"b0b0b0"},{"x":35,"y":45,"cMask":["c0"],"color":"969696"},{"x":55,"y":30,"cMask":["c0"],"color":"969696"},{"x":55,"y":-45,"cMask":["c0"],"color":"969696"},{"x":35,"y":-30,"cMask":["c0"],"color":"c2c1be"},{"x":-795,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":180},{"x":-710,"y":130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":-60},{"x":-710,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"curve":-60},{"x":-795,"y":-130,"bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"x":-795,"y":60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":-60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":425,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea","vis":false},{"x":-795,"y":-30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":-795,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":0,"y":-425,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"x":795,"y":60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":-60,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":-30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":30,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":795,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"c2c1be"},{"x":550,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"292929"},{"x":555,"y":0,"cMask":["c0"],"cGroup":["c0"],"color":"292929"}],"segments":[{"v0":0,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":0,"y":-345},{"v0":2,"v1":3,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":345},{"v0":4,"v1":5,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":6,"v1":7,"curve":0,"vis":true,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":5,"v1":6,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":6,"v1":5,"curve":180,"vis":false,"color":"000000","bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":8,"v1":10,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-90},{"v0":10,"v1":11,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"x":-850},{"v0":11,"v1":9,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":0,"v1":8,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":12,"v1":13,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","y":-85},{"v0":14,"v1":13,"curve":-30,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":9,"v1":2,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","bias":10,"x":-795},{"v0":17,"v1":15,"curve":0,"vis":true,"color":"a89b76","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea","y":0},{"v0":18,"v1":16,"curve":0,"vis":true,"color":"5c502f","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":17,"v1":18,"curve":175,"vis":true,"color":"9e8f65","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":19,"v1":20,"curve":0,"vis":true,"color":"ededed","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":22,"v1":21,"curve":0,"vis":true,"color":"8f8f8f","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":23,"v1":27,"curve":-90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":24,"v1":28,"curve":90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":25,"v1":29,"curve":90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":26,"v1":30,"curve":-90,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":32,"v1":35,"curve":0,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":420},{"v0":36,"v1":33,"curve":0,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":31,"v1":37,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-200},{"v0":34,"v1":38,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":200},{"v0":37,"v1":38,"curve":-60,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":640},{"v0":39,"v1":40,"curve":-80,"color":"292929","cMask":["c0"],"cGroup":["c0"],"x":420},{"v0":41,"v1":42,"curve":74.63559491093426,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"_data":{"mirror":{},"arc":{"a":[-420,-95],"b":[-420,95],"curve":74.63559491093426,"radius":156.704788136802,"center":[-544.625,0],"from":-0.6513184351902633,"to":0.6513184351902633}}},{"v0":43,"v1":44,"curve":0,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":43,"v1":44,"curve":180,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":43,"v1":44,"curve":-180,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"]},{"v0":20,"v1":22,"curve":-175,"vis":true,"color":"b3b3b3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":46,"v1":47,"color":"9e8f65","cMask":["c0"],"x":-55},{"v0":47,"v1":48,"color":"9e8f65","cMask":["c0"]},{"v0":48,"v1":49,"color":"70674d","cMask":["c0"],"x":-35},{"v0":46,"v1":50,"color":"9e8f65","cMask":["c0"]},{"v0":49,"v1":51,"color":"635d4c","cMask":["c0"]},{"v0":50,"v1":52,"color":"807352","cMask":["c0"]},{"v0":51,"v1":53,"color":"70674d","cMask":["c0"]},{"v0":53,"v1":54,"color":"524e43","cMask":["c0"]},{"v0":52,"v1":55,"color":"736641","cMask":["c0"],"x":20},{"v0":54,"v1":55,"color":"5c502f","cMask":["c0"]},{"v0":56,"v1":57,"color":"b3b3b3","cMask":["c0"]},{"v0":56,"v1":58,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":58,"v1":59,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"]},{"v0":59,"v1":60,"color":"c9c9e7","cMask":["c0"],"x":20},{"v0":60,"v1":61,"color":"b0b0b0","cMask":["c0"]},{"v0":61,"v1":62,"color":"969696","cMask":["c0"],"x":35},{"v0":62,"v1":63,"color":"b0b0b0","cMask":["c0"]},{"v0":63,"v1":64,"color":"969696","cMask":["c0"],"x":55},{"v0":65,"v1":64,"color":"c2c1be","cMask":["c0"]},{"v0":57,"v1":65,"color":"c2c1be","cMask":["c0"]},{"v0":15,"v1":5,"curve":87.5,"vis":true,"color":"70674d","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":5,"v1":16,"curve":87.5,"vis":true,"color":"736641","cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":19,"v1":6,"curve":-87.5,"vis":true,"color":"c2c1be","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":6,"v1":21,"curve":-87.5,"vis":true,"color":"969696","cMask":["c0"],"cGroup":["c0"],"trait":"ballArea"},{"v0":66,"v1":67,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":200},{"v0":67,"v1":68,"curve":-60,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"x":-640},{"v0":68,"v1":69,"curve":0,"vis":true,"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-200},{"v0":12,"v1":1,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":9,"v1":70,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":71,"v1":8,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":9,"v1":2,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":12,"v1":1,"curve":0,"vis":false,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"trait":"ballArea","x":795},{"v0":7,"v1":72,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":8,"v1":0,"vis":false,"color":"292929","cMask":["ball"],"cGroup":["wall"],"trait":"ballArea"},{"v0":71,"v1":73,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":70,"v1":74,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":73,"v1":75,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":75,"v1":74,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":-795},{"v0":4,"v1":76,"vis":false,"color":"292929","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"ballArea"},{"v0":3,"v1":45,"vis":true,"color":"292929","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"bias":10},{"v0":45,"v1":14,"vis":true,"color":"292929","bCoef":0.1,"cMask":["ball"],"cGroup":["wall"],"y":85},{"v0":45,"v1":3,"curve":0,"vis":false,"color":"292929","cMask":["ball"]},{"v0":78,"v1":79,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":77,"v1":80,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":79,"v1":81,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":81,"v1":80,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"],"x":795},{"v0":45,"v1":77,"color":"9e8f65","cMask":["c0"],"cGroup":["c0"]},{"v0":78,"v1":12,"color":"c2c1be","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":0,"color":"292929","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":180,"color":"292929","cMask":["c0"],"cGroup":["c0"]},{"v0":82,"v1":83,"curve":-180,"color":"292929","cMask":["c0"],"cGroup":["c0"]}],"goals":[{"p0":[805,85],"p1":[805,-85],"team":"blue","color":"292929"},{"p0":[-805,-85],"p1":[-805,85],"team":"red","color":"979C76"}],"discs":[{"radius":5,"invMass":0,"pos":[-795,85],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":4,"pos":[-795,-345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[795,-345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":-345},{"radius":3,"pos":[795,345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":3,"pos":[-795,345],"color":"292929","bCoef":1,"cMask":["redKO","blueKO"],"cGroup":["ball"],"y":345},{"radius":5,"invMass":0,"pos":[-795,-85],"color":"70674d","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[795,-85],"color":"969696","bCoef":0.5,"trait":"goalPost"},{"radius":5,"invMass":0,"pos":[795,85],"color":"969696","bCoef":0.5,"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","color":"423255","_data":{"extremes":{"normal":[0,1],"dist":-345,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,-345],"b":[525.1413557359203,-345]}}},{"normal":[0,-1],"dist":-345,"bCoef":1,"cMask":["ball"],"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-345,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,345],"b":[525.1413557359203,345]}}},{"normal":[1,0],"dist":-900,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[1,0],"dist":-900,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-900,-247.98341798640683],"b":[-900,247.98341798640683]}}},{"normal":[0,-1],"dist":-425,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-425,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,425],"b":[525.1413557359203,425]}}},{"normal":[0,1],"dist":-425,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[0,1],"dist":-425,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[-525.1413557359203,-425],"b":[525.1413557359203,-425]}}},{"normal":[-1,0],"dist":-900,"bCoef":0,"cMask":["all"],"cGroup":["ball"],"_data":{"extremes":{"normal":[-1,0],"dist":-900,"canvas_rect":[-525.1413557359203,-247.98341798640683,525.1413557359203,247.98341798640683],"a":[900,-247.98341798640683],"b":[900,247.98341798640683]}}}],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.01,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.11,"gravity":[0,0],"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":6.2,"bCoef":0.4,"cMask":["all"],"damping":0.991,"invMass":1.3,"gravity":[0,0],"color":"ededeb","cGroup":["ball"]}}'
};


/* ============================================================
   DATABASE
============================================================ */

let db = {
    players: {},
    bans: {},
    settings: {
        currentMap: CONFIG.defaultStadium,
        matches: 0,
        goals: 0,
        created: Date.now()
    }
};


function saveDB() {

    try {

        fs.writeFileSync(
            CONFIG.databaseFile,
            JSON.stringify(db, null, 2),
            "utf8"
        );

    } catch (error) {

        console.error(
            "[DATABASE] Save error:",
            error
        );

    }

}


function loadDB() {

    try {

        if (
            !fs.existsSync(
                CONFIG.databaseFile
            )
        ) {

            saveDB();

            return;

        }

        const raw =
            fs.readFileSync(
                CONFIG.databaseFile,
                "utf8"
            );

        const loaded =
            JSON.parse(raw);

        db = {
            ...db,
            ...loaded,
            players:
                loaded.players || {},
            bans:
                loaded.bans || {},
            settings:
                {
                    ...db.settings,
                    ...(loaded.settings || {})
                }
        };

        console.log(
            "[DATABASE] Loaded."
        );

    } catch (error) {

        console.error(
            "[DATABASE] Corrupt database. Creating new one."
        );

        saveDB();

    }

}


/* ============================================================
   GLOBAL STATE
============================================================ */

let room = null;


/* ============================================================
   PLAYERS
============================================================ */

const playerCache =
    new Map();

const sessionRoles =
    new Map();


/* ============================================================
   QUEUE / MATCHMAKING
============================================================ */

const queuePlayers =
    new Map();

const queueJoinedAt =
    new Map();


/* ============================================================
   MODERATION
============================================================ */

const moderationLog =
    [];

const muted =
    new Map();

const activity =
    new Map();

const antiSpam =
    new Map();

const afkWarned =
    new Set();

const frozenPlayers =
    new Set();

let roomLocked =
    false;

let slowModeSeconds =
    0;


/* ============================================================
   GAME
============================================================ */

const gameStats =
    new Map();

let gameRunning =
    false;

let matchInProgress =
    false;

let matchNumber =
    0;

let lastTouch =
    null;

let lastTouchTime =
    0;


/* ============================================================
   PUB SYSTEM
============================================================ */

let pubModeEnabled =
    true;

let pubMatch = {
    active: false,
    mode: 0,
    map: "train",
    players: [],
    red: [],
    blue: [],
    redCaptain: null,
    blueCaptain: null,
    turnTeam: 1,
    phase: "waiting",
    winner: 0,
    startedAt: 0,
    round: 0
};

let pubRoundNumber = 0;

const pubConsecutiveGames =
    new Map();

let intermissionActive =
    false;

let intermissionEndsAt =
    0;

let lastPubAnnouncement =
    0;


/* ============================================================
   MATCH HISTORY
============================================================ */

const matchHistory =
    [];


/* ============================================================
   MAP / LOBBY
============================================================ */

let currentMap =
    CONFIG.defaultStadium;

let lastLobbySetupCount =
    -1;

let lobbySetupRunning =
    false;

let lobbyTrainMode =
    false;



/* ============================================================
   ORIGINAL PUB-STYLE ROTATION / PICK ENGINE
============================================================ */

function getPubModeByPlayerCount(
    playerCount
) {

    if (playerCount === 4) {
        return {
            mode: 2,
            map: "x1"
        };
    }

    if (playerCount === 6) {
        return {
            mode: 3,
            map: "x3"
        };
    }

    if (playerCount === 8) {
        return {
            mode: 4,
            map: "x4"
        };
    }

    if (playerCount === 10) {
        return {
            mode: 5,
            map: "x5"
        };
    }

    return null;
}



function resetPubMatchToWaiting() {

    pubMatch = {
        active: false,
        mode: 0,
        map: "train",
        players: [],
        red: [],
        blue: [],
        redCaptain: null,
        blueCaptain: null,
        turnTeam: 1,
        phase: "waiting",
        winner: 0,
        startedAt: 0,
        round: 0
    };

    pick = {
        active: false,
        captains: [],
        turn: 0,
        selected: []
    };
}


function getPubModeByPlayerCount(playerCount) {

    if (playerCount === 4) {
        return {
            mode: 2,
            map: "x1"
        };
    }

    if (playerCount === 6) {
        return {
            mode: 3,
            map: "x3"
        };
    }

    if (playerCount === 8) {
        return {
            mode: 4,
            map: "x4"
        };
    }

    if (playerCount === 10) {
        return {
            mode: 5,
            map: "x5"
        };
    }

    return null;
}


function getPubPlayerObjects() {

    return pubMatch.players
        .map(id => findPlayer(id))
        .filter(Boolean);
}


function announcePubTeams(targetId = null) {

    announce(
        `🔴 RED: ${pubMatch.red.map(id => {
            const p = findPlayer(id);
            return p ? p.name : "?";
        }).join(", ") || "vacío"}`,
        targetId,
        CONFIG.colors.error
    );

    announce(
        `🔵 BLUE: ${pubMatch.blue.map(id => {
            const p = findPlayer(id);
            return p ? p.name : "?";
        }).join(", ") || "vacío"}`,
        targetId,
        CONFIG.colors.staff
    );
}


function getPubCaptain(team) {

    const id =
        team === 1
            ? pubMatch.redCaptain
            : pubMatch.blueCaptain;

    return findPlayer(id);
}


function getPubAvailablePlayers() {

    const rosterIds =
        new Set([
            ...pubMatch.red,
            ...pubMatch.blue
        ]);

    return getPlayers()
        .filter(
            p =>
                pubMatch.players.includes(p.id)
        )
        .filter(
            p =>
                !rosterIds.has(p.id)
        );
}


function getWaitingPlayers() {

    const rosterIds =
        new Set([
            ...pubMatch.red,
            ...pubMatch.blue
        ]);

    return getPlayers()
        .filter(
            p =>
                !rosterIds.has(p.id)
        );
}


function beginPubPick(
    pickerTeam,
    phase
) {

    pubMatch.turnTeam =
        pickerTeam;

    pubMatch.phase =
        phase;

    pick = {
        active: true,
        captains: [
            pubMatch.redCaptain,
            pubMatch.blueCaptain
        ].filter(Boolean),
        turn: pickerTeam === 1 ? 0 : 1,
        selected: [
            ...pubMatch.red,
            ...pubMatch.blue
        ]
    };

    const picker =
        getPubCaptain(
            pickerTeam
        );

    announce(
        "",
        null
    );

    announce(
        `🎯 PICK ${pubMatch.mode}v${pubMatch.mode}`,
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announcePubTeams();

    if (picker) {

        announce(
            pickerTeam === 1
                ? `🔴 ${picker.name}, TU PICK | elige un jugador.`
                : `🔵 ${picker.name}, TU PICK | elige un jugador.`,
            picker.id,
            pickerTeam === 1
                ? CONFIG.colors.error
                : CONFIG.colors.staff,
            1,
            1
        );

        announce(
            `👉 Usa !pick ID o !pick nombre`,
            picker.id,
            CONFIG.colors.warning
        );
    }
}


function startPubFirstRound(
    players,
    mode
) {

    if (
        players.length !==
        mode * 2
    ) {
        return false;
    }

    if (
        currentMap !==
        mode.map
    ) {

        setLobbyMap(
            mode.map
        );
    }

    const redCaptain =
        players[0];

    const blueCaptain =
        players[1];

    pubRoundNumber++;

    pubMatch = {

        active: true,

        mode:
            mode.mode,

        map:
            mode.map,

        players:
            players.map(
                p => p.id
            ),

        red:
            [redCaptain.id],

        blue:
            [blueCaptain.id],

        redCaptain:
            redCaptain.id,

        blueCaptain:
            blueCaptain.id,

        turnTeam:
            1,

        phase:
            "pick_initial",

        winner:
            0,

        startedAt:
            0,

        round:
            pubRoundNumber
    };

    players.forEach(
        p => {

            room.setPlayerTeam(
                p.id,
                p.id === redCaptain.id
                    ? 1
                    : p.id === blueCaptain.id
                        ? 2
                        : 0
            );
        }
    );

    announce(
        `🎯 PUB ${mode.mode}v${mode.mode} | ROUND #${pubRoundNumber}`,
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announce(
        `🏟️ MAP: ${mode.map.toUpperCase()}`,
        null,
        CONFIG.colors.success,
        1
    );

    announce(
        `🔴 Captain RED: ${redCaptain.name}`,
        null,
        CONFIG.colors.error,
        1
    );

    announce(
        `🔵 Captain BLUE: ${blueCaptain.name}`,
        null,
        CONFIG.colors.staff,
        1
    );

    announce(
        "🔄 PICK INICIAL: RED → BLUE → RED → BLUE...",
        null,
        CONFIG.colors.warning,
        1,
        1
    );

    beginPubPick(
        1,
        "pick_initial"
    );

    return true;
}


function preparePubMode(
    playerCount
) {

    const mode =
        getPubModeByPlayerCount(
            playerCount
        );

    if (!mode) {
        return false;
    }

    if (
        !CONFIG.pubMode ||
        !CONFIG.pubMode.enabled
    ) {
        return false;
    }

    if (
        pubMatch.active
    ) {
        return true;
    }

    const players =
        getPlayers()
            .slice(
                0,
                playerCount
            );

    if (
        players.length !==
        playerCount
    ) {
        return false;
    }

    return startPubFirstRound(
        players,
        mode
    );
}


function getCurrentPubPicker() {

    if (
        !pubMatch.active
    ) {
        return null;
    }

    return getPubCaptain(
        pubMatch.turnTeam
    );
}


function getAvailablePickPlayers() {

    if (
        !pubMatch.active
    ) {
        return [];
    }

    const rosterIds =
        new Set([
            ...pubMatch.red,
            ...pubMatch.blue
        ]);

    return getPubPlayerObjects()
        .filter(
            p =>
                !rosterIds.has(
                    p.id
                )
        );
}


function showPubPickStatus(
    targetId = null
) {

    if (
        !pubMatch.active
    ) {

        announce(
            "❌ No hay un PUB pick activo.",
            targetId,
            CONFIG.colors.error
        );

        return;
    }

    const picker =
        getCurrentPubPicker();

    announce(
        `🎯 ${pubMatch.mode}v${pubMatch.mode} | PICK`,
        targetId,
        CONFIG.colors.vip,
        1
    );

    announcePubTeams(
        targetId
    );

    if (picker) {

        announce(
            `🎯 TURNO: ${picker.name} (${pubMatch.turnTeam === 1 ? "RED" : "BLUE"})`,
            targetId,
            CONFIG.colors.warning,
            1
        );
    }

    const available =
        getAvailablePickPlayers();

    announce(
        `👥 DISPONIBLES: ${available.map(p => `${p.id}:${p.name}`).join(" | ") || "ninguno"}`,
        targetId
    );
}


function resolvePubPickTarget(
    identifier
) {

    const raw =
        String(
            identifier || ""
        ).trim();

    if (!raw) {
        return null;
    }

    let target =
        findPlayer(raw);

    if (target) {
        return target;
    }

    const lower =
        raw.toLowerCase();

    target =
        getPubPlayerObjects()
            .find(
                p =>
                    p.name
                        .toLowerCase() ===
                    lower
            );

    return target || null;
}


function pubPickPlayer(
    player,
    identifier
) {

    if (
        !pubMatch.active ||
        pubMatch.phase ===
            "intermission"
    ) {

        announce(
            "❌ No hay un PUB pick activo.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    const picker =
        getCurrentPubPicker();

    if (
        !picker ||
        picker.id !==
        player.id
    ) {

        announce(
            `❌ Ahora pickea ${picker ? picker.name : "el capitán correspondiente"}.`,
            player.id,
            CONFIG.colors.error,
            1
        );

        return;
    }

    const target =
        resolvePubPickTarget(
            identifier
        );

    if (!target) {

        announce(
            "❌ Jugador no encontrado.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        !pubMatch.players.includes(
            target.id
        )
    ) {

        announce(
            "❌ Ese jugador no pertenece a los jugadores de esta ronda.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        pubMatch.red.includes(
            target.id
        ) ||
        pubMatch.blue.includes(
            target.id
        )
    ) {

        announce(
            "❌ Ese jugador ya fue pickeado.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        target.id ===
        pubMatch.redCaptain ||
        target.id ===
        pubMatch.blueCaptain
    ) {

        announce(
            "❌ Ese jugador ya es capitán.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    /*
    INITIAL ROUND:
    RED and BLUE alternate picks.

    ROTATION:
    Only BLUE picks.
    */

    if (
        pubMatch.turnTeam ===
        1
    ) {

        pubMatch.red.push(
            target.id
        );

        room.setPlayerTeam(
            target.id,
            1
        );

        announce(
            `🔴 ${player.name} pickeó a ${target.name}.`,
            null,
            CONFIG.colors.error,
            1,
            1
        );

    } else {

        pubMatch.blue.push(
            target.id
        );

        room.setPlayerTeam(
            target.id,
            2
        );

        announce(
            `🔵 ${player.name} pickeó a ${target.name}.`,
            null,
            CONFIG.colors.staff,
            1,
            1
        );
    }

    const redFull =
        pubMatch.red.length >=
        pubMatch.mode;

    const blueFull =
        pubMatch.blue.length >=
        pubMatch.mode;

    /*
    Initial pick:
    alternate until both sides are full.
    */

    if (
        pubMatch.phase ===
        "pick_initial"
    ) {

        if (
            redFull &&
            blueFull
        ) {

            finishPubPick();

            return;
        }

        if (
            pubMatch.turnTeam ===
            1 &&
            !blueFull
        ) {

            pubMatch.turnTeam =
                2;

        } else if (
            pubMatch.turnTeam ===
            2 &&
            !redFull
        ) {

            pubMatch.turnTeam =
                1;

        } else if (
            !redFull
        ) {

            pubMatch.turnTeam =
                1;

        } else if (
            !blueFull
        ) {

            pubMatch.turnTeam =
                2;
        }

    }

    /*
    Rotation pick:
    only BLUE fills BLUE.
    */

    else if (
        pubMatch.phase ===
            "pick_blue_only"
    ) {

        if (
            blueFull
        ) {

            finishPubPick();

            return;
        }

        pubMatch.turnTeam =
            2;
    }

    showPubPickStatus();
}


function finishPubPick() {

    const redFull =
        pubMatch.red.length ===
        pubMatch.mode;

    const blueFull =
        pubMatch.blue.length ===
        pubMatch.mode;

    if (
        !redFull ||
        !blueFull
    ) {

        return;
    }

    pubMatch.phase =
        "ready";

    pubMatch.startedAt =
        Date.now();

    pick.active =
        false;

    announce(
        "✅ PICK COMPLETADO.",
        null,
        CONFIG.colors.success,
        1,
        1
    );

    announcePubTeams();

    announce(
        "⚽ ¡PARTIDO COMIENZA!",
        null,
        CONFIG.colors.success,
        1,
        1
    );

    setTimeout(
        () => {

            if (
                room &&
                pubMatch.active &&
                pubMatch.phase ===
                    "ready"
            ) {

                room.startGame();

            }

        },
        1200
    );
}


function chooseNextBlueCaptain() {

    const redSet =
        new Set(
            pubMatch.red
        );

    return getWaitingPlayers()
        .filter(
            p =>
                !redSet.has(
                    p.id
                )
        )[0] || null;
}


function beginBlueOnlyRotation() {

    const blueCaptain =
        chooseNextBlueCaptain();

    if (
        !blueCaptain
    ) {

        announce(
            `⏳ No hay jugadores disponibles para formar BLUE ${pubMatch.mode}v${pubMatch.mode}.`,
            null,
            CONFIG.colors.warning,
            1
        );

        pubMatch.phase =
            "waiting_blue";

        pick.active =
            false;

        return;
    }

    pubMatch.blue =
        [
            blueCaptain.id
        ];

    pubMatch.blueCaptain =
        blueCaptain.id;

    pubMatch.turnTeam =
        2;

    beginPubPick(
        2,
        "pick_blue_only"
    );

    room.setPlayerTeam(
        blueCaptain.id,
        2
    );

    announce(
        `🔵 Nuevo BLUE captain: ${blueCaptain.name}`,
        null,
        CONFIG.colors.staff,
        1,
        1
    );

    announce(
        `🎯 ${blueCaptain.name} pickea SOLO BLUE.`,
        blueCaptain.id,
        CONFIG.colors.warning,
        1,
        1
    );
}


function rotatePubAfterVictory(
    winnerTeam
) {

    if (
        !pubMatch.active
    ) {
        return;
    }

    const currentPlayers =
        getPubPlayerObjects();

    /*
    ============================================================
    RED WINS
    ============================================================

    RED remains exactly as it is.
    BLUE is emptied.
    One spectator becomes the new BLUE captain.
    Only BLUE picks.
    */

    if (
        winnerTeam === 1
    ) {

        const winningRed =
            [
                ...pubMatch.red
            ];

        const oldBlue =
            [
                ...pubMatch.blue
            ];

        announce(
            "🔴 RED GANÓ — RED SE QUEDA INTACTO.",
            null,
            CONFIG.colors.error,
            1,
            1
        );

        oldBlue.forEach(
            id => {

                const player =
                    findPlayer(id);

                if (player) {

                    room.setPlayerTeam(
                        player.id,
                        0
                    );
                }
            }
        );

        pubMatch.red =
            winningRed;

        pubMatch.blue =
            [];

        pubMatch.phase =
            "intermission";

        pubMatch.winner =
            1;

        pick.active =
            false;

        room.stopGame();

        announce(
            "⏸️ INTERMISSION — RED permanece, BLUE vuelve a pick.",
            null,
            CONFIG.colors.warning,
            1,
            1
        );

        setTimeout(
            () => {

                if (
                    !pubMatch.active
                ) {
                    return;
                }

                beginBlueOnlyRotation();

            },
            CONFIG.pubMode.intermissionMs
        );

        return;
    }

    /*
    ============================================================
    BLUE WINS
    ============================================================

    BLUE becomes RED.
    The old RED goes to spectators.
    A new BLUE captain is chosen from spectators.
    Only BLUE picks.
    */

    if (
        winnerTeam === 2
    ) {

        const winningBlue =
            [
                ...pubMatch.blue
            ];

        const oldRed =
            [
                ...pubMatch.red
            ];

        announce(
            "🔵 BLUE GANÓ — BLUE PASA COMPLETO A RED.",
            null,
            CONFIG.colors.staff,
            1,
            1
        );

        oldRed.forEach(
            id => {

                const player =
                    findPlayer(id);

                if (player) {

                    room.setPlayerTeam(
                        player.id,
                        0
                    );
                }
            }
        );

        winningBlue.forEach(
            id => {

                const player =
                    findPlayer(id);

                if (player) {

                    room.setPlayerTeam(
                        player.id,
                        1
                    );
                }
            }
        );

        pubMatch.red =
            winningBlue;

        pubMatch.blue =
            [];

        pubMatch.redCaptain =
            winningBlue[0] ||
            null;

        pubMatch.blueCaptain =
            null;

        pubMatch.phase =
            "intermission";

        pubMatch.winner =
            2;

        pick.active =
            false;

        room.stopGame();

        announce(
            "⏸️ INTERMISSION — BLUE ganador pasa a RED. Se busca nuevo BLUE captain.",
            null,
            CONFIG.colors.warning,
            1,
            1
        );

        setTimeout(
            () => {

                if (
                    !pubMatch.active
                ) {
                    return;
                }

                beginBlueOnlyRotation();

            },
            CONFIG.pubMode.intermissionMs
        );
    }
}


/* ============================================================
   PICK SYSTEM
============================================================ */

let pick = {

    active: false,

    captains: [],

    turn: 0,

    selected: []

};


/* ============================================================
   ELO / RANKED
============================================================ */

const eloSessions =
    new Map();

const placementMatches =
    new Map();


/* ============================================================
   PLAYER PERFORMANCE
============================================================ */

const playerTouches =
    new Map();

const playerLastTouch =
    new Map();

const playerGoals =
    new Map();

const playerAssists =
    new Map();


/* ============================================================
   COMMAND / CHAT
============================================================ */

const commandCooldowns =
    new Map();

const chatCooldowns =
    new Map();


/* ============================================================
   TEMPORARY STATES
============================================================ */

const temporaryRoles =
    new Map();

const temporaryVIP =
    new Map();

const temporaryWarnings =
    new Map();


/* ============================================================
   ROOM / SERVER
============================================================ */

let roomStartedAt =
    Date.now();

let roomReady =
    false;

let roomLink =
    null;

let shuttingDown =
    false;


/* ============================================================
   MATCH RESULT
============================================================ */

let lastMatchWinner =
    0;

let lastMatchScores = {

    red: 0,

    blue: 0

};


/* ============================================================
   STATISTICS
============================================================ */

let totalCommands =
    0;

let totalChatMessages =
    0;

let totalGoals =
    0;

let totalMatches =
    0;


/* ============================================================
   DATABASE / BACKUPS
============================================================ */

let lastDatabaseBackup =
    0;

let databaseHealthy =
    true;


/* ============================================================
   AUTO SYSTEMS
============================================================ */

let autoBalanceEnabled =
    true;

let autoPickEnabled =
    false;

let autoStartEnabled =
    false;


/* ============================================================
   CURRENT GAME SETTINGS
============================================================ */

let currentScoreLimit =
    CONFIG.scoreLimit;

let currentTimeLimit =
    CONFIG.timeLimit;


/* ============================================================
   UTILITIES
============================================================ */

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}


function formatCoins(value) {

    return Number(
        value || 0
    ).toLocaleString("en-US");

}


function rolePower(role) {

    return (
        CONFIG.roles[role] ??
        CONFIG.roles.User
    );

}


function roleColor(role) {

    switch (role) {

        case "Owner":
            return CONFIG.colors.owner;

        case "Developer":
            return CONFIG.colors.developer;

        case "Staff":
            return CONFIG.colors.staff;

        case "VIP":
            return CONFIG.colors.vip;

        default:
            return CONFIG.colors.user;

    }

}


function announce(
    message,
    targetId = null,
    color = CONFIG.colors.user,
    style = 0,
    sound = 0
) {

    if (!room) return;

    room.sendAnnouncement(
        message,
        targetId,
        color,
        style,
        sound
    );

}


function getPlayers() {

    if (!room) return [];

    return room
        .getPlayerList()
        .filter(
            player =>
                player.id !== 0
        );

}


function findPlayer(identifier) {

    if (!room) return null;

    const list =
        room.getPlayerList();

    if (
        identifier === undefined ||
        identifier === null
    ) {

        return null;

    }

    const text =
        String(identifier)
            .trim();

    const id =
        Number(text);

    if (
        Number.isInteger(id)
    ) {

        const byId =
            list.find(
                p => p.id === id
            );

        if (byId) return byId;

    }

    const lower =
        text.toLowerCase();

    const exact =
        list.find(
            p =>
                p.name.toLowerCase() === lower
        );

    if (exact) return exact;

    return (
        list.find(
            p =>
                p.name
                    .toLowerCase()
                    .includes(lower)
        ) || null
    );

}


function findPlayerByAuth(auth) {

    if (!room || !auth) {
        return null;
    }

    return (
        room
            .getPlayerList()
            .find(
                p => p.auth === auth
            ) || null
    );

}


function getKey(player) {

    if (!player) return null;

    if (player.auth) {
        return `auth:${player.auth}`;
    }

    if (player.conn) {
        return `conn:${player.conn}`;
    }

    return `name:${player.name.toLowerCase()}`;

}


/* ============================================================
   PLAYER DATA
============================================================ */

function newPlayerData(player) {

    return {

        name: player.name,

        auth: player.auth || null,

        role: "User",

        coins: 0,

        xp: 0,

        level: 1,

        elo: CONFIG.defaultElo,

        matches: 0,

        wins: 0,

        losses: 0,

        draws: 0,

        goals: 0,

        assists: 0,

        warnings: 0,

        lastDaily: 0,

        vipUntil: 0,

        joinedAt: Date.now(),

        lastSeen: Date.now(),

        currentStreak: 0,

        bestStreak: 0,

        lastWinAt: 0,

        lastMissionReset: 0,

        missions: {
            wins: 0,
            goals: 0,
            matches: 0,
            chat: 0
        },

        weekly: {
            weekKey: "",
            wins: 0,
            goals: 0,
            matches: 0
        },

        achievements: [],

        titles: [],

        activeTitle: "🌱 Rookie",

        totalCoinsEarned: 0,

        totalCoinsSpent: 0

    };

}


function configuredRole(auth) {

    if (!auth) return "User";

    if (
        CONFIG.owners.includes(auth)
    ) return "Owner";

    if (
        CONFIG.developers.includes(auth)
    ) return "Developer";

    if (
        CONFIG.staff.includes(auth)
    ) return "Staff";

    if (
        CONFIG.vip.includes(auth)
    ) return "VIP";

    return null;

}


function getData(player) {

    const key =
        getKey(player);

    if (!key) return null;

    if (!db.players[key]) {

        db.players[key] =
            newPlayerData(player);

    }

    const data =
        db.players[key];

    data.name =
        player.name;

    if (player.auth) {
        data.auth =
            player.auth;
    }

    const fixedRole =
        configuredRole(
            player.auth
        );

    if (fixedRole) {
        data.role =
            fixedRole;
    }

    if (
        data.role === "VIP" &&
        data.vipUntil > 0 &&
        Date.now() >= data.vipUntil
    ) {

        data.role = "User";

        data.vipUntil = 0;

        announce(
            `💎 El VIP de ${player.name} expiró.`,
            player.id,
            CONFIG.colors.warning,
            1
        );

    }

    updateLevel(
        data
    );

    data.lastSeen =
        Date.now();

    return data;

}


function xpForLevel(level) {
    level = Math.max(1, Number(level || 1));

    return Math.floor(
        CONFIG.levelBaseXP *
        Math.pow(level, CONFIG.levelGrowth)
    );
}

function totalXPForLevel(level) {
    let total = 0;

    for (let i = 1; i < level; i++) {
        total += xpForLevel(i);
    }

    return total;
}

function titleForLevel(level) {
    if (level >= 100) return "👑 Legend";
    if (level >= 75) return "🔥 Mythic";
    if (level >= 50) return "💎 Diamond";
    if (level >= 35) return "⚡ Elite";
    if (level >= 25) return "🏆 Champion";
    if (level >= 15) return "⭐ Veteran";
    if (level >= 10) return "🎯 Pro";
    if (level >= 5) return "⚽ Rising Star";
    return "🌱 Rookie";
}

function updateLevel(data) {

    const previousLevel =
        Number(data.level || 1);

    let level =
        previousLevel;

    while (
        level < CONFIG.maxLevel &&
        data.xp >= totalXPForLevel(level + 1)
    ) {
        level++;
    }

    if (level !== previousLevel) {

        data.level = level;

        const newTitle =
            titleForLevel(level);

        if (!data.titles.includes(newTitle)) {
            data.titles.push(newTitle);
        }

        data.activeTitle = newTitle;

        const online =
            findPlayerByAuth(data.auth);

        if (online) {
            announce(
                `🎉 ${online.name} alcanzó el nivel ${level}: ${newTitle}!`,
                null,
                CONFIG.colors.success,
                1,
                1
            );
        }
    }

    data.level = level;
}

function levelProgress(data) {

    const current =
        totalXPForLevel(data.level);

    const next =
        data.level >= CONFIG.maxLevel
            ? current
            : totalXPForLevel(data.level + 1);

    const progress =
        data.level >= CONFIG.maxLevel
            ? 100
            : Math.max(
                0,
                Math.min(
                    100,
                    (
                        (data.xp - current) /
                        Math.max(1, next - current)
                    ) * 100
                )
            );

    return {
        current,
        next,
        progress
    };
}

/* ============================================================
   ECONOMY
============================================================ */

function addCoins(
    player,
    amount,
    announceReward = false
) {

    const data =
        getData(player);

    if (!data) return;

    amount =
        Math.max(
            0,
            Math.floor(amount)
        );

    data.coins +=
        amount;

    data.totalCoinsEarned =
        Number(data.totalCoinsEarned || 0) +
        amount;

    if (announceReward) {

        announce(
            `🪙 +${amount} Micro Coins`,
            player.id,
            CONFIG.colors.success,
            0
        );

    }

    saveDB();

}


function removeCoins(
    player,
    amount
) {

    const data =
        getData(player);

    if (!data) {
        return false;
    }

    amount =
        Math.floor(amount);

    if (
        amount <= 0 ||
        data.coins < amount
    ) {
        return false;
    }

    data.coins -=
        amount;

    data.totalCoinsSpent =
        Number(data.totalCoinsSpent || 0) +
        amount;

    saveDB();

    return true;

}


function addXP(
    player,
    amount
) {

    const data =
        getData(player);

    if (!data) return;

    data.xp +=
        Math.max(
            0,
            Math.floor(amount)
        );

    const old =
        data.level;

    updateLevel(data);

    if (
        data.level > old
    ) {

        announce(
            `⭐ ${player.name} subió al nivel ${data.level}!`,
            null,
            CONFIG.colors.success,
            1,
            1
        );

    }

    saveDB();

}


/* ============================================================
   DAILY
============================================================ */

function claimDaily(player) {

    const data =
        getData(player);

    const elapsed =
        Date.now() -
        Number(data.lastDaily || 0);

    if (
        elapsed <
        CONFIG.dailyCooldown
    ) {

        const remaining =
            CONFIG.dailyCooldown -
            elapsed;

        const hours =
            Math.floor(
                remaining /
                3600000
            );

        const minutes =
            Math.floor(
                (remaining %
                    3600000) /
                60000
            );

        announce(
            `⏰ Ya reclamaste tu DAILY. Faltan ${hours}h ${minutes}m.`,
            player.id,
            CONFIG.colors.warning,
            1
        );

        return;

    }

    data.lastDaily =
        Date.now();

    data.coins +=
        CONFIG.dailyReward;

    data.xp += 25;

    updateLevel(data);

    saveDB();

    announce(
        `🎁 ${player.name} recibió ${CONFIG.dailyReward} 🪙 por su DAILY.`,
        null,
        CONFIG.colors.success,
        1,
        1
    );

}


/* ============================================================
   SHOP
============================================================ */

function showShop(player) {

    announce(
        "╔══════ 🛒 MICROHAX SHOP ══════╗",
        player.id,
        CONFIG.colors.vip,
        1
    );

    announce(
        "💎 !buy vip7 — VIP 7 días — 1500 🪙",
        player.id
    );

    announce(
        "⭐ !buy xp — 100 XP — 250 🪙",
        player.id
    );

    announce(
        "🎁 !buy coinpack — 1500 🪙 → 2500 🪙",
        player.id
    );

    announce(
        "╚═════════════════════════════╝",
        player.id,
        CONFIG.colors.vip,
        1
    );

}


function buyItem(
    player,
    item
) {

    const data =
        getData(player);

    item =
        String(item || "")
            .toLowerCase();

    if (
        item === "vip7"
    ) {

        if (
            !removeCoins(
                player,
                1500
            )
        ) {

            announce(
                "❌ Necesitas 1500 🪙.",
                player.id,
                CONFIG.colors.error,
                1
            );

            return;

        }

        const base =
            Math.max(
                Date.now(),
                data.vipUntil || 0
            );

        data.vipUntil =
            base +
            (7 * 24 * 60 * 60 * 1000);

        data.role =
            "VIP";

        saveDB();

        announce(
            "💎 VIP activado durante 7 días.",
            player.id,
            CONFIG.colors.vip,
            1,
            1
        );

        return;

    }

    if (
        item === "xp"
    ) {

        if (
            !removeCoins(
                player,
                250
            )
        ) {

            announce(
                "❌ Necesitas 250 🪙.",
                player.id,
                CONFIG.colors.error,
                1
            );

            return;

        }

        addXP(
            player,
            100
        );

        announce(
            "⭐ Compraste 100 XP.",
            player.id,
            CONFIG.colors.success,
            1
        );

        return;

    }

    if (
        item === "coinpack"
    ) {

        if (
            !removeCoins(
                player,
                1500
            )
        ){

            announce(
                "❌ Necesitas 1000 🪙.",
                player.id,
                CONFIG.colors.error,
                1
            );

            return;

        }

        /*
        Demo economy item.
        You can replace this with a real cosmetic
        item later.
        */

        addCoins(
            player,
            2500
        );

        announce(
            "🎁 Coin Pack adquirido.",
            player.id,
            CONFIG.colors.success,
            1
        );

        return;

    }

    announce(
        "❌ Item desconocido. Usa !shop.",
        player.id,
        CONFIG.colors.error
    );

}



/* ============================================================
   PROGRESSION / ACHIEVEMENTS / MISSIONS
============================================================ */

const ACHIEVEMENTS = {
    FIRST_MATCH: {
        title: "First Match",
        rewardCoins: 100,
        rewardXP: 50,
        check: d => d.matches >= 1
    },

    FIRST_WIN: {
        title: "First Win",
        rewardCoins: 150,
        rewardXP: 75,
        check: d => d.wins >= 1
    },

    FIRST_GOAL: {
        title: "First Goal",
        rewardCoins: 120,
        rewardXP: 60,
        check: d => d.goals >= 1
    },

    TEN_GOALS: {
        title: "Goal Hunter",
        rewardCoins: 300,
        rewardXP: 150,
        check: d => d.goals >= 10
    },

    FIFTY_GOALS: {
        title: "Golden Boot",
        rewardCoins: 1000,
        rewardXP: 500,
        check: d => d.goals >= 50
    },

    TEN_WINS: {
        title: "Winner",
        rewardCoins: 500,
        rewardXP: 250,
        check: d => d.wins >= 10
    },

    FIFTY_WINS: {
        title: "Champion",
        rewardCoins: 2500,
        rewardXP: 1000,
        check: d => d.wins >= 50
    },

    LEVEL_10: {
        title: "Pro",
        rewardCoins: 750,
        rewardXP: 250,
        check: d => d.level >= 10
    },

    LEVEL_25: {
        title: "Champion",
        rewardCoins: 1500,
        rewardXP: 500,
        check: d => d.level >= 25
    },

    LEVEL_50: {
        title: "Diamond",
        rewardCoins: 5000,
        rewardXP: 1500,
        check: d => d.level >= 50
    },

    HOT_STREAK_3: {
        title: "Hot Streak",
        rewardCoins: 350,
        rewardXP: 200,
        check: d => d.bestStreak >= 3
    },

    HOT_STREAK_5: {
        title: "On Fire",
        rewardCoins: 750,
        rewardXP: 400,
        check: d => d.bestStreak >= 5
    }
};

function grantAchievement(player, key) {

    const data =
        getData(player);

    const achievement =
        ACHIEVEMENTS[key];

    if (!achievement) return false;

    if (
        data.achievements.includes(key)
    ) {
        return false;
    }

    if (
        !achievement.check(data)
    ) {
        return false;
    }

    data.achievements.push(key);

    if (!data.titles.includes(achievement.title)) {
        data.titles.push(achievement.title);
    }

    data.coins +=
        achievement.rewardCoins;

    data.totalCoinsEarned =
        Number(data.totalCoinsEarned || 0) +
        achievement.rewardCoins;

    data.xp +=
        achievement.rewardXP;

    updateLevel(data);

    announce(
        `🏅 ${player.name} desbloqueó: ${achievement.title}! +${achievement.rewardCoins} 🪙 +${achievement.rewardXP} XP`,
        null,
        CONFIG.colors.warning,
        1,
        1
    );

    saveDB();

    return true;
}

function checkAchievements(player) {

    for (
        const key of Object.keys(ACHIEVEMENTS)
    ) {
        grantAchievement(
            player,
            key
        );
    }
}

function getWeekKey() {

    const now =
        new Date();

    const start =
        new Date(
            now.getFullYear(),
            0,
            1
        );

    const diff =
        Math.floor(
            (
                now - start
            ) / 86400000
        );

    const week =
        Math.ceil(
            (diff + start.getDay() + 1) /
            7
        );

    return `${now.getFullYear()}-${week}`;
}

function ensureMissionState(data) {

    const now =
        Date.now();

    if (
        !data.lastMissionReset ||
        now - data.lastMissionReset >=
        24 * 60 * 60 * 1000
    ) {

        data.missions = {
            wins: 0,
            goals: 0,
            matches: 0,
            chat: 0
        };

        data.lastMissionReset =
            now;
    }

    const weekKey =
        getWeekKey();

    if (
        !data.weekly ||
        data.weekly.weekKey !== weekKey
    ) {

        data.weekly = {
            weekKey,
            wins: 0,
            goals: 0,
            matches: 0
        };
    }
}

function missionReward(
    player,
    key,
    requirement,
    rewardCoins,
    rewardXP
) {

    const data =
        getData(player);

    if (!data) return;

    ensureMissionState(
        data
    );

    const completionKey =
        `MISSION_${key}`;

    if (
        data.missions[key] >= requirement &&
        !data.achievements.includes(completionKey)
    ) {

        data.achievements.push(
            completionKey
        );

        data.coins +=
            rewardCoins;

        data.totalCoinsEarned =
            Number(data.totalCoinsEarned || 0) +
            rewardCoins;

        data.xp +=
            rewardXP;

        updateLevel(data);

        announce(
            `🎯 Misión completada: ${key}! +${rewardCoins} 🪙 +${rewardXP} XP`,
            player.id,
            CONFIG.colors.success,
            1,
            1
        );

        saveDB();
    }
}

function showLevel(player) {

    const data =
        getData(player);

    const progress =
        levelProgress(data);

    const barLength =
        20;

    const filled =
        Math.round(
            (
                progress.progress /
                100
            ) * barLength
        );

    const bar =
        "█".repeat(filled) +
        "░".repeat(
            barLength - filled
        );

    announce(
        "╔══════ ⭐ LEVEL ══════╗",
        player.id,
        roleColor(data.role),
        1
    );

    announce(
        `⭐ Level ${data.level}`,
        player.id
    );

    announce(
        `🏷️ ${data.activeTitle || titleForLevel(data.level)}`,
        player.id,
        CONFIG.colors.warning
    );

    announce(
        `XP: ${data.xp}/${progress.next}`,
        player.id
    );

    announce(
        `[${bar}] ${progress.progress.toFixed(1)}%`,
        player.id,
        CONFIG.colors.success
    );

    announce(
        "╚════════════════════╝",
        player.id,
        roleColor(data.role),
        1
    );
}

function showMissions(player) {

    const data =
        getData(player);

    ensureMissionState(
        data
    );

    const missions = [
        {
            key: "wins",
            text: "Gana 3 partidos",
            need: 3,
            reward: "500 🪙 + 200 XP"
        },
        {
            key: "goals",
            text: "Marca 5 goles",
            need: 5,
            reward: "400 🪙 + 175 XP"
        },
        {
            key: "matches",
            text: "Juega 5 partidos",
            need: 5,
            reward: "300 🪙 + 125 XP"
        },
        {
            key: "chat",
            text: "Escribe 20 mensajes",
            need: 20,
            reward: "250 🪙 + 100 XP"
        }
    ];

    announce(
        "╔══════ 🎯 DAILY MISSIONS ══════╗",
        player.id,
        CONFIG.colors.warning,
        1
    );

    missions.forEach(
        mission => {

            const value =
                data.missions[
                    mission.key
                ] || 0;

            announce(
                `${mission.text}: ${value}/${mission.need} — ${mission.reward}`,
                player.id
            );
        }
    );

    announce(
        "╚══════════════════════════════╝",
        player.id,
        CONFIG.colors.warning,
        1
    );
}

function showAchievements(player) {

    const data =
        getData(player);

    announce(
        "╔══════ 🏅 ACHIEVEMENTS ══════╗",
        player.id,
        CONFIG.colors.warning,
        1
    );

    Object.entries(
        ACHIEVEMENTS
    ).forEach(
        ([key, achievement]) => {

            const unlocked =
                data.achievements.includes(
                    key
                );

            announce(
                `${unlocked ? "✅" : "🔒"} ${achievement.title} — ${key}`,
                player.id,
                unlocked
                    ? CONFIG.colors.success
                    : CONFIG.colors.user
            );
        }
    );

    announce(
        "╚═════════════════════════════╝",
        player.id,
        CONFIG.colors.warning,
        1
    );
}

/* ============================================================
   PROFILE / RANKING
============================================================ */

function showProfile(
    viewer,
    target
) {

    const data =
        getData(target);

    announce(
        "╔══════ PROFILE ══════╗",
        viewer.id,
        roleColor(data.role),
        1
    );

    announce(
        `👤 ${data.name}`,
        viewer.id
    );

    announce(
        `🏷️ Role: ${data.role}`,
        viewer.id,
        roleColor(data.role)
    );

    announce(
        `🪙 Coins: ${formatCoins(data.coins)}`,
        viewer.id,
        CONFIG.colors.warning
    );

    announce(
        `⭐ Level: ${data.level} | XP: ${data.xp}`,
        viewer.id
    );

    announce(
        `🏆 ELO: ${data.elo}`,
        viewer.id,
        CONFIG.colors.success
    );

    announce(
        `🎮 Matches: ${data.matches}`,
        viewer.id
    );

    announce(
        `✅ Wins: ${data.wins}`,
        viewer.id,
        CONFIG.colors.success
    );

    announce(
        `❌ Losses: ${data.losses}`,
        viewer.id,
        CONFIG.colors.error
    );

    announce(
        `⚽ Goals: ${data.goals}`,
        viewer.id
    );

    announce(
        `🎯 Assists: ${data.assists}`,
        viewer.id
    );

    announce(
        `🔥 Streak: ${data.currentStreak} | Best: ${data.bestStreak}`,
        viewer.id,
        CONFIG.colors.warning
    );

    announce(
        `🏅 Achievements: ${data.achievements.length}`,
        viewer.id
    );

    if (
        data.vipUntil >
        Date.now()
    ) {

        const remaining =
            data.vipUntil -
            Date.now();

        announce(
            `💎 VIP restante: ${Math.ceil(
                remaining / 86400000
            )} días`,
            viewer.id,
            CONFIG.colors.vip
        );

    }

    announce(
        "╚═══════════════════╝",
        viewer.id,
        roleColor(data.role),
        1
    );

}


function ranking(
    player,
    type = "elo"
) {

    const list =
        Object.values(
            db.players
        );

    let sorted;

    switch (
        String(type)
            .toLowerCase()
    ) {

        case "coins":

            sorted =
                list.sort(
                    (a, b) =>
                        b.coins -
                        a.coins
                );

            break;

        case "wins":

            sorted =
                list.sort(
                    (a, b) =>
                        b.wins -
                        a.wins
                );

            break;

        case "goals":

            sorted =
                list.sort(
                    (a, b) =>
                        b.goals -
                        a.goals
                );

            break;

        case "xp":

            sorted =
                list.sort(
                    (a, b) =>
                        b.xp -
                        a.xp
                );

            break;

        case "level":

            sorted =
                list.sort(
                    (a, b) =>
                        b.level -
                        a.level
                );

            break;

        default:

            sorted =
                list.sort(
                    (a, b) =>
                        b.elo -
                        a.elo
                );

    }

    announce(
        `╔════ 🏆 TOP ${String(type).toUpperCase()} ════╗`,
        player.id,
        CONFIG.colors.warning,
        1
    );

    sorted
        .slice(0, 10)
        .forEach(
            (data, index) => {

                let value;

                switch (
                    String(type)
                        .toLowerCase()
                ) {

                    case "coins":
                        value =
                            `${formatCoins(data.coins)} 🪙`;
                        break;

                    case "wins":
                        value =
                            `${data.wins} wins`;
                        break;

                    case "goals":
                        value =
                            `${data.goals} goals`;
                        break;

                    case "xp":
                        value =
                            `${data.xp} XP`;
                        break;

                    case "level":
                        value =
                            `Level ${data.level}`;
                        break;

                    default:
                        value =
                            `${data.elo} ELO`;

                }

                announce(
                    `${index + 1}. ${data.name} — ${value}`,
                    player.id
                );

            }
        );

    announce(
        "╚════════════════════╝",
        player.id,
        CONFIG.colors.warning,
        1
    );

}


/* ============================================================
   ROLE SYSTEM
============================================================ */

function getEffectiveRole(player) {

    const sessionRole =
        sessionRoles.get(player.id);

    if (sessionRole) {
        return sessionRole;
    }

    const data =
        getData(player);

    return data?.role || "User";
}


function isHaxBallAdmin(player) {
    return Boolean(
        player &&
        player.admin
    );
}


function getDisplayRank(player) {

    const role =
        getEffectiveRole(player);

    if (
        role === "User" &&
        isHaxBallAdmin(player)
    ) {
        return "Admin";
    }

    return role;
}


function hasRole(player, role) {

    const effectiveRole =
        getEffectiveRole(player);

    return (
        rolePower(effectiveRole) >=
        rolePower(role)
    );
}


function isOwner(player) {
    return hasRole(player, "Owner");
}


function isDeveloper(player) {
    return hasRole(player, "Developer");
}


function isStaff(player) {
    return hasRole(player, "Staff");
}


function isVIP(player) {
    return hasRole(player, "VIP");
}


function setRole(
    executor,
    target,
    role
) {

    if (!isOwner(executor)) {

        announce(
            "❌ Solo Owner puede gestionar roles.",
            executor.id,
            CONFIG.colors.error,
            1
        );

        return;

    }

    const valid = [
        "User",
        "VIP",
        "Staff",
        "Developer",
        "Owner"
    ];

    const newRole =
        valid.find(
            r =>
                r.toLowerCase() ===
                String(role)
                    .toLowerCase()
        );

    if (!newRole) {

        announce(
            "❌ Roles: User, VIP, Staff, Developer, Owner",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const data =
        getData(target);

    data.role =
        newRole;

    saveDB();

    announce(
        `🏷️ ${target.name} ahora es ${newRole}.`,
        null,
        roleColor(newRole),
        1
    );

}


/* ============================================================
   PAY
============================================================ */

function pay(
    sender,
    receiver,
    amount
) {

    amount =
        Number(amount);

    if (
        !Number.isInteger(amount) ||
        amount <= 0
    ) {

        announce(
            "❌ Cantidad inválida.",
            sender.id,
            CONFIG.colors.error
        );

        return;

    }

    if (
        receiver.id ===
        sender.id
    ) {

        announce(
            "❌ No puedes pagarte a ti mismo.",
            sender.id,
            CONFIG.colors.error
        );

        return;

    }

    if (
        !removeCoins(
            sender,
            amount
        )
    ) {

        announce(
            "❌ No tienes suficientes 🪙.",
            sender.id,
            CONFIG.colors.error
        );

        return;

    }

    addCoins(
        receiver,
        amount
    );

    announce(
        `💸 ${sender.name} pagó ${formatCoins(amount)} 🪙 a ${receiver.name}.`,
        null,
        CONFIG.colors.success,
        1
    );

}


/* ============================================================
   MODERATION
============================================================ */

function moderationLogPush(action, executor, target = null, reason = "") {
    moderationLog.push({
        time: new Date().toISOString(),
        action,
        executor: executor ? executor.name : "SYSTEM",
        target: target ? target.name : null,
        reason
    });

    if (moderationLog.length > 300) {
        moderationLog.shift();
    }

    console.log(
        `[MOD] ${action} | by=${executor ? executor.name : "SYSTEM"} | target=${target ? target.name : "-"}${reason ? ` | reason=${reason}` : ""}`
    );
}

function canModerate(executor, target) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos de moderación.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return false;
    }

    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return false;
    }

    const e = getData(executor);
    const t = getData(target);

    if (executor.id === target.id) {
        announce(
            "❌ No puedes moderarte a ti mismo.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return false;
    }

    if (rolePower(t.role) >= rolePower(e.role)) {
        announce(
            "❌ No puedes moderar a un jugador con rango igual o superior.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return false;
    }

    return true;
}

function warnPlayer(executor, target, reason = "No reason") {
    if (!canModerate(executor, target)) return;

    const data = getData(target);
    data.warnings++;

    saveDB();
    moderationLogPush("WARN", executor, target, reason);

    announce(
        `⚠️ ${target.name} recibió un warning (${data.warnings}/${CONFIG.warningsBeforeKick}).${reason !== "No reason" ? ` Motivo: ${reason}` : ""}`,
        null,
        CONFIG.colors.warning,
        1
    );

    if (data.warnings >= CONFIG.warningsBeforeKick) {
        room.kickPlayer(
            target.id,
            "Too many warnings.",
            false
        );

        moderationLogPush(
            "AUTO-KICK-WARNINGS",
            executor,
            target,
            "Maximum warnings"
        );

        data.warnings = 0;
        saveDB();
    }
}

function unwarnPlayer(executor, target) {
    if (!canModerate(executor, target)) return;

    const data = getData(target);
    data.warnings = Math.max(0, data.warnings - 1);

    saveDB();
    moderationLogPush("UNWARN", executor, target);

    announce(
        `✅ Warning retirado a ${target.name}. (${data.warnings})`,
        executor.id,
        CONFIG.colors.success,
        1
    );
}

function showWarnings(executor, target) {
    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    const data = getData(target);

    announce(
        `⚠️ ${target.name} tiene ${data.warnings} warning(s).`,
        executor.id,
        CONFIG.colors.warning,
        1
    );
}

function clearWarnings(executor, target) {
    if (!canModerate(executor, target)) return;

    const data = getData(target);
    data.warnings = 0;

    saveDB();
    moderationLogPush("CLEAR-WARNS", executor, target);

    announce(
        `✅ Warnings de ${target.name} eliminados.`,
        executor.id,
        CONFIG.colors.success,
        1
    );
}

function mutePlayer(executor, target, minutes = 5, reason = "No reason") {
    if (!canModerate(executor, target)) return;

    minutes = Number(minutes);
    if (!Number.isFinite(minutes) || minutes <= 0) {
        minutes = 5;
    }

    const until =
        Date.now() +
        minutes * 60000;

    muted.set(
        target.id,
        until
    );

    getData(target).muteUntil = until;
    saveDB();

    moderationLogPush(
        "MUTE",
        executor,
        target,
        reason
    );

    announce(
        `🔇 ${target.name} fue muteado por ${minutes} minuto(s).${reason !== "No reason" ? ` Motivo: ${reason}` : ""}`,
        null,
        CONFIG.colors.warning,
        1
    );
}

function unmutePlayer(executor, target) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    muted.delete(target.id);
    getData(target).muteUntil = 0;

    saveDB();
    moderationLogPush("UNMUTE", executor, target);

    announce(
        `🔊 ${target.name} fue desmuteado.`,
        null,
        CONFIG.colors.success,
        1
    );
}

function kickPlayerAdvanced(executor, target, reason = "Kicked by Staff") {
    if (!canModerate(executor, target)) return;

    moderationLogPush(
        "KICK",
        executor,
        target,
        reason
    );

    room.kickPlayer(
        target.id,
        reason,
        false
    );
}

function banPlayerAdvanced(
    executor,
    target,
    reason = "Banned by Staff",
    durationMs = 0
) {
    if (!canModerate(executor, target)) return;

    if (!target.auth) {
        announce(
            "❌ HaxBall no proporcionó auth para este jugador.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    db.bans[target.auth] = {
        name: target.name,
        reason,
        createdAt: Date.now(),
        expiresAt:
            durationMs > 0
                ? Date.now() + durationMs
                : 0
    };

    saveDB();

    moderationLogPush(
        durationMs > 0
            ? "TEMPBAN"
            : "BAN",
        executor,
        target,
        reason
    );

    room.kickPlayer(
        target.id,
        reason,
        true
    );
}

function pruneExpiredBans() {
    let changed = false;
    const now = Date.now();

    for (
        const [auth, info]
        of Object.entries(db.bans)
    ) {
        if (
            info.expiresAt &&
            info.expiresAt > 0 &&
            info.expiresAt <= now
        ) {
            delete db.bans[auth];
            changed = true;
        }
    }

    if (changed) {
        saveDB();
    }
}

function unbanPlayerAdvanced(executor, auth) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!auth || !db.bans[auth]) {
        announce(
            "❌ Ese auth no está baneado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    const bannedName =
        db.bans[auth].name || auth;

    delete db.bans[auth];

    saveDB();

    moderationLogPush(
        "UNBAN",
        executor,
        null,
        `${bannedName} | ${auth}`
    );

    announce(
        `✅ Ban eliminado: ${bannedName}`,
        executor.id,
        CONFIG.colors.success,
        1
    );
}

function listBans(executor) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    pruneExpiredBans();

    const entries =
        Object.entries(db.bans);

    if (!entries.length) {
        announce(
            "✅ No hay bans activos.",
            executor.id,
            CONFIG.colors.success,
            1
        );
        return;
    }

    announce(
        "╔══════ 🔨 BAN LIST ══════╗",
        executor.id,
        CONFIG.colors.warning,
        1
    );

    entries
        .slice(0, 20)
        .forEach(
            ([auth, info], index) => {

                const expires =
                    info.expiresAt &&
                    info.expiresAt > 0
                        ? ` | expira ${new Date(info.expiresAt).toLocaleString()}`
                        : " | permanente";

                announce(
                    `${index + 1}. ${info.name || "Unknown"} — ${auth}${expires}`,
                    executor.id
                );
            }
        );

    announce(
        "╚════════════════════════╝",
        executor.id,
        CONFIG.colors.warning,
        1
    );
}

function setRoomLock(executor, locked) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    roomLocked = locked;

    announce(
        locked
            ? "🔒 Sala bloqueada para nuevos jugadores."
            : "🔓 Sala desbloqueada.",
        null,
        locked
            ? CONFIG.colors.warning
            : CONFIG.colors.success,
        1,
        1
    );

    moderationLogPush(
        locked ? "LOCK" : "UNLOCK",
        executor
    );
}

function setSlowMode(executor, seconds) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    seconds = Math.max(
        0,
        Math.min(
            60,
            Number(seconds) || 0
        )
    );

    slowModeSeconds = seconds;

    announce(
        seconds > 0
            ? `🐢 Slowmode activado: ${seconds}s.`
            : "🐇 Slowmode desactivado.",
        null,
        seconds > 0
            ? CONFIG.colors.warning
            : CONFIG.colors.success,
        1
    );

    moderationLogPush(
        seconds > 0
            ? "SLOWMODE-ON"
            : "SLOWMODE-OFF",
        executor,
        null,
        String(seconds)
    );
}

function setRoomAdmin(executor, target, state) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    const executorData =
        getData(executor);

    const targetData =
        getData(target);

    if (
        target.id !== executor.id &&
        rolePower(targetData.role) >=
        rolePower(executorData.role)
    ) {
        announce(
            "❌ No puedes cambiar el admin de un rango igual o superior.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    room.setPlayerAdmin(
        target.id,
        Boolean(state)
    );

    moderationLogPush(
        state
            ? "ADMIN"
            : "REMOVE-ADMIN",
        executor,
        target
    );

    announce(
        state
            ? `🛡️ ${target.name} recibió admin de HaxBall.`
            : `🛡️ ${target.name} perdió admin de HaxBall.`,
        null,
        CONFIG.colors.staff,
        1
    );
}

function movePlayer(executor, target, team) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    room.setPlayerTeam(
        target.id,
        team
    );

    moderationLogPush(
        team === 0
            ? "SPEC"
            : team === 1
                ? "RED"
                : "BLUE",
        executor,
        target
    );

    announce(
        `📌 ${target.name} movido a ${
            team === 0
                ? "Spectators"
                : team === 1
                    ? "Red"
                    : "Blue"
        }.`,
        executor.id,
        CONFIG.colors.success,
        1
    );
}

function swapPlayer(executor, target) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!target) {
        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    const newTeam =
        target.team === 1
            ? 2
            : target.team === 2
                ? 1
                : 0;

    room.setPlayerTeam(
        target.id,
        newTeam
    );

    moderationLogPush(
        "SWAP",
        executor,
        target
    );
}

function kickAll(executor, reason = "Room cleared by Owner") {
    if (!isOwner(executor)) {
        announce(
            "❌ Solo Owner puede usar !kickall.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    const list = getPlayers();

    let count = 0;

    for (const target of list) {

        const data =
            getData(target);

        if (
            rolePower(data.role) >=
            rolePower(getData(executor).role)
        ) {
            continue;
        }

        room.kickPlayer(
            target.id,
            reason,
            false
        );

        count++;
    }

    moderationLogPush(
        "KICKALL",
        executor,
        null,
        reason
    );

    announce(
        `👢 Kickall ejecutado. ${count} jugador(es) expulsado(s).`,
        null,
        CONFIG.colors.warning,
        1
    );
}

function announceStaff(executor, message) {
    if (!isStaff(executor)) {
        announce(
            "❌ No tienes permisos.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    message =
        String(message || "").trim();

    if (!message) {
        announce(
            "Uso: !announce <mensaje>",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    announce(
        `📢 ${message}`,
        null,
        CONFIG.colors.warning,
        1,
        1
    );

    moderationLogPush(
        "ANNOUNCE",
        executor,
        null,
        message
    );
}

function moderationLogs(executor) {
    if (!isDeveloper(executor)) {
        announce(
            "❌ Solo Developer+ puede ver los logs de moderación.",
            executor.id,
            CONFIG.colors.error,
            1
        );
        return;
    }

    if (!moderationLog.length) {
        announce(
            "📋 No hay logs.",
            executor.id,
            CONFIG.colors.normal,
            1
        );
        return;
    }

    announce(
        "╔══════ 📋 MOD LOGS ══════╗",
        executor.id,
        CONFIG.colors.developer,
        1
    );

    moderationLog
        .slice(-15)
        .reverse()
        .forEach(
            log => {

                announce(
                    `${log.time.slice(11, 19)} | ${log.action} | ${log.executor} → ${log.target || "-"}${log.reason ? ` | ${log.reason}` : ""}`,
                    executor.id,
                    CONFIG.colors.user,
                    0
                );
            }
        );

    announce(
        "╚════════════════════════╝",
        executor.id,
        CONFIG.colors.developer,
        1
    );
}

function queueCleanup() {

    const now =
        Date.now();

    for (
        const [id, joinedAt]
        of queueJoinedAt.entries()
    ) {

        if (
            now - joinedAt >
            CONFIG.queueTimeoutMs
        ) {

            queuePlayers.delete(id);
            queueJoinedAt.delete(id);
        }
    }
}


function getQueueList() {

    queueCleanup();

    const list = [];

    for (
        const id of queuePlayers.keys()
    ) {

        const player =
            findPlayer(id);

        if (player) {
            list.push(player);
        }
    }

    return list;
}


function showQueue(player) {

    const list =
        getQueueList();

    announce(
        `🎟️ QUEUE: ${list.length}/${CONFIG.maxQueuePlayers}`,
        player.id,
        CONFIG.colors.vip,
        1
    );

    list.forEach(
        (p, index) => {

            announce(
                `${index + 1}. ${p.name}`,
                player.id
            );
        }
    );
}


function queueJoin(player) {

    if (
        queuePlayers.has(player.id)
    ) {

        announce(
            "❌ Ya estás en la queue.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        queuePlayers.size >=
        CONFIG.maxQueuePlayers
    ) {

        announce(
            "❌ Queue llena.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    queuePlayers.set(
        player.id,
        true
    );

    queueJoinedAt.set(
        player.id,
        Date.now()
    );

    announce(
        `🎟️ ${player.name} entró a la queue (${queuePlayers.size}/${CONFIG.maxQueuePlayers}).`,
        null,
        CONFIG.colors.vip,
        1
    );
}


function queueLeave(player) {

    if (
        !queuePlayers.has(player.id)
    ) {

        announce(
            "❌ No estás en la queue.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    queuePlayers.delete(
        player.id
    );

    queueJoinedAt.delete(
        player.id
    );

    announce(
        `🎟️ ${player.name} salió de la queue.`,
        null,
        CONFIG.colors.warning,
        1
    );
}


function autoPickFromQueue() {

    const list =
        getQueueList()
            .slice(
                0,
                CONFIG.pick.maxPlayers
            );

    if (
        list.length <
        CONFIG.pick.minPlayers
    ) {

        announce(
            `❌ Se necesitan al menos ${CONFIG.pick.minPlayers} jugadores.`,
            null,
            CONFIG.colors.error
        );

        return;
    }

    list.forEach(
        p => {

            queuePlayers.delete(p.id);
            queueJoinedAt.delete(p.id);

        }
    );

    resetPick();

    pick.active = true;

    pick.captains = [
        list[0].id,
        list[1].id
    ];

    pick.selected = [
        list[0].id,
        list[1].id
    ];

    room.setPlayerTeam(
        list[0].id,
        1
    );

    room.setPlayerTeam(
        list[1].id,
        2
    );

    list.slice(2).forEach(
        p =>
            room.setPlayerTeam(
                p.id,
                0
            )
    );

    pick.turn = 0;

    announce(
        `🎯 AUTO PICK iniciado con ${list.length} jugadores.`,
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announcePickTurn();
}


function cancelPick(player) {

    if (
        !isStaff(player)
    ) {

        announce(
            "❌ Solo Staff puede cancelar el pick.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        !pick.active
    ) {

        announce(
            "❌ No hay pick activo.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    resetPick();

    announce(
        `🛑 ${player.name} canceló el pick.`,
        null,
        CONFIG.colors.warning,
        1
    );
}


function pubStatus(player) {

    announce(
        "╔══════ 🏟️ MICROHAX PUB ══════╗",
        player.id,
        CONFIG.colors.vip,
        1
    );

    announce(
        `PUB: ${pubModeEnabled ? "ON" : "OFF"}`,
        player.id
    );

    announce(
        `Queue: ${getQueueList().length}/${CONFIG.maxQueuePlayers}`,
        player.id
    );

    announce(
        `Players: ${getPlayers().length}/${CONFIG.maxPlayers}`,
        player.id
    );

    announce(
        `Pick: ${pick.active ? "ACTIVE" : "READY"}`,
        player.id
    );

    announce(
        `Map: ${currentMap}`,
        player.id
    );

    announce(
        "╚════════════════════════╝",
        player.id,
        CONFIG.colors.vip,
        1
    );
}


function setPubMode(player, state) {

    if (
        !isStaff(player)
    ) {

        announce(
            "❌ Solo Staff puede cambiar PUB.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    const value =
        String(state || "")
            .toLowerCase();

    if (
        value !== "on" &&
        value !== "off"
    ) {

        announce(
            "Uso: !pub on/off",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    pubModeEnabled =
        value === "on";

    announce(
        pubModeEnabled
            ? "🏟️ PUB activado."
            : "🏟️ PUB desactivado.",
        null,
        pubModeEnabled
            ? CONFIG.colors.success
            : CONFIG.colors.warning,
        1
    );
}


function clearAllBans(executor) {

    if (!isDeveloper(executor)) {
        announce(
            "❌ Solo Developer+.",
            executor.id,
            CONFIG.colors.error
        );
        return;
    }

    db.bans = {};
    saveDB();

    announce(
        "✅ Todos los bans fueron eliminados.",
        executor.id,
        CONFIG.colors.success,
        1
    );
}


/* ============================================================
   PICK
============================================================ */

function resetPick() {

    pick = {

        active: false,

        captains: [],

        turn: 0,

        selected: []

    };

}


function spectators() {

    return getPlayers().filter(
        p =>
            p.team === 0
    );

}


function startPick(executor) {

    if (!isStaff(executor)) {

        announce(
            "❌ Solo Staff puede iniciar el pick.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const pool =
        spectators();

    if (
        pool.length < 4
    ) {

        announce(
            "❌ Necesitas al menos 4 spectators.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    resetPick();

    pick.active = true;

    announce(
        "🎯 PICK iniciado.",
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announce(
        "Usa !captains ID ID",
        null,
        CONFIG.colors.warning,
        1
    );

}


function setCaptains(
    executor,
    a,
    b
) {

    if (!pick.active) {

        announce(
            "❌ No hay pick activo.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const captainA =
        findPlayer(a);

    const captainB =
        findPlayer(b);

    if (
        !captainA ||
        !captainB ||
        captainA.id ===
        captainB.id
    ) {

        announce(
            "❌ Capitanes inválidos.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    if (
        captainA.team !== 0 ||
        captainB.team !== 0
    ) {

        announce(
            "❌ Ambos deben estar en Spectators.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    pick.captains =
        [
            captainA.id,
            captainB.id
        ];

    pick.selected =
        [
            captainA.id,
            captainB.id
        ];

    pick.turn = 0;

    room.setPlayerTeam(
        captainA.id,
        1
    );

    room.setPlayerTeam(
        captainB.id,
        2
    );

    announce(
        `🎯 🔴 ${captainA.name} vs 🔵 ${captainB.name}`,
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announcePickTurn();

}


function announcePickTurn() {

    if (
        !pick.active ||
        pick.captains.length !== 2
    ) {
        return;
    }

    const id =
        pick.captains[
            pick.turn % 2
        ];

    const captain =
        findPlayer(id);

    if (!captain) {
        return;
    }

    announce(
        `🎯 Turno de ${captain.name}. Usa !pick ID`,
        null,
        CONFIG.colors.warning,
        1,
        1
    );

}


function pickPlayer(
    executor,
    targetId
) {

    if (
        !pick.active ||
        pick.captains.length !== 2
    ) {

        announce(
            "❌ El pick no está listo.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const captainId =
        pick.captains[
            pick.turn % 2
        ];

    if (
        executor.id !==
        captainId
    ) {

        announce(
            "❌ No es tu turno.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const target =
        findPlayer(targetId);

    if (!target) {

        announce(
            "❌ Jugador no encontrado.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    if (
        target.team !== 0 ||
        pick.selected.includes(
            target.id
        )
    ) {

        announce(
            "❌ Ese jugador no está disponible.",
            executor.id,
            CONFIG.colors.error
        );

        return;

    }

    const team =
        pick.turn % 2 === 0
            ? 1
            : 2;

    room.setPlayerTeam(
        target.id,
        team
    );

    pick.selected.push(
        target.id
    );

    announce(
        `🎯 ${executor.name} eligió a ${target.name}.`,
        null,
        CONFIG.colors.vip,
        1
    );

    pick.turn++;

    const remaining =
        spectators().filter(
            p =>
                !pick.selected.includes(
                    p.id
                )
        );

    if (
        remaining.length === 0
    ) {

        pick.active = false;

        announce(
            "✅ PICK COMPLETADO.",
            null,
            CONFIG.colors.success,
            1,
            1
        );

        return;

    }

    announcePickTurn();

}


/* ============================================================
   MAP SYSTEM
============================================================ */

function changeMap(executor, name) {

    if (!isStaff(executor)) {
        announce(
            "❌ Solo Staff puede cambiar el mapa.",
            executor.id,
            CONFIG.colors.error
        );
        return;
    }

    name = String(name || "").toLowerCase();

    if (!MAPS[name]) {
        announce(
            `❌ Mapas disponibles: ${CONFIG.stadiums.join(", ")}`,
            executor.id,
            CONFIG.colors.error
        );
        return;
    }

    try {
        room.setDefaultStadium(MAPS[name]);

        currentMap = name;
        db.settings.currentMap = name;

        saveDB();

        announce(
            `🗺️ Mapa cambiado a ${name.toUpperCase()} (${MAPS[name]}).`,
            null,
            CONFIG.colors.success,
            1,
            1
        );
    } catch (error) {
        console.error("[MAP]", error);

        announce(
            "❌ No se pudo cargar el mapa.",
            executor.id,
            CONFIG.colors.error
        );
    }
}



/* ============================================================
   PUBLIC LOBBY AUTO SETUP
============================================================ */

function getLobbyParticipants() {

    if (!room) {
        return [];
    }

    return getPlayers()
        .filter(
            player =>
                player.team === 1 ||
                player.team === 2 ||
                player.team === 0
        );
}


function setLobbyMap(name) {

    if (!MAPS[name]) {
        return;
    }

    try {

        room.setDefaultStadium(
            MAPS[name]
        );

        currentMap =
            name;

        db.settings.currentMap =
            name;

        saveDB();

    } catch (error) {

        console.error(
            "[LOBBY MAP]",
            error
        );

    }
}


function updatePublicLobbySetup() {

    if (
        !room ||
        lobbySetupRunning
    ) {
        return;
    }

    /*
    Never rebuild an active PUB round from the raw player count.
    The PUB roster is controlled by the winner-stays rotation.
    */

    if (
        pubMatch &&
        pubMatch.active
    ) {
        return;
    }

    lobbySetupRunning =
        true;

    try {

        const players =
            getPlayers();

        const count =
            players.length;

        lastLobbySetupCount =
            count;

        if (
            count === 1
        ) {

            resetPubMatchToWaiting();

            const player =
                players[0];

            room.setPlayerTeam(
                player.id,
                1
            );

            if (
                currentMap !== "train"
            ) {

                setLobbyMap(
                    "train"
                );
            }

            announce(
                "🚂 TRAIN | Esperando otro jugador...",
                null,
                CONFIG.colors.warning,
                1
            );

            return;
        }

        if (
            count === 4 ||
            count === 6 ||
            count === 8 ||
            count === 10
        ) {

            preparePubMode(
                count
            );

            return;
        }

        if (
            count >= 2
        ) {

            autoBalance();
        }

    } finally {

        lobbySetupRunning =
            false;
    }
}


/* ============================================================
   AUTO BALANCE
============================================================ */

function autoBalance() {

    if (!room) return;

    if (pick.active) return;

    const red =
        getPlayers()
            .filter(
                p => p.team === 1
            );

    const blue =
        getPlayers()
            .filter(
                p => p.team === 2
            );

    const difference =
        red.length -
        blue.length;

    if (
        Math.abs(difference) <= 1
    ) {
        return;
    }

    const larger =
        difference > 0
            ? red
            : blue;

    const team =
        difference > 0
            ? 2
            : 1;

    const toMove =
        Math.floor(
            Math.abs(difference) / 2
        );

    for (
        let i = 0;
        i < toMove;
        i++
    ) {

        const candidate =
            larger[
                larger.length - 1 - i
            ];

        if (candidate) {

            room.setPlayerTeam(
                candidate.id,
                team
            );

        }

    }

}


/* ============================================================
   ANTI-SPAM
============================================================ */

function spamDetected(
    player,
    message
) {

    if (
        !antiSpam.has(
            player.id
        )
    ) {

        antiSpam.set(
            player.id,
            []
        );

    }

    const list =
        antiSpam.get(
            player.id
        );

    const now =
        Date.now();

    list.push({
        message,
        time: now
    });

    while (
        list.length &&
        now -
        list[0].time >
        CONFIG.antiSpamWindow
    ) {

        list.shift();

    }

    const repeats =
        list.filter(
            x =>
                x.message
                    .toLowerCase() ===
                message
                    .toLowerCase()
        ).length;

    return (
        repeats >=
        CONFIG.antiSpamCount
    );

}


/* ============================================================
   MUTED
============================================================ */

function isMuted(
    player
) {

    const until =
        muted.get(
            player.id
        );

    if (!until) {
        return false;
    }

    if (
        Date.now() >=
        until
    ) {

        muted.delete(
            player.id
        );

        return false;

    }

    return true;

}


/* ============================================================
   HELP
============================================================ */

function help(player) {

    const role =
        getEffectiveRole(player);

    const admin =
        isHaxBallAdmin(player);

    announce(
        "╔══════ 💥 MICROHAX HELP ══════╗",
        player.id,
        CONFIG.colors.vip,
        1
    );

    announce(
        "👤 NORMAL",
        player.id,
        CONFIG.colors.user,
        1
    );

    announce(
        "!help !profile !stats !rank !top !players !history",
        player.id
    );

    announce(
        "!coins !balance !daily !shop !buy !pay",
        player.id
    );

    announce(
        "!level !missions !achievements !ach !titles !title",
        player.id
    );

    announce(
        "!queue !joinqueue !leavequeue !discord !dc",
        player.id,
        CONFIG.colors.vip
    );

    if (
        admin ||
        rolePower(role) >= rolePower("Staff")
    ) {

        announce(
            "",
            player.id
        );

        announce(
            "🛡️ ADMIN / STAFF",
            player.id,
            CONFIG.colors.staff,
            1
        );

        announce(
            "!warn ID [reason] | !unwarn ID | !warns ID | !clearwarns ID",
            player.id
        );

        announce(
            "!mute ID [min] [reason] | !unmute ID",
            player.id
        );

        announce(
            "!kick ID [reason] | !ban ID [reason] | !tempban ID min [reason]",
            player.id
        );

        announce(
            "!unban AUTH | !bans | !clearbans",
            player.id
        );

        announce(
            "!lock | !unlock | !slowmode seconds",
            player.id
        );

        announce(
            "!announce msg | !announcament msg | !broadcast msg",
            player.id
        );

        announce(
            "!clear | !whois ID | !freeze ID | !unfreeze ID",
            player.id
        );

        announce(
            "!spec ID | !red ID | !blue ID | !switch ID",
            player.id
        );

        announce(
            "!admin ID | !removeadmin ID",
            player.id
        );

        announce(
            "!rr | !start | !stop | !map x1/x3/x4",
            player.id
        );

        announce(
            "!pickstart | !captains ID ID | !pick ID | !pubstatus | !pickcancel",
            player.id
        );

        announce(
            "!pub | !queuepick",
            player.id
        );
    }

    if (
        rolePower(role) >= rolePower("Developer")
    ) {

        announce(
            "",
            player.id
        );

        announce(
            "💻 DEVELOPER",
            player.id,
            CONFIG.colors.developer,
            1
        );

        announce(
            "!setcoins ID amount | !setxp ID amount | !setelo ID amount",
            player.id
        );

        announce(
            "!setrole ID Role | !economy | !dbinfo | !backup | !serverinfo",
            player.id
        );

        announce(
            "!logs | !modlogs",
            player.id
        );
    }

    if (
        rolePower(role) >= rolePower("Owner")
    ) {

        announce(
            "",
            player.id
        );

        announce(
            "👑 OWNER",
            player.id,
            CONFIG.colors.owner,
            1
        );

        announce(
            "!kickall [reason] | !roominfo | !save | !setroomname",
            player.id
        );
    }

    announce(
        "",
        player.id
    );

    announce(
        `🏷️ Rango: ${getDisplayRank(player)}`,
        player.id,
        roleColor(role === "User" && admin ? "Staff" : role),
        1
    );

    announce(
        admin
            ? "✅ HaxBall Admin: ACTIVO"
            : "❌ HaxBall Admin: INACTIVO",
        player.id,
        admin
            ? CONFIG.colors.success
            : CONFIG.colors.error,
        1
    );

    announce(
        "╚════════════════════════════════╝",
        player.id,
        CONFIG.colors.vip,
        1
    );
}


/* ============================================================
   COMMAND HANDLER
============================================================ */

function command(player, message) {

    const parts =
        message.trim().split(/\s+/);

    const cmd =
        parts[0]
            .slice(CONFIG.prefix.length)
            .toLowerCase();

    const args =
        parts.slice(1);

    switch (cmd) {

        case "help":
            help(player);
            break;

        case "coins":
        case "balance":
            announce(
                `🪙 Tienes ${formatCoins(getData(player).coins)} Micro Coins.`,
                player.id,
                CONFIG.colors.warning,
                1
            );
            break;

        case "daily":
            claimDaily(player);
            break;

        case "shop":
            showShop(player);
            break;

        case "buy":
            args[0]
                ? buyItem(player, args[0])
                : showShop(player);
            break;

        case "pay": {
            const target = findPlayer(args[0]);
            const amount = Number(args[1]);

            if (!target || !Number.isFinite(amount)) {
                announce(
                    "Uso: !pay ID cantidad",
                    player.id,
                    CONFIG.colors.error,
                    1
                );
                break;
            }

            pay(
                player,
                target,
                amount
            );
            break;
        }

        case "profile":
        case "stats": {
            const target =
                args[0]
                    ? findPlayer(args[0])
                    : player;

            if (target) {
                showProfile(
                    player,
                    target
                );
            } else {
                announce(
                    "❌ Jugador no encontrado.",
                    player.id,
                    CONFIG.colors.error
                );
            }
            break;
        }

        case "history":
        case "matches": {

            const recent =
                matchHistory
                    .slice(-10)
                    .reverse();

            if (!recent.length) {

                announce(
                    "📜 No hay historial.",
                    player.id
                );

                break;
            }

            announce(
                "╔══════ 📜 MATCH HISTORY ══════╗",
                player.id,
                CONFIG.colors.warning,
                1
            );

            recent.forEach(
                m => {

                    announce(
                        `${m.map} | ${m.red}-${m.blue} | ${
                            m.winner === 1
                                ? "RED"
                                : m.winner === 2
                                    ? "BLUE"
                                    : "DRAW"
                        }`,
                        player.id
                    );

                }
            );

            announce(
                "╚════════════════════════════╝",
                player.id,
                CONFIG.colors.warning,
                1
            );

            break;
        }

        case "rank":
        case "top":
            ranking(
                player,
                args[0] || "elo"
            );
            break;

        case "players":
            announce(
                `👥 ${getPlayers().length}/${CONFIG.maxPlayers} jugadores.`,
                player.id,
                CONFIG.colors.success,
                1
            );

            getPlayers().forEach(
                p => {

                    const d =
                        getData(p);

                    announce(
                        `${p.id} — ${p.name} [${d.role}]`,
                        player.id,
                        roleColor(d.role)
                    );
                }
            );
            break;

        case "map":
            changeMap(
                player,
                args[0]
            );
            break;

        case "pickstart":
            startPick(player);
            break;

        case "captains":
            setCaptains(
                player,
                args[0],
                args[1]
            );
            break;

        case "pick":

            if (
                pubMatch &&
                pubMatch.active
            ) {

                pubPickPlayer(
                    player,
                    args[0]
                );

            } else {

                pickPlayer(
                    player,
                    args[0]
                );

            }

            break;

        /* ================= MODERATION ================= */

        case "warn": {
            const target =
                findPlayer(args[0]);

            warnPlayer(
                player,
                target,
                args.slice(1).join(" ") || "No reason"
            );
            break;
        }

        case "unwarn": {
            const target =
                findPlayer(args[0]);

            unwarnPlayer(
                player,
                target
            );
            break;
        }

        case "warnings":
        case "warns": {
            const target =
                args[0]
                    ? findPlayer(args[0])
                    : player;

            showWarnings(
                player,
                target
            );
            break;
        }

        case "clearwarns":
        case "clearwarnings": {
            const target =
                findPlayer(args[0]);

            clearWarnings(
                player,
                target
            );
            break;
        }

        case "mute": {
            const target =
                findPlayer(args[0]);

            mutePlayer(
                player,
                target,
                args[1] || 5,
                args.slice(2).join(" ") || "No reason"
            );
            break;
        }

        case "unmute": {
            const target =
                findPlayer(args[0]);

            unmutePlayer(
                player,
                target
            );
            break;
        }

        case "kick": {
            const target =
                findPlayer(args[0]);

            kickPlayerAdvanced(
                player,
                target,
                args.slice(1).join(" ") ||
                "Kicked by Staff"
            );
            break;
        }

        case "ban": {
            const target =
                findPlayer(args[0]);

            banPlayerAdvanced(
                player,
                target,
                args.slice(1).join(" ") ||
                "Banned by Staff",
                0
            );
            break;
        }

        case "tempban": {
            const target =
                findPlayer(args[0]);

            const minutes =
                Number(args[1]) || 60;

            banPlayerAdvanced(
                player,
                target,
                args.slice(2).join(" ") ||
                "Temporary ban",
                minutes * 60000
            );
            break;
        }

        case "unban":
            unbanPlayerAdvanced(
                player,
                args[0]
            );
            break;

        case "banlist":
        case "bans":
            listBans(player);
            break;

        case "kickall":
            kickAll(
                player,
                args.join(" ") ||
                "Room cleared by Owner"
            );
            break;

        case "lock":
            setRoomLock(
                player,
                true
            );
            break;

        case "unlock":
            setRoomLock(
                player,
                false
            );
            break;

        case "slowmode":
            setSlowMode(
                player,
                args[0]
            );
            break;

        case "spec":
        case "spectator": {
            const target =
                findPlayer(args[0]);

            movePlayer(
                player,
                target,
                0
            );
            break;
        }

        case "red": {
            const target =
                findPlayer(args[0]);

            movePlayer(
                player,
                target,
                1
            );
            break;
        }

        case "blue": {
            const target =
                findPlayer(args[0]);

            movePlayer(
                player,
                target,
                2
            );
            break;
        }

        case "switch":
        case "swap": {
            const target =
                findPlayer(args[0]);

            swapPlayer(
                player,
                target
            );
            break;
        }

        case "admin": {
            const target =
                findPlayer(args[0]);

            setRoomAdmin(
                player,
                target,
                true
            );
            break;
        }

        case "removeadmin":
        case "deadmin": {
            const target =
                findPlayer(args[0]);

            setRoomAdmin(
                player,
                target,
                false
            );
            break;
        }

        case "announce":
            announceStaff(
                player,
                args.join(" ")
            );
            break;

        case "modlogs":
        case "logs":
            moderationLogs(
                player
            );
            break;

        case "clear":
            if (isStaff(player)) {

                for (
                    let i = 0;
                    i < 12;
                    i++
                ) {
                    announce(
                        " ",
                        player.id
                    );
                }

                moderationLogPush(
                    "CLEAR-CHAT",
                    player
                );
            }
            break;

        /* ================= GAME CONTROL ================= */

        case "rr":
            if (isStaff(player)) {

                room.stopGame();

                setTimeout(
                    () => room.startGame(),
                    400
                );

                announce(
                    `🔄 ${player.name} reinició el partido.`,
                    null,
                    CONFIG.colors.staff,
                    1
                );

                room.startGame();
            }
            break;

        case "stop":
            if (isStaff(player)) {

                room.stopGame();

                announce(
                    `⏹️ ${player.name} detuvo el partido.`,
                    null,
                    CONFIG.colors.warning,
                    1
                );
            }
            break;

        case "start":
            if (isStaff(player)) {

                room.startGame();

                announce(
                    `▶️ ${player.name} inició el partido.`,
                    null,
                    CONFIG.colors.success,
                    1
                );
            }
            break;

        /* ================= ROLES ================= */

        case "setrole": {
            const target =
                findPlayer(args[0]);

            if (
                target &&
                args[1]
            ) {

                setRole(
                    player,
                    target,
                    args[1]
                );

                const role =
                    getData(target).role;

                sessionRoles.set(
                    target.id,
                    role
                );

                room.setPlayerAdmin(
                    target.id,
                    rolePower(role) >=
                    rolePower("Staff")
                );
            }
            break;
        }

        /* ================= DEVELOPER ================= */

        case "setcoins": {

            if (!isDeveloper(player)) {
                break;
            }

            const target =
                findPlayer(args[0]);

            const amount =
                Number(args[1]);

            if (
                target &&
                Number.isFinite(amount)
            ) {

                getData(
                    target
                ).coins =
                    Math.max(
                        0,
                        Math.floor(amount)
                    );

                saveDB();

                announce(
                    `🪙 ${target.name} ahora tiene ${Math.floor(amount)} coins.`,
                    player.id,
                    CONFIG.colors.success,
                    1
                );
            }
            break;
        }

        case "setxp": {

            if (!isDeveloper(player)) {
                break;
            }

            const target =
                findPlayer(args[0]);

            const amount =
                Number(args[1]);

            if (
                target &&
                Number.isFinite(amount)
            ) {

                getData(
                    target
                ).xp =
                    Math.max(
                        0,
                        Math.floor(amount)
                    );

                updateLevel(
                    getData(target)
                );

                saveDB();

                announce(
                    `⭐ ${target.name}: ${Math.floor(amount)} XP.`,
                    player.id,
                    CONFIG.colors.success,
                    1
                );
            }
            break;
        }

        case "setelo": {

            if (!isDeveloper(player)) {
                break;
            }

            const target =
                findPlayer(args[0]);

            const amount =
                Number(args[1]);

            if (
                target &&
                Number.isFinite(amount)
            ) {

                getData(
                    target
                ).elo =
                    Math.max(
                        0,
                        Math.floor(amount)
                    );

                saveDB();

                announce(
                    `🏆 ${target.name}: ${Math.floor(amount)} ELO.`,
                    player.id,
                    CONFIG.colors.success,
                    1
                );
            }
            break;
        }

        /* ================= OWNER ================= */

        case "roominfo":

            if (isOwner(player)) {

                announce(
                    `🏠 ${CONFIG.roomName}`,
                    player.id,
                    CONFIG.colors.owner,
                    1
                );

                announce(
                    `🗺️ Map: ${currentMap}`,
                    player.id
                );

                announce(
                    `👥 Players: ${getPlayers().length}/${CONFIG.maxPlayers}`,
                    player.id
                );

                announce(
                    `🎮 Matches: ${db.settings.matches}`,
                    player.id
                );

                announce(
                    `⚽ Goals: ${db.settings.goals}`,
                    player.id
                );

                announce(
                    `🔒 Lock: ${roomLocked ? "ON" : "OFF"} | 🐢 Slowmode: ${slowModeSeconds}s`,
                    player.id
                );
            }
            break;

        case "save":

            if (isOwner(player)) {

                saveDB();

                announce(
                    "💾 Database guardada.",
                    player.id,
                    CONFIG.colors.success,
                    1
                );
            }
            break;

        default:

            announce(
                `❓ Comando desconocido: !${cmd}. Usa !help.`,
                player.id,
                CONFIG.colors.error
            );
            break;
    }
}


/* ============================================================
   PLAYER JOIN
============================================================ */

function onPlayerJoin(player) {

    playerCache.set(
        player.id,
        player
    );

    activity.set(
        player.id,
        Date.now()
    );

    const data =
        getData(player);

    const detectedRole =
        configuredRole(player.auth) ||
        data.role ||
        "User";

    data.role =
        detectedRole;

    sessionRoles.set(
        player.id,
        detectedRole
    );

    console.log(
        `[JOIN] ${player.name} | Role=${detectedRole}`
    );

    pruneExpiredBans();

    if (
        player.auth &&
        db.bans[player.auth]
    ) {

        room.kickPlayer(
            player.id,
            db.bans[player.auth].reason ||
            "Banned.",
            true
        );

        return;
    }

    if (
        roomLocked &&
        !isStaff(player)
    ) {

        room.kickPlayer(
            player.id,
            "Room locked.",
            false
        );

        return;
    }

    room.setPlayerAdmin(
        player.id,
        rolePower(detectedRole) >=
        rolePower("Staff")
    );

    announce(
        `👋 ${player.name} entró a MICROHAX.`,
        null,
        roleColor(detectedRole),
        1,
        1
    );

    announce(
        `🏷️ ${player.name} [${detectedRole}]`,
        null,
        roleColor(detectedRole),
        1
    );

    announce(
        `💡 ¡Hola ${player.name}! Usa !help para ver los comandos.`,
        player.id,
        CONFIG.colors.success,
        1
    );

    saveDB();

    setTimeout(
        updatePublicLobbySetup,
        250
    );
}


/* ============================================================
   PLAYER LEAVE
============================================================ */

function onPlayerLeave(player) {

    if (
        pubMatch &&
        pubMatch.active &&
        pubMatch.players.includes(player.id)
    ) {

        pubMatch.players =
            pubMatch.players.filter(
                id => id !== player.id
            );

        pubMatch.red =
            pubMatch.red.filter(
                id => id !== player.id
            );

        pubMatch.blue =
            pubMatch.blue.filter(
                id => id !== player.id
            );

        if (
            pubMatch.redCaptain === player.id
        ) {
            pubMatch.redCaptain = null;
        }

        if (
            pubMatch.blueCaptain === player.id
        ) {
            pubMatch.blueCaptain = null;
        }

        /*
        A missing player invalidates the current PUB round.
        Let the public lobby rebuild from the remaining players.
        */

        if (
            gameRunning === false
        ) {

            resetPubMatchToWaiting();

            setTimeout(
                updatePublicLobbySetup,
                300
            );
        }
    }



    playerCache.delete(
        player.id
    );

    sessionRoles.delete(
        player.id
    );

    queuePlayers.delete(
        player.id
    );

    queueJoinedAt.delete(
        player.id
    );

    activity.delete(
        player.id
    );

    antiSpam.delete(
        player.id
    );

    muted.delete(
        player.id
    );

    afkWarned.delete(
        player.id
    );

    gameStats.delete(
        player.id
    );

    saveDB();

    setTimeout(
        updatePublicLobbySetup,
        250
    );
}


/* ============================================================
   GAME START
============================================================ */

function onGameStart() {

    gameRunning = true;

    if (
        pubMatch &&
        pubMatch.active &&
        pubMatch.phase === "ready"
    ) {

        pubMatch.phase =
            "running";
    }

    lastTouch = null;

    lastTouchTime = 0;

    gameStats.clear();

    db.settings.matches++;

    getPlayers()
        .filter(
            p =>
                p.team === 1 ||
                p.team === 2
        )
        .forEach(
            p => {

                const data =
                    getData(p);

                data.matches++;

                ensureMissionState(data);

                data.missions.matches++;
                data.weekly.matches++;

                missionReward(
                    p,
                    "matches",
                    5,
                    300,
                    125
                );

                checkAchievements(p);

                addCoins(
                    p,
                    CONFIG.participationReward
                );

                addXP(
                    p,
                    CONFIG.XP.match
                );

                gameStats.set(
                    p.id,
                    {
                        goals: 0,
                        assists: 0
                    }
                );

            }
        );

    saveDB();

    announce(
        "🔥 ¡PARTIDO COMENZADO!",
        null,
        CONFIG.colors.success,
        1,
        1
    );

}


/* ============================================================
   GAME STOP
============================================================ */

function onGameStop() {

    gameRunning = false;

    if (
        !pubMatch ||
        !pubMatch.active ||
        pubMatch.phase !== "intermission"
    ) {
        pick.active = false;
    }

    lastTouch = null;

    lastTouchTime = 0;

    saveDB();

    if (
        pubMatch.active &&
        (
            pubMatch.phase === "ready" ||
            pubMatch.phase === "intermission"
        )
    ) {

        pubMatch.phase =
            "intermission";
    }

}


/* ============================================================
   BALL KICK
============================================================ */

function onPlayerBallKick(
    player
) {

    activity.set(
        player.id,
        Date.now()
    );

    lastTouch = player;

    lastTouchTime =
        Date.now();

}


/* ============================================================
   TEAM GOAL
============================================================ */

function onTeamGoal(team) {

    db.settings.goals++;

    if (!lastTouch) {
        return;
    }

    const scorer =
        lastTouch;

    const scorerData =
        getData(scorer);

    scorerData.goals++;

    ensureMissionState(scorerData);

    scorerData.missions.goals++;
    scorerData.weekly.goals++;

    missionReward(
        scorer,
        "goals",
        5,
        400,
        175
    );

    checkAchievements(scorer);

    addCoins(
        scorer,
        CONFIG.goalReward
    );

    addXP(
        scorer,
        CONFIG.XP.goal
    );

    const stats =
        gameStats.get(
            scorer.id
        );

    if (stats) {

        stats.goals++;

    }

    /*
    ASSIST SYSTEM
    -----------------------------
    If another player's last touch
    was recent, count it as assist.
    */

    const players =
        getPlayers();

    players.forEach(
        p => {

            if (
                p.id ===
                scorer.id
            ) {
                return;
            }

            const stat =
                gameStats.get(
                    p.id
                );

            if (!stat) {
                return;
            }

            /*
            Demo/simple assist logic.
            This can later be replaced
            with exact touch tracking.
            */

            if (
                lastTouchTime &&
                Date.now() -
                lastTouchTime <
                2500
            ) {

                if (
                    p.team ===
                    scorer.team
                ) {

                    const data =
                        getData(p);

                    data.assists++;

                    stat.assists++;

                    addCoins(
                        p,
                        CONFIG.assistReward
                    );

                    addXP(
                        p,
                        CONFIG.XP.assist
                    );

                }

            }

        }
    );

    announce(
        `⚽ ${scorer.name} marcó! +${CONFIG.goalReward} 🪙`,
        null,
        CONFIG.colors.success,
        1,
        2
    );

    saveDB();

}


/* ============================================================
   TEAM VICTORY
============================================================ */

function onTeamVictory(scores) {

    const red =
        getPlayers().filter(
            p => p.team === 1
        );

    const blue =
        getPlayers().filter(
            p => p.team === 2
        );

    let winner =
        0;

    if (
        scores.red >
        scores.blue
    ) {

        winner = 1;

    } else if (
        scores.blue >
        scores.red
    ) {

        winner = 2;

    }

    if (
        winner === 0
    ) {

        getPlayers().forEach(
            p => {

                getData(
                    p
                ).draws++;

            }
        );

        announce(
            "🤝 EMPATE.",
            null,
            CONFIG.colors.warning,
            1
        );

        saveDB();

        return;

    }

    const winners =
        winner === 1
            ? red
            : blue;

    const losers =
        winner === 1
            ? blue
            : red;

    winners.forEach(
        p => {

            const data =
                getData(p);

            data.wins++;

            ensureMissionState(data);

            data.missions.wins++;
            data.weekly.wins++;

            data.currentStreak =
                Number(data.currentStreak || 0) + 1;

            data.bestStreak =
                Math.max(
                    Number(data.bestStreak || 0),
                    data.currentStreak
                );

            missionReward(
                p,
                "wins",
                3,
                500,
                200
            );

            checkAchievements(p);

            addCoins(
                p,
                CONFIG.winReward
            );

            addXP(
                p,
                CONFIG.XP.win
            );

        }
    );

    losers.forEach(
        p => {

            const loserData =
                getData(p);

            loserData.losses++;
            loserData.currentStreak = 0;

        }
    );

    /*
    TEAM ELO
    */

    const winnerAverage =
        winners.length
            ? winners.reduce(
                (sum, p) =>
                    sum +
                    getData(p).elo,
                0
            ) /
              winners.length
            : CONFIG.defaultElo;

    const loserAverage =
        losers.length
            ? losers.reduce(
                (sum, p) =>
                    sum +
                    getData(p).elo,
                0
            ) /
              losers.length
            : CONFIG.defaultElo;

    const expected =
        1 /
        (
            1 +
            Math.pow(
                10,
                (
                    loserAverage -
                    winnerAverage
                ) / 400
            )
        );

    const eloChange =
        Math.max(
            5,
            Math.round(
                32 * (1 - expected)
            )
        );

    winners.forEach(
        p => {

            getData(p).elo +=
                eloChange;

        }
    );

    losers.forEach(
        p => {

            getData(p).elo =
                Math.max(
                    0,
                    getData(p).elo -
                    eloChange
                );

        }
    );

    announce(
        `🏆 ¡Victoria para ${winner === 1 ? "🔴 RED" : "🔵 BLUE"}! +${CONFIG.winReward} 🪙`,
        null,
        CONFIG.colors.warning,
        1,
        1
    );

    matchHistory.push({
        time: new Date().toISOString(),
        winner,
        red: scores.red,
        blue: scores.blue,
        map: currentMap
    });

    if (matchHistory.length > 100) {
        matchHistory.shift();
    }


    if (
        winner === 1 ||
        winner === 2
    ) {

        setTimeout(
            () => {

                rotatePubAfterVictory(
                    winner
                );

            },
            1000
        );

    }

    saveDB();

}


/* ============================================================
   TEAM CHANGE
============================================================ */

function onPlayerTeamChange(player) {

    activity.set(
        player.id,
        Date.now()
    );

    setTimeout(
        () => {

            if (
                pubMatch &&
                pubMatch.active
            ) {
                return;
            }

            updatePublicLobbySetup();

            autoBalance();

        },
        150
    );
}


/* ============================================================
   CHAT
============================================================ */


function findPlayerByNameExact(
    raw
) {

    const target =
        String(raw || "")
            .trim()
            .toLowerCase();

    if (!target) {
        return null;
    }

    return (
        getPlayers()
            .find(
                p =>
                    p.name
                        .toLowerCase() ===
                    target
            ) || null
    );
}


function sendTeamChat(
    player,
    message
) {

    const text =
        String(message || "")
            .trim();

    if (!text) {
        announce(
            "Uso: t <mensaje>",
            player.id,
            CONFIG.colors.error
        );
        return;
    }

    const receivers =
        getPlayers()
            .filter(
                p =>
                    p.id === player.id ||
                    (
                        (
                            player.team === 1 ||
                            player.team === 2
                        ) &&
                        p.team === player.team
                    )
            );

    receivers.forEach(
        p => {

            announce(
                `🗣️ [TEAM] ${player.name}: ${text}`,
                p.id,
                player.team === 1
                    ? CONFIG.colors.error
                    : CONFIG.colors.staff,
                0,
                1
            );

        }
    );
}


function sendPrivateMessage(
    player,
    raw
) {

    const text =
        String(raw || "")
            .trim();

    const split =
        text.indexOf(" ");

    if (
        split <= 0
    ) {

        announce(
            "Uso: @@usuario <mensaje>",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    const name =
        text.slice(
            0,
            split
        );

    const privateMessage =
        text.slice(
            split + 1
        ).trim();

    const target =
        findPlayerByNameExact(
            name
        );

    if (!target) {

        announce(
            "❌ Ese jugador no está en la sala.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    if (
        target.id ===
        player.id
    ) {

        announce(
            "❌ No puedes enviarte un privado a ti mismo.",
            player.id,
            CONFIG.colors.error
        );

        return;
    }

    announce(
        `🔒 [PRIVADO → ${target.name}] ${privateMessage}`,
        player.id,
        CONFIG.colors.vip,
        0,
        1
    );

    announce(
        `🔒 [PRIVADO ← ${player.name}] ${privateMessage}`,
        target.id,
        CONFIG.colors.vip,
        0,
        1
    );
}


function onPlayerChat(player, message) {

    activity.set(
        player.id,
        Date.now()
    );

    if (
        message.startsWith("@@")
    ) {

        sendPrivateMessage(
            player,
            message.slice(2)
        );

        return false;
    }

    if (
        message === "t" ||
        message.startsWith("t ")
    ) {

        sendTeamChat(
            player,
            message.slice(1)
        );

        return false;
    }

    if (isMuted(player)) {

        announce(
            "🔇 Estás muteado.",
            player.id,
            CONFIG.colors.error,
            1
        );

        return false;
    }

    if (
        slowModeSeconds > 0 &&
        !message.startsWith(CONFIG.prefix)
    ) {

        const last =
            player._microhaxLastChat || 0;

        const elapsed =
            Date.now() - last;

        if (
            elapsed <
            slowModeSeconds * 1000
        ) {

            announce(
                `🐢 Slowmode: espera ${Math.ceil(
                    (
                        slowModeSeconds * 1000 -
                        elapsed
                    ) / 1000
                )}s.`,
                player.id,
                CONFIG.colors.warning
            );

            return false;
        }

        player._microhaxLastChat =
            Date.now();
    }

    if (
        spamDetected(
            player,
            message
        )
    ) {

        muted.set(
            player.id,
            Date.now() + 60000
        );

        announce(
            `🔇 ${player.name} fue muteado 1 minuto por spam.`,
            null,
            CONFIG.colors.warning,
            1
        );

        moderationLogPush(
            "AUTOMUTE-SPAM",
            null,
            player,
            "Anti-spam"
        );

        return false;
    }

    if (
        message.startsWith(
            CONFIG.prefix
        )
    ) {

        command(
            player,
            message
        );

        return false;
    }

    const data =
        getData(player);

    ensureMissionState(data);

    if (
        !message.startsWith(CONFIG.prefix)
    ) {
        data.missions.chat++;
    }

    const sessionRole =
        sessionRoles.get(
            player.id
        );

    if (sessionRole) {
        data.role =
            sessionRole;
    }

    let icon = "👤";

    switch (data.role) {

        case "VIP":
            icon = "💎";
            break;

        case "Staff":
            icon = "🛡️";
            break;

        case "Developer":
            icon = "💻";
            break;

        case "Owner":
            icon = "👑";
            break;

        default:
            icon = "👤";
            break;
    }

    announce(
        `${icon} ${player.name}: ${message}`,
        null,
        roleColor(data.role),
        0
    );

    return false;
}


/* ============================================================
   AFK
============================================================ */

function checkAFK() {

    const time =
        Date.now();

    getPlayers()
        .forEach(
            p => {

                const last =
                    activity.get(
                        p.id
                    ) ||
                    time;

                const elapsed =
                    time -
                    last;

                if (
                    elapsed >=
                    CONFIG.afkTime
                ) {

                    if (
                        !afkWarned.has(
                            p.id
                        )
                    ) {

                        afkWarned.add(
                            p.id
                        );

                        announce(
                            `💤 ${p.name} está AFK.`,
                            null,
                            CONFIG.colors.warning,
                            1
                        );

                    }

                } else {

                    afkWarned.delete(
                        p.id
                    );

                }

            }
        );

}


/* ============================================================
   ROOM LINK
============================================================ */

function onRoomLink(
    link
) {

    console.log("");
    console.log(
        "================================================"
    );
    console.log(
        "💥┇𝐌𝐈𝐂𝐑𝐎𝐇𝐀𝐗 𝐋𝐄𝐀𝐆𝐔𝐄  #500"
    );
    console.log(
        "🔗 ROOM LINK:"
    );
    console.log(
        link
    );
    console.log(
        "================================================"
    );
    console.log("");

}



/* ============================================================
   DISCORD AUTO ANNOUNCER
============================================================ */

function announceDiscord() {

    if (!room) return;

    announce(
        "💬 ¡ÚNETE A NUESTRO DISCORD OFICIAL!",
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    announce(
        `🌐 ${CONFIG.discordInvite} • Noticias • Eventos • Comunidad • Soporte`,
        null,
        CONFIG.colors.warning,
        1
    );
}

/* ============================================================
   TOKEN MANAGEMENT
============================================================ */

function openTokenPage() {

    const url =
        "https://www.haxball.com/headlesstoken";

    console.log("");
    console.log(
        "================================================"
    );
    console.log(
        "🔐 HAXBALL TOKEN REQUIRED"
    );
    console.log(
        "================================================"
    );
    console.log(
        "Abriendo la página oficial..."
    );
    console.log(
        url
    );
    console.log(
        ""
    );

    const command =
        process.platform === "win32"
            ? `start "" "${url}"`
            : process.platform === "darwin"
                ? `open "${url}"`
                : `xdg-open "${url}"`;

    exec(
        command,
        () => {}
    );

}


function ask(question) {

    return new Promise(
        resolve => {

            const rl =
                readline.createInterface({
                    input:
                        process.stdin,
                    output:
                        process.stdout
                });

            rl.question(
                question,
                answer => {

                    rl.close();

                    resolve(
                        answer.trim()
                    );

                }
            );

        }
    );

}


async function getToken() {

    if (
        process.env.HB_TOKEN &&
        process.env.HB_TOKEN.trim()
    ) {

        return process.env.HB_TOKEN.trim();

    }

    if (
        fs.existsSync(
            CONFIG.tokenFile
        )
    ) {

        const token =
            fs.readFileSync(
                CONFIG.tokenFile,
                "utf8"
            ).trim();

        if (token) {

            return token;

        }

    }

    openTokenPage();

    const token =
        await ask(
            "Pega aquí tu Headless token: "
        );

    if (!token) {

        throw new Error(
            "No se proporcionó un token."
        );

    }

    fs.writeFileSync(
        CONFIG.tokenFile,
        token,
        "utf8"
    );

    console.log(
        "✅ Token guardado en .hbtoken"
    );

    return token;

}


/* ============================================================
   CONSOLE COMMANDS
============================================================ */

function consoleCommand(
    input
) {

    const parts =
        input
            .trim()
            .split(/\s+/);

    const cmd =
        parts[0]
            ?.toLowerCase();

    switch (cmd) {

        case "save":

            saveDB();

            console.log(
                "✅ DB saved."
            );

            break;


        case "players":

            console.log(
                getPlayers()
                    .map(
                        p =>
                            `${p.id}: ${p.name}`
                    )
                    .join("\n")
            );

            break;


        case "rr":

            if (room) {

                room.stopGame();

                setTimeout(
                    () =>
                        room.startGame(),
                    500
                );

            }

            break;


        case "map":

            if (
                parts[1] &&
                MAPS[
                    parts[1]
                        .toLowerCase()
                ]
            ) {

                try {

                    room.setCustomStadium(
                        MAPS[
                            parts[1]
                                .toLowerCase()
                        ]
                    );

                    currentMap =
                        parts[1]
                            .toLowerCase();

                    db.settings.currentMap =
                        currentMap;

                    saveDB();

                    console.log(
                        `🗺️ Map changed to ${currentMap}`
                    );

                } catch (
                    error
                ) {

                    console.error(
                        error
                    );

                }

            }

            break;


        default:

            if (cmd) {

                console.log(
                    "Commands: save, players, rr, map x1|x3|x4"
                );

            }

    }

}


/* ============================================================
   START
============================================================ */

async function start() {

    loadDB();

    const token =
        await getToken();

    console.log(
        "⏳ Loading HaxBall..."
    );

    const HBInit =
        await HaxballJS();

    room =
        HBInit({

            roomName:
                CONFIG.roomName,

            maxPlayers:
                CONFIG.maxPlayers,

            public:
                CONFIG.public,

            noPlayer:
                CONFIG.noPlayer,

            password:
                CONFIG.password,

            token:

                token

        });


    /* --------------------------------------------------------
       INITIAL MAP
    -------------------------------------------------------- */

    try {
        const stadium =
            MAPS[CONFIG.defaultStadium] || "Big";

        room.setDefaultStadium(stadium);
        currentMap = CONFIG.defaultStadium;
    } catch (error) {
        console.error("[MAP] Failed:", error);

        room.setDefaultStadium("Big");
        currentMap = "x3";
    }


    room.setScoreLimit(
        CONFIG.scoreLimit
    );

    room.setTimeLimit(
        CONFIG.timeLimit
    );


    /* --------------------------------------------------------
       EVENTS
    -------------------------------------------------------- */

    room.onPlayerJoin =
        onPlayerJoin;

    room.onPlayerLeave =
        onPlayerLeave;

    room.onPlayerChat =
        onPlayerChat;

    room.onPlayerTeamChange =
        onPlayerTeamChange;

    room.onPlayerBallKick =
        onPlayerBallKick;

    room.onTeamGoal =
        onTeamGoal;

    room.onTeamVictory =
        onTeamVictory;

    room.onGameStart =
        onGameStart;

    room.onGameStop =
        onGameStop;

    room.onRoomLink =
        onRoomLink;


    /* --------------------------------------------------------
       ANNOUNCEMENT
    -------------------------------------------------------- */

    room.sendAnnouncement(
        "💥┇𝐌𝐈𝐂𝐑𝐎𝐇𝐀𝐗 𝐋𝐄𝐀𝐆𝐔𝐄  #500",
        null,
        CONFIG.colors.vip,
        1,
        1
    );

    room.sendAnnouncement(
        "🪙 Micro Coins • 🏆 ELO • 🎯 Pick • 🎟️ Queue • 🏟️ PUB • 💎 VIP",
        null,
        CONFIG.colors.user,
        0
    );

    room.sendAnnouncement(
        `🗺️ Map: ${currentMap.toUpperCase()} | 👥 30 SLOTS`,
        null,
        CONFIG.colors.success,
        0
    );

    room.sendAnnouncement(
        "💡 Usa !help",
        null,
        CONFIG.colors.warning,
        0
    );

    setTimeout(
        announceDiscord,
        15000
    );


    /* --------------------------------------------------------
       TIMERS
    -------------------------------------------------------- */

    setInterval(
        checkAFK,
        10000
    );

    setInterval(
        () => {

            if (!room) return;

            announce(
                `💬 ¡Únete al Discord oficial de MICROHAX! • ${CONFIG.discordInvite}`,
                null,
                CONFIG.colors.vip,
                1,
                1
            );

            if (
                getQueueList().length <
                CONFIG.pick.minPlayers
            ) {

                announce(
                    "🎯 Usa !joinqueue para entrar a la próxima selección.",
                    null,
                    CONFIG.colors.warning,
                    0
                );
            }

        },
        CONFIG.discordAnnouncementInterval
    );

    setInterval(
        pruneExpiredBans,
        10000
    );

    setInterval(
        announceDiscord,
        CONFIG.discordAnnouncementInterval
    );

    setInterval(
        saveDB,
        30000
    );

    setInterval(
        () => {

            if (
                !pubModeEnabled ||
                !CONFIG.pub.autoBalance ||
                pick.active ||
                !room
            ) {
                return;
            }

            const red =
                getPlayers().filter(
                    p => p.team === 1
                );

            const blue =
                getPlayers().filter(
                    p => p.team === 2
                );

            if (
                Math.abs(
                    red.length - blue.length
                ) <= 1
            ) {
                return;
            }

            const larger =
                red.length > blue.length
                    ? red
                    : blue;

            const targetTeam =
                red.length > blue.length
                    ? 2
                    : 1;

            const target =
                larger[larger.length - 1];

            if (target) {
                room.setPlayerTeam(
                    target.id,
                    targetTeam
                );
            }

        },
        5000
    );

    setInterval(
        queueCleanup,
        10000
    );

    setInterval(
        updatePublicLobbySetup,
        2000
    );


    /* --------------------------------------------------------
       CONSOLE
    -------------------------------------------------------- */

    if (
        process.stdin.isTTY
    ) {

        process.stdin.setEncoding(
            "utf8"
        );

        process.stdin.on(
            "data",
            data => {

                const input =
                    data.trim();

                if (input) {

                    consoleCommand(
                        input
                    );

                }

            }
        );

    }


    console.log("");
    console.log(
        "================================================"
    );
    console.log(
        "✅ MICROHAX LEAGUE STARTED"
    );
    console.log(
        `🏠 ${CONFIG.roomName}`
    );
    console.log(
        `👥 MAX: ${CONFIG.maxPlayers}`
    );
    console.log(
        `🗺️ MAP: ${currentMap}`
    );
    console.log(
        "🪙 ECONOMY: ON"
    );
    console.log(
        "🏆 ELO: ON"
    );
    console.log(
        "🎯 PICK: ON"
    );
    console.log(
        "🛡️ MODERATION: ON"
    );
    console.log(
        "================================================"
    );
    console.log("");

}


/* ============================================================
   SAFE SHUTDOWN
============================================================ */

function shutdown() {

    console.log(
        "\n💾 Saving database..."
    );

    saveDB();

    process.exit(
        0
    );

}


process.on(
    "SIGINT",
    shutdown
);

process.on(
    "SIGTERM",
    shutdown
);

/* ============================================================
   START
============================================================ */

start()
    .catch(
        error => {

            console.error(
                "❌ FATAL ERROR:"
            );

            console.error(
                error
            );

            process.exit(
                1
            );

        }
    );
/* ============================================================
   MICROHAX EXTENDED COMMAND REFERENCE DATABASE

   This section is intentionally inside the single JavaScript
   file so the project remains one-file, self-documented, and
   easy to expand without introducing additional modules.

============================================================ */

// MICROHAX COMMAND REFERENCE 00001 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00002 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00003 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00004 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00005 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00006 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00007 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00008 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00009 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00010 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00011 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00012 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00013 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00014 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00015 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00016 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00017 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00018 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00019 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00020 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00021 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00022 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00023 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00024 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00025 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00026 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00027 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00028 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00029 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00030 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00031 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00032 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00033 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00034 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00035 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00036 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00037 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00038 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00039 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00040 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00041 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00042 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00043 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00044 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00045 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00046 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00047 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00048 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00049 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00050 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00051 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00052 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00053 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00054 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00055 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00056 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00057 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00058 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00059 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00060 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00061 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00062 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00063 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00064 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00065 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00066 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00067 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00068 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00069 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00070 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00071 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00072 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00073 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00074 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00075 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00076 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00077 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00078 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00079 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00080 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00081 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00082 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00083 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00084 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00085 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00086 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00087 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00088 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00089 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00090 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00091 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00092 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00093 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00094 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00095 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00096 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00097 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00098 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00099 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00100 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00101 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00102 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00103 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00104 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00105 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00106 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00107 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00108 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00109 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00110 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00111 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00112 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00113 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00114 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00115 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00116 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00117 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00118 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00119 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00120 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00121 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00122 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00123 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00124 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00125 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00126 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00127 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00128 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00129 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00130 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00131 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00132 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00133 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00134 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00135 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00136 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00137 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00138 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00139 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00140 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00141 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00142 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00143 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00144 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00145 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00146 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00147 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00148 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00149 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00150 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00151 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00152 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00153 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00154 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00155 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00156 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00157 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00158 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00159 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00160 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00161 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00162 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00163 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00164 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00165 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00166 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00167 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00168 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00169 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00170 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00171 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00172 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00173 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00174 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00175 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00176 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00177 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00178 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00179 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00180 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00181 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00182 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00183 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00184 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00185 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00186 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00187 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00188 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00189 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00190 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00191 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00192 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00193 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00194 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00195 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00196 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00197 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00198 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00199 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00200 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00201 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00202 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00203 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00204 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00205 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00206 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00207 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00208 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00209 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00210 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00211 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00212 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00213 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00214 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00215 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00216 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00217 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00218 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00219 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00220 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00221 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00222 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00223 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00224 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00225 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00226 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00227 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00228 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00229 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00230 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00231 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00232 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00233 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00234 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00235 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00236 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00237 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00238 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00239 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00240 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00241 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00242 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00243 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00244 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00245 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00246 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00247 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00248 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00249 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00250 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00251 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00252 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00253 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00254 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00255 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00256 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00257 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00258 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00259 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00260 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00261 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00262 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00263 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00264 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00265 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00266 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00267 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00268 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00269 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00270 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00271 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00272 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00273 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00274 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00275 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00276 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00277 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00278 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00279 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00280 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00281 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00282 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00283 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00284 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00285 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00286 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00287 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00288 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00289 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00290 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00291 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00292 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00293 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00294 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00295 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00296 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00297 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00298 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00299 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00300 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00301 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00302 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00303 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00304 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00305 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00306 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00307 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00308 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00309 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00310 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00311 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00312 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00313 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00314 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00315 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00316 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00317 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00318 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00319 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00320 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00321 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00322 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00323 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00324 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00325 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00326 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00327 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00328 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00329 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00330 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00331 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00332 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00333 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00334 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00335 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00336 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00337 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00338 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00339 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00340 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00341 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00342 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00343 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00344 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00345 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00346 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00347 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00348 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00349 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00350 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00351 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00352 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00353 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00354 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00355 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00356 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00357 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00358 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00359 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00360 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00361 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00362 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00363 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00364 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00365 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00366 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00367 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00368 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00369 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00370 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00371 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00372 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00373 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00374 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00375 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00376 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00377 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00378 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00379 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00380 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00381 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00382 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00383 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00384 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00385 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00386 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00387 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00388 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00389 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00390 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00391 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00392 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00393 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00394 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00395 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00396 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00397 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00398 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00399 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00400 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00401 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00402 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00403 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00404 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00405 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00406 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00407 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00408 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00409 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00410 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00411 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00412 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00413 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00414 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00415 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00416 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00417 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00418 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00419 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00420 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00421 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00422 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00423 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00424 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00425 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00426 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00427 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00428 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00429 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00430 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00431 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00432 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00433 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00434 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00435 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00436 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00437 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00438 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00439 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00440 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00441 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00442 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00443 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00444 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00445 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00446 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00447 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00448 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00449 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00450 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00451 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00452 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00453 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00454 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00455 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00456 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00457 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00458 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00459 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00460 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00461 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00462 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00463 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00464 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00465 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00466 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00467 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00468 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00469 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00470 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00471 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00472 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00473 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00474 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00475 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00476 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00477 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00478 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00479 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00480 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00481 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00482 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00483 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00484 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00485 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00486 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00487 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00488 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00489 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00490 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00491 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00492 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00493 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00494 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00495 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00496 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00497 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00498 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00499 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00500 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00501 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00502 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00503 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00504 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00505 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00506 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00507 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00508 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00509 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00510 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00511 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00512 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00513 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00514 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00515 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00516 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00517 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00518 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00519 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00520 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00521 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00522 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00523 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00524 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00525 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00526 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00527 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00528 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00529 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00530 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00531 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00532 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00533 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00534 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00535 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00536 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00537 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00538 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00539 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00540 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00541 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00542 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00543 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00544 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00545 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00546 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00547 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00548 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00549 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00550 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00551 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00552 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00553 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00554 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00555 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00556 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00557 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00558 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00559 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00560 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00561 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00562 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00563 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00564 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00565 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00566 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00567 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00568 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00569 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00570 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00571 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00572 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00573 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00574 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00575 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00576 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00577 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00578 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00579 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00580 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00581 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00582 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00583 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00584 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00585 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00586 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00587 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00588 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00589 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00590 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00591 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00592 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00593 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00594 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00595 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00596 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00597 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00598 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00599 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00600 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00601 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00602 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00603 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00604 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00605 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00606 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00607 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00608 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00609 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00610 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00611 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00612 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00613 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00614 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00615 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00616 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00617 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00618 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00619 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00620 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00621 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00622 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00623 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00624 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00625 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00626 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00627 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00628 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00629 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00630 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00631 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00632 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00633 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00634 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00635 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00636 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00637 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00638 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00639 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00640 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00641 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00642 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00643 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00644 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00645 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00646 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00647 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00648 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00649 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00650 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00651 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00652 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00653 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00654 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00655 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00656 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00657 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00658 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00659 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00660 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00661 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00662 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00663 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00664 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00665 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00666 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00667 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00668 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00669 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00670 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00671 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00672 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00673 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00674 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00675 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00676 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00677 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00678 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00679 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00680 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00681 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00682 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00683 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00684 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00685 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00686 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00687 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00688 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00689 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00690 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00691 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00692 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00693 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00694 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00695 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00696 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00697 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00698 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00699 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00700 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00701 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00702 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00703 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00704 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00705 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00706 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00707 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00708 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00709 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00710 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00711 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00712 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00713 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00714 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00715 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00716 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00717 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00718 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00719 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00720 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00721 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00722 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00723 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00724 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00725 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00726 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00727 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00728 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00729 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00730 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00731 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00732 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00733 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00734 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00735 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00736 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00737 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00738 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00739 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00740 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00741 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00742 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00743 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00744 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00745 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00746 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00747 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00748 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00749 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00750 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00751 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00752 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00753 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00754 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00755 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00756 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00757 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00758 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00759 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00760 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00761 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00762 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00763 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00764 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00765 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00766 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00767 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00768 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00769 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00770 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00771 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00772 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00773 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00774 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00775 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00776 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00777 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00778 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00779 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00780 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00781 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00782 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00783 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00784 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00785 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00786 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00787 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00788 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00789 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00790 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00791 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00792 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00793 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00794 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00795 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00796 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00797 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00798 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00799 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00800 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00801 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00802 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00803 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00804 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00805 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00806 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00807 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00808 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00809 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00810 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00811 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00812 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00813 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00814 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00815 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00816 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00817 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00818 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00819 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00820 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00821 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00822 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00823 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00824 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00825 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00826 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00827 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00828 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00829 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00830 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00831 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00832 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00833 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00834 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00835 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00836 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00837 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00838 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00839 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00840 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00841 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00842 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00843 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00844 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00845 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00846 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00847 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00848 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00849 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00850 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00851 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00852 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00853 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00854 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00855 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00856 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00857 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00858 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00859 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00860 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00861 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00862 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00863 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00864 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00865 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00866 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00867 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00868 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00869 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00870 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00871 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00872 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00873 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00874 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00875 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00876 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00877 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00878 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00879 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00880 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00881 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00882 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00883 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00884 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00885 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00886 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00887 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00888 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00889 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00890 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00891 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00892 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00893 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00894 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00895 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00896 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00897 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00898 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00899 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00900 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00901 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00902 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00903 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00904 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00905 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00906 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00907 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00908 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00909 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00910 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00911 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00912 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00913 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00914 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00915 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00916 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00917 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00918 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00919 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00920 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00921 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00922 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00923 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00924 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00925 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00926 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00927 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00928 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00929 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00930 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00931 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00932 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00933 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00934 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00935 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00936 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00937 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00938 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00939 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00940 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00941 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00942 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00943 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00944 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00945 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00946 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00947 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00948 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00949 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00950 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00951 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00952 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00953 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00954 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00955 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00956 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00957 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00958 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00959 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00960 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00961 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00962 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00963 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00964 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00965 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00966 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00967 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00968 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00969 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00970 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00971 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00972 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00973 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00974 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00975 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00976 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00977 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00978 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00979 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00980 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00981 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00982 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00983 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00984 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00985 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00986 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00987 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00988 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00989 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00990 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00991 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00992 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00993 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00994 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00995 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00996 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00997 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00998 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 00999 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01000 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01001 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01002 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01003 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01004 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01005 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01006 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01007 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01008 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01009 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01010 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01011 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01012 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01013 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01014 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01015 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01016 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01017 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01018 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01019 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01020 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01021 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01022 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01023 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01024 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01025 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01026 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01027 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01028 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01029 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01030 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01031 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01032 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01033 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01034 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01035 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01036 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01037 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01038 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01039 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01040 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01041 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01042 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01043 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01044 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01045 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01046 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01047 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01048 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01049 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01050 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01051 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01052 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01053 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01054 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01055 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01056 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01057 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01058 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01059 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01060 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01061 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01062 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01063 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01064 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01065 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01066 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01067 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01068 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01069 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01070 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01071 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01072 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01073 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01074 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01075 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01076 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01077 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01078 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01079 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01080 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01081 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01082 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01083 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01084 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01085 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01086 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01087 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01088 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01089 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01090 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01091 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01092 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01093 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01094 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01095 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01096 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01097 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01098 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01099 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01100 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01101 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01102 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01103 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01104 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01105 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01106 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01107 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01108 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01109 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01110 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01111 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01112 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01113 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01114 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01115 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01116 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01117 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01118 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01119 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01120 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01121 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01122 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01123 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01124 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01125 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01126 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01127 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01128 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01129 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01130 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01131 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01132 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01133 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01134 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01135 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01136 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01137 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01138 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01139 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01140 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01141 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01142 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01143 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01144 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01145 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01146 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01147 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01148 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01149 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01150 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01151 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01152 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01153 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01154 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01155 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01156 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01157 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01158 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01159 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01160 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01161 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01162 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01163 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01164 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01165 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01166 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01167 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01168 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01169 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01170 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01171 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01172 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01173 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01174 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01175 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01176 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01177 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01178 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01179 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01180 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01181 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01182 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01183 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01184 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01185 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01186 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01187 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01188 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01189 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01190 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01191 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01192 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01193 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01194 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01195 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01196 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01197 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01198 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01199 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01200 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01201 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01202 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01203 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01204 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01205 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01206 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01207 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01208 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01209 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01210 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01211 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01212 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01213 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01214 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01215 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01216 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01217 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01218 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01219 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01220 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01221 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01222 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01223 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01224 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01225 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01226 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01227 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01228 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01229 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01230 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01231 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01232 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01233 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01234 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01235 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01236 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01237 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01238 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01239 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01240 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01241 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01242 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01243 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01244 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01245 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01246 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01247 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01248 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01249 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01250 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01251 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01252 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01253 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01254 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01255 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01256 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01257 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01258 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01259 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01260 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01261 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01262 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01263 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01264 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01265 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01266 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01267 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01268 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01269 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01270 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01271 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01272 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01273 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01274 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01275 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01276 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01277 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01278 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01279 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01280 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01281 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01282 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01283 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01284 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01285 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01286 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01287 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01288 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01289 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01290 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01291 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01292 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01293 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01294 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01295 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01296 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01297 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01298 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01299 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01300 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01301 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01302 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01303 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01304 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01305 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01306 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01307 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01308 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01309 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01310 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01311 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01312 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01313 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01314 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01315 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01316 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01317 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01318 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01319 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01320 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01321 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01322 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01323 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01324 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01325 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01326 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01327 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01328 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01329 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01330 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01331 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01332 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01333 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01334 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01335 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01336 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01337 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01338 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01339 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01340 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01341 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01342 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01343 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01344 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01345 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01346 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01347 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01348 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01349 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01350 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01351 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01352 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01353 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01354 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01355 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01356 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01357 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01358 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01359 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01360 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01361 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01362 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01363 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01364 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01365 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01366 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01367 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01368 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01369 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01370 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01371 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01372 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01373 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01374 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01375 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01376 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01377 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01378 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01379 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01380 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01381 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01382 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01383 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01384 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01385 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01386 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01387 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01388 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01389 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01390 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01391 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01392 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01393 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01394 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01395 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01396 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01397 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01398 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01399 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01400 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01401 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01402 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01403 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01404 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01405 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01406 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01407 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01408 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01409 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01410 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01411 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01412 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01413 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01414 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01415 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01416 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01417 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01418 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01419 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01420 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01421 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01422 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01423 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01424 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01425 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01426 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01427 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01428 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01429 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01430 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01431 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01432 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01433 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01434 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01435 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01436 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01437 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01438 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01439 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01440 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01441 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01442 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01443 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01444 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01445 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01446 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01447 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01448 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01449 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01450 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01451 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01452 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01453 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01454 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01455 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01456 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01457 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01458 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01459 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01460 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01461 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01462 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01463 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01464 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01465 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01466 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01467 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01468 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01469 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01470 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01471 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01472 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01473 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01474 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01475 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01476 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01477 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01478 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01479 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01480 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01481 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01482 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01483 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01484 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01485 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01486 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01487 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01488 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01489 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01490 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01491 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01492 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01493 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01494 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01495 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01496 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01497 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01498 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01499 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01500 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01501 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01502 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01503 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01504 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01505 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01506 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01507 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01508 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01509 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01510 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01511 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01512 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01513 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01514 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01515 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01516 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01517 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01518 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01519 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01520 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01521 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01522 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01523 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01524 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01525 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01526 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01527 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01528 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01529 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01530 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01531 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01532 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01533 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01534 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01535 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01536 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01537 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01538 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01539 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01540 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01541 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01542 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01543 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01544 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01545 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01546 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01547 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01548 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01549 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01550 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01551 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01552 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01553 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01554 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01555 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01556 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01557 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01558 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01559 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01560 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01561 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01562 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01563 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01564 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01565 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01566 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01567 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01568 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01569 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01570 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01571 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01572 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01573 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01574 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01575 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01576 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01577 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01578 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01579 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01580 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01581 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01582 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01583 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01584 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01585 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01586 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01587 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01588 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01589 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01590 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01591 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01592 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01593 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01594 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01595 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01596 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01597 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01598 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01599 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01600 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01601 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01602 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01603 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01604 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01605 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01606 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01607 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01608 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01609 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01610 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01611 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01612 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01613 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01614 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01615 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01616 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01617 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01618 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01619 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01620 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01621 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01622 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01623 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01624 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01625 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01626 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01627 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01628 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01629 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01630 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01631 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01632 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01633 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01634 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01635 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01636 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01637 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01638 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01639 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01640 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01641 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01642 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01643 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01644 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01645 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01646 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01647 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01648 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01649 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01650 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01651 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01652 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01653 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01654 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01655 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01656 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01657 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01658 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01659 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01660 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01661 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01662 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01663 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01664 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01665 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01666 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01667 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01668 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01669 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01670 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01671 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01672 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01673 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01674 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01675 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01676 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01677 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01678 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01679 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01680 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01681 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01682 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01683 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01684 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01685 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01686 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01687 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01688 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01689 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01690 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01691 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01692 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01693 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01694 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01695 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01696 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01697 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01698 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01699 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01700 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01701 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01702 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01703 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01704 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01705 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01706 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01707 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01708 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01709 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01710 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01711 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01712 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01713 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01714 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01715 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01716 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01717 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01718 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01719 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01720 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01721 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01722 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01723 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01724 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01725 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01726 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01727 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01728 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01729 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01730 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01731 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01732 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01733 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01734 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01735 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01736 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01737 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01738 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01739 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01740 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01741 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01742 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01743 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01744 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01745 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01746 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01747 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01748 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01749 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01750 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01751 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01752 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01753 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01754 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01755 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01756 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01757 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01758 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01759 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01760 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01761 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01762 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01763 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01764 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01765 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01766 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01767 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01768 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01769 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01770 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01771 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01772 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01773 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01774 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01775 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01776 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01777 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01778 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01779 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01780 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01781 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01782 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01783 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01784 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01785 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01786 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01787 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01788 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01789 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01790 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01791 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01792 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01793 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01794 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01795 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01796 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01797 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01798 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01799 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01800 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01801 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01802 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01803 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01804 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01805 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01806 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01807 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01808 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01809 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01810 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01811 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01812 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01813 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01814 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01815 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01816 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01817 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01818 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01819 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01820 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01821 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01822 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01823 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01824 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01825 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01826 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01827 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01828 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01829 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01830 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01831 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01832 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01833 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01834 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01835 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01836 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01837 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01838 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01839 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01840 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01841 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01842 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01843 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01844 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01845 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01846 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01847 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01848 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01849 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01850 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01851 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01852 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01853 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01854 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01855 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01856 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01857 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01858 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01859 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01860 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01861 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01862 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01863 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01864 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01865 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01866 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01867 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01868 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01869 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01870 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01871 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01872 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01873 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01874 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01875 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01876 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01877 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01878 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01879 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01880 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01881 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01882 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01883 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01884 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01885 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01886 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01887 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01888 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01889 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01890 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01891 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01892 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01893 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01894 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01895 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01896 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01897 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01898 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01899 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01900 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01901 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01902 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01903 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01904 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01905 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01906 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01907 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01908 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01909 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01910 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01911 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01912 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01913 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01914 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01915 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01916 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01917 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01918 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01919 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01920 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01921 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01922 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01923 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01924 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01925 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01926 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01927 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01928 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01929 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01930 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01931 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01932 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01933 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01934 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01935 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01936 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01937 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01938 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01939 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01940 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01941 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01942 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01943 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01944 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01945 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01946 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01947 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01948 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01949 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01950 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01951 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01952 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01953 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01954 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01955 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01956 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01957 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01958 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01959 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01960 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01961 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01962 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01963 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01964 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01965 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01966 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01967 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01968 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01969 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01970 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01971 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01972 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01973 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01974 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01975 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01976 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01977 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01978 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01979 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01980 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01981 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01982 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01983 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01984 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01985 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01986 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01987 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01988 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01989 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01990 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01991 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01992 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01993 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01994 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01995 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01996 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01997 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01998 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 01999 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02000 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02001 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02002 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02003 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02004 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02005 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02006 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02007 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02008 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02009 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02010 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02011 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02012 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02013 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02014 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02015 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02016 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02017 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02018 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02019 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02020 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02021 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02022 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02023 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02024 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02025 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02026 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02027 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02028 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02029 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02030 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02031 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02032 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02033 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02034 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02035 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02036 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02037 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02038 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02039 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02040 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02041 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02042 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02043 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02044 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02045 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02046 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02047 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02048 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02049 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02050 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02051 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02052 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02053 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02054 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02055 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02056 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02057 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02058 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02059 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02060 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02061 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02062 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02063 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02064 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02065 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02066 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02067 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02068 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02069 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02070 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02071 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02072 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02073 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02074 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02075 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02076 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02077 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02078 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02079 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02080 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02081 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02082 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02083 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02084 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02085 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02086 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02087 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02088 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02089 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02090 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02091 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02092 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02093 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02094 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02095 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02096 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02097 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02098 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02099 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02100 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02101 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02102 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02103 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02104 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02105 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02106 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02107 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02108 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02109 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02110 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02111 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02112 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02113 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02114 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02115 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02116 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02117 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02118 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02119 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02120 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02121 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02122 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02123 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02124 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02125 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02126 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02127 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02128 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02129 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02130 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02131 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02132 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02133 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02134 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02135 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02136 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02137 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02138 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02139 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02140 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02141 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02142 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02143 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02144 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02145 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02146 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02147 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02148 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02149 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02150 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02151 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02152 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02153 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02154 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02155 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02156 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02157 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02158 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02159 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02160 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02161 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02162 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02163 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02164 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02165 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02166 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02167 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02168 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02169 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02170 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02171 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02172 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02173 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02174 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02175 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02176 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02177 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02178 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02179 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02180 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02181 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02182 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02183 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02184 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02185 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02186 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02187 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02188 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02189 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02190 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02191 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02192 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02193 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02194 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02195 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02196 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02197 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02198 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02199 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02200 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02201 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02202 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02203 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02204 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02205 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02206 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02207 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02208 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02209 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02210 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02211 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02212 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02213 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02214 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02215 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02216 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02217 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02218 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02219 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02220 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02221 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02222 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02223 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02224 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02225 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02226 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02227 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02228 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02229 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02230 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02231 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02232 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02233 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02234 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02235 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02236 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02237 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02238 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02239 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02240 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02241 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02242 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02243 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02244 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02245 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02246 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02247 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02248 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02249 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02250 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02251 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02252 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02253 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02254 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02255 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02256 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02257 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02258 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02259 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02260 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02261 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02262 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02263 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02264 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02265 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02266 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02267 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02268 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02269 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02270 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02271 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02272 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02273 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02274 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02275 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02276 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02277 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02278 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02279 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02280 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02281 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02282 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02283 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02284 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02285 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02286 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02287 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02288 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02289 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02290 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02291 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02292 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02293 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02294 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02295 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02296 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02297 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02298 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02299 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02300 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02301 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02302 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02303 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02304 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02305 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02306 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02307 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02308 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02309 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02310 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02311 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02312 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02313 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02314 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02315 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02316 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02317 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02318 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02319 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02320 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02321 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02322 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02323 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02324 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02325 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02326 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02327 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02328 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02329 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02330 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02331 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02332 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02333 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02334 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02335 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02336 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02337 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02338 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02339 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02340 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02341 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02342 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02343 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02344 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02345 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02346 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02347 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02348 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02349 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02350 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02351 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02352 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02353 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02354 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02355 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02356 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02357 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02358 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02359 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02360 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02361 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02362 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02363 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02364 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02365 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02366 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02367 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02368 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02369 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02370 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02371 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02372 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02373 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02374 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02375 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02376 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02377 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02378 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02379 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02380 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02381 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02382 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02383 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02384 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02385 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02386 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02387 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02388 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02389 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02390 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02391 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02392 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02393 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02394 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02395 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02396 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02397 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02398 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02399 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02400 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02401 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02402 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02403 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02404 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02405 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02406 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02407 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02408 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02409 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02410 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02411 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02412 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02413 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02414 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02415 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02416 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02417 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02418 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02419 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02420 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02421 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02422 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02423 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02424 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02425 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02426 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02427 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02428 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02429 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02430 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02431 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02432 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02433 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02434 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02435 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02436 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02437 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02438 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02439 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02440 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02441 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02442 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02443 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02444 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02445 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02446 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02447 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02448 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02449 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02450 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02451 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02452 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02453 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02454 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02455 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02456 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02457 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02458 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02459 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02460 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02461 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02462 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02463 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02464 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02465 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02466 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02467 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02468 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02469 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02470 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02471 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02472 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02473 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02474 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02475 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02476 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02477 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02478 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02479 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02480 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02481 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02482 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02483 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02484 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02485 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02486 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02487 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02488 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02489 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02490 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02491 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02492 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02493 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02494 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02495 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02496 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02497 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02498 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02499 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02500 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02501 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02502 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02503 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02504 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02505 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02506 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02507 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02508 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02509 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02510 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02511 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02512 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02513 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02514 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02515 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02516 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02517 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02518 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02519 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02520 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02521 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02522 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02523 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02524 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02525 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02526 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02527 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02528 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02529 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02530 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02531 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02532 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02533 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02534 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02535 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02536 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02537 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02538 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02539 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02540 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02541 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02542 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02543 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02544 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02545 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02546 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02547 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02548 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02549 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02550 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02551 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02552 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02553 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02554 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02555 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02556 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02557 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02558 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02559 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02560 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02561 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02562 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02563 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02564 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02565 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02566 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02567 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02568 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02569 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02570 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02571 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02572 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02573 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02574 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02575 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02576 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02577 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02578 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02579 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02580 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02581 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02582 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02583 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02584 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02585 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02586 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02587 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02588 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02589 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02590 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02591 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02592 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02593 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02594 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02595 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02596 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02597 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02598 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02599 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02600 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02601 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02602 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02603 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02604 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02605 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02606 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02607 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02608 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02609 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02610 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02611 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02612 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02613 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02614 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02615 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02616 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02617 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02618 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02619 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02620 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02621 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02622 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02623 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02624 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02625 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02626 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02627 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02628 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02629 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02630 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02631 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02632 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02633 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02634 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02635 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02636 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02637 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02638 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02639 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02640 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02641 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02642 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02643 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02644 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02645 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02646 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02647 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02648 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02649 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02650 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02651 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02652 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02653 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02654 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02655 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02656 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02657 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02658 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02659 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02660 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02661 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02662 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02663 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02664 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02665 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02666 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02667 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02668 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02669 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02670 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02671 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02672 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02673 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02674 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02675 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02676 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02677 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02678 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02679 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02680 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02681 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02682 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02683 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02684 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02685 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02686 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02687 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02688 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02689 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02690 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02691 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02692 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02693 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02694 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02695 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02696 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02697 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02698 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02699 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02700 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02701 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02702 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02703 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02704 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02705 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02706 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02707 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02708 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02709 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02710 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02711 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02712 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02713 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02714 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02715 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02716 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02717 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02718 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02719 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02720 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02721 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02722 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02723 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02724 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02725 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02726 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02727 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02728 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02729 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02730 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02731 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02732 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02733 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02734 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02735 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02736 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02737 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02738 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02739 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02740 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02741 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02742 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02743 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02744 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02745 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02746 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02747 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02748 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02749 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02750 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02751 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02752 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02753 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02754 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02755 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02756 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02757 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02758 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02759 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02760 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02761 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02762 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02763 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02764 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02765 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02766 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02767 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02768 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02769 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02770 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02771 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02772 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02773 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02774 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02775 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02776 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02777 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02778 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02779 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02780 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02781 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02782 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02783 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02784 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02785 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02786 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02787 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02788 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02789 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02790 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02791 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02792 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02793 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02794 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02795 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02796 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02797 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02798 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02799 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02800 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02801 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02802 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02803 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02804 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02805 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02806 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02807 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02808 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02809 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02810 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02811 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02812 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02813 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02814 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02815 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02816 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02817 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02818 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02819 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02820 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02821 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02822 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02823 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02824 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02825 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02826 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02827 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02828 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02829 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02830 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02831 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02832 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02833 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02834 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02835 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02836 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02837 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02838 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02839 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02840 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02841 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02842 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02843 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02844 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02845 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02846 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02847 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02848 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02849 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02850 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02851 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02852 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02853 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02854 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02855 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02856 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02857 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02858 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02859 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02860 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02861 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02862 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02863 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02864 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02865 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02866 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02867 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02868 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02869 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02870 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02871 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02872 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02873 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02874 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02875 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02876 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02877 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02878 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02879 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02880 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02881 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02882 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02883 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02884 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02885 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02886 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02887 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02888 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02889 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02890 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02891 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02892 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02893 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02894 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02895 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02896 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02897 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02898 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02899 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02900 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02901 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02902 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02903 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02904 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02905 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02906 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02907 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02908 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02909 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02910 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02911 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02912 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02913 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02914 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02915 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02916 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02917 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02918 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02919 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02920 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02921 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02922 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02923 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02924 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02925 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02926 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02927 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02928 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02929 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02930 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02931 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02932 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02933 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02934 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02935 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02936 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02937 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02938 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02939 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02940 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02941 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02942 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02943 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02944 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02945 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02946 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02947 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02948 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02949 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02950 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02951 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02952 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02953 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02954 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02955 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02956 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02957 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02958 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02959 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02960 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02961 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02962 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02963 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02964 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02965 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02966 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02967 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02968 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02969 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02970 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02971 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02972 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02973 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02974 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02975 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02976 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02977 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02978 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02979 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02980 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02981 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02982 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02983 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02984 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02985 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02986 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02987 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02988 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02989 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02990 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02991 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02992 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02993 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02994 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02995 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02996 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02997 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02998 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 02999 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03000 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03001 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03002 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03003 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03004 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03005 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03006 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03007 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03008 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03009 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03010 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03011 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03012 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03013 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03014 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03015 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03016 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03017 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03018 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03019 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03020 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03021 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03022 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03023 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03024 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03025 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03026 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03027 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03028 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03029 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03030 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03031 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03032 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03033 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03034 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03035 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03036 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03037 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03038 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03039 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03040 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03041 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03042 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03043 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03044 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03045 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03046 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03047 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03048 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03049 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03050 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03051 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03052 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03053 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03054 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03055 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03056 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03057 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03058 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03059 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03060 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03061 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03062 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03063 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03064 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03065 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03066 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03067 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03068 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03069 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03070 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03071 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03072 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03073 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03074 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03075 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03076 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03077 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03078 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03079 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03080 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03081 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03082 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03083 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03084 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03085 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03086 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03087 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03088 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03089 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03090 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03091 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03092 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03093 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03094 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03095 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03096 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03097 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03098 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03099 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03100 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03101 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03102 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03103 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03104 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03105 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03106 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03107 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03108 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03109 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03110 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03111 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03112 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03113 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03114 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03115 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03116 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03117 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03118 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03119 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03120 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03121 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03122 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03123 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03124 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03125 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03126 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03127 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03128 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03129 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03130 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03131 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03132 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03133 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03134 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03135 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03136 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03137 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03138 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03139 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03140 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03141 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03142 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03143 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03144 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03145 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03146 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03147 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03148 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03149 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03150 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03151 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03152 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03153 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03154 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03155 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03156 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03157 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03158 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03159 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03160 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03161 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03162 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03163 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03164 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03165 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03166 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03167 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03168 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03169 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03170 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03171 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03172 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03173 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03174 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03175 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03176 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03177 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03178 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03179 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03180 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03181 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03182 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03183 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03184 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03185 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03186 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03187 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03188 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03189 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03190 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03191 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03192 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03193 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03194 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03195 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03196 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03197 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03198 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03199 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03200 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03201 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03202 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03203 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03204 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03205 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03206 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03207 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03208 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03209 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03210 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03211 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03212 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03213 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03214 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03215 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03216 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03217 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03218 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03219 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03220 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03221 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03222 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03223 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03224 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03225 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03226 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03227 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03228 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03229 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03230 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03231 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03232 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03233 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03234 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03235 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03236 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03237 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03238 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03239 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03240 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03241 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03242 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03243 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03244 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03245 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03246 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03247 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03248 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03249 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03250 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03251 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03252 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03253 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03254 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03255 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03256 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03257 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03258 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03259 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03260 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03261 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03262 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03263 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03264 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03265 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03266 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03267 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03268 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03269 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03270 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03271 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03272 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03273 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03274 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03275 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03276 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03277 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03278 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03279 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03280 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03281 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03282 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03283 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03284 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03285 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03286 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03287 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03288 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03289 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03290 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03291 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03292 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03293 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03294 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03295 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03296 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03297 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03298 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03299 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03300 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03301 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03302 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03303 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03304 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03305 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03306 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03307 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03308 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03309 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03310 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03311 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03312 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03313 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03314 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03315 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03316 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03317 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03318 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03319 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03320 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03321 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03322 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03323 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03324 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03325 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03326 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03327 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03328 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03329 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03330 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03331 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03332 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03333 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03334 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03335 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03336 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03337 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03338 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03339 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03340 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03341 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03342 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03343 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03344 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03345 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03346 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03347 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03348 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03349 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03350 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03351 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03352 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03353 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03354 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03355 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03356 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03357 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03358 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03359 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03360 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03361 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03362 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03363 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03364 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03365 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03366 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03367 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03368 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03369 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03370 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03371 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03372 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03373 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03374 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03375 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03376 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03377 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03378 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03379 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03380 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03381 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03382 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03383 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03384 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03385 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03386 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03387 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03388 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03389 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03390 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03391 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03392 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03393 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03394 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03395 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03396 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03397 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03398 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03399 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03400 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03401 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03402 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03403 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03404 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03405 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03406 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03407 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03408 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03409 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03410 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03411 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03412 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03413 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03414 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03415 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03416 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03417 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03418 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03419 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03420 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03421 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03422 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03423 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03424 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03425 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03426 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03427 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03428 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03429 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03430 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03431 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03432 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03433 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03434 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03435 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03436 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03437 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03438 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03439 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03440 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03441 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03442 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03443 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03444 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03445 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03446 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03447 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03448 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03449 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03450 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03451 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03452 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03453 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03454 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03455 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03456 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03457 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03458 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03459 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03460 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03461 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03462 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03463 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03464 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03465 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03466 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03467 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03468 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03469 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03470 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03471 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03472 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03473 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03474 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03475 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03476 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03477 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03478 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03479 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03480 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03481 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03482 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03483 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03484 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03485 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03486 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03487 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03488 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03489 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03490 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03491 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03492 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03493 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03494 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03495 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03496 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03497 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03498 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03499 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03500 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03501 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03502 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03503 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03504 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03505 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03506 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03507 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03508 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03509 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03510 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03511 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03512 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03513 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03514 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03515 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03516 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03517 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03518 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03519 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03520 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03521 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03522 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03523 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03524 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03525 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03526 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03527 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03528 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03529 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03530 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03531 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03532 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03533 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03534 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03535 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03536 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03537 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03538 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03539 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03540 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03541 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03542 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03543 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03544 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03545 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03546 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03547 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03548 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03549 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03550 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03551 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03552 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03553 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03554 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03555 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03556 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03557 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03558 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03559 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03560 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03561 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03562 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03563 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03564 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03565 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03566 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03567 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03568 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03569 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03570 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03571 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03572 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03573 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03574 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03575 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03576 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03577 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03578 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03579 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03580 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03581 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03582 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03583 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03584 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03585 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03586 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03587 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03588 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03589 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03590 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03591 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03592 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03593 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03594 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03595 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03596 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03597 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03598 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03599 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03600 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03601 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03602 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03603 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03604 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03605 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03606 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03607 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03608 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03609 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03610 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03611 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03612 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03613 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03614 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03615 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03616 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03617 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03618 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03619 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03620 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03621 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03622 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03623 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03624 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03625 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03626 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03627 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03628 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03629 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03630 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03631 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03632 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03633 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03634 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03635 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03636 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03637 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03638 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03639 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03640 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03641 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03642 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03643 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03644 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03645 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03646 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03647 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03648 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03649 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03650 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03651 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03652 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03653 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03654 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03655 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03656 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03657 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03658 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03659 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03660 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03661 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03662 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03663 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03664 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03665 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03666 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03667 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03668 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03669 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03670 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03671 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03672 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03673 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03674 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03675 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03676 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03677 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03678 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03679 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03680 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03681 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03682 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03683 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03684 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03685 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03686 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03687 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03688 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03689 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03690 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03691 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03692 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03693 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03694 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03695 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03696 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03697 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03698 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03699 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03700 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03701 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03702 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03703 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03704 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03705 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03706 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03707 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03708 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03709 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03710 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03711 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03712 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03713 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03714 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03715 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03716 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03717 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03718 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03719 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03720 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03721 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03722 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03723 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03724 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03725 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03726 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03727 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03728 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03729 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03730 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03731 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03732 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03733 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03734 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03735 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03736 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03737 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03738 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03739 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03740 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03741 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03742 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03743 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03744 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03745 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03746 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03747 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03748 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03749 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03750 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03751 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03752 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03753 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03754 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03755 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03756 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03757 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03758 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03759 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03760 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03761 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03762 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03763 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03764 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03765 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03766 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03767 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03768 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03769 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03770 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03771 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03772 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03773 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03774 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03775 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03776 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03777 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03778 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03779 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03780 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03781 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03782 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03783 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03784 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03785 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03786 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03787 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03788 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03789 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03790 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03791 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03792 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03793 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03794 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03795 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03796 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03797 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03798 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03799 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03800 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03801 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03802 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03803 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03804 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03805 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03806 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03807 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03808 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03809 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03810 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03811 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03812 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03813 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03814 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03815 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03816 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03817 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03818 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03819 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03820 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03821 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03822 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03823 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03824 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03825 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03826 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03827 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03828 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03829 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03830 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03831 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03832 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03833 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03834 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03835 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03836 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03837 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03838 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03839 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03840 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03841 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03842 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03843 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03844 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03845 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03846 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03847 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03848 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03849 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03850 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03851 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03852 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03853 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03854 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03855 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03856 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03857 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03858 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03859 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03860 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03861 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03862 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03863 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03864 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03865 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03866 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03867 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03868 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03869 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03870 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03871 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03872 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03873 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03874 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03875 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03876 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03877 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03878 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03879 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03880 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03881 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03882 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03883 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03884 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03885 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03886 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03887 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03888 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03889 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03890 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03891 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03892 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03893 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03894 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03895 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03896 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03897 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03898 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03899 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03900 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03901 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03902 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03903 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03904 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03905 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03906 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03907 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03908 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03909 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03910 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03911 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03912 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03913 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03914 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03915 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03916 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03917 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03918 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03919 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03920 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03921 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03922 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03923 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03924 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03925 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03926 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03927 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03928 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03929 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03930 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03931 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03932 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03933 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03934 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03935 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03936 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03937 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03938 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03939 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03940 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03941 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03942 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03943 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03944 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03945 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03946 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03947 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03948 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03949 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03950 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03951 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03952 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03953 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03954 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03955 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03956 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03957 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03958 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03959 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03960 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03961 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03962 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03963 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03964 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03965 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03966 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03967 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03968 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03969 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03970 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03971 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03972 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03973 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03974 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03975 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03976 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03977 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03978 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03979 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03980 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03981 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03982 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03983 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03984 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03985 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03986 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03987 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03988 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03989 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03990 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03991 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03992 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03993 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03994 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03995 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03996 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03997 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03998 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 03999 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04000 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04001 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04002 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04003 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04004 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04005 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04006 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04007 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04008 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04009 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04010 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04011 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04012 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04013 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04014 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04015 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04016 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04017 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04018 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04019 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04020 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04021 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04022 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04023 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04024 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04025 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04026 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04027 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04028 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04029 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04030 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04031 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04032 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04033 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04034 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04035 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04036 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04037 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04038 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04039 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04040 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04041 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04042 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04043 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04044 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04045 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04046 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04047 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04048 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04049 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04050 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04051 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04052 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04053 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04054 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04055 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04056 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04057 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04058 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04059 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04060 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04061 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04062 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04063 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04064 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04065 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04066 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04067 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04068 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04069 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04070 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04071 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04072 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04073 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04074 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04075 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04076 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04077 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04078 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04079 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04080 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04081 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04082 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04083 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04084 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04085 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04086 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04087 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04088 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04089 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04090 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04091 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04092 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04093 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04094 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04095 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04096 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04097 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04098 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04099 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04100 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04101 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04102 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04103 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04104 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04105 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04106 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04107 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04108 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04109 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04110 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04111 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04112 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04113 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04114 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04115 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04116 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04117 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04118 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04119 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04120 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04121 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04122 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04123 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04124 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04125 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04126 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04127 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04128 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04129 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04130 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04131 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04132 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04133 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04134 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04135 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04136 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04137 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04138 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04139 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04140 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04141 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04142 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04143 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04144 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04145 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04146 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04147 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04148 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04149 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04150 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04151 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04152 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04153 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04154 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04155 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04156 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04157 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04158 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04159 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04160 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04161 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04162 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04163 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04164 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04165 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04166 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04167 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04168 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04169 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04170 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04171 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04172 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04173 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04174 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04175 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04176 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04177 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04178 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04179 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04180 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04181 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04182 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04183 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04184 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04185 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04186 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04187 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04188 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04189 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04190 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04191 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04192 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04193 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04194 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04195 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04196 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04197 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04198 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04199 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04200 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04201 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04202 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04203 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04204 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04205 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04206 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04207 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04208 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04209 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04210 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04211 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04212 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04213 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04214 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04215 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04216 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04217 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04218 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04219 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04220 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04221 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04222 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04223 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04224 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04225 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04226 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04227 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04228 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04229 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04230 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04231 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04232 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04233 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04234 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04235 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04236 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04237 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04238 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04239 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04240 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04241 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04242 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04243 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04244 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04245 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04246 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04247 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04248 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04249 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04250 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04251 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04252 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04253 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04254 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04255 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04256 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04257 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04258 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04259 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04260 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04261 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04262 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04263 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04264 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04265 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04266 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04267 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04268 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04269 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04270 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04271 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04272 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04273 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04274 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04275 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04276 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04277 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04278 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04279 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04280 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04281 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04282 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04283 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04284 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04285 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04286 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04287 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04288 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04289 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04290 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04291 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04292 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04293 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04294 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04295 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04296 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04297 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04298 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04299 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04300 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04301 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04302 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04303 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04304 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04305 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04306 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04307 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04308 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04309 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04310 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04311 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04312 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04313 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04314 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04315 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04316 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04317 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04318 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04319 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04320 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04321 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04322 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04323 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04324 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04325 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04326 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04327 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04328 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04329 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04330 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04331 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04332 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04333 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04334 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04335 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04336 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04337 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04338 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04339 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04340 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04341 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04342 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04343 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04344 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04345 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04346 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04347 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04348 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04349 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04350 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04351 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04352 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04353 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04354 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04355 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04356 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04357 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04358 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04359 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04360 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04361 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04362 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04363 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04364 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04365 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04366 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04367 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04368 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04369 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04370 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04371 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04372 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04373 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04374 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04375 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04376 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04377 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04378 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04379 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04380 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04381 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04382 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04383 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04384 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04385 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04386 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04387 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04388 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04389 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04390 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04391 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04392 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04393 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04394 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04395 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04396 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04397 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04398 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04399 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04400 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04401 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04402 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04403 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04404 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04405 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04406 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04407 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04408 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04409 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04410 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04411 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04412 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04413 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04414 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04415 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04416 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04417 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04418 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04419 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04420 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04421 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04422 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04423 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04424 | CATEGORY=MODERATION | COMMAND=<removeadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04425 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04426 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04427 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04428 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04429 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04430 | CATEGORY=MODERATION | COMMAND=<clearwarns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04431 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04432 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04433 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04434 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04435 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04436 | CATEGORY=MODERATION | COMMAND=<tempban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04437 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04438 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04439 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04440 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04441 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04442 | CATEGORY=MODERATION | COMMAND=<unlock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04443 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04444 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04445 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04446 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04447 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04448 | CATEGORY=MODERATION | COMMAND=<admin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04449 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04450 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04451 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04452 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04453 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04454 | CATEGORY=MODERATION | COMMAND=<warnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04455 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04456 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04457 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04458 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04459 | CATEGORY=PUBLIC | COMMAND=<coins> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04460 | CATEGORY=MODERATION | COMMAND=<ban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04461 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04462 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04463 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04464 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04465 | CATEGORY=PUBLIC | COMMAND=<map> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04466 | CATEGORY=MODERATION | COMMAND=<lock> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04467 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04468 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04469 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04470 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04471 | CATEGORY=PUBLIC | COMMAND=<players> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04472 | CATEGORY=MODERATION | COMMAND=<modlogs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04473 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04474 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04475 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04476 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04477 | CATEGORY=PUBLIC | COMMAND=<dc> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04478 | CATEGORY=MODERATION | COMMAND=<warns> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04479 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04480 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04481 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04482 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04483 | CATEGORY=PUBLIC | COMMAND=<pay> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04484 | CATEGORY=MODERATION | COMMAND=<kick> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04485 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04486 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04487 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04488 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04489 | CATEGORY=PUBLIC | COMMAND=<top> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04490 | CATEGORY=MODERATION | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04491 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04492 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04493 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04494 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04495 | CATEGORY=PUBLIC | COMMAND=<discord> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04496 | CATEGORY=MODERATION | COMMAND=<logs> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04497 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04498 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04499 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04500 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04501 | CATEGORY=PUBLIC | COMMAND=<buy> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04502 | CATEGORY=MODERATION | COMMAND=<unwarn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04503 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04504 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04505 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04506 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04507 | CATEGORY=PUBLIC | COMMAND=<rank> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04508 | CATEGORY=MODERATION | COMMAND=<unmute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04509 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04510 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04511 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04512 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04513 | CATEGORY=PUBLIC | COMMAND=<ach> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04514 | CATEGORY=MODERATION | COMMAND=<banlist> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04515 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04516 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04517 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04518 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04519 | CATEGORY=PUBLIC | COMMAND=<shop> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04520 | CATEGORY=MODERATION | COMMAND=<announce> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04521 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04522 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04523 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04524 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04525 | CATEGORY=PUBLIC | COMMAND=<stats> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04526 | CATEGORY=MODERATION | COMMAND=<warn> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04527 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04528 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04529 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04530 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04531 | CATEGORY=PUBLIC | COMMAND=<achievements> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04532 | CATEGORY=MODERATION | COMMAND=<mute> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04533 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04534 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04535 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04536 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04537 | CATEGORY=PUBLIC | COMMAND=<daily> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04538 | CATEGORY=MODERATION | COMMAND=<bans> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04539 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04540 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04541 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04542 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04543 | CATEGORY=PUBLIC | COMMAND=<profile> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04544 | CATEGORY=MODERATION | COMMAND=<clear> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04545 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04546 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04547 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04548 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04549 | CATEGORY=PUBLIC | COMMAND=<missions> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04550 | CATEGORY=MODERATION | COMMAND=<deadmin> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04551 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04552 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04553 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04554 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04555 | CATEGORY=PUBLIC | COMMAND=<balance> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04556 | CATEGORY=MODERATION | COMMAND=<clearwarnings> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04557 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04558 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04559 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04560 | CATEGORY=OWNER | COMMAND=<save> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04561 | CATEGORY=PUBLIC | COMMAND=<help> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04562 | CATEGORY=MODERATION | COMMAND=<unban> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04563 | CATEGORY=TEAMS | COMMAND=<red> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04564 | CATEGORY=MATCH | COMMAND=<pickstart> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04565 | CATEGORY=DEVELOPER | COMMAND=<setxp> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04566 | CATEGORY=OWNER | COMMAND=<kickall> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04567 | CATEGORY=PUBLIC | COMMAND=<level> | DISCORD=discord.gg/microhaxleague
// MICROHAX COMMAND REFERENCE 04568 | CATEGORY=MODERATION | COMMAND=<slowmode> | DISCORD=discord.gg/microhaxleague
