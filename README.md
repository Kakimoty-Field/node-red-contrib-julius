node-red-contrib-julius
=====================

Node-RED node for julius

操作コマンドの音声を認識するノードです。「TJボット」の音声を契機として10秒間、操作コマンドの音声を受け付けます([最新の操作コマンド一覧](https://github.com/zuhito/node-red-contrib-julius/blob/master/dict/tjbot.txt))。

Install
-------

Install Julius to your computer (Only macOS and Raspberry Pi are supported)

        curl -L -O https://github.com/julius-speech/julius/archive/v4.5.zip
        unzip v4.5.zip
        cd julius-4.5/
        ./configure
        make
        sudo make install

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-julius

