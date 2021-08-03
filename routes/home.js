const {Router} = require('express')
const router = Router()
router.get('/', (req,res)=>{
  res.status(200)
  res.render('index',{title:'Главная', isHome: true})
})

router.get('/upload', (req,res)=>{
  res.status(200)
  res.render('index',{title:'Главная', isHome: true})
})

router.post('/upload', (req,res)=>{
  if(req.files){
    const file = req.files.upfile
    const fileName = req.files.upfile.name
    file.mv(`${__dirname}/../uploads/${fileName}`,err=>{
      if(err){
        console.log(err)
        res.end('Error')
      } else {
        res.end('Uploaded')
      }
    })
  }else{
    res.end("There\'s no file")
  }
})

module.exports = router