const createuserUrl = new URL('http://127.0.0.1/api/add_user/');
const answearUrl = new URL('http://127.0.0.1/api/add_answear/');
const LoginuserUrl = new URL('http://127.0.0.1/api/login/');
const CheckuserUrl = new URL('http://127.0.0.1/api/checklogin/');
const Checktokenurl = new URL('http://127.0.0.1/api/checktoken/');
const eng_wordurl = new URL('http://127.0.0.1/api/eng_word/');
const learn_end_wordurl=new URL('http://127.0.0.1/api/learn_eng/');
const admin_get_user_listurl=new URL('http://127.0.0.1/api/get_user_data/');
const admin_edit_user_listurl=new URL('http://127.0.0.1/api/update_user_pass/');
const delete_userurl=new URL('http://127.0.0.1/api/delete_user/');
const admin_get_word_listurl=new URL('http://127.0.0.1/api/get_word_data/');
const admin_edit_wordurl=new URL('http://127.0.0.1/api/update_word/');
const delete_wordurl=new URL('http://127.0.0.1/api/delete_word/');
const admin_add_wordurl=new URL('http://127.0.0.1/api/add_word/');
const admin_get_answer_listurl=new URL('http://127.0.0.1/api/get_answer_data/');
const admin_get_token_listurl=new URL('http://127.0.0.1/api/get_token_data/');
const admin_get_miss_listurl=new URL('http://127.0.0.1/api/get_miss_data/');
const admin_get_lock_listurl=new URL('http://127.0.0.1/api/get_lock_data/');
const admin_defuse_lockurl=new URL('http://127.0.0.1/api/defuse_lock/');


export const getUserList = (() => {
  const url = new URL('/api/todo/', createuserUrl);
  return new Promise( (resolve, reject) => {
    fetch(url.href)
    .then( res => res.json() )
    .then( json => resolve(json) )
    .catch( () => reject([]) );
  });
});

//ミスリスト取得
export const admin_defuse_lock=(user_id,token) => {
  const url = new URL('/api/defuse_lock/',admin_defuse_lockurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id:user_id,
        token: token
      })
    })
    .then( res =>resolve(res.status))
  });
};


//ユーザーリスト取得
export const get_lock_list=(token) => {
  const url = new URL('/api/get_lock_data/',admin_get_lock_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};


//ミスリスト取得
export const admin_get_miss_list=(token) => {
  const url = new URL('/api/get_miss_data/',admin_get_miss_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};



//トークンリスト取得
export const admin_get_token_list=(token) => {
  const url = new URL('/api/get_token_data/',admin_get_token_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};


//ワードリスト取得
export const admin_get_answer_list=(token) => {
  const url = new URL('/api/get_answer_data/',admin_get_answer_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};


//学習型ワードリストを取得
export const get_learn_word_list=(user_id,token) => {
  const url = new URL('/api/learn_eng/', learn_end_wordurl);
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        token:token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};

//ワードリストを取得
export const get_word_list=(user_id,token) => {
  const url = new URL('/api/eng_word/',eng_wordurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id:user_id,
        token:token
      })
    })
    .then( res =>res.json())
    .then(json=>resolve(json))
  });
};

//ワードを追加
export const add_word=(word,mean,speech,level,token) => {
  const url = new URL('/api/add_word/',admin_add_wordurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eng_word:word,
        eng_word_mean:mean,
        eng_part_of_speech:speech,
        eng_level:level,
        token:token,
      })
    })
    .then( res =>resolve(res.status))
  });
};

//ワードの削除
export const delete_word=(word,token)=>{
  const url = new URL('/api/delete_word/',delete_wordurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eng_word:word,
        token:token
      })
    })
    .then( res =>resolve(res.status))
  });
}

//ワードリストを変更
export const update_word=(word,mean,speech,level,token) => {
  const url = new URL('/api/update_word/',admin_edit_user_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eng_word:word,
        eng_word_mean:mean,
        eng_part_of_speech:speech,
        eng_level:level,
        token:token,
      })
    })
    .then( res =>resolve(res.status))
  });
};

//ワードリスト取得
export const admin_get_word_list=(token) => {
  const url = new URL('/api/get_word_data/',admin_get_word_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};


//ユーザーの削除
export const delete_user=(user_id,token)=>{
  const url = new URL('/api/delete_user/',delete_userurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id:user_id,
        token:token
      })
    })
    .then( res =>resolve(res.status))
  });
}

//ユーザーのパスワードを変更
export const update_user_pass=(user_id,new_password,token) => {
  const url = new URL('/api/update_user_pass/',admin_edit_user_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method:  'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id:user_id,
        password:new_password,
        token:token,
      })
    })
    .then( res =>resolve(res.status))
  });
};


//ユーザーリスト取得
export const get_user_list=(token) => {
  const url = new URL('/api/get_user_data/',admin_get_user_listurl );
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data))
  });
};





//トークンからユーザーidを取得する
export const get_user_id=(token) => {
  const url = new URL('/api/checktoken/', Checktokenurl);
  return new Promise( resolve => {
    fetch(url.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then( res =>res.json())
    .then(data=>resolve(data.user_id))
  });
};
    export const postCreateTodo = (name) => {
      const url = new URL('/api/todo/', createuserUrl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name
          })
        })
        .then( res => res.json() )
        .then( data => resolve([data]) );
      });
    };

    //間違えたデータをサーバーに送信する
    export const post_answear_data = (user_id,eng_word,token) => {
      const url = new URL('/api/add_answear/', answearUrl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user_id,
            eng_word:eng_word,
            token:token
          })
        })
        .then( res => resolve(res.status) );
      });
    };

   //ユーザーサインアップ
    export const postCreateUser = (user_id,password) => {
      const url = new URL('/api/add_user/', createuserUrl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user_id,
            password:password
          })
        })
        .then( res=> resolve(res.status))
      });
    };


    //ユーザーがいるかチェック return 200 or 400
    export const checkloginUser = (user_id,password) => {
      const url = new URL('/api/checklogin/', CheckuserUrl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user_id,
            password:password
          })
        })
        .then( res => resolve(res.status) )
      });
    };

    //対象のユーザーのトークンを発行して返す
    export const postloginUser = (user_id,password) => {
      const url = new URL('/api/login/', LoginuserUrl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user_id,
            password:password
          })
        })
        .then( res => res.json() )
        .then( data => resolve(data.token) )
      });
    };

    //対象の発行されているトークンを確認,日付も確認する
    export const check_token = (token) => {
      const url = new URL('/api/checktoken/', Checktokenurl);
      return new Promise( resolve => {
        fetch(url.href, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token
          })
        })
        .then( res =>resolve(res.status) )
      });
    };

    
    export const deleteTodo = ((id) => {
      const url = new URL(`/api/todo/${id}/`, createuserUrl);
      fetch(url.href, { method: 'DELETE' });
    });