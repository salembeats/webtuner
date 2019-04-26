function onError(error) {
    console.log(`Error: ${error}`);
}

function tabLeft(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab.active && i > 0) {
            var updating = browser.tabs.update(tabs[i - 1].id, {
                active: true
            });
            return
        }
    }
}

function tabRight(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab.active && i < tabs.length - 1) {
            var updating = browser.tabs.update(tabs[i + 1].id, {
                active: true
            });
            return
        }
    }
}

var port = browser.runtime.connectNative("pypoti")

port.onMessage.addListener((response) => {
    console.log("Received: " + response);

    var querying = browser.tabs.query({ currentWindow: true });
    if (response == "left") {
        querying.then(tabLeft, onError);
    } else if (response == "right") {
        querying.then(tabRight, onError);
    }
});

port.onDisconnect.addListener((p) => {
    if (p.error) {
        console.log(`Disconnected due to an error: ${p.error.message}`);
    }
});