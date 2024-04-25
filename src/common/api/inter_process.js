const createuserUrl = new URL('http://127.0.0.1/api/todo/');
const LoginuserUrl = new URL('http://127.0.0.1/api/login/');

export const getUserList = (() => {
  const url = new URL('/api/todo/', createuserUrl);
  return new Promise( (resolve, reject) => {
    fetch(url.href)
    .then( res => res.json() )
    .then( json => resolve(json) )
    .catch( () => reject([]) );
  });
});

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
        .then( data => resolve(data) );
      });
    };


    export const postCreateUser = (user_id,password) => {
      const url = new URL('/api/todo/', createuserUrl);
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
        .then( data => console.log(data) );
      });
    };

    
    export const deleteTodo = ((id) => {
      const url = new URL(`/api/todo/${id}/`, createuserUrl);
      fetch(url.href, { method: 'DELETE' });
    });