var ref;
var http;
var store = {};
// Set up references
var featuredRef = firebase.database().ref('featured/');
var pastRef = firebase.database().ref('past/');
var presentRef = firebase.database().ref('present/');
var futureRef = firebase.database().ref('future/');
var spacesRef = firebase.database().ref('spaces/');
// Set up <ul>'s 
var feat_ul = document.getElementById("featured-links");
var all_ul = document.getElementById("all-link-list");
var link_ul = document.getElementById("list-view-link-list");


function homeSetup() {
	getFeaturedImages();
	getPastImages();
	getPresentImages();
	getFutureImages();
	getSpaceImages();
}

function homeGridSetup() {

	getFeaturedImages();
	getPastImages();
	getPresentImages();
	getFutureImages();

}


function pastSetup() {
	getPastImages();
}

function presentSetup() {
	getPresentImages();
}

function presentSetup() {
	getFutureImages();
}

function spacesSetup() {
	getSpaceImages();
}

function linksSetup() {
	getLinks()
}

function getFeaturedImages(){

	featuredRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.setAttribute("src" , links);
		img.setAttribute("class" , "pics");
		li.appendChild(img);
		feat_ul.appendChild(li);
		
	});
}

function getPastImages() {
	
	pastRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var img = document.createElement("img");
		var imgID = "draggable-img";
		img.setAttribute("src" , links);
		img.setAttribute("id", imgID);
		li.appendChild(img);
		all_ul.appendChild(li);
		// Draggable.create("#draggable-img", {
		// 	bounds: document.getElementById("all_link_list")
		// });
		// console.log(img);
		// console.log(links);
	});
}

function getPresentImages() {
	presentRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var img = document.createElement("img");
		var imgID = "draggable-img";
		img.setAttribute("src" , links);
		img.setAttribute("id", imgID);
		li.appendChild(img);
		all_ul.appendChild(li);
		// Draggable.create("#draggable-img", {
		// 	bounds: document.getElementById("all_link_list")
		// });
		// console.log(img);
		// console.log(links);
	});
}

function getFutureImages() {
	futureRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var img = document.createElement("img");
		var imgID = "draggable-img";
		img.setAttribute("src" , links);
		img.setAttribute("id", imgID);
		li.appendChild(img);
		all_ul.appendChild(li);
		// Draggable.create("#draggable-img", {
		// 	bounds: document.getElementById("all_link_list")
		// });
		// console.log(img);
		// console.log(links);
	});
}

function getSpaceImages(){
		featuredRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.setAttribute("src" , links);
		li.appendChild(img);
		all_ul.appendChild(li);
		
	});
}

function getLinks(){

	featuredRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});

	pastRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});

	presentRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});	

	futureRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});	


	spacesRef.orderByChild("priority").on("child_added", function(snapshot) {
		var links = snapshot.val().link;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});
}
