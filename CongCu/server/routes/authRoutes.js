



/* GET login and register page. */
router.get('/login', (req, res) => {
  if (req.session.user) {
    if (req.session.user.role === 'admin') return res.redirect('/admin');
    return res.redirect('/users');
  }
  res.render('login', { page: 'login' }); // file ejs chứa 2 form login + register
});