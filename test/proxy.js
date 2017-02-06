const fs = require('fs');
const should = require('should');
const ServerMock = require("mock-http-server");
const server = new ServerMock({ host: "localhost", port: 9000 });

const getPACProxy = require('../lib/get');
const lookupProxy = require('../lib/lookup');
const parseProxy = require('../lib/parse');

describe('test get of procy pac file', () => {

  before((done) => {
    server.start(done);
  });

  after((done) => {
    server.stop(done);
  });

  it('should download the pac file', (done) => {
    server.on({
      method: 'GET',
      path: '/proxy.pac',
      reply: {
        status:  200,
        headers: { "content-type": "application/text" },
        body:    fs.readFileSync('./test/fixtures/proxy.pac')
      }
    });

    getPACProxy('http://localhost:9000/proxy.pac', (err, raw) => {
      should.not.exist(err);
      raw.should.be.a.String;
      done();
    });
  });

  it('should download the pac file', (done) => {
    server.on({
      method: 'GET',
      path: '/invalid.url',
      reply: {
        status:  404
      }
    });

    getPACProxy('http://localhost:9000/invalid.url', (err, raw) => {
      should.exist(err);
      err.should.be.a.Error;
      done();
    });
  });
});


describe('lookup of proxy', () => {
  let rawPAC;

  before((done) => {
    fs.readFile('./test/fixtures/proxy.pac', 'utf-8', (err, data) => {
      if(err) {
        throw err;
      }

      rawPAC = data;
      done();
    });
  });

  it('should return the right proxy', (done) => {
    lookupProxy(rawPAC, 'http://atom.io', 'atom.io', (err, result) => {
      should.not.exist(err);
      result.should.be.a.String;
      result.should.eql('PROXY 4.5.6.7:8080; PROXY 7.8.9.10:8080');
      done();
    });
  });
});

describe('parse the proxy line', () => {
  it('should parse "proxy" line to an array', (done) => {
    let data = 'PROXY 4.5.6.7:8080; PROXY 7.8.9.10:8080'


    parseProxy(data, (err, result) => {
      should.not.exist(err);
      result.should.be.an.Array;
      result.should.have.length(2);

      let el1 = result[0];
      let el2 = result[1];

      el1.should.have.property('type', 'proxy');
      el1.should.have.property('host', '4.5.6.7');
      el1.should.have.property('port', '8080');
      el1.should.have.property('url', '4.5.6.7:8080');

      el2.should.have.property('type', 'proxy');
      el2.should.have.property('host', '7.8.9.10');
      el2.should.have.property('port', '8080');
      el2.should.have.property('url', '7.8.9.10:8080');

      done();
    });
  });

  it('should parse "direct" line to an array', (done) => {
    let data = 'DIRECT'

    parseProxy(data, (err, result) => {
      should.not.exist(err);
      result.should.be.an.Array;
      result.should.have.length(1);

      let el1 = result[0];

      el1.should.have.property('type', 'direct');
      el1.should.have.not.property('host');
      el1.should.have.not.property('port');
      el1.should.have.not.property('url');

      done();
    });
  });
})


describe('all together', () => {
  before((done) => {
    server.start(done);
  });

  after((done) => {
    server.stop(done);
  });

  it('should download, invoke and parse the PAC', (done) => {
    server.on({
      method: 'GET',
      path: '/proxy.pac',
      reply: {
        status:  200,
        headers: { "content-type": "application/text" },
        body:    fs.readFileSync('./test/fixtures/proxy.pac')
      }
    });

    getPACProxy('http://localhost:9000/proxy.pac', (err, rawPAC) => {
      lookupProxy(rawPAC, 'http://atom.io', 'atom.io', (err, data) => {
        parseProxy(data, (err, result) => {
          should.not.exist(err);
          result.should.be.an.Array;
          result.should.have.length(2);

          let el1 = result[0];
          let el2 = result[1];

          el1.should.have.property('type', 'proxy');
          el1.should.have.property('host', '4.5.6.7');
          el1.should.have.property('port', '8080');
          el1.should.have.property('url', '4.5.6.7:8080');

          el2.should.have.property('type', 'proxy');
          el2.should.have.property('host', '7.8.9.10');
          el2.should.have.property('port', '8080');
          el2.should.have.property('url', '7.8.9.10:8080');

          done();
        });
      });
    });
  })
});
