// Daniel Reyes
// ASDI 1308
// javaScript for Chef Tools app


$('#home').on('pageinit', function (){
	
	
});

//Store  form data to local storage

$('#lineCheck').on('pageinit', function (e){
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
		for (var i=0, i < localStorage.length; i++){
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			for (var n in obj){
				var optSubText = obj[n][0] +" "+ obj[n][1];
				$('#display').append(optSubText + " " + "<br />");
			}
			
		};
		
	//Edit Link
	$('#display').append('<a href="#lineCheck" id="editLink">Edit</a> | <a href="#lineCheck" id="deleteLink>Delete</a>')
	
	//Delete Link
	$('#deleteLink').on('click', function(){
		deleteItem();
	});

	//Grab the data for an item on local storage
	function editItem(key){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
	//Populate form with current local storage values.
		$('#loc').val(item.loc[1]);
		$('#name').val(item.name[1]);
		$('#date').val(item.date[1]);
		$('input:checked').val(item.temp[1]);
		$('#degree').val(item.degree[1]);
		$('#expired').val(item.expired[1]);
		
	
	};
		
});
