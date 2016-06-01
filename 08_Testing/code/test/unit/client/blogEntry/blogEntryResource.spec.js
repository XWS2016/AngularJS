describe('Factory: BlogEntry', function() {
    var resource, httpBackend;
    var should = chai.should();
    
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
    ];
    
    beforeEach(module('blogEntry.resource'));
    
    beforeEach(inject(function(BlogEntry, $httpBackend) {
        resource = BlogEntry;
        httpBackend = $httpBackend;
    }));
    
    it('should have the expected interface.', function() {
        resource.update.should.be.a('function');
    });
    
    describe('class function', function() {
        describe('query', function() {
            it('should query the list endpoint.', function() {
                httpBackend.expectGET('/api/blogEntries')
                    .respond(200, _blogEntries);
                resource.query();
                httpBackend.verifyNoOutstandingExpectation();
            });
            
            it('should succeed.', function() {
                httpBackend.expectGET('/api/blogEntries')
                    .respond(200, _blogEntries);
                var response = resource.query();
                
                response.length.should.be.equal(0);
                httpBackend.flush();
                response.length.should.be.equal(3);
                response[0].should.be.eql(new resource(_blogEntries[0]));
                response[1].should.be.eql(new resource(_blogEntries[1]));
                response[2].should.be.eql(new resource(_blogEntries[2]));
                httpBackend.verifyNoOutstandingRequest();
            });
            
            it('should fail.', function() {
                httpBackend.expectGET('/api/blogEntries')
                    .respond(400, _blogEntries);
                var response = resource.query();
                
                response.length.should.be.equal(0);
                httpBackend.flush();
                response.length.should.be.equal(0);
                httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
    
    describe('instance function', function() {
        var _blogEntry;
        beforeEach(function() {
            _blogEntry = new resource(_blogEntries[0]);
        });
        
        describe('get', function() {
            it('should query the details endpoint.', function() {
                httpBackend.expectGET('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(200, _blogEntries[0]);
                _blogEntry.$get();
                httpBackend.verifyNoOutstandingExpectation();
            });
            
            it('should succeed.', function() {
                delete _blogEntry.entry;
                httpBackend.expectGET('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(200, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$get();
                
                should.not.exist(_blogEntry.entry);
                httpBackend.flush();
                _blogEntry.entry.should.equal(_blogEntries[0].entry);
                
                httpBackend.verifyNoOutstandingRequest();
            });
            
            it('should fail.', function() {
                delete _blogEntry.entry;
                httpBackend.expectGET('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(400, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$get();
                
                should.not.exist(_blogEntry.entry);
                httpBackend.flush();
                should.not.exist(_blogEntry.entry);
                
                httpBackend.verifyNoOutstandingRequest();
            });
        });
        
        describe('save', function() {
            beforeEach(function() {
                delete _blogEntry._id;
            });
            
            it('should query the creation endpoint.', function() {
                httpBackend.expectPOST('/api/blogEntries')
                    .respond(200, _blogEntries[0]);
                _blogEntry.$save();
                httpBackend.verifyNoOutstandingExpectation();
            });
            
            it('should succeed.', function() {
                httpBackend.expectPOST('/api/blogEntries')
                    .respond(200, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$save();
                
                httpBackend.flush();
                _blogEntry._id.should.equal(_blogEntries[0]._id);
                
                httpBackend.verifyNoOutstandingRequest();
            });
            
            it('should fail.', function() {
                httpBackend.expectPOST('/api/blogEntries')
                    .respond(400, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$save();
                
                httpBackend.flush();
                should.not.exist(_blogEntry._id);
                
                httpBackend.verifyNoOutstandingRequest();
            });
        });
        
        describe('delete', function() {
            it('should query the delete endpoint.', function() {
                httpBackend.expectDELETE('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(200);
                _blogEntry.$delete();
                httpBackend.verifyNoOutstandingExpectation();
            });
            
            it('should succeed.', function() {
                httpBackend.expectDELETE('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(200);
                var fetchedEntry = _blogEntry.$delete();
                
                httpBackend.flush();
                _blogEntry.should.have.property('_id').that.is.equal(_blogEntries[0]._id);
                _blogEntry.should.have.property('title').that.is.equal(_blogEntries[0].title);
                _blogEntry.should.have.property('entry').that.is.equal(_blogEntries[0].entry);
                _blogEntry.should.have.property('comments').that.is.equal(_blogEntries[0].comments);
                _blogEntry.should.have.property('createdAt').that.is.equal(_blogEntries[0].createdAt);
                _blogEntry.should.have.property('updatedAt').that.is.equal(_blogEntries[0].updatedAt);
                httpBackend.verifyNoOutstandingRequest();
            });
            
            it('should fail.', function() {
                httpBackend.expectDELETE('/api/blogEntries/574df813e7dd96b12064209f')
                    .respond(400);
                var fetchedEntry = _blogEntry.$delete();
                
                httpBackend.flush();
                _blogEntry.should.have.property('_id').that.is.equal(_blogEntries[0]._id);
                _blogEntry.should.have.property('title').that.is.equal(_blogEntries[0].title);
                _blogEntry.should.have.property('entry').that.is.equal(_blogEntries[0].entry);
                _blogEntry.should.have.property('comments').that.is.equal(_blogEntries[0].comments);
                _blogEntry.should.have.property('createdAt').that.is.equal(_blogEntries[0].createdAt);
                _blogEntry.should.have.property('updatedAt').that.is.equal(_blogEntries[0].updatedAt);
                
                httpBackend.verifyNoOutstandingRequest();
            });
        });
        
        describe('update', function() {
            beforeEach(function() {
                delete _blogEntry.entry;
            });
            
            it('should query the creation endpoint.', function() {
                httpBackend.expectPUT('/api/blogEntries/574df813e7dd96b12064209f', {
                    createdAt: '2010-05-31T20:46:11.339Z',
                    updatedAt: '2010-05-31T20:46:11.339Z',
                    title: 'Entry 1',
                    _id: '574df813e7dd96b12064209f',
                    comments: []
                }).respond(200, _blogEntries[0]);
                _blogEntry.$update();
                httpBackend.verifyNoOutstandingExpectation();
            });
            
            it('should succeed.', function() {
                httpBackend.expectPUT('/api/blogEntries/574df813e7dd96b12064209f', {
                    createdAt: '2010-05-31T20:46:11.339Z',
                    updatedAt: '2010-05-31T20:46:11.339Z',
                    title: 'Entry 1',
                    _id: '574df813e7dd96b12064209f',
                    comments: []
                }).respond(200, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$update();
                
                httpBackend.flush();
                _blogEntry.entry.should.equal(_blogEntries[0].entry);
                
                httpBackend.verifyNoOutstandingRequest();
            });
            
            it('should fail.', function() {
                httpBackend.expectPUT('/api/blogEntries/574df813e7dd96b12064209f', {
                    createdAt: '2010-05-31T20:46:11.339Z',
                    updatedAt: '2010-05-31T20:46:11.339Z',
                    title: 'Entry 1',
                    _id: '574df813e7dd96b12064209f',
                    comments: []
                }).respond(400, _blogEntries[0]);
                var fetchedEntry = _blogEntry.$update();
                
                httpBackend.flush();
                should.not.exist(_blogEntry.entry);
                
                httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
});