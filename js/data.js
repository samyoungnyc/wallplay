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
var feat_ul = document.getElementById("featured_links");
var all_ul = document.getElementById("all_link_list");
var link_ul = document.getElementById("list_view_link_list");


function homeSetup() {
	getFeaturedImages();
	getPastImages();
	getPresentImages();
	getFutureImages();
	getSpaceImages();
}

function homeGridSetup() {

	getFeaturedImages();
	// extractProjectImage();
	// extractSpaceImage();
}


function projectSetup() {

	extractProjectImage();
}

function spacesSetup() {

	extractSpaceImage();
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
		Draggable.create("#draggable-img", {
			bounds: document.getElementById("all_link_list")
		});
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
		Draggable.create("#draggable-img", {
			bounds: document.getElementById("all_link_list")
		});
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
		Draggable.create("#draggable-img", {
			bounds: document.getElementById("all_link_list")
		});
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

// code for Search Queries

/* Is called when user clicks on searchbar. 
Makes searchbar get rid of value of "Search..." */
function active(){
	var searchBar = document.getElementById("search-bar");

	if(searchBar.value == "search:"){
		searchBar.value = "";
		searchBar.placeholder = "search:"
		console.log("active searchbar")
		setupIndex(featuredRef);

	}
}

function inactive(){
	var searchBar = document.getElementById("search-bar");

	if(searchBar.value == "search:"){
		searchBar.value = "search:";
		searchBar.placeholder = "";
		console.log("inactive searchbar")

	}
}

// function setup(){
// 	initializeFirebase();
// 	var database = firebase.database();
// 	var featuredRef = database.ref("featured/");
// 	setupIndex(featuredRef);
// }

// /* Takes in the corresponding reference of posts, goes through each initial
// child inside the reference and whenever one is added, creates a copy of the JSON object, and stores it inside a global dictionary 'store' */

function setupIndex(ref){
	ref.on("child_added", function(snapshot){
		var doc = {
			// 'tag': snapshot.val().tag, // no tag in my DB - SAM
			'url': snapshot.val().link,
            'priority': snapshot.val().priority
		};
        store[doc.url] = { priority: doc.priority, url: doc.url}; // add -->  tag: doc.tag
        console.log(doc.url + " added to index");
	});
}

// /* Is called when the user clicks the 'Go' button. Will take the value
// inside the searchBar, and check the dictionary index for the tag.
// If the typedValue is contained inside the post's tag node, it will 
// display it. Otherwise, it'll return a "not found" message and continue */

function search(){
	var inputHandle = document.getElementById("search-bar");
	var typedValue = inputHandle.value;
	console.log("typedValue is " + typedValue);

    for(post in store){
    	console.log("for loop tried")
        if(store[post].url.indexOf(typedValue) > -1) {
            displayElement(store, post);
            console.log(store[post].url + " is the url");
        }
        else{
            console.log("not found");
        }
    }
}

// /* Takes in the dictionary elements, and creates the subsequent
// elements, in order to add the images to the existing page's 
// links page */
function displayElement(store, post) {
	var div = document.getElementById("search-div");
    var ul = document.getElementById("search-results");
    var li = document.createElement("li");
    var a = document.createElement("a");
    var img = document.createElement("img");
    // var p = document.createElement("p");
    
	a.setAttribute("href", store[post].url); //Makes picture clickable to link that 'links' is
	img.setAttribute("src" , store[post].url);
	img.setAttribute("id", "item");
    // p.innerHTML = "Tags: " + store[post].tag;
    // p.setAttribute("id", "description");      
    
	a.appendChild(img);
	li.appendChild(a);
    // li.appendChild(p); //Makes the p element under the image
	ul.appendChild(li);

	if (div.style.display == 'none') {
            div.style.display = 'inline';
        } else {
        	return
        }
}