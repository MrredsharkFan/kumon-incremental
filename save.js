
    function initPlayer() {
        return {
            version: "2.a.0",
            points: new Decimal(0),
            skill: new Decimal(0),
            level: 0,
            upgrades: [],
            tab: "Main",
            t: 0,
            number: new Decimal(0),
            tab: "main",
            nn: Date.now() + 1e4,
            write: new Decimal(0),
            upage: 0,
            max_sum: new Decimal(0),
            sums: [new Decimal(0),new Decimal(0)]
        }
    }

    NAME = "KI" //place you want to direct your local storage thing



    player = initPlayer()

    const player_vars_d = ["points", "skill", "number","write"]
    const player_vars_l = ["sums"]
    const player_vars_str = ["level","upgrades","tab","t","nn","upage"]

    function detectNaN() {
        for (var i in player_vars_d) {
            if (player[player_vars_d[i]].isNan()) { player[player_vars_d[i]] = initPlayer()[player_vars_d[i]] }
        }
        for (var i in player_vars_l) {
            for (var j in player[player_vars_l[i]]) {
                if (player[player_vars_l[i]][j].isNan()) {
                    console.log(player[player_vars_l[i]][j])
                    player[player_vars_l[i]][j] = initPlayer()[player_vars_l[i]][j]
                }
            }
        }
        for (var i in player_vars_str) {
            if (player[player_vars_str[i]] == NaN) { player[player_vars_str[i]] = initPlayer()[player_vars_str[i]] }
        }
    }



    function save() {
        detectNaN()
        localStorage.setItem(NAME, JSON.stringify(player))
    }

    s = setInterval(save, 1000, 1)

    function load() {
        var u = JSON.parse(localStorage.getItem(NAME))
        console.log(JSON.parse(localStorage.getItem(NAME)))
        for (var i in player_vars_d) {
            player[player_vars_d[i]] = new Decimal(u[player_vars_d[i]])
        }
        for (var i in player_vars_l) {
            player[player_vars_l[i]] = initPlayer()[player_vars_l[i]]
            for (var j in u[player_vars_l[i]]) {
                player[player_vars_l[i]][j] = new Decimal(u[player_vars_l[i]][j])
            }
        }
        for (var i in player_vars_str) {
            player[player_vars_str[i]] = u[player_vars_str[i]]
            if (player[player_vars_str[i]] == undefined) {
                if (player_vars_str[i] == "version") { //old save revert
                    //idk
                }
                else {
                    player[player_vars_str[i]] = initPlayer()[player_vars_str[i]]
                }
            }
        }
    }


    const banks =
        [
        ]

    load()
    player.version = "2.a.0"

    function bank(num) {
        if (confirm("Are you sure you want to use this save? This will OVERRIDE your progress!")) {
            clearInterval(s)
            localStorage.setItem(NAME, banks[num])
            location.reload()
        }
    }

    function import_player(data) {
        console.log(data)
        if (confirm("Are you sure you want to use this save to override the previous save?")) {
            clearInterval(s)
            localStorage.setItem(NAME, data)
            location.reload()
        }
    }