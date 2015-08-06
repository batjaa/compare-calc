var P = 0.7;

var TimeLogger = function () {
    this.start = function () {
        this.start = Date.now();
    };
    this.stop = function () {
        this.timeInMs = Date.now() - this.start;
    };
    this.getLog = function () {
        return this.timeInMs;
    };
};

var Lorem = function () {
    this.lorem = [
        'Lorem ipsum dolor sit amet, no vix nisl tale altera, prima nulla choro has an. Nec bonorum dignissim abhorreant an, te aliquam insolens est. Error graecis eam in. Perpetua voluptatum cu nec, vis dolore recusabo in. Ea est dico alia option.',
        'Pri laoreet constituam at, ne sit porro complectitur. Enim quas inciderint id mel, audire perfecto ullamcorper ex mel. Vix ei case salutatus persequeris, at zril maluisset vix. Deleniti offendit posidonium quo ne, nemore menandri an mel.',
        'Vix alienum voluptua delectus in. Phaedrum suscipiantur id vel, eu prima dissentiunt sed, an sit iisque reprimique. Postea iriure dissentias at duo, eu ius eripuit aliquam euripidis, et deseruisse elaboraret eos. In vim epicuri complectitur, eum everti luptatum ei, no nam dicat tollit. Quis commune appetere pro ut, his at habemus prodesset elaboraret. Eam solum appetere no, sed an vidisse abhorreant. Ut augue laudem bonorum pro, id nec eripuit lobortis.',
        'Nam et tale elit, ipsum meliore adipisci cu usu. Brute doctus dolorem nam ne. Idque omittam cum ad, hinc referrentur suscipiantur mei at, id amet debet quo. Vis case novum perfecto ne. In posidonium voluptatibus mea.',
        'Ex mea facete platonem vulputate, ex sed dicunt tincidunt neglegentur. Pro vide altera quidam no, ius eu habeo delenit. Ea est errem legendos. Sit timeam regione ut, eu saepe singulis nam, eu liber saepe feugiat cum.'
    ];

    this.generate = function () {
        return this.lorem[parseInt(Math.random() * 100, 10) % this.lorem.length];
    }
}
var lorem = new Lorem();


$(document).ready(function () {

    // compareAll(5, 10000);

    // compare(2500)

    compareVisually(2500);
    // compareVisually(50, true);

    function compareAll(n, m) {
        var s1Win = 0;
        var s2Win = 0;
        var totalTime1 = 0;
        var totalTime2 = 0;
        for (var i = 0; i < n; i++) {
            var speeds = compare(m);
            if (!speeds) continue;
            if (speeds.s < speeds.d) {
                s1Win++;
            } else {
                s2Win++;
            }
            totalTime1 += speeds.s;
            totalTime2 += speeds.d;
        }
        console.log('---------------------------');
        console.log('Static faster: ' + s1Win + ' times | Dynamic faster: ' + s2Win + ' times');
        console.log('Static total time: ' + totalTime1 + ' | Dynamic total time: ' + totalTime2);
        console.log((s1Win > s2Win ? 'Static' : 'Dynamic') + ' wins');
    }

    function compare(n) {
        var pattern = genPattern(n);
        var s1 = createDivs(pattern, dynamicDivCreation);
        var s2 = createDivs(pattern, staticDivCreation);
        // if (s1 > 750 || s2 > 750) return null;
        console.log((s1 < s2 ? '+' : '-') + ' Static: ' + s1 + ' ms (' + (s1 / 1000) + ' s)', 'Dynamic: ' + s2 + ' ms (' + (s2 / 1000) + ' s)');
        return {s: s1, d: s2};
    }

    function compareVisually(n, reverse) {
        var pattern = genPattern(n);
        $('.main').empty();
        var s1 = !reverse ? {name: 'Static', speed: createDivs(pattern, staticDivCreation)} : {name: 'Dynamic', speed: createDivs(pattern, dynamicDivCreation)};
        $('.main').append('<hr />');
        var s2 = !reverse ? {name: 'Dynamic', speed: createDivs(pattern, dynamicDivCreation)} : {name: 'Static', speed: createDivs(pattern, staticDivCreation)};
        console.log(s1.name + ': ' + s1.speed + ' ms (' + (s1.speed / 1000) + ' s)', s2.name + ': ' + s2.speed + ' ms (' + (s2.speed / 1000) + ' s)');
        return !reverse ? {s: s1.speed, d: s2.speed} : {d: s1.speed, s: s2.speed};
    }

    /**
     * Just call with 1 parameter
     */
    function genPattern(m, n) {
        n = n || 0;
        var pattern = [];
        while (n < m) {
            n = genRandomlyChildrenPattern(pattern, m, n);
        }
        return pattern;
    }

    function genRandomlyChildrenPattern(parentPattern, m, n) {
        if (n < m) {
            n++;
            var el = [];
            if (Math.random() >= P && n < m) {
                n = genRandomlyChildrenPattern(el, m, n);
            }
            parentPattern.push(el);
            return n;
        }
    }

    function createDivs(pattern, fnDivCreation) {
        var $body = $('.main');
        // $body.empty();

        var timer = new TimeLogger();
        timer.start();
        pattern.map(function (currentPattern) {
            createDivWithPattern($body, currentPattern, fnDivCreation);
        });

        timer.stop();

        return timer.getLog();
    }

    function createDivRandomlyNested(n, m, $parent, fnDivCreation) {
        if (n < m) {
            n++;
            var $div = fnDivCreation($parent);
            $parent.append($div);
            if (Math.random() >= P) createDivRandomlyNested(n, m, $div, fnDivCreation)
        }
        return n;
    }

    function createDivWithPattern($parent, pattern, fnDivCreation) {
        var $div = fnDivCreation($parent);
        $parent.append($div);
        if (pattern.length > 0) createDivWithPattern($div, pattern[0], fnDivCreation);
    }

    function staticDivCreation($parent) {
        var widthVal = Math.random();
        widthVal = Math.random() > 0.5 ? '80%' : ($parent.width() * 0.8 + 'px');
        return $('<div style="width: ' + widthVal + ';">' + lorem.generate() + '</div>');
    }

    function dynamicDivCreation($parent) {
        var widthVal = Math.random() > 0.5 ? '80% - 25px' : '25% * 3 + 10px';
        return $('<div style="width: calc(' + widthVal + ');">' + lorem.generate() + '</div>');
    }

    function createWithDynamicWidth(n, text) {
        text = text || 'Dynamic Width';
        var $body = $(document.body);
        $body.empty();

        var timer = new TimeLogger();
        timer.start();
        for(var i = 0; i < n; i++) {
            var $div = $('<div style="width: calc(100% - 250px)">' + text + '</div>');
            $body.append($div);
        }
        timer.stop();

        return timer.getLog();
    }
});