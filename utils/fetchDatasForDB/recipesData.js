
async function fetchRecipes() {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

module.exports = fetchRecipes;