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
			calories = parseInt(calories)

			// new Item
			let newItem = new Item(ID, name, calories);
			// add to constr
			state.items.push(newItem);

			return newItem;

		},
		totalCalories: function () {
			let total = 0;
			state.items.forEach(function (item) {
				total += item.calories;
			});
			state.totalCalories = total;

			return state.totalCalories;
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
		mealItem: "#item-name",
		totalCalories: '.total-calories'
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
		addListItem: function (item) {
			// Show list
			document.querySelector(UISelectors.itemList).style.display = "block";
			// Create li element
			const li = document.createElement('li');
			// Add Class
			li.className = 'collection-item';
			// Add id
			li.id = `item-${item.id}`;

			// Add Markup html
			li.innerHTML = `
			<strong> ${item.name}:</strong><em> ${item.calories}</em>
				<a href="#" class="secondary-content">
				<i class="edit fa fa-pencil"></i>
				</a>
			`;
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},
		clearInput: function () {
			document.querySelector(UISelectors.mealItem).value = "";
			document.querySelector(UISelectors.calorieInput).value = "";
		},
		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showCalories: function (totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		getSelectors: function () {
			return UISelectors;
		},

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

			/// Add item to UI list
			UICtrl.addListItem(newItem);

			// Total Calories
			const totalCalories = ItemCtrl.totalCalories();

			// UI calories add
			UICtrl.showCalories(totalCalories);



			// Clear Input
			UICtrl.clearInput();


		}
		e.preventDefault();
	}

	return {
		init: function () {

			console.log(ItemCtrl.logData());
			const items = ItemCtrl.getItems()

			// Check 
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				UICtrl.populateItems(items);
			}


			loadEvents();
		}
	}
})(ItemCtrl, UICtrl);

App.init();