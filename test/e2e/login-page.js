var LoginPage = function() {
  this.userName = element(by.model('user.username'));
  this.password = element(by.model('user.password'));
  this.loginButton = element(by.id('login-button'));
};

module.exports = new LoginPage();

