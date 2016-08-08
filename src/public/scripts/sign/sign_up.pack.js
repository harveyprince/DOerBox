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
      },
      re_password: {
        identifier: 're_password',
        rules: [
          {
            type: 'empty',
            prompt: '确认密码不能为空'
          }
        ]
      }
    }
  });
$('.sign_up.button').click( () => {
  if ($('.ui.form').form('is valid')) {
    console.log('pass');
  }
});
