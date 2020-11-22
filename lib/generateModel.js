// Generates a model file from the knowledge graph
const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const KNOWLEDGE_PATH = "../knowledge.txt"
const MODEL_PATH = "../testmode.txt"

const { createGraph } = require("./knowledge")

const knowledgeGraph = createGraph()

;(async function(){

	try{
		// Load the knowledge file into the graph
		await load(knowledgeGraph, KNOWLEDGE_PATH)

		// Generate the model file
		const defaultBookmaker = "betking"

		let modelContent = ""

		knowledgeGraph.getCategoryIds().forEach(catId => {
			const category = knowledgeGraph.getCategory(catId)
			const variations = Object.values(category.variations)
			const defaultValue = knowledgeGraph.getProviderValue(catId, defaultBookmaker)

			modelContent += (variations.map(v => `${v},${defaultValue}`).join("\n") + "\n")
		})

		await writeFile(MODEL_PATH, modelContent)
	} catch(err){
		console.log(err)
	}
})()


async function load(graph, FILE_PATH){
	
	const fileContents = await readFile(FILE_PATH, "utf-8")

	const lines = fileContents.split("\n")

	let newCategory = false, categoryId = null

	lines.forEach(line => {

		if(line.indexOf("[") > -1){
			newCategory = true
			return
		}

		if(line.indexOf(",") > -1){
	
			const [ variation, provider ] = line.split(",")
			if(newCategory){
				categoryId = graph.newCategory(variation, provider)
				newCategory = false
			}

			else
				graph.addToCategory(categoryId, variation, provider)
			

		}


	})

}
