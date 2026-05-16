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
        document.getElementById("upg").innerHTML + `<button v-if="player.upage == ${Math.floor(L/15)}" :style="{
        backgroundColor: player.upgrades.indexOf(${id})!=-1?'#99ff99':(upgrade_costs_real[${id}]>level?'#999999':'#ffffff')}" style="position: absolute; left: ${(L%15) * 20 % 100}%; top: ${Math.floor((L%15) / 5) * 32}%; width: 18%; height: 30%" v-if='player.upgrades.indexOf(${id - 1})!=-1||${id == 1}' onclick="buy_upgrade(${id})">
        ${title}<br><span style="font-size: 75%">${desc}</span><br>Req: ${get_level_text(cost)}<br>{{upgrade_effects[${id}]=="none"?"":"Currently: "+format(upgrade_effects[${id}](),3)}}</button>`
}

function buy_upgrade(id) {
    console.log(level,upgrade_costs_real[id])
    if (new Decimal(level).gte(upgrade_costs_real[id]) && player.upgrades.indexOf(id)==-1) {
        player.skill = player.skill.sub(get_level_pt_req(upgrade_costs_real[id]-1))
        player.upgrades.push(id)
    }
}

upgrade_set(1, 10, "Grasp","Data *2<br><i><small>Just to be reminded that, the complexity of the game ramps up as you play, but it starts rather simple and boring.<br>Developer options may be added soon.</small></i>")
upgrade_set(2, 33, "Think","Data *2")
upgrade_set(3, 67, "Motivation","Exercises are done quicker based on your current progress on it.",
    function () { return new Decimal(percent(player.skill, level)).times(-1).div(100).add(2).pow(2).pow(hasUpgrade(7)?upgrade_effects[7]():1) })
upgrade_set(4, 150, "Repitition","Data *2")
upgrade_set(5, 200, "Let's count!", "Unlocks a new feature, also *4 Data.")
upgrade_set(6, 250, "This is an index finger!", "*2 counting speed.")
upgrade_set(7, 300, "Candies!", "<b>Motivation</b> is stronger based on current exercise.",
    function(){return new Decimal(level).sub(200).max(0).div(100).add(1).pow(0.75)}
)
upgrade_set(8, 400, "I can count faster!", "*2.5 counting speed.")
upgrade_set(9, 450, "I can see my progress.", "Data gain is boosted by current exercise #.",
    function(){return new Decimal(level).sub(400).max(0).pow_base(1.01)}
)
upgrade_set(10, 500, "Practise makes perfect.", "Counting speed is boosted based on number.",
    function(){return player.number.div(2).add(1).pow(0.5)}
)
upgrade_set(11, 600, "Let's write!", "Unlocks writing.")
upgrade_set(12, 630, "Write better, count better.", "Chance of failure when counting is reduced based on written numbers.",
    function(){return player.write.add(1).log10().add(1)}
)
upgrade_set(13, 670, "Incoporating writing into counting!", "Current number counted decreases the scaling of writing.",
    function(){return player.number.div(200).add(1).log10().add(1)}
)
upgrade_set(14, 700, "I am understanding bigger numbers better!", "Current number counted's effect's softcap is delayed based on written numbers.",
    function () {
        var v = player.write.add(1).pow(0.5).pow_base(5)
        if (hasUpgrade(18) & player.sums[1].gte(5)){v = v.pow(1.5)}
        return v
     }
)
upgrade_set(15, 740, "And writing numbers more neatly!", "Writing scaling is further decreased by current level.<br><small>Also unlocks the switching of pages of upgrades.</small>",
    function () { return new Decimal(level).sub(700).max(0).div(20).add(1).log(10).add(1) }
)
upgrade_set(16, 870, "One plus one...", "Unlocks addition.")
upgrade_set(17, 871, "In succession", "Counting speed *2.")
upgrade_set(18, 1000, "Faster addition", "If the second number >5,<b>I am understand bigger numbers better</b> effect ^1.5.")
upgrade_set(99, 4659, "I wonder what this is.", "Beat the game, and never come back.")




const upgrade_costs_real = upgrade_costs

function hasUpgrade(x) {
    return player.upgrades.indexOf(x)!=-1
}

function upgrade_effect(x) {
    return upgrade_effects[x]()
}