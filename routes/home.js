const {Router} = require('express')
const File = require('../models/file')
const router = Router()
router.get('/', (req,res)=>{
  res.status(200)
  res.render('index',{title:'Главная', isHome: true})
})

router.get('/upload', (req,res)=>{
  res.status(200)
  res.render('index',{title:'Главная', isHome: true})
})

router.post('/upload',async (req,res)=>{
  if(req.files){
    const file = req.files.upfile
    const fileName = req.files.upfile.name
    await file.mv(`${__dirname}/../uploads/${fileName}`,async err=>{
      if(err){
        console.log(err)
        res.end('Error')
      } else {
        const file = new File({
          name: fileName
        })
        await file.save()
        res.end('Uploaded')
      }
    })
  }else{
    res.end("There\'s no file")
  }
})

module.exports = router