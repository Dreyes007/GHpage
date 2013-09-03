function (doc) {
	if(doc._id.substr(0, 10) === "linecheck:") {
		emit(doc._id.substr(10), {
			"Restaurant": doc.Restaurant,
			"Manager": doc.Manager,
			"Date": doc.Date,
			"Condition": doc.Condition,
			"Temperature": doc.Temperature,
			"Expired": doc.Expired
			
		});
	}
};