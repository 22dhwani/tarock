import Match from "../../models/match.js";
import notification from "../../models/notification.js";
import User from "../../models/user.js";

async function create(req, res) {
    if (req.body.origUserId === req.body.matchedUserId) {
        res.status(422).json(
            {
                message:"Original user ID and matched user ID cannot be the same.",
                status: 0,
            }
        );
        return;
    } else {
        const match = new Match.Match({
            origUserId: req.body.origUserId,
            matchedUserId: req.body.matchedUserId,
        });       

        try {
            let user = await User.queryReal(req.body.origUserId)
            user = user[0]
            if(user.is_notification_on && user.is_match_card_notification_on ){
                await notification.sendToUserId(user.internal_user_id,req.body.matchedUserId,'MATCH_CARD','You have a new matched card with Kevin Wrangler.',null,0,null)
            }
            const data = await Match.create(match);
            res.status(422).json(
                {
                    message:"User matched",
                    status: 1,
                }
            );
            return;
        } catch (error) {
            res.status(422).json(
                {
                    error:error.message,
                    message:"Something went wrong",
                    status: 0,
                }
            );
            return;
        }
    }
};

export default { create };