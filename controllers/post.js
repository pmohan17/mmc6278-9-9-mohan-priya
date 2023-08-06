const { Post } = require('../models')


async function create(req, res, next) {
    try {
    const {body} = req.body
    //works
    if (!(body)) return res.status(400).send('Please add text')
    const post = await Post.create({body})
    //doesn't work
    return res.status(200).json(post)
}
catch (err) {
  console.log(err.message)
  return res.status(500).send(err.message)
}}

async function get(req, res) {
    try {
      const id = req.params.id
      const post = await Post.findOne({slug}).lean()
      post.createdAt = new Date(post.createdAt).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      res.render('private', {post, isLoggedIn: req.session.isLoggedIn})
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
       res.render('private', {
            post
     })
 } catch(err) {
     res.status(500).send(err.message)
    }}

    module.exports = {
      getAll,
      get,
      create,
  }