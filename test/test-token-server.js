'use strict';

var assert = require('assert');
var request = require('superagent');
var child = require('child_process');
var config = require('./../config');

describe('/api/tokens', function(){
    var mongoProcess = null;
    var server = require('./../server');
    var testToken = {};

    before(function() {
        if (config.db.env === 'local') {
            mongoProcess = child.spawn('mongod');
        }
        server.listen(8000);
    });

    after(function() {
        server.close();
        if (config.db.env === 'local' && mongoProcess) {
            mongoProcess.kill('SIGTERM');
        }

    });

    it('should throw error "MethodNotAllowed" on GET /api/tokens', function(done) {
        request.get('http://localhost:8000/api/tokens').end(function(err, res){
            assert.equal(res.status, 405);
            var result = JSON.parse(res.text);
            assert.equal(result.code, 'MethodNotAllowedError');
            done();
        });
    });

    it("should create a token for a new client", function (done) {
        request.post('http://localhost:8000/api/clients')
            .set('Content-Type', 'application/json')
            .send({name: "testClient"})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.name, "testClient");
                assert.notEqual(res.body.clientId, null);
                done();
            });
    });

    it("should create a token for an existing client", function (done) {
        request.post('http://localhost:8000/api/tokens')
            .set('Content-Type', 'application/json')
            .send({study: "testStudy", resource: "testResource", 'clientId': 'testClient'})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                testToken = res.body;
                assert.equal(res.body.study, "testStudy");
                assert.equal(res.body.resource, "testResource");
                assert.equal(res.body.clientId, 'testClient');
                assert.notEqual(res.body.clientSecret, null);
                done();
            });
    });

    it("should retrieve the tokens for an existing client", function (done) {
        request.get('http://localhost:8000/api/tokens/testStudy/testResource')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(true, res.body.length > 0);
                done();
            });
    });


    it("should not retrieve the tokens for an invalid resource", function (done) {
        request.get('http://localhost:8000/api/tokens/testStudyWrong/testResourceWrong')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                assert.equal(res.status, 404);
                done();
            });
    });

    it("should delete all matching tokens", function(done){
        request.del('http://localhost:8000/api/tokens/testStudy/testResource')
            .end(function (err, res) {
                assert.equal(res.status, 204);
                //verify that get returns 404
                request.get('http://localhost:8000/api/tokens/testStudy/testResource')
                    .set('Content-Type', 'application/json')
                    .end(function (err, res) {
                        assert.equal(res.status, 404);
                        assert.equal(false, res.body.length > 0);
                        done();
                    });
            });
    });

});

