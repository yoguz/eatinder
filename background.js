var cuisinePictureMap = {
	"Burger": "burger.jpg",
	"Döner": "burger.jpg",
	"Ev Yemekleri": "burger.jpg",
	"Fast Food & Sandwich": "burger.jpg",
	"Kahvaltı": "burger.jpg",
	"Kebap & Türk Mutfağı": "burger.jpg",
	"Kumpir": "burger.jpg",
	"Köfte": "burger.jpg",
	"Pasta & Tatlı": "burger.jpg",
	"Pide": "burger.jpg",
	"Pizza & İtalyan": "burger.jpg",
	"Tantuni": "burger.jpg",
	"Tavuk": "burger.jpg",
	"Çiğ Köfte": "burger.jpg"
}

var swipeCuisines = []
var likedCuisines = []
var currentCuisine;

// Selects 5 randomly cuisines and fills them into swipeCuisines list
function fillSwipeCuisineList(cuisineCountArray) {
	var addCount = 0;
	var i = 0;
	while (addCount < 5 && i < cuisineCountArray.length ) {
		if (cuisinePictureMap[cuisineCountArray[i].cuisine] !== undefined) {
			swipeCuisines.push(cuisineCountArray[i].cuisine);
			addCount++;
		}
		i++;
	}
}

// shows next food picture if any left, or shows match picture
function showNextUnswipedCuisine(){
	if (swipeCuisines.length > 0) {		// Show next food picture
		var nextCuisine = swipeCuisines.pop();
		console.log(nextCuisine);
		var cuisineJpg = cuisinePictureMap[nextCuisine];
		var jpegImgElem = document.getElementById("eatinder-image-img");
		jpegImgElem.src = "chrome-extension://hfchedmaclelneclbdllnchgfklddpcj" + "/images/" + cuisineJpg;
	} else {	// Show match picture
	
	}
}

function eatinderLiked() {
	likedCuisines.push(currentCuisine);
	showNextUnswipedCuisine();
}

// It will pop-up the like-dislike page
function cantDecideButtonEvent() {
	var cuisineCountArray = getAllCuisinesWithCounts();
	fillSwipeCuisineList(cuisineCountArray);
	/*var s = document.createElement('script');
	s.src = chrome.runtime.getURL('decision-page-loader.js');
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
	*/
	var decisionDiv = document.createElement('div');
	decisionDiv.id = 'decisionDiv';
	document.body.append(decisionDiv);
	$('#decisionDiv').load('chrome-extension://hfchedmaclelneclbdllnchgfklddpcj/decision.html', function(){
		showNextUnswipedCuisine();
	});
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
