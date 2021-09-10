import { agent } from "../common.spec";

import User from "../../src/models/user";
import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Competencies', () => {
    let token = ''
    let authData = {
        userName: "userName",
        password: "password"
    };
    let authDataFail = {
        userName: "",
        password: "password"
    };
    let invalidCredential = {
        userName: "userName",
        password: "passwordFail"
    };

    beforeEach(async () => {
        User.deleteMany({}).exec();
    });
    afterEach(() => {
        User.deleteMany({}).exec();
    });


    describe('/POST signUp', () => {
        it('it should registered', () => {
            return agent
                .post('/api/auth/signup')
                .send(authData)
                .expect(201)
        });

        it('it should failed to registered, because one of req field is empty', () => {
            return agent
                .post('/api/auth/signup')
                .send(authDataFail)
                .expect(422);
        });
    });

    describe('/POST signUp', () => {
        it('it should be successfully login', () => {
            return agent
                .post('/api/auth/signup')
                .send(authData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .post('/api/auth/signin')
                        .send(authData)
                        .expect(200)
                })
        });
        
        it('it should not be successfully login, invalid credential', () => {
            return agent
                .post('/api/auth/signup')
                .send(authData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .post('/api/auth/signin')
                        .send(invalidCredential)
                        .expect(400)
                        .expect((res: any) => {
                            res.body.errors.should.be.a('array');
                            res.body.errors[0].should.equal('Invalid Credentials')
                        })
                })
        });
        
        it('it should not be successfully login, one of fiels is empty', () => {
            return agent
                .post('/api/auth/signup')
                .send(authData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .post('/api/auth/signin')
                        .send(authDataFail)
                        .expect(400)
                        .expect((res: any) => {
                            res.body.errors.should.be.a('array');
                            res.body.errors[0].should.equal('All input is required')
                        })
                })
        });
    });

});
