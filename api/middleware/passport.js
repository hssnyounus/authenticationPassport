//load bcrypt
// const bCrypt = require('bcryptjs');

// module.exports = (passport, user) => {
//   const User = user;
//   const LocalStrategy = require('passport-local').Strategy;

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//       if (user) {
//         done(null, user.get());
//       } else {
//         done(user.errors, null);
//       }
//     });
//   });

//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true // allows us to pass back the entire request to the callback
//       },

//       function(req, email, password, done) {
//         var generateHash = password => {
//           return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//         };

//         User.findOne({ where: { email: email } }).then(user => {
//           if (user) {
//             return done(null, false, {
//               message: 'That email is already taken'
//             });
//           } else {
//             var userPassword = generateHash(password);
//             var data = {
//               email: email,
//               password: userPassword,
//               firstname: req.body.firstname,
//               lastname: req.body.lastname
//             };

//             User.create(data).then((newUser, created) => {
//               if (!newUser) {
//                 return done(null, false);
//               }

//               if (newUser) {
//                 return done(null, newUser);
//               }
//             });
//           }
//         });
//       }
//     )
//   );

//   //LOCAL SIGNIN
//   passport.use(
//     'local-signin',
//     new LocalStrategy(
//       {
//         // by default, local strategy uses username and password, we will override with email
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true // allows us to pass back the entire request to the callback
//       },

//       function(req, email, password, done) {
//         var User = user;

//         var isValidPassword = (userpass, password) => {
//           return bCrypt.compareSync(password, userpass);
//         };

//         User.findOne({ where: { email: email } })
//           .then(user => {
//             if (!user) {
//               return done(null, false, { message: 'Email does not exist' });
//             }

//             if (!isValidPassword(user.password, password)) {
//               return done(null, false, { message: 'Incorrect password.' });
//             }

//             var userinfo = user.get();

//             return done(null, userinfo);
//           })
//           .catch(err => {
//             console.log('Error:', err);

//             return done(null, false, {
//               message: 'Something went wrong with your Signin'
//             });
//           });
//       }
//     )
//   );
// };








const passport = require('passport')
      ,localStrategy = require('passport-local').Strategy;
const model = require('../models');
const {comparePassword,createToken} = require('../utils/password');
const {User} = model;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser( async(id, done) => {
  const user = await User.findOne(id,(err, user) => {
      done(err, user);
    });
    if(!user) return done(err, user)
    console.log(err, user);
    
  });

passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email,password,done)=>{
    try {
        const user = await User.findOne({where:{email}})
        if(!user){
            return done(null,false);
        }
        // const {name,id} = user;
        const token = createToken(user);
        // console.log(user);
        if(!token){
            return done(null,false);
        }
        if(!comparePassword(password,user.password)){
            return done(null,false);
        }

        done(null,user);
    } catch (error) {
        done(error, false);
    }
}
));
module.exports = passport;