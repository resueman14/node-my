const {Router} = require('express')
const File = require('../models/file')
const fs = require('fs')
const router = Router()
router.get('/', async (req,res)=>{
  const filenames = await File.find()
  res.status(200)
  res.render('index',{title:'Главная', isHome: true, filenames})
})

router.get('/upload', async (req,res)=>{
  res.status(200)
  res.render('index',{title:'Главная', isHome: true})
})

router.post('/upload',async (req,res)=>{
  if(req.files){
    const file = req.files.upfile
    const fileName = req.files.upfile.name
    await file.mv(`${__dirname}/../public/uploads/${fileName}`,async err=>{
      if(err){
        console.log(err)
        res.end('Error')
      } else {
        const file = new File({
          name: fileName
        })
        await file.save()
        res.redirect('/')
      }
    })
  }else{
    res.end("There\'s no file")
  }
})

router.get('/get/:name', async (req,res)=>{
  let filePath = `${__dirname}/../public/uploads/${req.params.name}`
  //console.log( `${__dirname}/../public/uploads/${req.params.name}`)
  res.download(filePath)
})
router.get('/remove/:name', async (req,res)=>{
  let filePath = `${__dirname}/../public/uploads/${req.params.name}`
  //console.log( `${__dirname}/../public/uploads/${req.params.name}`)
  try{
    await File.deleteOne({name:req.params.name})
    await fs.unlink(filePath, err=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/')
      }
    })
  } catch(err){
    console.log(err)
  }
})

module.exports = router