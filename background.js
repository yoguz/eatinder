// It will pop-up the like-dislike page
function cantDecideButtonEvent() {
	//getAllCuisinesWithCounts();
	var s = document.createElement('script');
	var decisionDiv = document.createElement('div');
	decisionDiv.id = 'decisionDiv';
	document.body.append(decisionDiv);
	s.src = chrome.runtime.getURL('decision-page-loader.js');
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
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
	console.log(cuisineMap);
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
