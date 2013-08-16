// Daniel Reyes
// ASDI 1308
// javaScript for Chef Tools app


$('#home').on('pageinit', function (){

	


$('#loadData').on('click', function(){

	
		$.ajax({
			url: "xhr/JSON.js",
			type: "GET",
			dataType: "json",
			success: function(data, status){
				console.log(status, data);
				}
			});

		

});

});
//Store  form data to local storage

$('#lineCheck').on('pageinit', function(e){
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
	
	$('#clear').on('click', function(){
		localStorage.clear()
		alert("All information has been deleted!")
		$.mobile.changePage("#home", null, true, true);
	});
	
});
