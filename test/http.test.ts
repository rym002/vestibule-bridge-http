import 'mocha'
import chaiHttp = require('chai-http');
import { addRouter, stopServer, startModule } from '../src'
import { Router } from 'express';
import * as chai from 'chai';
import { registerModule } from '@vestibule-link/bridge';

chai.use(chaiHttp);

describe('Http Server', function () {
    after(function () {
        stopServer();
    })
    it('should register a router', function (done) {
        startModule()
        registerModule({
            name: 'test',
            init: async () => {
                const router = Router();
                router.get('/req1', (req, res) => {
                    res.send('Hi')
                        .status(200);
                })
                const app = addRouter('/test', router);
                chai.request(app)
                    .get('/test/req1')
                    .send()
                    .end((err, res) => {
                        chai.expect(res).to.have.status(200);
                        done();
                    })

            },
            depends: [startModule()]
        })
    })
})