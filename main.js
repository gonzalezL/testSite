var pageCounter=1;
var pageLimit = 3;
var container = document.getElementById("info");
var btn = document.getElementById("btn");

btn.insertAdjacentHTML('beforeend', "Fetch info from page " + pageCounter);

btn.addEventListener("click", function() {
	if(pageCounter <= pageLimit) {
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://raw.githubusercontent.com/gonzalezL/testSite/master/sampleNames-' + pageCounter+ '.json');
		ourRequest.onload = function() {
			if(ourRequest.status >= 200 && ourRequest.status <400) {
				var ourData = JSON.parse(ourRequest.responseText);
				renderHTML(ourData);
			}
			else {
				alert("Error occurred loading information.");
			}
		};
		ourRequest.onerror = function() {
			console.log("page not connected");
		};
		ourRequest.send();
		pageCounter++;
		btn.innerHTML = "Fetch info from page " + pageCounter;
	}
	else {
		alert("No more information left.");
	}
});

function renderHTML(data) {
	var htmlString = "";
	for(i=0; i<data.length; i++){
		htmlString+="<p>" + data[i].firstName + " " + data[i].lastName + "</p>";
	}
	container.insertAdjacentHTML('beforeend', htmlString);
}