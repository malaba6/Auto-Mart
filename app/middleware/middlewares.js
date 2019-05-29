import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'eubule',
    api_key: '585313199331742',
    api_secret: 'QoSXwvXHNuQJ2AHDpvA-25nXCNk'
});

export const imageUploader = (req, res, next) => {
    cloudinary.v2.uploader.upload(req.body.photo, (error, result) => {
        if (result) {
            req.body.photo = result.secure_url;
        }
        return next();
    });
};