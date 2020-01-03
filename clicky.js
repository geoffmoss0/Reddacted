//clicky.js

console.log("hello");

let port = browser.runtime.connect();
port.onMessage.addListener(function(m) {
	console.log("Message from background script");
	console.log(m.body);
});

window.addEventListener("contextmenu", rightClick);

document.addEventListener("animationstart", remove);

//document.addEventListener("scroll", remove);

window.addEventListener("load", remove);

function remove(event) {
	//'div[style=""] > div > div[tabindex="-1"]'
	let list_poss = document.querySelectorAll("div[style='max-width:100%']>div>div");
	list_poss.forEach(x => {
		let name = x.attributes.getNamedItem("class");
		let posts;
		if (name != null && name.value.length == 21) {
			let next = x.querySelectorAll("div>div>div[tabindex='-1']");
			if (next.length > 0) {
				posts = x.childNodes;
				let sub_list = 1;
				posts.forEach(post => {
					sub_list++;
					let name = post.querySelector("a[data-click-id='subreddit']");
					if (name != null) {
						console.log(name.innerHTML);
					}
				});
				//console.log(posts);
			}
		}
	});
	console.log("===========");
	edit = x => x.style.border = "2px solid red";
	//post.map(edit);
}

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
