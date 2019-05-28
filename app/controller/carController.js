import Car from "../model/cars";
import Validator from "../validation/validation";


const CarController = {
    status: 200,

    /**
     * 
     * @params {object} data
     * @returns {object} car object
     */
    postCar(data) {
        if ((data.state === undefined && data.state !== "") ||
            (data.price === undefined && data.price !== 0) ||
            (data.manufacturer === undefined && data.manufacturer !== "") ||
            (data.model === undefined && data.model !== "") ||
            (data.type === undefined && data.type !== "") ||
            (data.photo === undefined && data.photo !== "")) {
            this.status = 400;
            return {
                "error": "state, price, manufactuere, model, type and photo are required",
                "status": this.status
            }
        }
        if (Validator.isValidPrice(data.price) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidPrice(data.price),
                "status": this.status
            }

        }
        if (Validator.isValidState(data.state) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidState(data.state),
                "status": this.status
            }

        }
        if (Validator.isValidManufacturer(data.manufacturer) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidManufacturer(data.manufacturer),
                "status": this.status
            }

        }
        if (Validator.isValidModel(data.model) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidModel(data.model),
                "status": this.status
            }

        }
        if (Validator.isValidType(data.type) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidType(data.type),
                "status": this.status
            }

        }
        console.log(data.photo);
        if (Validator.isValidImageUrl(data.photo) !== "valid") {
            this.status = 417;
            return {
                "status": 417,
                "error": Validator.isValidImageUrl(data.photo)
            };
        }
        // if (!data.photo) => {
        //     const rightFile = req.files[0]
        //     .originalname
        //     .match(/(.jpg|.png|.jpeg)$/g);

        //     return rightFile
        //     ? next()
        //     : errorMessage(res, 422, 'unsupported image type');
        //     }

        //     ];

        //     export const validateIdParam = (req, res, next) => {
        //     const { carId } = req.params;
        //     const message = isNotSpecified(carId, 'car id')
        //     || pureNumber.isInvalid(carId, 'car id');
        //     req.params.carId = +carId;
        //     return message
        //     ? errorMessage(res, 422, message)
        //     : next();
        //     };
        // let pic = Validator.image(data.photo);
        // console.log("Here " + pic);
        // if (!pic) {
        //     this.status = 417;
        //     return {
        //         "status": this.status,
        //         "error": "Couldn't upload image!"
        //     }
        // }
        // console.log(this.cloud);


        const car = Car.postCar(data);
        this.status = 201;
        return {
            "status": this.status,
            "data": car
        };
    },

    /**
     * 
     * @returns {object} cars array
     */
    viewAllCars() {
        const cars = Car.viewAllCars();
        if (!cars) {
            this.status = 200;
            return {
                "status": this.status,
                "message": "Oh oh! No cars Posted here yet!",
            };
        }
        return {
            "status": this.status,
            "data": cars
        };
    }
}

export default CarController;