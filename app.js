// Storage Controller
const StorageCtrl = (function () {

})();

// Item  Controller
const ItemCtrl = (function () {
	// Item Constructor
	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	}
	// Data Structure /  state aka " fake data"
	const state = {
		items: [
			{ id: 0, name: 'Steak', calories: 1200 },
			{ id: 1, name: 'Bread', calories: 200 },
			{ id: 2, name: 'Egg', calories: 400 }
		],
		currentItem: null,
		totalCalories: 0
	}
	// Public Meth
	return {
		logState: function () {
			return state;
		}
	}
})();

// UI Controller
const UICtrl = (function () {

	// Public Meth
	return {

	}
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {


	// Public Meth
	return {
		init: function () {
			console.log("Loading App ...");
		}
	}


})(ItemCtrl, UICtrl);


