const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        console.log('lets book')
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;
        console.log(date);

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        })

        await booking.populate('spot').populate('user').execPopulate(); //cria a relacão de user com spot

        const ownerSocket = req.connectedUsers[booking.spot.user]; //extraimos o user id apos
        console.log(booking.spot.user);
        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking);
    }
}
