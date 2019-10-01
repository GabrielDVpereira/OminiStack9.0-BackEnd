// index, show, store, update, destroy

const Spot = require('../models/Spot');
const User = require('../models/Users');

module.exports = {
    async index (req, res) {
        let { tech } = req.query;
        const spots = await Spot.find({ techs: tech})

        return res.json(spots);
    },
    async store(req, res) {
        const { filename} = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exist'});
        } 
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            techs: techs.split(',').map(tech => tech.trim()), 
<<<<<<< HEAD
            price,
            company
            
=======
            price
>>>>>>> de9b49d782a290bfc897f1692054e0eaffad5341
        })

        return res.json(spot);
    }   
};