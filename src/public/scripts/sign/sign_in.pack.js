'use strict';
$('.ui.form')
  .form({
    on: 'blur',
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: '邮箱不能为空'
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: '密码不能为空'
          }
        ]
      }
    }
  });
$('.sign_in.button').click( () => {
  if ($('.ui.form').form('is valid')) {
    console.log('pass');
  }
});
