var expect = require("chai").expect,
	to = require("../index");


describe('String converter', function() {
	describe('name to string conversion', function() {
		it('takes a standard name and trims it', function() {
			var name = to.string(' Daniel Logue ');
			expect(name).to.equal('Daniel Logue');
		});
		it('takes a standard name and doesn\'t trim it', function() {
			to({
				trimStrings: false
			});
			var name = to.string(' Daniel Logue ');
			expect(name).to.equal(' Daniel Logue ');
			to({
				trimStrings: true
			});
		});
	});
	describe('function to string conversion', function() {
		it('takes a function and safely turns it into a string', function() {
			var str = to.string(function() {
				alert('booyah');
			});
			expect(str).to.equal('function');
		});
	});
	describe('object to string conversion', function() {
		it('takes an object and safely turns it into a string', function() {
			var str = to.string({
				something: 'nefarious'
			});
			expect(str).to.equal('object');
		});
	});
	describe('integer to string conversion', function() {
		it('takes an integer and turns it into a string', function() {
			var str = to.string(123);
			expect(str).to.equal('123');
		});
	});
	describe('decimal to string conversion', function() {
		it('takes an decimal and turns it into a string', function() {
			var str = to.string(123.1235);
			expect(str).to.equal('123.1235');
		});
	});
	describe('boolean to string conversion', function() {
		it('takes true and turns it into "true"', function() {
			var str = to.string(true);
			expect(str).to.equal('true');
		});
		it('takes false and turns it into "false"', function() {
			var str = to.string(false);
			expect(str).to.equal('false');
		});
	});
});

describe('Integer converter', function() {
	describe('string to integer conversion', function() {
		it('takes a string and turns it into an integer', function() {
			var out = to.integer('55');
			expect(out).to.equal(55);
		});
		it('takes a string (with formatting) and turns it into an integer', function() {
			var out = to.integer('5,500');
			expect(out).to.equal(5500);
		});
		it('takes a string (with too much formatting) and turns it into an integer', function() {
			var out = to.integer('55,500,500');
			expect(out).to.equal(55500500);
		});
		it('takes a string (with currency formatting) and turns it into an integer', function() {
			var out = to.integer('$5,500.00');
			expect(out).to.equal(5500);
		});
		it('takes a non-numeric string and returns zero', function() {
			var out = to.integer('godzilla');
			expect(out).to.equal(0);
		});
		it('takes a partially non-numeric string and returns the number', function() {
			var out = to.integer('godzi11a');
			expect(out).to.equal(11);
		});
	});
});

describe('Decimal converter', function() {
	describe('string to decimal conversion', function() {
		it('takes a string and turns it into an decimal', function() {
			var out = to.decimal('55.1324');
			expect(out).to.equal(55.1324);
		});
		it('takes a string (with formatting) and turns it into an decimal', function() {
			var out = to.decimal('5,500.55');
			expect(out).to.equal(5500.55);
		});
		it('takes a string (with too much formatting) and turns it into an decimal', function() {
			var out = to.decimal('55,500,500.55');
			expect(out).to.equal(55500500.55);
		});
		it('takes a string (with currency formatting) and turns it into an decimal', function() {
			var out = to.decimal('$5,500.55');
			expect(out).to.equal(5500.55);
		});
		it('takes a non-numeric string and returns zero', function() {
			var out = to.integer('godzilla');
			expect(out).to.equal(0.00);
		});
	});
});


describe('Date converter', function() {
	describe('String to date conversion', function() {
		it('Converts MM/DD/YYYY to a date object', function() {
			var out = to.date('06/23/2015');
			expect(out.toString()).to.equal(new Date('06/23/2015').toString());
		});
		it('Converts YYYY-MM-DD to a date object', function() {
			var out = to.date('2015-06-23');
			expect(out.toString()).to.equal(new Date('2015-06-23').toString());
		});
	});
	describe('Integer to date conversion', function() {
		it('Converts UTC timestamp to a date object', function() {
			var i = 1435090371078;
			var out = to.date(i);
			expect(out.toString()).to.equal(new Date(i).toString());
		});
	});
});

describe('Boolean converter', function() {
	describe('String to boolean conversion', function() {
		it('Converts "true" to true', function() {
			var out = to.boolean('true');
			expect(out).to.equal(true);
		});
		it('Converts "1" to true', function() {
			var out = to.boolean('1');
			expect(out).to.equal(true);
		});
		it('Converts "yes" to true', function() {
			var out = to.boolean('yes');
			expect(out).to.equal(true);
		});
		it('Converts "pizza" to true', function() {
			var out = to.boolean('pizza');
			expect(out).to.equal(true);
		});
		it('Converts "false" to false', function() {
			var out = to.boolean('false');
			expect(out).to.equal(false);
		});
		it('Converts "0" to false', function() {
			var out = to.boolean('0');
			expect(out).to.equal(false);
		});
		it('Converts "no" to false', function() {
			var out = to.boolean('no');
			expect(out).to.equal(false);
		});
		it('Converts "" to false', function() {
			var out = to.boolean('');
			expect(out).to.equal(false);
		});
	});
	describe('Object to boolean conversion', function() {
		it('Converts {anything:"here"} to true', function() {
			var out = to.boolean({anything:"here"});
			expect(out).to.equal(true);
		});
		it('Converts [1] to true', function() {
			var out = to.boolean([1]);
			expect(out).to.equal(true);
		});
		it('Converts {} to false', function() {
			var out = to.boolean({});
			expect(out).to.equal(false);
		});
		it('Converts [] to false', function() {
			var out = to.boolean([]);
			expect(out).to.equal(false);
		});
	});
});