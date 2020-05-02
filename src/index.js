const calculatePromotion = products => {
	let category = new Set();

	products.map(product => {
		return category.add(product.category);
	});

	let promotions = new Map();
	promotions.set('SINGLE LOOK', 1);
	promotions.set('DOUBLE LOOK', 2);
	promotions.set('TRIPLE LOOK', 3);
	promotions.set('FULL LOOK', 4);

	for (let [key, size] of promotions) {
		if (size === category.size) {
			return key;
		}
	}
};

const calculateTotalPrice = (itemData, promotion) => {

	return itemData.reduce((total, item) => {
		const promotions = item.promotions;
		
		for (let obj of promotions) {
			if (obj.looks.includes(promotion)) {
				const discountPrice = parseFloat(obj.price);
				return total + discountPrice;
			}
		};
		
		for (let obj of promotions) {
			if (!obj.looks.includes(promotion)) {
				const regularPrice = parseFloat(item.regularPrice);
				return total + regularPrice;
			}
		};

	}, 0).toFixed(2);
};

function getShoppingCart(ids, productsList) {

	const selectedItems = productsList.filter(product => {
		const isSelected = ids.some(value => value === product.id);

		if (isSelected) {
			return product;
		};
	});

	const products = selectedItems.map(item => {
		return {
			name: item.name,
			category: item.category
		};
	});

	const promotion = calculatePromotion(products);

	const itemData = selectedItems.map(selectedItem => {
		return {
			regularPrice: selectedItem.regularPrice,
			promotions: selectedItem.promotions
		}
	});

	const totalValue = (itemData.reduce((total, item) => {
		return total + parseFloat(item.regularPrice);
	}, 0));

	const totalPrice = calculateTotalPrice(itemData, promotion);

	const discountValue = (totalValue - totalPrice).toFixed(2).toString();

	const discount = `${((parseFloat(discountValue) / totalValue) * 100).toFixed(2)}%`;

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	};
};

module.exports = { getShoppingCart };
