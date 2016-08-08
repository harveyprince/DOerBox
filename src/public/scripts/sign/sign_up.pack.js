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
      },
      re_password: {
        identifier: 're_password',
        rules: [
          {
            type: 'empty',
            prompt: '确认密码不能为空'
          },
          {
            type   : 'match[password]',
            prompt : '密码不一致'
          }
        ]
      }
    }
  });
$('.ui.form').submit( () => {
  if ($('.ui.form').form('is valid')) {
    var email = $('.ui.form').form('get value', 'email');
    var password = $('.ui.form').form('get value', 'password');
    password = $.md5(password);
    $.post('/api/web/account',{
      email: email,
      password: password
    },(data,status) => {
      //
    });
  }
});
