const mongoose = require('mongoose');
const slugify = require('slugify');

const foodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Food must have a name'],
		unique: true,
		trim: true,
		maxlength: [40, 'Food name must be less than or equal to 40'],
		minlength: [2, 'Food name must be greater than or equal to 2']
	},
	price: {
		type: Number,
		required: [true, 'Food must have price'],
	},
	summary: {
		type: String,
		trim: true,
		maxlength: [200, 'Summary must not exceed 200 characters']
	},
	images: [{
		type: String,
		unique: true,
		required: [true, 'Pictures of food must be provided']
	}],
	ratingsAverage: {
		type: Number,
		default: 4
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	canteen: {
		type: mongoose.Schema.ObjectId,
		ref: 'Canteen',
		required: [true, 'Food item must belong to a canteen']
	},
	slug: String
},
{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});



// INDICES
foodSchema.index({slug: 1});


/****************************** MIDDLEWARES ******************************/
foodSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});

foodSchema.pre('save', function(next){
	this.slug = slugify(this.name, {lower: true});
	next();
});


const FoodModel = mongoose.model('Food', foodSchema);
module.exports = FoodModel;