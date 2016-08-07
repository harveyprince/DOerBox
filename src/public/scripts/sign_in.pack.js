'use strict';
$('.ui.form')
  .form({
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
