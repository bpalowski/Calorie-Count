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
		getItemes: function () {
			return state.items;
		},
		logState: function () {
			return state;
		}
	}
})();

// UI Controller
const UICtrl = (function () {

	const UISelectors = {
		itemList: '#item-list'
	}

	// Public Meth
	return {
		populateItemList: function (items) {
			let html = '';
			items.forEach(function (item) {
				html += `
				<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong><em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
			</li>
				`
			});
			// Insert LI
			document.querySelector(UISelectors.itemList).innerHTML = html;

		}
	}
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {


	// Public Meth
	return {
		init: function () {
			console.log("Loading ...");

			// Items from data structure
			const items = ItemCtrl.getItemes();

			// Populate list with items
			UICtrl.populateItemList(items);


		}
	}


})(ItemCtrl, UICtrl);

App.init();
