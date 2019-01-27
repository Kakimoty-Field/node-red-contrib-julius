// name: julius
// outputs: 1
var spawn = global.get('child_process').spawn;
var __dirname = global.get('__dirname');
var arg = ['julius',
    '-C',
    __dirname + '/dictation-kit-v4.4/am-gmm.jconf',
    '-nostrip',
    '-gram',
    __dirname + '/dict/tjbot'];
var cmd = arg.shift();
var child = spawn(cmd, arg);
child.stdout.on('data', function (data) {
    var matcher = data.toString().match(/^pass1_best: \[s\] (.+) \[\/s\]/);
    if (matcher) {
        console.log('pass1_best: ' + matcher[0]);
        node.status({
            fill: "blue",
            shape: "ring",
            text: "「TJボット」と話しかけてください"
        });
        var keyword = matcher[1];
        if (keyword === "TJBot") {
            flow.set("triggerTime", new Date().getTime());
            node.status({fill:"blue", shape: "dot", text: "認識中"});
            var id = setTimeout(function() {
                node.status({
                    fill: "blue",
                    shape: "ring",
                    text: "「TJボット」と話しかけてください"
                });
            }, 10 * 1000);
            flow.set("triggerId", id);
            msg.payload = keyword;
            node.send(msg);
        } else {
            var windowTime = new Date().getTime() - flow.get("triggerTime");
            if (0 * 1000 < windowTime && windowTime < 10 * 1000) {
                flow.set("triggerTime", 0);
                clearTimeout(flow.get("triggerId"));
                node.status({
                    fill: "blue",
                    shape: "ring",
                    text: "「TJボット」と話しかけてください"
                });
                msg.payload = keyword;
                node.send(msg);
            }
        }
    }
});
child.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});
child.on('close', function (code, signal) {
    console.log('close: ' + code + ', ' + signal);
});
child.on('error', function (code) {
    console.log('error: ' + code);
});
