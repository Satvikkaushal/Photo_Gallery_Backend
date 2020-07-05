const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "satvik",
    api_key: "918394478119148",
    api_secret: "DBKbGNfsgNpvVGgemR7tAlqUsW4"
});

module.exports = cloudinary;