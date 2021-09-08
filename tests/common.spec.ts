
process.env.MONGO_URI = "mongodb://localhost:27017/testing_db";
process.env.API_BASE = "/api";
process.env.TOKEN_KEY = "g0cyXn6SMt1lfmqJuVYYXXWyITNJf0Az";
process.env.TOKEN_EXPIRY = "1h";

import User from  "../src/models/user";
import express from "../src/index";

import request from "supertest";
export const agent = request.agent(express);

const defaultUser = { "userName": "test", "password": "test" };

const createUser = async () => {
    const UserModel = new User(defaultUser);
    await UserModel.save();
};

const getDefaultUser = async () :Promise<any> => {
    let users = await User.find({ "userName" : defaultUser.userName });
    if (users.length === 0) {
        await createUser();
        return getDefaultUser();
    } else {
        return users[0];
    }
};

export const loginWithDefaultUser = async () => {
    let user = await getDefaultUser();
    return agent.post(process.env.API_BASE+ "/auth/signin")
        .send({ "userName": defaultUser.userName, "password": defaultUser.password })
        .expect(200);
};

export const cleanExceptDefaultUser = async () => {
    let user = await getDefaultUser();
    await User.deleteMany({ "userName": {$ne: user.userName}});    
};