describe('Controller: blogEntriesCtrl', function () {
    var scope, ctrl;
    var should = chai.should();
    var sandbox = sinon.sandbox.create();
    
    // Response mocks
    var _blogEntries = [
        {
            createdAt: '2010-05-31T20:46:11.339Z',
            updatedAt: '2010-05-31T20:46:11.339Z',
            title: 'Entry 1',
            entry: 'Lorem ipsum dolor sit amet.',
            _id: '574df813e7dd96b12064209f',
            comments: []
        }, {
            createdAt: '2011-05-31T20:46:11.339Z',
            updatedAt: '2011-05-31T20:46:11.339Z',
            title: 'Entry 2',
            entry: 'Lorem ipsum dolor sit amet.',
            _id: '574df968e7dd96b1206420a0',
            comments: []
        }, {
            createdAt: '2016-05-31T20:46:11.339Z',
            updatedAt: '2016-05-31T20:46:11.339Z',
            title: 'Entry 3',
            entry: 'Lorem ipsum dolor sit amet.',
            _id: '574df96fe7dd96b1206420a3',
            comments: []
        }
    ]

    // Mock BlogEntry resource
    var blogResourceMock = function() {
        return {
            $save: sandbox.stub(),
            $update: sandbox.stub(),
            $delete: sandbox.stub()
        }
    }
    var blogResourceQueryReturn;
    var blogResourceQueryRespond = function(response) {
        blogResourceQueryReturn.length = 0;
        blogResourceQueryReturn.push.apply(blogResourceQueryReturn, response);
    }
    blogResourceMock.query = sandbox.stub();
    

    // Mock $location service
    var locationMock = {
        path: sandbox.stub()
    }

    // Register mocks and override originals
    beforeEach(module(
        'blogEntry',
        function($provide) {
            $provide.value('BlogEntry', blogResourceMock);
            // $provide.value('$location', locationMock);
        }
    ));

    beforeEach(inject(function($rootScope, $controller) {
        // Create a new scope
        scope = $rootScope.$new();
        // Clear return values
        blogResourceQueryReturn = [];
        blogResourceMock.query.returns(blogResourceQueryReturn);
        // Instantiate a controller
        ctrl = $controller('blogEntriesCtrl', {
            $scope: scope,
            $location: locationMock
        });
    }));
    
    afterEach(function() {
        sandbox.reset();
    });

    describe('on instantiation', function() {
        it('should have the expected fields.', function() {
            scope.save.should.be.a('function');
            scope.delete.should.be.a('function');
            scope.edit.should.be.a('function');
            scope.details.should.be.a('function');
        });

        it('should load the necessary data.', function() {
            blogResourceMock.query.should.have.been.called;
            
            should.exist(scope.blogEntries);
            scope.blogEntries.should.eql([]);
            blogResourceQueryRespond(angular.copy(_blogEntries));
            scope.blogEntries.should.eql(_blogEntries);
            
            should.exist(scope.blogEntry);
            scope.blogEntry.$save.should.be.a('function');
            scope.blogEntry.$delete.should.be.a('function');
            scope.blogEntry.$update.should.be.a('function');
        });
    });
    
    describe('save', function() {
        it('should attempt to create a new resource when there is no id.', function() {
            should.not.exist(scope.blogEntry._id)
            scope.blogEntry.$save.should.not.have.been.called;
            scope.blogEntry.$update.should.not.have.been.called;
            
            scope.save();
            
            scope.blogEntry.$save.should.have.been.calledWith(sinon.match.func);
            scope.blogEntry.$update.should.not.have.been.called;
        });
        
        it('should reload entries on a successful save.', function() {
            scope.blogEntry.$save.yields(0);
            should.not.exist(scope.blogEntry._id)
            blogResourceMock.query.should.have.been.calledOnce;
            
            var savedEntry = scope.blogEntry;
            scope.save();
            
            blogResourceMock.query.should.have.been.calledTwice;
            savedEntry.should.not.equal(scope.blogEntry);
        });
        
        it('should attempt to update a resource when there is an id.', function() {
            scope.blogEntry._id = '574df813e7dd96b12064209f';
            scope.blogEntry.$save.should.not.have.been.called;
            scope.blogEntry.$update.should.not.have.been.called;
            
            scope.save();
            
            scope.blogEntry.$save.should.not.have.been.called;
            scope.blogEntry.$update.should.have.been.calledWith(sinon.match.func);
        });
        
        it('should reload entries on a successful update.', function() {
            scope.blogEntry.$update.yields(0);
            scope.blogEntry._id = '574df813e7dd96b12064209f';
            blogResourceMock.query.should.have.been.calledOnce;
            
            var savedEntry = scope.blogEntry;
            scope.save();
            
            blogResourceMock.query.should.have.been.calledTwice;
            savedEntry.should.not.equal(scope.blogEntry);
        });
    });
    
    describe('delete', function() {
        it('should attempt to delete the resource.', function() {
            blogResourceMock.query.should.have.been.calledOnce;
            var entryBeforeDelete = scope.blogEntry;
            var deletingBlog = new blogResourceMock();
            deletingBlog.$delete.should.not.have.been.called;
            
            scope.delete(deletingBlog);
            
            deletingBlog.$delete.should.have.been.calledOnce;
            // Call first argument the first call of $delete stub
            deletingBlog.$delete.args[0][0]();
            blogResourceMock.query.should.have.been.calledTwice;
            entryBeforeDelete.should.not.equal(scope.blogEntry);
        });
    });
    
    describe('edit', function() {
        it('should set an entry as active.', function() {
            var editingEntry = new blogResourceMock();
            scope.blogEntry.should.not.be.equal(editingEntry);
            scope.edit(editingEntry);
            scope.blogEntry.should.be.equal(editingEntry);
        });
    });
    
    describe('details', function() {
        it('should navigate to an entrie\'s details view.', function() {
            locationMock.path.should.not.have.been.called;
            scope.details(_blogEntries[0]);
            locationMock.path.should.have.been.calledWith('/blogEntries/574df813e7dd96b12064209f');
        });
    });
});

describe('Controller: blogEntryCtrl', function() {
    var scope, ctrl;
    var sandbox = sinon.sandbox.create();
    // Response mocks
    var _blogEntry = {
        createdAt: '2010-05-31T20:46:11.339Z',
        updatedAt: '2010-05-31T20:46:11.339Z',
        title: 'Entry 1',
        entry: 'Lorem ipsum dolor sit amet.',
        _id: '574df813e7dd96b12064209f',
        comments: []
    }
    
    // Mock BlogEntry resource
    var blogResourceMock = function() {}
    blogResourceMock.get = sandbox.stub();
    blogResourceMock.get.returns(angular.copy(_blogEntry));

    // Register mocks and override originals
    beforeEach(module(
        'blogEntry',
        function($provide) {
            $provide.value('BlogEntry', blogResourceMock);
        }
    ));

    beforeEach(inject(function($rootScope, $controller) {
        // Create a new scope
        scope = $rootScope.$new();
        // Instantiate a controller
        ctrl = $controller('blogEntryCtrl', {
            $scope: scope,
            $stateParams: {
                id: '574df813e7dd96b12064209f'
            }
        });
    }));
    
    afterEach(function() {
        sandbox.reset();
    });
    
    describe('on instantiation', function() {
        it('should load the requested entry.', function() {
            blogResourceMock.get.should.have.been.calledWith({
                _id: '574df813e7dd96b12064209f'
            });
            scope.blogEntry.should.be.eql(_blogEntry);
        });
    });
});
