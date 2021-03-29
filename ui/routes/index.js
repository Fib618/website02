var express = require('express');
var csurf = require('csurf');
const {
  TooManyRequests
} = require('http-errors');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.all('/*', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.use(csurf({
  cookie: false,
}));

router.use((req, res, next) => {
  const locals = res.locals;
  locals.csrfToken = req.csrfToken();
  return next();
});

router.get('/csrf-token', (req, res) => {
  res.json({
    token: res.locals.csrfToken
  });
});

router.use(express.static('public'));



router.use('/login', (req, res, next) => {
  res.render('login');
});


router.get('logout', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/login');
  });
});


const urlRoutedLoginPage = /^\/(login(\/.*)?|logout)$/;
const apisAccessibleWithoutLoing = /^\/api\/login$/;


router.get(urlRoutedLoginPage, (req, res) => {
  res.render('login');
});

router.use((req, res, next) => {
  if (apisAccessibleWithoutLoing.test(req.url)) {
    next();
    return;
  }


  const {
    session
  } = req;
  const authenticated = session && session.authenticated;
  if (authenticated) {
    next();
    return;
  }

  if (req.method !== 'GET' || /\/api\.*/.test(req.url)) {
    next({
      status: 401
    });
    return;
  }
  res.redirect('/login');
});

router.use(express.static('public_authenticated'));
router.use('/api', require('./api'));
router.get('/*', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('app');
})


module.exports = router;