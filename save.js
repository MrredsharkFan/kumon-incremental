
    function initPlayer() {
        return {
            version: "2.a.0",
            points: new Decimal(1),
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
            sums: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            best_number: new Decimal(0), //embarressing that i put this this late into the list...
            actual_sum: new Decimal(0),
            sub_level: new Decimal(0),
            sub: false,
            ce: new Decimal(0),

            m_ess: new Decimal(0),
            m_q: [1, 1, 0],
            m_buyables: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

            d_ess: new Decimal(0),
            rem: 0
        }
    }

    NAME = "KI" //place you want to direct your local storage thing



    player = initPlayer()

    const player_vars_d = ["points", "skill", "number","write","best_number","sub_level","ce","m_ess","d_ess"]
    const player_vars_l = ["sums","m_buyables"]
    const player_vars_str = ["level","upgrades","tab","t","nn","upage","sub","m_q","rem"]

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
            `'{"version":"2.a.0","points":"1","skill":"55225.3885185368","level":0,"upgrades":[5,4,3,2,1,6],"tab":"main","t":4915,"number":"0","nn":1782896158739,"write":"0","upage":0,"max_sum":" - 60.4","sums":["0","0","0","0"],"best_number":"0","actual_sum":"0","sub_level":"0","sub":false,"ce":"0","m_ess":"0","m_q":[1,1,0],"m_buyables":["0","0","0","0","0","0","0","0","0","0"],"d_ess":"0","rem":0}'`,
            `'{"version":"2.a.0","points":"1","skill":"24404596683753.723","level":0,"upgrades":[5,4,3,2,1,6,10,9,8,7,11,12,13,14,15,16],"tab":"num","t":19827,"number":"4","nn":1782896258077.8994,"write":"2","upage":1,"max_sum":"-25.5","sums":["0","0","0","0"],"best_number":"29","actual_sum":"0","sub_level":"0","sub":false,"ce":"0","m_ess":"0","m_q":[1,1,0],"m_buyables":["0","0","0","0","0","0","0","0","0","0"],"d_ess":"0","rem":0}'`,
            `'{"version":"2.a.0","points":"1","skill":"1.0792733013651092e33","level":0,"upgrades":[5,4,3,2,1,6,10,9,8,7,11,12,13,14,15,16,17,18,19,20,21],"tab":"set","t":35079,"number":"15.999999999999998","nn":1782896339573.596,"write":"58","upage":1,"max_sum":"1","sums":["1","0","0","0"],"best_number":"607.9999999999999","actual_sum":"1","sub_level":"0","sub":false,"ce":"0","m_ess":"0","m_q":[1,1,0],"m_buyables":["0","0","0","0","0","0","0","0","0","0"],"d_ess":"0","rem":0}'`,
            `'{"version":"2.a.0","points":"1","skill":"9.999957830349874e154","level":0,"upgrades":[5,4,3,2,1,6,10,9,8,7,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"tab":"set","t":60276,"number":"2141.7557822356684","nn":1782896451965.6516,"write":"87.6444999999574","upage":1,"max_sum":"38.95","sums":["25","5","8","0"],"best_number":"21397.64782235671","actual_sum":"38","sub_level":"0","sub":false,"ce":"0","m_ess":"0","m_q":[1,1,0],"m_buyables":["0","0","0","0","0","0","0","0","0","0"],"d_ess":"0","rem":0}'`,

        ]

//1: Counting Start
//2: Writing Start
//3: Addition start
//4: A1
        
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