import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import exphbs from 'express-handlebars'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const paths = [
  'index',
  'about',
  'contact',
  'info',
  'history',
]
const pathsLogin = [
  'user/settings',
  'user/panel',
]

// files *.hbs should manage by exphbs.engine
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));

//set views page as *.hbs
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')))

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

app.use((req, res) => {
  res.render('notFound')
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});