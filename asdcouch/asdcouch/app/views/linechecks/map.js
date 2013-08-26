function (doc) {
	if(doc._id.substr(0, 10) === "linecheck:") {
		emit(doc._id.substr(10), {
			"location": doc.loc,
			"name":doc.name,
			"date":doc.date,
			"temperature": doc.temp,
			"temperature degree": doc.degree,
			"expired": doc.expired
		});
	}
};