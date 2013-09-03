$('#home').on('pageinit', function (){
	console.log("Main page loaded!!");


/*$('#loadData').on('pageinit', function () {
	
	$.ajax({
		"url": "_view/linechecks",
		"dataType": "json",
		"success": function(data){			
			$.each(data.rows, function(index, linecheck){
				var Restaurant = linecheck.value.Restaurant;
				var Manager = linecheck.value.Manager;
				var Date = linecheck.value.Date;
				var Condition = linecheck.value.Condition;
				var Temperature = linecheck.value.Temperature;
				var Expired = linecheck.value.Expired;
				$('#checklist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.append("Restaurant:" + Restaurant)
					)
				);
			});
			$('#checklist').listview('refresh');
		}
	});
});*/

//Pulls Data from CouchDB
$(document).on('pageinit', '#home', function(){
	console.log("Ready to load data!!");
		$.couch.db("chefproject").view("chefproject/linechecks",{
			success: function(data) {
				//console.log(data);
				$('#checklist').empty();
				$.each(data.rows, function(index, value) {
				 	var item = (value.value || value.doc);
				 	$('#checklist').append(
				 		$('<li>').append(
				 			$('<a>')
				 				.attr("href", "add.html?linecheck=" + item.Manager)
				 				.append(item.Restaurant)
				 		)
				 	);
				});
				//$('#checklist').listview('refresh');
			}
		});
		
});

var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[0].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

//Pulls detailed data for the Restaurants
$(document).on('pageinit', '#linecheck', function() {
	var linecheck = urlVars()["linecheck"];
	//console.log(linecheck);
	$.couch.db("chefproject").view("chefproject/courses", {
		key: "Daytona" + Daytona
	});
});

//Store form data to local storage
$('#lineCheck').on('pageinit', function(e){
	console.log("Line Check Loaded!");
	e.preventDefault();
	function validateInfo(key){
		var myForm = $('form');
		    myForm.validate({
			invalidHandler: function(form, validator){},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data,key);
		}
		})
	};
	
	$('#submit').on('click', function(){
		validateInfo();
	});
	
	$('#display').on('click', function(e){
		console.log("Information Displayed!");
		getData();
		e.preventDefault();
	});
	
	function storeData(data,key){
		//If there's no key, then its a brand new item and needs a new key
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
		var item = {};
		item.loc = ["Location:", $('#loc').val()];
		item.name = ["Name:", $('#name').val()];
		item.date = ["Date:", $('#date').val()];
		item.temp = ["Temperature:", $('input:checked').val()];
		item.degree = ["Temperature Degree:", $('#degree').val()];
		item.expired = ["Expiration:", $('#expired').val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
		$.mobile.changePage("#home", null, true, true);
		
	};
	
});

//Show the stored value from local storage
$('#display').on('pageinit', function(){
	console.log("Display information loaded!!");
	var getData = function(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
		}
	};
		for(var i=0; i < localStorage.length; i++){
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			for (var n in obj){
				var optSubText = obj[n][0] +" "+ obj[n][1];
				$('#display').append(optSubText + "<br />");
			}
			$('#display').append(key + " " + "<br />");
			$('#display').append('<a href="#lineCheck" id="editLink">Edit</a> | <a href="#" id="deleteLink">Delete</a>')
			
		};
		
	//Edit Link
	$('#editLink').on('click', function(){
		validateInfo(key);
	});
	
	//Delete Link
	$('#deleteLink').on('click', function(){
		deleteItem(key);
	});

	//Grab the data for an item on local storage
	function editItem(key){
	$.mobile.changePage("#home", null, true, true);
		var value = localStorage.getItem(key);
		var item = JSON.parse(value);
		
	//Populate form with current local storage values.
		$('#loc').val(item.loc[1]);
		$('#name').val(item.name[1]);
		$('#date').val(item.date[1]);
		$('input:checked').val(item.temp[1]);
		$('#degree').val(item.degree[1]);
		$('#expired').val(item.expired[1]);
		
	//Remove the initial listener from the input 'Submit Order' button.
	//Change Submit Button value to Edit Button
	$('#submit').val("Edit");
	var submit = $("#submit");
	
	$('#submit').on('click', function (){
		submit.key = this.key;
		validateInfo(key);
	});
	
	
	};
	
	function deleteItem(key){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(key);
			alert("Information has been deleted");
			window.location.reload();	
		}else{
			alert("Information was not deleted!");
			
		}
	};
		
});

$('#option').on('pageinit', function(){
	console.log("Clear local page loaded!!");
	$('#clear').on('click', function(){
		localStorage.clear()
		alert("All information has been deleted!")
		$.mobile.changePage("#home", null, true, true);
	});
	
});

$('#addNew').on('pageinit', function(){
	console.log("New Restaurant Loaded");
	
	function addnew(){
		
		var obj = {}
		obj.store = $('#store').val();
		obj.mgrName = $('#mgrName').val();
		obj.open = $('#open').val();
		
		$.couch.db("chefproject").saveDoc(obj, {
			success: function(data){
			console.log(data + "/n Store added Succesfully!"); 
			},
			error: function(status){
			console.log("There was an error" + status);
			}
		});
	}

	$('#submit').on('click', function(){
		addnew();
	});

});

});

