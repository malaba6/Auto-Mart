import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import Car from '../model/cars';
import Validator from '../validation/validation';
import URL from 'url';
import jwt from "jsonwebtoken";


dotenv.config();
const cloudinary_url = URL.parse(process.env.CLOUDINARY_URL);
cloudinary.config({
    cloud_name: cloudinary_url.host,
    api_key: cloudinary_url.auth.split(':')[0],
    api_secret: cloudinary_url.auth.split(':')[1],
});

/**
 * 
 * @description Uploads image to cloudinary
 * @param {object} req request
 * @param {object} res response
 * @param {object} next 
 */

// export const imageUploader = (req, res, next) => {

//     let name = req.body.photo.split('/');
//     name = name[name.length - 1].split('.')[0];
//     cloudinary.v2.uploader.upload(req.body.photo, 
//         { public_id: name }, (error, result) => {
//         if (result) {
//             req.body.photo = result.secure_url;
//         }
//         return next();
//     });
// };

/**
 * 
 * @description deletes images from cloudinary
 * @param {object} req request
 * @param {object} res response
 * @param {object} next 
 */
export const deleteImage = async(req, res, next) => {
    const { id } = req.params;
    const car = await Car.viewSpecificCar(id);

    // if (car) {
    //     const carUrl = car.photo;
    //     let name = carUrl.split('/');
    //     name = name[name.length - 1].split('.')[0];
    //     cloudinary.v2.uploader.destroy(name, (error, result) => {});
    //     return next();
    // }
    if (car) {
        const carUrl = car.photo;
        const pic = carUrl.split(',');
        for (let i = 0; i < pic.length; i++) {
            let name = pic[i].split('/');
            name = name[name.length - 1].split('.')[0];
            cloudinary.v2.uploader.destroy(name, (error, result) => {});
        }
        return next();
    }

    return res.status(404).send({
        status: 404,
        error: `Car with id ${id} not found`,
    });
};

export const postCarValidator = (req, res, next) => {
    if ((req.body.state === undefined && req.body.state !== '') ||
        (req.body.price === undefined && req.body.price !== 0) ||
        (req.body.manufacturer === undefined && req.body.manufacturer !== '') ||
        (req.body.model === undefined && req.body.model !== '') ||
        (req.body.type === undefined && req.body.type !== '') ||
        (req.body.photo === undefined && req.body.photo !== '')) {
        return res.status(400).send({
            error: 'state, price, manufactuere, model, type and photo are required',
            status: 400
        });
    }
    return next();
};

/**
 * 
 * @description protect endpoints with jwt
 * @param {object} req the request
 * @param {object} res the response
 * @param {next} next move to the middleware
 */

export const authencate = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            status: 403,
            error: 'You must login to access this resource'
        });
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                error: 'Token is invalid'
            });
        }
        req.decoded = decoded;
        return next();
    });
}


export const imageUploader = async(req, res, next) => {
    if (Validator.isValidPic(req.body.photo) !== 'valid') {
        return res.status(422).send({
            error: Validator.isValidPic(req.body.photo),
            status: 422,
        });
    }
    const pts = req.body.photo.split(';');
    pts.forEach(element => {
        if (Validator.isValidImageUrl(element) !== 'valid') {
            return res.status(422).send({
                error: Validator.isValidImageUrl(element),
                status: 422,
            });
        }
    });

    let res_promises = pts.map(file => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file, { use_filename: true, unique_filename: false }, (err, result) => {
                if (err) reject(err)
                else resolve(result.secure_url)
            })
    }))

    Promise.all(res_promises)
        .then(result => {
            req.body.photo = result;
            return next();
        })
        .catch((error) => { next() })
}