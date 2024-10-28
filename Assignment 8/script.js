const api_key = '358d34f629d54abbbc7fe60533c8ff70';  

const search_Button = document.getElementById('search_Button');
const random_Button = document.getElementById('random_Button'); 
const search_Input = document.getElementById('search_Input');
const recipe_Container = document.getElementById('recipe_Container');

// Fetch recipes based on user query
async function fetch_Recipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${api_key}&number=6`;  

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            render_Recipes(data.results);
        } else {
            recipe_Container.innerHTML = '<p>No recipes found. Please try another search.</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipe_Container.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

// Fetch a random recipe
async function fetch_Random_Recipe() {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=6`; 

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.recipes && data.recipes.length > 0) {
            render_Recipes(data.recipes);
        } else {
            recipe_Container.innerHTML = '<p>No random recipes found. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        recipe_Container.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

// Render recipe cards
function render_Recipes(recipes) {
    recipe_Container.innerHTML = '';  
    recipes.forEach(recipe => {
        const recipe_Card = document.createElement('div');
        recipe_Card.classList.add('recipe_card');
        
        
        const formatted_Title = recipe.title.replace(/ /g, '-').toLowerCase(); 

        recipe_Card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3> <!-- Display title without underscores -->
            <a href="https://spoonacular.com/recipes/${formatted_Title}-${recipe.id}" target="_blank">View Recipe</a>
        `;  
        
        recipe_Container.appendChild(recipe_Card);
    });
}

// Event listener for the search button
search_Button.addEventListener('click', () => {
    const query = search_Input.value.trim();
    if (query) {
        fetch_Recipes(query);
    }
});

// Event listener for the random button
random_Button.addEventListener('click', () => {
    fetch_Random_Recipe(); 
});
