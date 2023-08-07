const { Post } = require('../models')


async function create(req, res, next) {
    try {
    const {body} = req.body
    console.log("Create function is working")
    if (!body) return res.status(400).send('Please add text')
    const post = await Post.create({body})
    console.log("Post created")
    console.log(post)
    return res.render('protected', {post})
  return res.status(200).json(post)
      
}
catch (err) {
  console.log(err.message)
  return res.status(500).send(err.message)
}}

async function get(req, res) {
    try {
      const post = await Post.findById(req.params.id).lean()
      console.log("post found")
      post.createdAt = new Date(post.createdAt).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).lean()
     return res.render('protected', {post})
    } catch(err) {
      res.status(500).send(err.message)
    }
  }

async function getAll(req, res) {
try {
const mongoQuery = {}
const showPost = await Post
 .find(mongoQuery)
     const post = showPost.map(post => {
        post = post.toObject()
      return post
        })
       res.render('protected', {post})
 } catch(err) {
     res.status(500).send(err.message)
    }}

    async function update(req, res) {
      try {
        const {body} = req.body
        const postId = req.params.id
        if (!(body))  return res.status(400).send('Please include text.')
        const post = await Post.findByIdAndUpdate(postId, {body}
        ).lean()
        res.json(post)
      } catch(err) {
        res.status(500).send(err.message)
      }
    }
    
    async function remove(req, res, next) {
      try{
      const postId = req.params.id
      const post = await Post.findByIdAndDelete(postId).lean()
      post.remove()
      await user.save()
      res.status(200).send('Post deleted.')
      } catch(err) {
        res.status(500).send(err.message)
    }}

    module.exports = {
      create,
      getAll,
      get,
      update,
      remove
    }