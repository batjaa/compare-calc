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

$(document).ready(function () {

    compareAll(100, 10000);

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
        var s1 = createWithStaticWidth(n);
        var s2 = createWithDynamicWidth(n);
        if (s1 > 750 || s2 > 750) return null;
        console.log((s1 < s2 ? '+' : '-') + ' Static: ' + s1 + ' ms (' + (s1 / 1000) + ' s)', 'Dynamic: ' + s2 + ' ms (' + (s2 / 1000) + ' s)');
        return {s: s1, d: s2};
    }

    function createWithStaticWidth(n, text) {
        text = text || 'Static Width';
        var $body = $(document.body);
        $body.empty();

        var timer = new TimeLogger();
        timer.start();
        for(var i = 0; i < n; i++) {
            var $div = $('<div style="width:75%">' + text + '</div>');
            $body.append($div);
        }
        timer.stop();

        return timer.getLog();
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