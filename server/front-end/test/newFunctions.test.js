const assert = require('assert');
const sinon = require('sinon');
const rewire = require("rewire");
const { takePhoto, resetImage, getPicture } = require('../src/functions.js');

describe('takePhoto', function() {
  it('should log "takePhoto" to the console', async function() {
    const fakeResponse = { ok: true };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }
  
    await takePhoto();
  
    assert.strictEqual(consoleLogOutput, 'takePhoto');
  
    console.log = consoleLog;
    fetchStub.restore();
  });

  it('should log the error message to the console for HTTP errors', async function() {
    let functions = rewire("../src/functions");
      let error = { message: "errore" };
      let fetchStub = sinon.stub().throws(error);
      functions.__set__({
        fetch: fetchStub
      });
  
      try {
        await functions.takePhoto();
      } catch (error) {
        assert.strictEqual(error.message, 'errore');
      }
      
  });

  it('should log the error message to the console for HTTP errors 500', async function() {

    let functions = rewire("../src/functions");
    const fakeResponse = { ok: false, status: 500 };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }

    // console.log(consoleLogOutput)

    functions.__set__({
      fetch: fetchStub
    });
  
    await functions.takePhoto();
    
    assert.strictEqual(consoleLogOutput.toString (), 'Error: Errore HTTP 500')
    // assert.ok(consoleLogOutput.toString().includes(' Error: Errore HTTP 500'));
  
    console.log = consoleLog;
    fetchStub.restore();
  });

  it('should log the error message to the console for HTTP errors 404', async function() {

    let functions = rewire("../src/functions");
    const fakeResponse = { ok: false, status: 404 };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }

    // console.log(consoleLogOutput)

    functions.__set__({
      fetch: fetchStub
    });
  
    await functions.takePhoto();
    
    assert.strictEqual(consoleLogOutput.toString (), 'Error: Errore HTTP 404')
    // assert.ok(consoleLogOutput.toString().includes(' Error: Errore HTTP 500'));
  
    console.log = consoleLog;
    fetchStub.restore();
  });
  
});

describe('resetImage', function() {
  it('should log "resetImage" to the console', async function() {
    const fakeResponse = { ok: true };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }
  
    await resetImage();
  
    assert.strictEqual(consoleLogOutput, 'resetImage');
  
    console.log = consoleLog;
    fetchStub.restore();
  });

  it('should log the error message to the console for HTTP errors', async function() {
    let functions = rewire("../src/functions");
      let error = { message: "errore" };
      let fetchStub = sinon.stub().throws(error);
      functions.__set__({
        fetch: fetchStub
      });
  
      try {
        await functions.resetImage();
      } catch (error) {
        assert.strictEqual(error.message, 'errore');
      }
  });

  it('should log the error message to the console for HTTP errors 500', async function() {

    let functions = rewire("../src/functions");
    const fakeResponse = { ok: false, status: 500 };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }

    // console.log(consoleLogOutput)

    functions.__set__({
      fetch: fetchStub
    });

    try {
      await functions.resetImage();
    } catch (error) {
      assert.strictEqual(consoleLogOutput.toString (), 'Error: Errore HTTP 500')
    }
  
    console.log = consoleLog;
    fetchStub.restore();
  });

  it('should log the error message to the console for HTTP errors 404', async function() {

    let functions = rewire("../src/functions");
    const fakeResponse = { ok: false, status: 404 };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    let consoleLogOutput = null;
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput = msg;
    }

    // console.log(consoleLogOutput)

    functions.__set__({
      fetch: fetchStub
    });
  
    try {
      await functions.resetImage();
    } catch (error) {
      assert.strictEqual(consoleLogOutput.toString (), 'Error: Errore HTTP 404')
    }
  
    console.log = consoleLog;
    fetchStub.restore();
  });
})

describe('getPicture', function() {
  it('should set the image using setImg', async function() {
    const fakeResponse = { ok: true, text: () => Promise.resolve('imageData') };
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    
    let setImageOutput = null;
    const setImg = function(img) {
      setImageOutput = img;
    }
  
    await getPicture(setImg);
  
    assert.strictEqual(setImageOutput, 'imageData');
  
    fetchStub.restore();
  });

  it('should log the error message to the console for fetch errors', async function() {
    let functions = rewire("../src/functions");
    let error = { message: "fetch error" };
    let fetchStub = sinon.stub().throws(error);
    functions.__set__({
      fetch: fetchStub
    });
  
    try {
      await functions.getPicture(() => {});
    } catch (error) {
      assert.strictEqual(error.message, 'fetch error');
    }
  });

  // it('should set the image using the response text', async function() {
  //   const fakeResponse = { 
  //     text: sinon.fake.resolves('fake-image-data') 
  //   };
  //   const fetchStub = sinon.stub(global, 'fetch').resolves(fakeResponse);
    
  //   const setImgStub = sinon.stub();
    
  //   await getPicture(setImgStub);
    
  //   assert(setImgStub.calledOnceWith('fake-image-data'));
    
  //   fetchStub.restore();
  // });

  it('should log the error message to the console for HTTP errors', async function() {
    let functions = rewire("../src/functions");
    const fakeResponse = { ok: false, status: 500};
    const fetchStub = sinon.stub(global, 'fetch').returns(Promise.resolve(fakeResponse));
    const consoleLogOutput = [];
    const consoleLog = console.log;
  
    console.log = function(msg) {
      consoleLogOutput.push(msg);
    }
  
    functions.__set__({
      fetch: fetchStub
    });
  
    await functions.getPicture(() => {});
    
    assert.strictEqual(consoleLogOutput.toString (), 'Error: Errore HTTP 500')
  
    console.log = consoleLog;
    fetchStub.restore();
  });
});

