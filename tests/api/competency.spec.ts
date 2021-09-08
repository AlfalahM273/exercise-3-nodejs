import { agent, loginWithDefaultUser } from "../common.spec";

import Competency from "../../src/models/competency";
import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Competencies', () => {
    let token = ''
    let competencyData = {
        skill: "skill",
        level: "entry",
        selfClaim: "selfClaim"
    };
    let competencyFail = {
        skill: "",
        level: "entry",
        selfClaim: "selfClaim"
    };
    let competencyFail2 = {
        level: "entry",
        selfClaim: "selfClaim"
    };

    beforeEach(async () => {
        Competency.deleteMany({}).exec();
        let resToken = await loginWithDefaultUser();
        token = resToken.body.token;
    });
    afterEach(() => {
        Competency.deleteMany({}).exec();
    });

    describe('/GET Competencies', () => {
        it('it should GET all the Competencies', () => {
            return agent
                .get('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .expect(200)
                .expect(res => {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                });
        });
        it("should return 401 with expired token", () => {
            return agent
                .get('/api/competency')
                .set("Authorization", "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjcwMWQyNGQ2ZjIyYTJiZThiYjg1MzYiLCJ1c2VybmFtZSI6InRlc3RAdGVjaGJyaWouY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTEJNQy5tQVFxWWNmLjVZSlRlSVNlT1cvUVp1NWJ5WVN4anJmSGFQUTJZZVlkWXR6Y25lbFMiLCJfX3YiOjAsImlhdCI6MTUzNDQzODk0MywiZXhwIjoxNTM0NDM5MDYzfQ.zFMsJiny3At6vJRsjl8AzKnjlTMGVc1fdZnH2kwu6dQ")
                .expect(res => {
                    res.body.errors[0].should.equal("please re-login")
                })
                .expect(401);
        });
    });

    describe('/GET Detail Competencies', () => {
        it('it should update the competency', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .get('/api/competency/' + res.body._id)
                        .set("Authorization", 'bearer ' + token)
                        .expect(200)
                        .expect((res: any) => {
                            res.body.level.should.equal(competencyData.level)
                        })


                })
        });
        it('it should not found', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .get('/api/competency/' + '61382367ad8218b3145b1101')
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(404)
                        .expect((res: any) => {
                            res.body.errors[0].should.equal('Not Found')
                        })
                })
        });
    });

    describe('/POST Competencies', () => {
        it('it should save the competency', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
        });

        it('it should failed to save the competency, because one of req field is empty', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyFail)
                .expect(422);
        });

        it('it should failed to save the competency, because one of req field is unset', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyFail2)
                .expect(422);
        });
    });

    describe('/PATCH Competencies', () => {
        it('it should update the competency', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .patch('/api/competency/' + res.body._id)
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(200)
                        .expect((res: any) => {
                            res.body.level.should.equal('good')
                        })


                })
        });
        it('it should not found', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .patch('/api/competency/' + '61382367ad8218b3145b1101')
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(404)
                        .expect((res: any) => {
                            res.body.errors[0].should.equal('Not Found')
                        })
                })
        });
        it('id Cast error', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .patch('/api/competency/' + 'falseId')
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(422)
                        .expect((res: any) => {
                            res.body.errors.should.be.a('array');
                        })
                })
        });
    });

    describe('/DELETE Competencies', () => {
        it('it should update the competency', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .delete('/api/competency/' + res.body._id)
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(200)
                        .expect((res: any) => {
                            res.body.message.should.equal('successfully deleted')
                        })


                })
        });
        it('id Cast error', () => {
            return agent
                .post('/api/competency')
                .set("Authorization", 'bearer ' + token)
                .send(competencyData)
                .expect(201)
                .then((res: any) => {
                    return agent
                        .delete('/api/competency/' + 'falseId')
                        .set("Authorization", 'bearer ' + token)
                        .send({ level: 'good' })
                        .expect(422)
                        .expect((res: any) => {
                            res.body.errors.should.be.a('array');
                        })
                })
        });
    });

});
