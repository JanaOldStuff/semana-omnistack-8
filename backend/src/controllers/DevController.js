const axios = require('axios')
const Dev = require('../models/Dev')

module.exports={
  async index(request,response){
    const {user} = request.headers
    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and:[
        { _id:{ $ne:user } },
        { _id:{ $nin:loggedDev.likes } },
        { _id:{ $nin:loggedDev.dislikes } }
      ]
    })
    return response.json(users)
  },
  async store(request, response) {
    const { username } = request.body

    const userExists = await Dev.findOne({user:username})
    if(userExists) return response.json(userExists)

    const {data} = await axios.get(`https://api.github.com/users/${username}`)
    const {avatar_url: avatar, bio, name } = data
    
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })
    return response.json(dev)
  }
}