var eatinderCuisinePictureMap = {
	"Burger": "Burger.jpg",
	"Döner": "Doner.jpg",
	"Ev Yemekleri": "Ev_Yemekleri.jpg",
	"Fast Food & Sandwich": "Fastfood_and_Sandwich.jpg",
	"Kahvaltı": "Kahvalti.jpg",
	"Kebap & Türk Mutfağı": "Kebap_and_Turk Mutfagi.jpg",
	"Kumpir": "Kumpir.jpg",
	"Köfte": "Kofte.jpg",
	"Pasta & Tatlı": "Pasta_and_Tatli.jpeg",
	"Pide": "Pide.jpg",
	"Pizza & İtalyan": "Pizza_Italyan.jpg",
	"Tantuni": "Tantuni.jpg",
	"Tavuk": "Tavuk.jpg",
	"Çiğ Köfte": "Cig_Kofte.jpg"
}

var eatinderSwipeCuisines = [];
var eatinderLikedCuisines = [];
var eatinderCurrentCuisine;

function eatinderLiked() {
	console.log("eatinderLiked");
	eatinderLikedCuisines.push(eatinderCurrentCuisine);
	showNextUnswipedCuisine();
}

function eatinderDisliked() {
	console.log("eatinderDisliked");
	showNextUnswipedCuisine();
}

// Selects 5 randomly cuisines and fills them into swipeCuisines list
function fillSwipeCuisineList(cuisineCountArray) {
	var addCount = 0;
	var i = 0;
	while (addCount < 5 && i < cuisineCountArray.length ) {
		if (eatinderCuisinePictureMap[cuisineCountArray[i].cuisine] !== undefined) {
			eatinderSwipeCuisines.push(cuisineCountArray[i].cuisine);
			addCount++;
		}
		i++;
	}
}

// shows next food picture if any left, or shows match picture
function showNextUnswipedCuisine(){
	console.log("showNextUnswipedCuisine:" + eatinderSwipeCuisines.length);
	if (eatinderSwipeCuisines.length > 0) {		// Show next food picture
		var nextCuisine = eatinderSwipeCuisines.pop();
		console.log(nextCuisine);
		var cuisineJpg = eatinderCuisinePictureMap[nextCuisine];
		var jpegImgElem = document.getElementById("eatinder-image-img");
		console.log(chrome.extension);
		jpegImgElem.src = chrome.extension.getURL("images/" + cuisineJpg);
		console.log(jpegImgElem.src);
		eatinderCurrentCuisine = nextCuisine;
	} else {	// Show match picture
	
	}
}

// It will pop-up the like-dislike page
function cantDecideButtonEvent() {
	var cuisineCountArray = getAllCuisinesWithCounts();
	fillSwipeCuisineList(cuisineCountArray);
	
	var decisionDiv = document.createElement('div');
	decisionDiv.id = 'eatinder-decision-div';
	decisionDiv.tabindex = "-1";
	decisionDiv.style = "display: block; z-index: 1; visibility: visible; top: 0px; left: 0px; position: fixed; width: 100%; height: 100%; background-color:rgba(185, 176, 176, 0.65);";
	
	var decisionImgDiv = document.createElement('div');
	decisionImgDiv.style = "top: 15%; left:30%; width: 40%; height: 60%; position:fixed";
	
	var decisionImgImg = document.createElement("img");
	decisionImgImg.id = 'eatinder-image-img';
	decisionImgImg.style = "width: 100%; height: 100%;";
	
	var decisionDislikeDiv = document.createElement('div');
	decisionDislikeDiv.style = "top: 77%; left:30%; width: 15%; height: 10%; position:fixed";
	
	var decisionDislikeButton = document.createElement("button");
	decisionDislikeButton.id = "eatinder-dislike-btn";
	decisionDislikeButton.style = "background-color:RED; width=%100;"
	decisionDislikeButton.className = "ys-btn";
	decisionDislikeButton.addEventListener("click", eatinderDisliked);
	decisionDislikeButton.innerHTML = "BEGENME";
	
	var decisionLikeDiv = document.createElement('div');
	decisionLikeDiv.style = "top: 77%; left:55%; width: 15%; height: 10%; position:fixed";
	
	var decisionLikeButton = document.createElement("button");
	decisionLikeButton.id = "eatinder-like-btn";
	decisionLikeButton.addEventListener("click", eatinderLiked);
	decisionLikeButton.style = "background-color:green; width=%100;";
	decisionLikeButton.className = "ys-btn";
	decisionLikeButton.innerHTML = "BEGEN";
	
	decisionImgDiv.append(decisionImgImg);
	decisionDislikeDiv.append(decisionDislikeButton);
	decisionLikeDiv.append(decisionLikeButton);
	decisionDiv.append(decisionImgDiv);
	decisionDiv.append(decisionDislikeDiv);
	decisionDiv.append(decisionLikeDiv);
	
	document.body.append(decisionDiv);
	showNextUnswipedCuisine();
	//$('#decisionDiv').load(chrome.extension.getURL("decision.html"), function(){
	//	showNextUnswipedCuisine();
	//});
}

// Returns {cuisine, count} object list
function getAllCuisinesWithCounts() {
	var cuisineMap = {}
	var toolTipList = document.body.getElementsByClassName("withTooltip");
	for (var i = 0; i < toolTipList.length; i++) {
		var stringTooltip = toolTipList[i].getElementsByTagName("span")[0]["dataset"]["tooltip"];
		var objTooltip = JSON.parse(stringTooltip);
		var cuisineNameList  = objTooltip["CuisineNameList"];
		for (var j = 0; j < cuisineNameList.length; j++) {
			if (cuisineMap[cuisineNameList[j]] !== undefined) {
				cuisineMap[cuisineNameList[j]]++;
			} else {
				cuisineMap[cuisineNameList[j]] = 1;
			}
		}
	}
	var cuisineKeyValueMap = [];
	for (var cuisine in cuisineMap) {
		cuisineKeyValueMap.push({"cuisine": cuisine, "count": cuisineMap[cuisine]});
	}
	cuisineKeyValueMap.sort((a, b) => (a.count > b.count) ? -1 : 1);
	return cuisineKeyValueMap;
}

// Check if the page is restaurant listing page in yemeksepeti.com
function isRestaurantListingPage() {
	// FIXME: Returns true for now.
	return true;
}

// This function is called after loading the page.
function onWindowLoad() {
	if (!isRestaurantListingPage()) {
		return;
	}
	
	var cantDecideButton = document.createElement("button");
	cantDecideButton.innerHTML = "Karar Veremiyorum";
	cantDecideButton.className = "ys-btn ys-btn-info ys-btn-xs";
	cantDecideButton.id = "kararButonu";
	cantDecideButton.addEventListener("click", cantDecideButtonEvent);
	cantDecideButton.style = "padding-top:4px; padding-bottom:4px;";
	
	var buttonList = document.body.getElementsByClassName("ys-reslist-sort init")[0];
	buttonList.append(cantDecideButton); 	// Can't Decide button is added to page
}

window.onload = onWindowLoad;
