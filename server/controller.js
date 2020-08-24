const bcrypt = require('bcryptjs');
 
module.exports ={
    register: async (req, res) => {
        // this is what it needs to register.
        const {username, password} = req.body,
            db = req.app.get('db');
        // checks if username exists
        const foundUser = await db.check_user({username});
        if(foundUser[0]){
            return res. status(400).send('user already exists')
        }
        // Hashing the Password
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        // Registering new user 
        const newUser = await db.register_user({username, password: hash });
        req.session.user = newUser[0];
        res.status(201).send(req.session.user)    

    
        
    },
    login: async(req, res )=>{
        // this is what I need to login
        const {username, password} = req.body,
            db = req.app.get('db');

         // check if already exists
         const foundUser = await db.check_user({username});
         if(!foundUser[0]){
             return res.status(400).send('User not found')
         }
         //compare passwords
         const authenticated = bcrypt.compareSync(password, foundUser[0].password);
         if(!authenticated){
             return res.status(401).send('Password is incorrect')
         }
         //Set user on session, send it client-side
         delete foundUser[0].password;
         req.session.user = foundUser[0];
         res.status(202).send(req.session.user)
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);

    }

}