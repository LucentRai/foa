class APIFeatures{
	constructor(query, queryString){ // query is mongoose query, queryString is the route provided by express.js
		this.query = query;
		this.queryString = queryString;
	}

	filter(){
		const queryObj = {...this.queryString};	// copy object by value
		const excludeFields = ['page', 'sort', 'limit', 'fields'];
		excludeFields.forEach(el => delete queryObj[el]);

		let queryString = JSON.stringify(queryObj);
		queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, matchedString => `$${matchedString}`);	// adds $ sign in front of operator like 'gte' with '$gte'

		this.query.find(JSON.parse(queryString));

		return this; // Needs to return this object for function chaining
	}

	sort(){
		if(this.queryString.sort){
			const sortBy = this.queryString.sort.split(',').join(' ');	// for more than one sorting criteria
			this.query = this.query.sort(sortBy);
		}
		else{
			this.query = this.query.sort('createdAt');	// default sorting order
		}

		return this;
	}

	limitFields(){
		if(this.queryString.fields){
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);	// show only these fields
		}
		else{ // Default field limiting
			// __v is a field used by mongoose for internal working mechanism
			this.query = this.query.select('-__v');	// - sign indicates exclusion
		}
		return this;
	}

	paginate(){
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit); // skips and limits some results

		return this;
	}
}

module.exports = APIFeatures;