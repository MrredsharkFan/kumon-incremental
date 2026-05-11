//code for generating the ui of upgrades
//wait what if i made a dynamic variable then deleted it then replaced it with a constant
//OMG IM ACTUALLY SO SMART WOOOOOOOOOO
//wait how do we deal with buyables
//WE DONT
var upgrade_costs = {} //currently just the levels though
var upgrade_effects = {}

function upgrade_set(id, cost, title, desc, eff="none") {
    upgrade_costs[id] = new Decimal(cost)
    upgrade_effects[id] = eff
    var L = id-1
    document.getElementById("upg").innerHTML =
        document.getElementById("upg").innerHTML + `<button :style="{backgroundColor: player.upgrades.indexOf(${id})!=-1?'#99ff99':'#999999'}" style="position: absolute; left: ${L * 20 % 100}%; top: ${Math.floor(L / 5)*32}%; width: 18%; height: 30%" v-if='player.upgrades.indexOf(${id-1})!=-1||${id == 1}' onclick="buy_upgrade(${id})">
        ${title}<br><span style="font-size: 75%">${desc}</span><br>Req: ${get_level_text(cost)}<br>{{upgrade_effects[${id}]=="none"?"":"Currently: "+format(upgrade_effects[${id}]())}}</button>`
}

function buy_upgrade(id) {
    console.log(level,upgrade_costs_real[id])
    if (new Decimal(level).gte(upgrade_costs_real[id]) && player.upgrades.indexOf(id)==-1) {
        player.skill = player.skill.sub(get_level_pt_req(upgrade_costs_real[id]-1))
        player.upgrades.push(id)
    }
}

upgrade_set(1, 10, "Better pen","Writing speed *2")
upgrade_set(2, 33, "Trained handwriting I","Writing speed *2 again")
upgrade_set(3, 67, "Motivation","Exercises are done quickerbased on your current progress on it.",
    function () { return new Decimal(percent(player.skill, level)).times(-1).div(100).add(2).pow(2) })
upgrade_set(4, 150, "Recognition","Writing speed *2")
upgrade_set(5, 200, "Let's count!", "Unlocks a new feature.")
upgrade_set(6, 4659, "I wonder what this is.", "Beat the game, and never come back.")




const upgrade_costs_real = upgrade_costs