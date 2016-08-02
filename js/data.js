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
var searchBar = document.getElementById("search-bar");


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

function futureSetup() {
	getFutureImages();
}

function spacesSetup() {
	getSpaceImages();
}

function linksSetup() {
	getLinks()
}

function getFeaturedImages(){

	featuredRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.setAttribute("src" , links);
		img.setAttribute("class" , "pics");
		li.appendChild(img);
		feat_ul.appendChild(li);
		
	});
}

function getPastImages() {
	
	pastRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
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
	});
}

function getPresentImages() {
	presentRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
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
	});
}

function getFutureImages() {
	futureRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
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
	});
}

function getSpaceImages(){
		featuredRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.setAttribute("src" , links);
		li.appendChild(img);
		all_ul.appendChild(li);
	});
}

function getLinks(){

	featuredRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});

	pastRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});

	presentRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});	

	futureRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.setAttribute("href" , links);
		anchor.innerText = "http://www.thisisalink.com"; 
		li.appendChild(anchor);
		link_ul.appendChild(li);
	});	


	spacesRef.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
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

	if(searchBar.value == "search:"){
		searchBar.value = "";
		searchBar.placeholder = "search:"
		console.log("active searchbar")
		setupIndex(featuredRef);
	}
}

function inactive(){

	if(searchBar.value == "search:"){
		searchBar.value = "search:";
		searchBar.placeholder = "";
		console.log("inactive searchbar")
	}
}

function createLunrIndex(){
	var index = lunr(function(){
		//The id
	    this.ref('name')

	    // boost increases the importance of words found in this field
	    this.field('projectTitle', {boost: 20})
	    this.field('artist', {boost: 10})
	    this.field('author')
	    this.field('text')
	});
	console.log("lunr index created");
	return index;
}

// /* Takes in the corresponding reference of posts, goes through each initial
// child inside the reference and whenever one is added, creates a copy of the JSON object, and stores it inside a global dictionary 'store' */
function setupIndex(ref){
	//Create index of all keywords that can be searched for
	var index = createLunrIndex();

	ref.on("child_added", function(snapshot){
		var doc = {
			'name': snapshot.key, //name is the id
			'artist': snapshot.val().artist,
			'author': snapshot.val().author,
			'projectTitle': snapshot.val().projectTitle,
			'text': snapshot.val().text
		};

		//store[] is global, so it's seen everywhere. Used to keep track of more info of document than index
		store[doc.name] = { 
			author: snapshot.val().author,
			artist: snapshot.val().artist, 
			projectTitle: snapshot.val().projectTitle,
			mainImgUrl: snapshot.val().mainImgUrl,
			projectUrl: snapshot.val().projectUrl,
			text: snapshot.val().text,
			videoUrl: snapshot.val().videoURL
		};
		// console.log("artist " + snapshot.val().artist);
		// console.log("projectTitle " + snapshot.val().projectTitle);
		index.add(doc);
	});

	var savedIndex = index.toJSON();

	// Put the index into storage to be used in different function
	localStorage.setItem('savedIndex', JSON.stringify(savedIndex));
}

function search(){
	// Retrieve the index from storage
	var data = localStorage.getItem('savedIndex');
	index = lunr.Index.load(JSON.parse(data));

	//Retrieve searchquery
	searchQuery = searchBar.value;

	if(searchQuery === ""){
		//This is some edge case that I can't think of at the moment
		emptyDiv(feat_ul);
	}
	else{
		var results = index.search(searchQuery);

		if(results.length === 0){
			console.log("No results found");
			feat_ul.innerHTML = "<p><strong>No results found</strong></p>";
		}
		else{
			console.log("Results found");
			emptyDiv(feat_ul);

			for(var item in results){
				var ref = results[item].ref; //This allows code to properly access items inside the store dictionary

				var li = document.createElement("li");
				var a = document.createElement("a");
				var img = document.createElement("img");
				a.setAttribute("href", store[ref].projectUrl);
				img.setAttribute("src" , store[ref].mainImgUrl);
				a.appendChild(img);
				li.appendChild(a);
				feat_ul.appendChild(li);
			}
		}
	}
}

//Deletes all content inside a div. Basically a copy of jQuery's $().empty function
function emptyDiv(div){
	while(div.firstChild){
		div.removeChild(div.firstChild);
	}
}