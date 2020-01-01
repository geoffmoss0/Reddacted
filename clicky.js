//clicky.js

console.log("hello");

let port = browser.runtime.connect();
port.onMessage.addListener(function(m) {
	console.log("Message from background script");
	console.log(m.body);
});

window.addEventListener("contextmenu", rightClick);


function rightClick(e) {
	console.log("click");
	if (e.target.tagName != "A") {
		return;
	}
	let link = e.target.href;
	//link.includes("reddit.com/r/")
	if (link.includes("reddit.com/r/")) {
		//console.log(e.target.href.substring(25, link.length - 1));
		console.log(link);
	}
	port.postMessage({clicked: link});
}
