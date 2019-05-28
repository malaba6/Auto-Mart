import cloudinary from 'cloudinary';
import url from "url";
import path from "path";

cloudinary.config({
    cloud_name: 'eubule',
    api_key: '585313199331742',
    api_secret: 'QoSXwvXHNuQJ2AHDpvA-25nXCNk'
});

export const imageUploader = (req, res, next) => {
    // let parsedImg = url.parse(req.body.photo, true);
    // let host = parsedImg.host;
    // const pathName = parsedImg.pathname;

    // if (!host) {
    //     parsedImg = url.parse("http://localhost:3000/" + pathName, true);
    //     console.log(parsedImg);
    //     req.body.photo = parsedImg.href;

    // }
    cloudinary.v2.uploader.upload(req.body.photo, (error, result) => {
        if (result) {
            req.body.photo = result.secure_url;
        }
        return next();
    });
};