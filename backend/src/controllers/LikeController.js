const Dev = require('../models/Dev')

module.exports ={
  async store(request,response){
    const {user} = request.headers
    const loggedDev = await Dev.findById(user)
    
    const {devId} = request.params
    const targetDev = await Dev.findById(devId)

    if(!targetDev){ return response.status(400).json({error: 'Dev not exists'})}

    if(targetDev.likes.includes(user)){
      console.log('Match!')
    }
    loggedDev.likes.push(devId)
    await loggedDev.save()

    return response.json({loggedDev})
  }
}