var eatinderCuisinePictureMap = {
	"Burger": "Burger.jpg",
	"Döner": "Doner.jpg",
	"Ev Yemekleri": "Ev_Yemekleri.jpg",
	"Fast Food & Sandwich": "Fastfood_and_Sandwich.jpg",
	"Kahvaltı": "Kahvalti.jpg",
	"Kebap & Türk Mutfağı": "Kebap_and_Turk_Mutfagi.jpg",
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
	for (var i = 0; i < 3; ++i) {
		var objTooltip = JSON.parse(finalRestaurantList[i].childNodes[1].childNodes[3].childNodes[1].dataset.tooltip);
		console.log(objTooltip["ImageFullPath"]);
	}
	
}

// shows next food picture if any left, or shows match picture
function showNextUnswipedCuisine(){
	if (eatinderSwipeCuisines.length > 0) {		// Show next food picture
		var nextCuisine = eatinderSwipeCuisines.pop();
		var cuisineJpg = eatinderCuisinePictureMap[nextCuisine];
		var jpegImgElem = document.getElementById("eatinder-swipe");
		jpegImgElem.src = chrome.extension.getURL("images2/" + cuisineJpg);
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
	
	var eatinderDiv = document.createElement('div');
	eatinderDiv.id = 'eatinder-div';
	eatinderDiv.tabindex = "-1";
	eatinderDiv.style = "display: block; z-index: 1; visibility: visible; top: 0px; left: 0px; position: fixed; width: 100%; height: 100%; background-color:rgba(185, 176, 176, 0.65);";
	
	var demoDiv = document.createElement('div');
	demoDiv.className = "eatinder";
	demoDiv.id = "eatinder-inner-div";
	var headerDiv = document.createElement('div');
	headerDiv.className = "eatinder__header";
	var demoContentDiv = document.createElement('div');
	demoContentDiv.className = "eatinder__content";
	var demoButtonDiv = document.createElement('div');
	demoButtonDiv.className = "eatinder__button";
	var demoButtonLike = document.createElement('div');
	demoButtonLike.innerHTML = "<i class='far fa-check-circle fa-5x'></i>";
	var demoButtonDisLike = document.createElement('div');
	demoButtonDisLike.innerHTML = "<i class='far fa-times-circle fa-5x'></i>";
	var demoCardContentDiv = document.createElement('div');
	demoCardContentDiv.className = "eatinder__card-cont";
	var demoCardDiv = document.createElement('div');
	demoCardDiv.className = "eatinder__card";
	var demoCardTopDiv = document.createElement('div');
	demoCardTopDiv.className = "eatinder__card__top brown";
	var demoCardTopImg = document.createElement('img');
	demoCardTopImg.src = chrome.extension.getURL("images/Balik_ve_Deniz_Urunleri2.jpg");
	demoCardTopImg.style = "height: 100%;width: 100%; object-fit:contain";
	demoCardTopImg.id = "eatinder-swipe";
	var demoCardRejectDiv = document.createElement('div');
	demoCardRejectDiv.className = "eatinder__card__choice m--reject";
	var demoCardLikeDiv = document.createElement('div');
	demoCardLikeDiv.className = "eatinder__card__choice m--like";
	var demoCardDragDiv = document.createElement('div');
	demoCardDragDiv.className = "eatinder__card__drag";
	var demoContentLogoImg = document.createElement('img');
	demoContentLogoImg.src = chrome.extension.getURL("images/eatinder_logo_128x128.png");
	demoContentLogoImg.className = "eatinder__logo";
	
	
	demoDiv.append(headerDiv);
	demoDiv.append(demoContentDiv);
	demoDiv.append(demoButtonDiv);
	demoContentDiv.append(demoCardContentDiv);
	demoCardContentDiv.append(demoCardDiv);
	demoCardDiv.append(demoCardTopDiv);
	demoCardTopDiv.append(demoCardTopImg);
	demoCardDiv.append(demoCardRejectDiv);
	demoCardDiv.append(demoCardLikeDiv);
	demoCardDiv.append(demoCardDragDiv);
	demoButtonDiv.append(demoButtonLike);
	demoButtonDiv.append(demoButtonDisLike);
	headerDiv.append(demoContentLogoImg);
	
	eatinderDiv.append(demoDiv);

	document.body.append(eatinderDiv);
	showNextUnswipedCuisine();
	//$('#decisionDiv').load(chrome.extension.getURL("decision.html"), function(){
	//	showNextUnswipedCuisine();
	//});
}

function showMatchScreen() {
	$('#eatinder-inner-div').fadeOut(2000);
	var matchDiv = document.getElementById("eatinder-div");
	
	var matchImgDiv = document.createElement('div');
	matchImgDiv.style = "top: 15%; left:30%; width: 40%; height: 60%; position:fixed";
	
	var matchImgImg = document.createElement("img");
	matchImgImg.id = 'eatinder-imagematch-img';
	matchImgImg.style = "width: 100%; height: 100%;";
	matchImgImg.src =  chrome.extension.getURL("images/Its_a_match.png");
	
	matchImgDiv.append(matchImgImg);
	matchDiv.append(matchImgDiv);
	//document.body.append(matchDiv);
	$(matchImgDiv).hide().appendTo(matchDiv).fadeIn(2000);
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
	
	var allCssLink = chrome.extension.getURL("css/all.css");
	var styleCssLink = chrome.extension.getURL("css/style.css");
	var allJsLink = chrome.extension.getURL("js/all.js");
	var scriptJsLink = chrome.extension.getURL("js/tinder_script.js");
	
	$('head').append('<link rel="stylesheet" href="' + allCssLink + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + styleCssLink + '" type="text/css" />');
	$('head').append('<script defer src="' + allJsLink + '"></script>');
	// $('head').append('<script defer src="' + scriptJsLink + '"></script>');
	
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

$(document).ready(function() {

  var animating = false;
  var cardsCounter = 0;
  var numOfCards = 2;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
  };

  function release() {

    if (pullDeltaX >= decisionVal) {
      $card.addClass("to-right");
	  eatinderLiked();
    } else if (pullDeltaX <= -decisionVal) {
		eatinderDisliked();
      $card.addClass("to-left");
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass("inactive");

      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
        cardsCounter++;
        if (cardsCounter === numOfCards) {
          cardsCounter = 0;
          $(".eatinder__card").removeClass("below");
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.addClass("reset");
    }

    setTimeout(function() {
      $card.attr("style", "").removeClass("reset")
        .find(".eatinder__card__choice").attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  };

  $(document).on("mousedown touchstart", ".eatinder__card:not(.inactive)", function(e) {
    if (animating) return;

    $card = $(this);
    $cardReject = $(".eatinder__card__choice.m--reject", $card);
    $cardLike = $(".eatinder__card__choice.m--like", $card);
    var startX =  e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });

});
