import 'mocha'
import chaiHttp = require('chai-http');
import { addRouter, stopServer } from '../src'
import { Router } from 'express';
import { listenInit } from '@vestibule-link/bridge';
import * as chai from 'chai';

chai.use(chaiHttp);

describe('Http Server', function () {
    after(function () {
        stopServer();
    })
    it('should register a router', function (done) {
        const router = Router();
        router.get('/req1', (req, res) => {
            res.send('Hi')
                .status(200);
        })
        listenInit('http', async () => {
            const app = addRouter('/test', router);
            chai.request(app)
                .get('/test/req1')
                .send()
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                })
        })
    })
    it('should callback after server start', function (done) {
        listenInit('http', async () => {
            done()
        })
    })
})