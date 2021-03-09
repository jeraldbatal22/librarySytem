const multer  = require('multer')
const fs = require('fs');
const resizeImg = require('resize-img');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/images')
    },
    filename: async function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + file.originalname
        req.body.filename = filename
      cb(null, filename)
    }
  }) 
   
module.exports.upload = () => {
    return multer({
        storage:storage,
        limits: {
            fieldSize: 1024 * 1024 * 3,
        }
    })
}

module.exports.resizeImage = async (locationImage, width=100, height=50) => {
    const image = await resizeImg(fs.readFileSync(locationImage), {
        width: width,
        height: height
    });
    fs.writeFileSync(locationImage, image);
}



