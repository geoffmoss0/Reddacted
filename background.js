//background.js

console.log("hello from background");

browser.menus.create({
	id: "block-subreddit",
	title: "Block subreddit",
	contexts: ["link"]
});

let port;

function connec(p) {
	port = p;
	port.postMessage({body: "Connected to port"});
	port.onMessage.addListener(notify);
}

//browser.runtime.onMessage.addListener(notify);
browser.runtime.onConnect.addListener(connec);

browser.menus.onClicked.addListener(block);

function notify(message) {
	console.log("Got message from content script");
	console.log(message.clicked);
	if (message.clicked.includes("reddit.com/r/")) {
		let query = "Block " + message.clicked.substring(23, message.clicked.length - 1);
		console.log("updating with " + query);
		browser.menus.update("block-subreddit", {
			title: query,
			visible: true
		});
	} else {
		console.log("Hiding");
		browser.menus.update("block-subreddit", {
			visible: false
		});
	}
	browser.menus.refresh();
}

function block(info, tab) {
	if (info.menuItemId == "block-subreddit") {
		console.log(info.linkUrl);
	}
	let blocked = browser.storage.local.get("subreddits");
	blocked.then(function(value) {
		let subs = value.subreddits;
		if (subs == null) {
			subs = [];
		}
		let name = info.linkUrl.substring(25, info.linkUrl.length - 1);
		if (!subs.includes(name)) {
			//for safety
			subs.push(name);
		}
		console.log("new list: " + subs);
		browser.storage.local.set({subreddits: subs});
	});
}
