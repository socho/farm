$(document).ready(function(){
	var displayHome = function() {

		$.ajax({	//GET /vegetables
			type: "GET",
			url: "/vegetables",
			data: {}
		}).done(function(response){
			$("#farm-container").empty();
			$("#harvested-container").empty();
			var vegetables = response.content.vegetables;
			for (var i = 0; i < vegetables.length; i++) {
				var thisVegetable = vegetables[i];
				if (thisVegetable.harvested) {
					$("#harvested-container").append("<div class='harvested "+thisVegetable.type+"'><img src='ready_to_harvest_"+thisVegetable.type+".png"+"'></img><div>");
				}
				else {
					console.log("not harvested");
					var Veg = new Vegetable(thisVegetable);
					var status = Veg.getStatus(new Date().getTime());
					if (status != "dead") {	//if not dead
						var div = $("<div class='"+status+" "+thisVegetable.type+" covered'><img src='"+status+"_"+thisVegetable.type+".png"+"'></img></div>").appendTo("#farm-container");
						div.data("vegetableId", thisVegetable._id);
						if (status === "ready_to_harvest"){
							div.click(function() {	//click listener for "ready_to_harvest" veggies
								var thisDiv = $(this);
								var vegetable_id = $(this).data("vegetableId");
								console.log("id is: "+vegetable_id);
								$.ajax({
									type: "PUT",
									url: "/vegetables/"+vegetable_id,
									data: {"vegetable_id": vegetable_id}
								}).done(function(response){
									thisDiv.remove();
									$("#harvested-container").append("<div class='harvested "+response.type+"'>"+"<div>");
								});
							});
						}
					}
					else {	//if dead
						$.ajax({
							type: "DELETE",
							url: "/vegetables/"+thisVegetable._id
						}).done(function(response){});
					}
				}
			}
		});
	};

	displayHome();
	window.setInterval(displayHome, 1000);

	$(".add-vegetable").click(function() {
		var type = $("#type-select").val();
		var cycle = parseInt($("#cycle-select").val());
		$.ajax({
			type: "POST",
			url: "/vegetables",
			data: {type: type, cycle:cycle, time: new Date().getTime()}
		}).done(function(response){
			console.log(response);
			$("#farm-container").append("<div class='seed "+type+"'>"+"</div>");
		})
	});

});