import { DateTime } from 'luxon'

const slugify = function (text) {
	return String(text ?? '')
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}

const removeDuplicates = function (originalArray, prop) {
	var newArray = [];
	var lookupObject = {};

	for (var i in originalArray) {
		lookupObject[originalArray[i][prop]] = originalArray[i];
	}

	for (i in lookupObject) {
		newArray.push(lookupObject[i]);
	}
	return newArray;
}

const SortingByDate = function (posts) {
	return posts
		.sort((post1, post2) => {

			const d1 = String(post1?.date ?? '').trim();
			const d2 = String(post2?.date ?? '').trim();
			const beforeDate = d1 ? DateTime.fromFormat(d1, "LLL dd yyyy") : DateTime.invalid('empty');
			const afterDate = d2 ? DateTime.fromFormat(d2, "LLL dd yyyy") : DateTime.invalid('empty');
			const t1 = beforeDate.isValid ? beforeDate.toMillis() : 0;
			const t2 = afterDate.isValid ? afterDate.toMillis() : 0;
			return t2 - t1;

		})
}

const dateFormate = function () {
	var day = new Date().getDate();
	var month = new Date().toLocaleString("ro-RO", { month: "long" });
	var year = new Date().getFullYear();

	var todayDate = (day + " " + month + "," + " " + year);

	return todayDate;
}


export { slugify, removeDuplicates, SortingByDate, dateFormate };