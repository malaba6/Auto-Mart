import cloudinary from 'cloudinary';
import Car from '../model/cars';
import Validator from '../validation/validation';

cloudinary.config({
  cloud_name: 'eubule',
  api_key: '585313199331742',
  api_secret: 'QoSXwvXHNuQJ2AHDpvA-25nXCNk',
});

export const imageUploader = (req, res, next) => {
  if (Validator.isValidImageUrl(req.body.photo) !== 'valid') {
    return res.status(417).send({
      error: Validator.isValidImageUrl(req.body.photo),
      status: 417,
    });
  }
  let name = req.body.photo.split('/');
  name = name[name.length - 1].split('.')[0];
  cloudinary.v2.uploader.upload(req.body.photo, { public_id: name }, (error, result) => {
    if (result) {
      req.body.photo = result.secure_url;
      // console.log(result);
    }
    return next();
  });
};

export const deleteImage = (req, res, next) => {
  const { id } = req.params;
  const car = Car.viewSpecificCar(id);
  if (car) {
    const carUrl = car.photo;
    let name = carUrl.split('/');
    name = name[name.length - 1].split('.')[0];
    cloudinary.v2.uploader.destroy(name, (result, error) => {});
    return next();
  }
  return res.status(404).send({
    status: 404,
    error: `Car with id ${id} not found`,
  });
};

export const postCarValidator = (req, res, next) => {
  if ((req.body.state === undefined && req.body.state !== '')
        || (req.body.price === undefined && req.body.price !== 0)
        || (req.body.manufacturer === undefined && req.body.manufacturer !== '')
        || (req.body.model === undefined && req.body.model !== '')
        || (req.body.type === undefined && req.body.type !== '')
        || (req.body.photo === undefined && req.body.photo !== '')) {
    return res.status(400).send({
      error: 'state, price, manufactuere, model, type and photo are required',
      status: 400,
    });
  }
  return next();
};
