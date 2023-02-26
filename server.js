// const express = require('express')
// const path = require('path')
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

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

// const paths = [
//   { pathToFile: 'index', url: '/' },
//   { pathToFile: 'about', url: '/about' },
//   { pathToFile: 'contact', url: '/contact' },
//   { pathToFile: 'info', url: '/info' },
//   { pathToFile: 'history', url: '/history' },
// ]

app.use(express.static(path.join(__dirname, '/public')))
app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname, name));
  }
  next()
})

pathsLogin.map(path => {
  app.use(`/${path}`, (req, res) => {
    res.show(`views/user.html`)
  })
})

paths.map(name => {
  const pathUrl = name.includes('index') ? '/' : '/' + name;
  app.get(pathUrl, (req, res) => {
    res.show(`views/${name}.html`)
  });
})

app.get('/home', (req, res) => {
  res.show('views/index.html')
})

app.use((req, res) => {
  res.show('views/notFound.html');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});