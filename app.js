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
		getItems: function () {
			return state.items;
		},
		addItem: function (name, calories) {
			let ID;
			// Create ID
			if (state.items.length > 0) {
				ID = state.items[state.items.length - 1].id + 1
			} else {
				ID = 0;
			}
		},

		logData: function () {
			return state;
		}
	}

})();



//////////////// UI Controller //////////////////////// 
const UICtrl = (function () {

	const UISelectors = {
		itemList: "#item-list",
		addBtn: ".add-btn",
		calorieInput: "#item-calories",
		mealItem: "#item-name"

	}

	return {
		populateItems: function (things) {
			let output = "";

			things.forEach(function (item) {
				output += `
				<li id="item-${item.id}" class="collection-item" ><strong> ${item.name}:</strong><em> ${item.calories}</em>
				<a href="#" class="secondary-content">
				<i class="edit fa fa-pencil"></i>
				</a>
				</li>
				`;
			});
			document.querySelector(UISelectors.itemList).innerHTML = output;
		},
		getInput: function () {
			return {
				name: document.querySelector(UISelectors.mealItem).value,
				calories: document.querySelector(UISelectors.calorieInput).value
			}
		},
		getSelectors: function () {
			return UISelectors;
		}
	}
})();




//////////////// App Controller //////////////////////// 
const App = (function (ItemCtrl, UICtrl) {

	const loadEvents = function () {

		const UserSelectors = UICtrl.getSelectors();

		document.querySelector(UserSelectors.addBtn).addEventListener('click', itemAddSubmit);
	}

	const itemAddSubmit = function (e) {

		const checkInput = UICtrl.getInput();

		if (checkInput.name !== "" && checkInput.calories !== "") {

			const newItem = ItemCtrl.addItem(checkInput.name, checkInput.calories);

		}
		e.preventDefault();
	}

	return {
		init: function () {

			console.log(ItemCtrl.logData());
			const items = ItemCtrl.getItems()

			UICtrl.populateItems(items);
			loadEvents();
		}
	}
})(ItemCtrl, UICtrl);

App.init();