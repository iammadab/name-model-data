const createGraph = () => {

	let lastId = -1

	const graph = {}

	const newCategory = (variation, provider) => {
	
		const categoryId = ++lastId

		graph[categoryId] = {
			id: categoryId,
			variations: {
				[provider]: variation
			}
		}

		return categoryId

	}

	const getCategory = categoryId => graph[categoryId]

	const getCategoryIds = () => Object.keys(graph)

	const addToCategory = (categoryId, variation, provider) => {

		graph[categoryId]["variations"][provider] = variation

	}

	const getProviderValue = 
		(categoryId, provider) =>
			graph[categoryId]["variations"][provider]

	return {

		newCategory,

		getCategory,

		getCategoryIds,

		addToCategory,

		getProviderValue

	}

}

module.exports = { createGraph }
