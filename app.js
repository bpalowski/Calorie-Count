"use strict";

//////////////// Storage Controller ////////////////////////
const StorageCtrl = (function () {
	return {

	}
})();



//////////////// Item Controller //////////////////////// 
const ItemCtrl = (function () {
	// Item Controller
	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	}

	// Fake DATA  State to update
	const state = {
		items: [
			{ id: 0, name: 'Test1', calories: 1200 },
			{ id: 1, name: 'Test2', calories: 1230 },
			{ id: 2, name: 'Test3', calories: 500 }
		],
		currentItem: null,
		totalCalories: 0
	}
	return {
		logData: function () {
			return state;
		}
	}

})();



//////////////// UI Controller //////////////////////// 
const UICtrl = (function () {

	return {

	}
})();




//////////////// App Controller //////////////////////// 
const App = (function (ItemCtrl, UICtrl) {

	return {
		init: function () {
			console.log(ItemCtrl.logData());
			return ItemCtrl.logData();
		}
	}
})(ItemCtrl, UICtrl);

App.init();