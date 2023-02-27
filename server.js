import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import exphbs from 'express-handlebars'
import multer from 'multer'


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ dest: 'public/uploads/' })


// files *.hbs should manage by exphbs.engine
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));

//set views page as *.hbs
app.set('view engine', 'hbs');

//set serve static files
app.use(express.static(path.join(__dirname, '/public')))

//req.body handle x-www-form-urlencoded/form-encoded
app.use(express.urlencoded({ extended: false }));

//req.body handle form-data/form
// app.use(express.json());

//paths array
const paths = ['index', 'about', 'contact', 'info', 'history']
const pathsLogin = ['user/settings', 'user/panel']

// get
paths.map(name => {
  const pathUrl = name.includes('index') ? '/' : '/' + name;
  app.get(pathUrl, (req, res) => {
    // res.render(`views/${name}`)
    res.render(name)
  });
})
pathsLogin.map(path => {
  app.use(`/${path}`, (req, res) => {
    res.render('user', { layout: 'dark' })
  })
})

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
})

app.get('/home', (req, res) => {
  res.render('index')
})

// post
app.post('/contact/send-message', upload.single('imageFile'), (req, res) => {
  const { author, sender, title, message } = req.body;
  if (author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, fileName: req.file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).render('notFound')
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});