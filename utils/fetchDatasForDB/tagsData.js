export async function fetchAllTags() {
    try {
        const res = await fetch('https://dummyjson.com/recipes/tags')
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error("There has been a problem with your fetch operation: " + error);

    }
}

fetchAllTags()