const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users')


exports.signup = (req, res, next) => {
    if (req.body.password === undefined || req.body.email === undefined) return res.status(409).json({ message: "tous les champs doivent être remplis" });
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ error }));


};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expireIn: '24h' }
                        )
                    });
                })
                .catch(error => {


                    res.status(500).json({ error })
                });
        })
        .catch(error => res.status(500).json({ error }));
};