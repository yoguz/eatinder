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
	eatinderLikedCuisines.push(eatinderCurrentCuisine);
	showNextUnswipedCuisine();
}

function eatinderDisliked() {
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

function showResults() {
	// Match screen comes here
	
	var allRestaurantList = document.getElementsByClassName("ys-reslist")[0].getElementsByClassName("ys-item");
	var acceptedRestaurantList = [];
	
	if (eatinderLikedCuisines.length == 0) {
		acceptedRestaurantList = allRestaurantList;
	} else {
		// console.log(allRestaurantList);
		// console.log(eatinderLikedCuisines);
		for (var i = 0; i < allRestaurantList.length; ++i) {
			var restaurant = allRestaurantList[i];
			// console.log(restaurant);
			var stringTooltip = restaurant.getElementsByTagName("span")[1]["dataset"]["tooltip"];
			if (stringTooltip === undefined || stringTooltip === "undefined") {
				continue;
			}
			
			var objTooltip = JSON.parse(stringTooltip);
			var cuisineNameList  = objTooltip["CuisineNameList"];
			// console.log(cuisineNameList);
			for (var j = 0; j < eatinderLikedCuisines.length; ++j) {
				var likedCuisine = eatinderLikedCuisines[j];
				// console.log(68 + ": " + likedCuisine);
				for (var k = 0; k < cuisineNameList.length; ++k){
					var restaurantCuisine = cuisineNameList[k];
					// console.log(71 + ": " + restaura);
					// console.log("restaurantCuisine:" + restaurantCuisine + ", likedCuisine:" + likedCuisine);
					if (likedCuisine === restaurantCuisine) {
						// console.log("restaurantCuisine:" + restaurantCuisine + ", likedCuisine:" + likedCuisine);
						acceptedRestaurantList.push(restaurant);
					}
				}
			}
		}
		console.log(acceptedRestaurantList);
	}
	
	var finalRestaurantList = [];
	for (var i = 0; i < 3; ++i) {
		var index = Math.floor(Math.random() * acceptedRestaurantList.length);
		finalRestaurantList.push(acceptedRestaurantList[index]);
		acceptedRestaurantList.splice(index, 1);
	}
	
	console.log(finalRestaurantList);
	var objTooltip = JSON.parse(finalRestaurantList[0].childNodes[1].childNodes[3].childNodes[1].dataset.tooltip);
	console.log(objTooltip["ImageFullPath"]);
}

// shows next food picture if any left, or shows match picture
function showNextUnswipedCuisine(){
	if (eatinderSwipeCuisines.length > 0) {		// Show next food picture
		var nextCuisine = eatinderSwipeCuisines.pop();
		var cuisineJpg = eatinderCuisinePictureMap[nextCuisine];
		var jpegImgElem = document.getElementById("eatinder-image-img");
		jpegImgElem.src = chrome.extension.getURL("images/" + cuisineJpg);
		eatinderCurrentCuisine = nextCuisine;
	} else {	// Show match picture
		showMatchScreen();
		showResults();
	}
}

// It will pop-up the like-dislike page
function cantDecideButtonEvent() {
	var cuisineCountArray = getAllCuisinesWithCounts();
	fillSwipeCuisineList(cuisineCountArray);
	
	var decisionDiv = document.createElement('div');
	decisionDiv.id = 'eatinder-decision-div';
	decisionDiv.tabindex = "-1";
	decisionDiv.style = "display: block; z-index: 1; visibility: visible; top: 0px; left: 0px; position: fixed; width: 100%; height: 100%;";
	
	var decisionBackgroundImgDiv = document.createElement("div");
	decisionBackgroundImgDiv.id = 'eatinder-decision-background-img-div';
	decisionBackgroundImgDiv.style= "top: 9%; left:28%; width: 44%; height: 90%; position:fixed; background-color:rgba(255, 255, 255, 1); border-radius:4px;";
	
	var decisionBackgroundImgImg = document.createElement("img");
	decisionBackgroundImgImg.id = 'eatinder-decision-background-img-img';
	decisionBackgroundImgImg.src =  chrome.extension.getURL("images/Pattern_Food_1.jpg");
	decisionBackgroundImgImg.style= "top: 10%; left:29%; width: 42%; height: 90%; position:fixed; opacity: 0.8";
	
	var decisionImgDiv = document.createElement('div');
	decisionImgDiv.style = "top: 15%; left:30%; width: 40%; height: 60%; position:fixed";
	
	var decisionImgImg = document.createElement("img");
	decisionImgImg.id = 'eatinder-image-img';
	decisionImgImg.style = "width: 100%; height: 100%;";
	
	var decisionDislikeDiv = document.createElement('div');
	decisionDislikeDiv.style = "top: 77%; left:30%; width: 15%; height: 10%; position:fixed";
	
	var decisionDislikeButton = document.createElement("div");
	decisionDislikeButton.id = "eatinder-dislike-btn";
	decisionDislikeButton.addEventListener("click", eatinderDisliked);
	decisionDislikeButton.innerHTML = "<i style='color:red;'class='fas fa-times fa-5x'></i>";
	
	var decisionLikeDiv = document.createElement('div');
	decisionLikeDiv.style = "top: 77%; left:55%; width: 15%; height: 10%; position:fixed";
	
	var decisionLikeButton = document.createElement("div");
	decisionLikeButton.id = "eatinder-like-btn";
	decisionLikeButton.addEventListener("click", eatinderLiked);
	decisionLikeButton.innerHTML = "<i style='color:green;' class='fas fa-heart fa-5x'></i>";
	
	decisionImgDiv.append(decisionImgImg);
	decisionDislikeDiv.append(decisionDislikeButton);
	decisionLikeDiv.append(decisionLikeButton);
	decisionBackgroundImgDiv.append(decisionBackgroundImgImg);
	decisionDiv.append(decisionBackgroundImgDiv);
	decisionDiv.append(decisionImgDiv);
	decisionDiv.append(decisionDislikeDiv);
	decisionDiv.append(decisionLikeDiv);
	
	document.body.append(decisionDiv);
	showNextUnswipedCuisine();
	//$('#decisionDiv').load(chrome.extension.getURL("decision.html"), function(){
	//	showNextUnswipedCuisine();
	//});
}

function showMatchScreen() {
	$('#eatinder-decision-div').fadeOut();

	var matchDiv = document.createElement('div');
	matchDiv.id = 'eatinder-match-div';
	matchDiv.tabindex = "-1";
	matchDiv.style = "display: block; z-index: 1; visibility: visible; top: 0px; left: 0px; position: fixed; width: 100%; height: 100%; background-color:rgba(185, 176, 176, 0.65);";
	
	var matchImgDiv = document.createElement('div');
	matchImgDiv.style = "top: 15%; left:30%; width: 40%; height: 60%; position:fixed";
	
	var matchImgImg = document.createElement("img");
	matchImgImg.id = 'eatinder-imagematch-img';
	matchImgImg.style = "width: 100%; height: 100%;";
	
	matchImgDiv.append(matchImgImg);
	matchDiv.append(matchImgDiv);
	//document.body.append(matchDiv);
	$(matchDiv).hide().appendTo(document.body).fadeIn(2000);

	var jpegImgElem = document.getElementById("eatinder-imagematch-img");
	jpegImgElem.src = chrome.extension.getURL("images/Its_a_match.png");
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
	
	var cssLink = chrome.extension.getURL("css/all.css");
	var jsLink = chrome.extension.getURL("js/all.js");
	
	$('head').append('<link rel="stylesheet" href="' + cssLink + '" type="text/css" />');
	$('head').append('<script defer src="' + jsLink + '"></script>');
	
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
