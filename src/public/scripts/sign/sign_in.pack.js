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
          },
          {
            type   : 'email',
            prompt : '这不是一个有效的邮箱'
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
    var email = $('.ui.form').form('get value', 'email');
    var password = $('.ui.form').form('get value', 'password');
    $.post('/api/web/session',{
      email: email,
      password: password
    },(data, status) => {
      //
    });
  }
});
