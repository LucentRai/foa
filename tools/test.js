const a = {
	a: 1,
	b: 2
},

b = {
	c: 3,
	d: 4
};

let c = {};
Object.assign(c, a, b);
console.log(c);