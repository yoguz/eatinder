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
	if (eatinderSwipeCuisines.length > 0) {		// Show next food picture
		var nextCuisine = eatinderSwipeCuisines.pop();
		console.log(nextCuisine);
		var cuisineJpg = eatinderCuisinePictureMap[nextCuisine];
		var jpegImgElem = document.getElementById("eatinder-image-img");
		jpegImgElem.src = chrome.extension.getURL("images/" + cuisineJpg);
		console.log(jpegImgElem.src);
		eatinderCurrentCuisine = nextCuisine;
	} else {	// Show match picture
		matchScreenAndResult();
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
	$(document).ready(function(){
		$("#eatinder-dislike-btn").css({
			borderRadius:"32px",
			border:"3px solid #d02718",
			display:"inline-block",
			cursor:"pointer",
			color:"#ffffff",
			fontFamily:"Georgia",
			fontSize:"16px",
			fontWeight:"bold",
			padding:"11px 37px",
			textDecoration:"none",
			textShadow:"0px -2px 0px #820808",
			width:"200px",
			backgroundImage:"-moz-box-shadow:inset 0px 1px 0px 0px #bd1a0b",
			backgroundImage:"-webkit-box-shadow:inset 0px 1px 0px 0px #bd1a0b",
			boxShadow:"inset 0px 1px 0px 0px #bd1a0b",
			backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f24537), color-stop(1, #c62d1f))",
			backgroundImage:"-moz-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-webkit-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-o-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-ms-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"linear-gradient(to bottom, #f24537 5%, #c62d1f 100%)",
			filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#f24537', endColorstr='#c62d1f',GradientType=0)",
			backgroundColor:"#f24537",
			backgroundImage:"-moz-border-radius:32px",
			backgroundImage:"-webkit-border-radius:32px"
		});
		$("#eatinder-dislike-btn").hover(function(){
			$(this).css({
				backgroundColor:"#c62d1f",
				backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c62d1f), color-stop(1, #f24537))",
				backgroundImage:"-moz-linear-gradient(top, #c62d1f 5%, #f24537 100%)",
				backgroundImage:"-webkit-linear-gradient(top, #c62d1f 5%, #f24537 100%)",
				backgroundImage:"-o-linear-gradient(top, #c62d1f 5%, #f24537 100%)",
				backgroundImage:"-ms-linear-gradient(top, #c62d1f 5%, #f24537 100%)",
				backgroundImage:"linear-gradient(to bottom, #c62d1f 5%, #f24537 100%)",
				filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#c62d1f', endColorstr='#f24537',GradientType=0)"
			});
		},function(){
			$(this).css({
			backgroundImage:"-moz-box-shadow:inset 0px 1px 0px 0px #bd1a0b",
			backgroundImage:"-webkit-box-shadow:inset 0px 1px 0px 0px #bd1a0b",
			backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f24537), color-stop(1, #c62d1f))",
			backgroundImage:"-moz-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-webkit-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-o-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"-ms-linear-gradient(top, #f24537 5%, #c62d1f 100%)",
			backgroundImage:"linear-gradient(to bottom, #f24537 5%, #c62d1f 100%)",
			filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#f24537', endColorstr='#c62d1f',GradientType=0)",
			backgroundColor:"#f24537",
			backgroundImage:"-moz-border-radius:32px",
			backgroundImage:"-webkit-border-radius:32px"
			});
		});
    }); 
	//decisionDislikeButton.className = "ys-btn";
	decisionDislikeButton.addEventListener("click", eatinderDisliked);
	decisionDislikeButton.innerHTML = "BEĞENME";
	
	var decisionLikeDiv = document.createElement('div');
	decisionLikeDiv.style = "top: 77%; left:55%; width: 15%; height: 10%; position:fixed";
	
	var decisionLikeButton = document.createElement("button");
	decisionLikeButton.id = "eatinder-like-btn";
	decisionLikeButton.addEventListener("click", eatinderLiked);
	$(document).ready(function(){
		$("#eatinder-like-btn").css({
			borderRadius:"32px",
			border:"3px solid #268a16",
			display:"inline-block",
			cursor:"pointer",
			color:"#ffffff",
			fontFamily:"Georgia",
			fontSize:"16px",
			fontWeight:"bold",
			padding:"11px 37px",
			textDecoration:"none",
			textShadow:"0px -2px 0px #2f6627",
			width:"200px",
			backgroundImage:"-moz-box-shadow:inset 0px 1px 0px 0px #3dc21b",
			backgroundImage:"-webkit-box-shadow:inset 0px 1px 0px 0px #3dc21b",
			boxShadow:"inset 0px 1px 0px 0px #3dc21b",
			backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #5cb811), color-stop(1, #77d42a))",
			backgroundImage:"-moz-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-webkit-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-o-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-ms-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"linear-gradient(to bottom, #5cb811 5%, #77d42a 100%)",
			filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#5cb811', endColorstr='#77d42a',GradientType=0)",
			backgroundColor:"#5cb811",
			backgroundImage:"-moz-border-radius:32px",
			backgroundImage:"-webkit-border-radius:32px"
	   });
	   $("#eatinder-like-btn").hover(function(){
			$(this).css({
				backgroundColor:"#77d42a",
				backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #77d42a), color-stop(1, #5cb811))",
				backgroundImage:"-moz-linear-gradient(top, #77d42a 5%, #5cb811 100%)",
				backgroundImage:"-webkit-linear-gradient(top, #77d42a 5%, #5cb811 100%)",
				backgroundImage:"-o-linear-gradient(top, #77d42a 5%, #5cb811 100%)",
				backgroundImage:"-ms-linear-gradient(top, #77d42a 5%, #5cb811 100%)",
				backgroundImage:"linear-gradient(to bottom, #77d42a 5%, #5cb811 100%)",
				filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#77d42a', endColorstr='#5cb811',GradientType=0)"
			});
		},function(){
			$(this).css({
			backgroundImage:"-moz-box-shadow:inset 0px 1px 0px 0px #3dc21b",
			backgroundImage:"-webkit-box-shadow:inset 0px 1px 0px 0px #3dc21b",
			backgroundImage:"-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #5cb811), color-stop(1, #77d42a))",
			backgroundImage:"-moz-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-webkit-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-o-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"-ms-linear-gradient(top, #5cb811 5%, #77d42a 100%)",
			backgroundImage:"linear-gradient(to bottom, #5cb811 5%, #77d42a 100%)",
			filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#5cb811', endColorstr='#77d42a',GradientType=0)",
			backgroundColor:"#5cb811",
			backgroundImage:"-moz-border-radius:32px",
			backgroundImage:"-webkit-border-radius:32px"
			});
		});
   
    }); 
	//decisionLikeButton.className = "ys-btn";
	decisionLikeButton.innerHTML = "BEĞEN";
	
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

function matchScreenAndResult() {
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
