const express = require("express");
const {Pool} = require ("pg");

const app = express();
const port = 3000;

const pool = new Pool({
    user :"postgres",
    host:"localhost",
    database:"postgres",
    password:"postgres",
    port:"54320",
});

