const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

// Storage setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// File filter (only images)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// Upload endpoint
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  // Full URL for the uploaded image
  const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.send({ imageUrl: fullUrl })
})

module.exports = router
