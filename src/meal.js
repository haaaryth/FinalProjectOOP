const meals = ['Fish pie', 'Kedgeree', 'Eton Mess'];
	const mealContainer = document.querySelector('.meal-container');

	meals.forEach(mealName => {
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
		.then(response => response.json())
		.then(data => {
		const mealData = data.meals[0];
		const mealElement = document.createElement('div');
		mealElement.classList.add('meal');
		mealElement.innerHTML = `
			<h3 class="meal-name">${mealData.strMeal}</h3>
			<h4 class="meal-category">${mealData.strCategory}</h4>
			<img class="meal-image" src="${mealData.strMealThumb}" alt="${mealData.strMeal}" ul class="meal-ingredients">
			<ul class="meal-ingredients">
			${getIngredientsList(mealData)}
			<h3>Instructions</h3>
			<h5 class="meal-instructions">${mealData.strInstructions}</h5>
			</ul>
		`;
		mealContainer.appendChild(mealElement);
		})
		.catch(error => console.log(error));
	});

	function getIngredientsList(mealData) {
	let ingredientsListHTML = '';
	for (let i = 1; i <= 20; i++) {
		const ingredient = mealData[`strIngredient${i}`];
		const measure = mealData[`strMeasure${i}`];
		if (ingredient && measure) {
		ingredientsListHTML += `<li>${ingredient} - ${measure}</li>`;
		}
	}
	return ingredientsListHTML;
	}