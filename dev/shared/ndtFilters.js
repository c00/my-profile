/* Format Rupiah number */
ndtApp.filter('rupiah', function() {
	return function(input) {
		if (input === undefined) return "";
		/* Thousands seperator: https://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript*/
		return "Rp " + input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	};
});

ndtApp.filter('arrayToList', function() {
  return function(input) {
    if (!jQuery.isArray(input)) return "none";

    return input.join(', ');
  };
});

/* Subjects array to comma seperated string */
ndtApp.filter('subjects', function() {
	return function(input) {
		if (!jQuery.isArray(input)) return "none";

		//To array
		var names = input.map(function(item) {
			return item.name;
		});

		//to string
		return names.join(", ");
	};
});

/* Gender to 'his' or 'her' */
ndtApp.filter('hisHer', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "his";
		}else {
			return "her";
		}
	};
});

/* Gender to 'he' or 'she' */
ndtApp.filter('heShe', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "he";
		}else {
			return "she";
		}
	};
});

/* Gender to 'him' or 'her' */
ndtApp.filter('himHer', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "him";
		}else {
			return "her";
		}
	};
});

/* Pluralize hour */
ndtApp.filter('hours', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == 1){
			return "1 hour";
		}else {
			return input + " hours";
		}
	};
});

/* Status */
ndtApp.filter('lessonStatus', function() {
	return function(input) {
		if (input === undefined) return "";

		switch(input) {
			case 1:
				return "Waiting for the teacher to confirm";
			case 2:
				return "Waiting for the student to confirm";
			case 3:
				return "Awaiting payment";
			case 10:
				return "Confirmed";
			case 20:
				return "Waiting for the teacher to review";
			case 21:
				return "Waiting for the student to review";
			case 30:
				return "Complete";
			case 31:
				return "Cancelled";
			case 40:
				return "Dispute";
			default:
				return "Unknown";
		}
	
	};

});

/* Status */
ndtApp.filter('lessonStatusClass', function() {
	return function(input) {
		if (input === undefined) return "";

		switch(input) {
			case 1:
				return "warning";
			case 2:
				return "warning";
			case 3:
				return "warning";
			case 10:
				return "success";
			case 20:
				return "warning";
			case 21:
				return "warning";
			case 30:
				return "success";
			case 31:
				return "info";
			case 40:
				return "danger";
			default:
				return "";
		}
	
	};

});