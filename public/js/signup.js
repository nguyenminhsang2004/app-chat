// $(function(){

//     createError = (errorName) => {
//         content = '<div class="alert alert-danger">Error: ' + errorName + '.</div>';
//         return content;
//     }

//     const firebaseConfig = {
//         apiKey: "AIzaSyBYh0Pivsc0DJN37G1vDVwvMP7ztwLRVcI",
//         authDomain: "app-chat-online-c2065.firebaseapp.com",
//         projectId: "app-chat-online-c2065",
//         storageBucket: "app-chat-online-c2065.appspot.com",
//         messagingSenderId: "749875716684",
//         appId: "1:749875716684:web:f2ca5d4e0e9277701e4ae9",
//         measurementId: "G-GVQ95FKH02"
//       };
//       // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);

//     $('#signUpWithGoogle').click(() => {
//         $('#alert-notify .alert.alert-danger').remove();
//         let provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithPopup(provider).then(function(result) {
//             //let token = result.credential.accessToken;
//             let name = result.user.displayName;
//             let email = result.user.email;
//             $('#name').val(name);
//             $('#email').val(email);
//             $('.chooseEmail').addClass('un-display');
//             $('#formSignUp').addClass('display');

//         }).catch(function(error) {
//             let content = createError(error.message);
//             $('#alert-notify').append(content);
//         });
//     });

//     setTimeout(() => {
//         $('#name').focus();
//     }, 1000);

//     $('#name').keypress(e => {
//         if(e.keyCode === 13){
//             e.preventDefault();
//             $('#pass').focus();
//         }
//     });

//     $('#pass').keypress(e => {
//         if(e.keyCode === 13){
//             e.preventDefault();
//             $('#repass').focus();
//         }
//     });

//     $('#repass').keypress(e => {
//         if(e.keyCode === 13){
//             e.preventDefault();
//             $('#btnSignUp').trigger('click');
//         }
//     });

//     $('#btnSignUp').click((e) => {
//         e.preventDefault();
//         $('#alert-notify .alert.alert-danger').remove();
//         let flag = true;

//         let fullName = $('#name').val().trim();
//         let email = $('#email').val().trim();
//         let pass = $('#pass').val().trim();
//         let rePass = $('#repass').val().trim();
//         if(fullName.length === 0){
//             let content = createError('Name required');
//             $('#alert-notify').append(content);
//             flag = false;
//         }
//         if(pass.length === 0 ){
//             let content = createError('Password required');
//             $('#alert-notify').append(content);
//             flag = false;
//         }
//         else if(pass !== rePass){
//             let content = createError('Password not match');
//             $('#alert-notify').append(content);
//             flag = false;
//         }

//         if(flag === true){
//             let _user = {
//                 full_name: fullName,
//                 email: email,
//                 password: $.md5(pass),
//                 active: false
//             };
//             $.ajax({
//                 type: "POST",
//                 url: "/users/sign-up",
//                 data: {user:_user},
//                 dataType: "JSON"
//             }).always((res) => {
//                 if(res.status === 200){
//                     //window.location.replace("http://localhost:3000/users/sign-in");
//                     window.location.replace("https://app-chat-online.herokuapp.com/users/sign-in");
//                 }
//                 else{
//                     let content = createError(res.message);
//                     $('#alert-notify').append(content);
//                 }
//             });
//         }
//     });
// })