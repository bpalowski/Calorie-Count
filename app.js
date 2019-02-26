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
		getItemById: function (id) {
			let found = null;
			state.items.forEach(function (item) {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updatedItem: function (name, calories) {
			//
			calories = parseInt(calories);

			let found = null;
			state.items.forEach(function (item) {
				if (item.id == state.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function (id) {
			// Get Id
			const ids = state.items.map(function (item) {
				return item.id;
			});

			// Get index
			const index = ids.indexOf(id);

			// remove item
			state.items.splice(index, 1);
		},
		clearAllItems: function () {
			state.items = [];
		},
		setSelectedItem: function (item) {
			state.currentItem = item;
		},

		getCurrentItem: function () {
			return state.currentItem;
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
		listItems: '#item-list li',
		addBtn: ".add-btn",
		updateBtn: ".update-btn",
		deleteBtn: ".delete-btn",
		backBtn: ".back-btn",
		calorieInput: "#item-calories",
		mealItem: "#item-name",
		totalCalories: '.total-calories',
		clearBtn: '.clear-btn'
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

			// Add Markup html classList
			li.innerHTML = `
			<strong> ${item.name}:</strong><em> ${item.calories}</em>
				<a href="#" class="secondary-content">
				<i class="edit-item fa fa-pencil"></i>
				</a>
			`;
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},
		updateListItem: function (item) {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			listItems = Array.from(listItems);

			listItems.forEach(function (listItem) {
				const itemId = listItem.getAttribute('id');

				if (itemId === `item-${item.id}`) {
					document.querySelector(`#${itemId}`).innerHTML = `	<strong> ${item.name}:</strong><em> ${item.calories}</em>
					<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
					</a>
				`;
				}
			})

		},
		deleteListItem: function (id) {
			const itemId = `#item-${id}`;
			const item = document.querySelector(itemId);
			item.remove();
		},

		clearInput: function () {
			document.querySelector(UISelectors.mealItem).value = "";
			document.querySelector(UISelectors.calorieInput).value = "";
		},
		updateItemToForm: function () {
			document.querySelector(UISelectors.mealItem).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.calorieInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		removeItems: function () {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn NodeList into array
			listItems = Array.from(listItems);

			listItems.forEach(function (item) {
				item.remove();
			})
		},
		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showCalories: function (totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		showEditState: function () {


			document.querySelector(UISelectors.updateBtn).style.display = 'inline';

			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';

		},
		clearEditState: function () {
			UICtrl.clearInput();

			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';

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

		// ENTER BUTTON	remove
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});

		// Edit icon 
		document.querySelector(UserSelectors.itemList).addEventListener('click', itemEdit);

		// Update
		document.querySelector(UserSelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// Delete
		document.querySelector(UserSelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
		// Clear
		document.querySelector(UserSelectors.clearBtn).addEventListener('click', clearAll);

		// Back
		document.querySelector(UserSelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
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
	// Update/Edit /Submit
	const itemEdit = function (e) {
		if (e.target.classList.contains('edit-item')) {
			// get list item id
			const listId = e.target.parentNode.parentNode.id;


			const listArr = listId.split('-');
			const id = parseInt(listArr[1]);

			// Get Items
			const selectedItem = ItemCtrl.getItemById(id);

			// Current Item
			ItemCtrl.setSelectedItem(selectedItem);

			UICtrl.updateItemToForm();

		}
		e.preventDefault();
	}

	const itemUpdateSubmit = function (e) {
		const input = UICtrl.getInput();

		const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

		UICtrl.updateListItem(updatedItem);

		// Total Calories
		const totalCalories = ItemCtrl.totalCalories();

		// UI calories add
		UICtrl.showCalories(totalCalories);

		UICtrl.clearEditState();

		e.preventDefault();
	}

	const itemDeleteSubmit = function (e) {
		// current item
		const currentItem = ItemCtrl.getCurrentItem();

		// delete 
		ItemCtrl.deleteItem(currentItem.id);

		UICtrl.deleteListItem(currentItem.id);
		// Total Calories
		const totalCalories = ItemCtrl.totalCalories();

		// UI calories add
		UICtrl.showCalories(totalCalories);

		UICtrl.clearEditState();

		e.preventDefault();
	}
	const clearAll = function (e) {

		ItemCtrl.clearAllItems();

		// Total Calories
		const totalCalories = ItemCtrl.totalCalories();

		// UI calories add
		UICtrl.showCalories(totalCalories);

		UICtrl.removeItems();

		// hide ul

		UICtrl.hideList();



		e.preventDefault();
	}

	return {
		init: function () {
			// Clear Edit 
			UICtrl.clearEditState();


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