const Service = require("../Models/Service")

const cloudinary = require('../Handlers/cloudinary');
const formidable = require('formidable');

exports.getServiceById = (req, res, next, id) => {
    Service.findById(id)
        .exec((err, service) => {
            if (err) { return res.status(400).json({ err: "Service not found" }) }
            req.service = service;
            next();
        })
}

exports.getService = (req, res) => {
    return res.json(req.service)
}

exports.getAllServices = (req, res) => {
    Service.find()
        .exec((err, services) => {
            if (err) { res.status(400).json({ err: "service not found" }) }
            res.json(services)
        })
}


exports.createService = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }
        cloudinary.v2.uploader.upload(file.imageUrl.path, (err, result) => {
            if (err) {
                return callback(err);
            }
            const { name, description, charge, category, deliveryTime } = fields
            let service = new Service(fields);
            service.imageUrl = result.url;
            service.userId = req.profile._id;
            service.save((err, service) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ err: "Not able to create service" })
                }
                res.json(service);
            })
        }
        );
    });
}

exports.deleteService = (req, res) => {
    const service = new Service(req.service)
    service.remove((err, deletedService) => {
        if (err) { return res.status(400).json({ err: "not bale to remove" }) }
        res.json({
            msg: "deleted sucessfully",
            service: deletedService.name
        });
    })
}

exports.getServiceByCategory = (req, res) => {
    Service.find({
        category: req.category._id
    }).populate("category", "name")
        .exec((err, service) => {
            if (err) {
                console.log(err)
                return res.json({
                    err: "error"
                })
            }
            res.json(service)
        })
}

exports.getServiceByUserId = (req, res) => {
    Service.find({
        userId: req.profile._id
    }).populate("category", "name")
        .exec((err, service) => {
            if (err) {
                console.log(err)
                return res.json({
                    err: "error"
                })
            }
            res.json(service)
        })
}