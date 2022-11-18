const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = ``;

const router = express.Router();

router.use(function( req, res, next ) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, { 
                algorithms: ["RS256"],
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    } else {
        return res.status(401).json({ error: "Unauthorized"});
    }
    next();
});

router.post("/", async function(req, res){
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        author: req.payload.id,
    });
    return todo.save().then((savedPost) => {
        return res.status(201).json({ 
            _id: savedPost._id,
            title: savedPost.title,
            content: savedPost.content,
            author: savedPost.author,
        });
    }).catch((error) => {
        return res.status(500).json({ error: "Something went wrong." });
    });
});

router.get("/", async function(req, res, next) {
    const todos = await Todo.find().where("author")
})