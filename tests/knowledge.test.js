const assert = require("assert").strict
const knowledge = require("../lib/knowledge")

describe("Knowledge Graph", () => {

	// What feature do you want?
	// Write a test that proves the feature doesn't exist
	// Implement the feature to make the test pass
	
	let knowledgeGraph

	beforeEach(() => {
	
		knowledgeGraph = knowledge.createGraph()

	})

	it("should allow you to create a new category", () => {

		// When you create a new category, it returns the category id
		assert.strictEqual(
			knowledgeGraph.newCategory("manchester united", "bet9ja"),
			0
		)

		assert.strictEqual(
			knowledgeGraph.newCategory("south korea", "bet9ja"),
			1
		)

	})

	it("should allow you to get the contents of a category", () => {
	
		const id = knowledgeGraph.newCategory("manchester united", "bet9ja")
		
		const category = knowledgeGraph.getCategory(id)
		assert.deepEqual(
			category,
			{
				id: id,
				variations: {
					"bet9ja": "manchester united"
				}
			}
		)

	})

	it("should allow you to add to an existing category", () => {
	
		const id = knowledgeGraph.newCategory("manchester united", "bet9ja")
		knowledgeGraph.addToCategory(id, "man u", "betking")
		
		const category = knowledgeGraph.getCategory(id)
		assert.deepEqual(
			category,
			{
				id,
				variations: {
					"bet9ja": "manchester united",
					"betking": "man u"
				}
			}
		)

	})

	it("should allow you to get all category ids", () => {
	
		knowledgeGraph.newCategory("a", "b")
		knowledgeGraph.newCategory("b", "c")
		
		const ids = knowledgeGraph.getCategoryIds()

		assert.strictEqual(ids.length, 2)

	})

	it("should allow you to get the provider value for a category", () => {
	
		const id = knowledgeGraph.newCategory("manchester united", "bet9ja")
		knowledgeGraph.addToCategory(id, "man u", "betking")

		assert.strictEqual(
			knowledgeGraph.getProviderValue(id, "bet9ja"),
			"manchester united"
		)

		assert.strictEqual(
			knowledgeGraph.getProviderValue(id, "betking"),
			"man u" 
		)

		assert.strictEqual(
			knowledgeGraph.getProviderValue(id, "nairabet"),
			undefined
		)

	})


})
