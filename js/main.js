// Daniel Reyes
// ASDI 1307
// javaScript for Culinary Toolbox app

//loads JSON data
$('#home').on('pageinit', function (){


	
		$.ajax({
			url: 'xhr/JSON.php',
			type: 'GET',
			dataType: 'json',
			success: function(response){
				for(var i=0, j=response.linecheck1.lenght; i<j; i++){
					var line = response.linecheck1[i];
					$(''+
						'<div class="data">'+
							'<p>'+ line.rname +'</p>'+
							'<p>'+ line.mgrname +'</p>'+
							'<p>'+ line.date +'</p>'+
							'<p>'+ line.temp +'</p>'+
							'<p>'+ line.degree +'</p>'+
							'<p>'+ line.expired +'</p>'+
						'</div>'
					).appendTo('#loadData');
				};
				
			}
	 		
		});
		
	$('#loadData').on('click', function(){
		.ajax();
		
	});
//load XML data
		$.ajax({
			url: 'xhr/info.php',
			type: 'GET',
			dataType: 'xml',
			success: function(response){
				for(var i=0, j=response.info.lenght; i<j; i++){
					var line = response.info[i];
					$(''+
						'<div class="data">'+
							'<p>'+ line.rname +'</p>'+
							'<p>'+ line.mgrname +'</p>'+
							'<p>'+ line.date +'</p>'+
							'<p>'+ line.temp +'</p>'+
							'<p>'+ line.degree +'</p>'+
							'<p>'+ line.expired +'</p>'+
						'</div>'
					).appendTo('#loadData');
				},
			}			 		
		});
		
	$('#xml').on('click', function(){
		.ajax();		
	});
});

// Store form values to Local Storage.	
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
		item.rname = ["Restaurant Name:", $('#rname').val()];
		item.mgrname = ["Manager Name:", $('#mgrname').val()];
		item.date = ["Date:", $('#date').val()];
		item.temp = ["Temperature:", $('input:checked').val()];
		item.degree = ["Temperature Degree:", $('#degree').val()];
		item.expired = ["Expired:", $('#expired').val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
		$.mobile.changePage("#home", null, true, true);
		
	};
		


});

// Show stored values from Local Storage
$('#display').on('pageinit', function (){

	var getData = function(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
		}
	};
		for(var i=0; i < localStorage.length; i++){

	
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
	
	
			for(var n in obj){		
				var optSubText = obj[n][0] +" "+ obj[n][1];
				$('#display').append(optSubText + " " + "<br />");
										
				}
			
		};
		
	//Edit Link
		
	$('#display').append('<a href="#orderInfo" id="editLink">Edit</a> | <a href="#" id="deleteLink">Delete</a>');
		


	//Delete Link

	$('#deleteLink').on('click', function (){
		deleteItem();
		
	});


//Grab the data from our item on local storage
	function editItem (key){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
//Populate form with with current local storage values.

		$('#rname').val(item.rname[1]);
		$('#mgrname').val(item.mgrname[1]);
		$('input:checked').val(item.temp[1]);
		$('#date').val(item.date[1]);
		$('#expired').val(item.expired[1]);
		
//Remove the initial listener from the input 'Submit Order' button.
//Change Submit Button value to Edit Button
		$('#submit').val("Edit");
		var submit = $("#submit");
		
		$('#submit').on('click', function(){
		submit.key = this.key;
		validateInfo(key);
		
		});
		
	};
	
	function deleteItem(key){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information was deleted");
			window.location.reload();
		}else{
			alert("Information was NOT deleted");
		}
	}
			
});
//Clear the data from local storage
$('#option').on('pageinit', function (){
	
		$('#clear').on('click', function(){
		localStorage.clear();
		alert("All information has been deleted!")
		$.mobile.changePage("#home", null, true, true);
		
		});

});








