const {Device, DeviceInfo} = require('../models/models.js')
const uuid = require('uuid')
const path = require('path')
const ApeError = require('../error/ApiError.js')

class DeviceController {

  async create (req, res, next)  {
    
try {
  let {name, price, brandId, typeId, info} = req.body
  const {img} = req.files
  let fileName = uuid.v4() + '.jpg'
  img.mv(path.resolve(__dirname, '..', 'static', fileName))

if(info){
  info = JSON.parse(info)
  info.forEach(i => {
    DeviceInfo.create({
      title: i.title,
      description: i.description,
      deviceId: device.id
    })
  });
}

  const device = await Device.create({name, price, brandId, typeId, img: fileName})
  return res.json(device)
  
} catch (e) {
  return next(ApeError.badRequest(e.massage))
}
}

  async getAll (req, res, next)  {

    try {
      let {brandId, typeId, limit, page} = req.query
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit
      let devices

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({limit, offset})
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({where:{brandId}, limit, offset})

    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({where:{typeId,brandId}, limit, offset})

    }
    return res.json(devices)
    } catch (e) {
      return next(ApeError.badRequest(e.massage))
    }
    
    
  }
  async getOne (req, res) {
   const {id} = req.params
  const device = await Device.findOne({
    where:{id},
    include:[{model: DeviceInfo, as:'info'}]
  })
return res.json(device)
}
}

module.exports = new DeviceController()