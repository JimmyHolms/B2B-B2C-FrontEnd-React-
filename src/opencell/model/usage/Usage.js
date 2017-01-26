export default class Usage {
	constructor(cat) {
		cat = cat || {}
		this.code = cat.code;
		this.description = cat.description;
		this.listSubCatUsage = cat.subCatUsage;
	}
}