
var should = chai.should();

describe('Basic testing', function () {

    it('should verify that reality has not been broken.', function() {
        true.should.be.true;
    });

    describe('with a child block and test buildup', function () {
        var mock_string = null;
        beforeEach(function() {
            mock_string = 'Hello World'
        });

        it('should build a test case on prepared data.', function() {
            should.exist(mock_string);
            mock_string.should.equal('Hello World');
        });

        it('should be able to change a local variable.', function() {
            mock_string.should.equal('Hello World');
            mock_string = 'Hi World';
            mock_string.should.not.equal('Hello World');
            mock_string.should.equal('Hi World');
        });

        it('should have the "beforeEach" block run before every spec.', function() {
            mock_string.should.not.equal('Hi World');
            mock_string.should.equal('Hello World');
        });
    });

    describe('with a child block and test teardown.', function () {
        var mock_string;
        beforeEach(function() {
            mock_string = null
        });

        it('should execute some code after each spec.', function() {
            mock_string = 'Mock Text';
        });

        afterEach(function() {
            should.exist(mock_string);
        });
    });

});
