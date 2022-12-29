import Match from '../models/match.js';
import notification from '../models/notification.js';
import User from '../models/user.js';

async function create(req, res) {
    if (req.body.origUserId === req.body.matchedUserId) {
        res.status(400).send({ err: 'Original user ID and matched user ID cannot be the same.' });
    } else {
        const match = new Match.Match({
            origUserId: req.body.origUserId,
            matchedUserId: req.body.matchedUserId,
        });

       

        try {
            let user = User.queryReal(req.body.origUserId)
            user = user[0]
            if(user.is_notification_on && user.is_match_card_notification_on ){
                await notification.sendToUserId(user.internal_user_id,req.body.matchedUserId,'MATCH_CARD','You have a new matched card with Kevin Wrangler.',null,0,null)
            }
            const data = await Match.create(match);
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

export default { create };
