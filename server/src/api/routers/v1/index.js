import test from '../../controllers/v1/test.js';
import User from '../../controllers/v1/user.js';
import Card from '../../controllers/v1/card.js';
import Notification from '../../controllers/v1/notification.js';
import Explore from '../../controllers/v1/explore.js';
import question from '../../controllers/v1/question.js';
import personalityInsight from '../../controllers/v1/personalityInsight.js';
import match from '../../controllers/v1/match.js';
import exploreComment from '../../controllers/v1/exploreComment.js';
import dailyQuestionComment from '../../controllers/v1/dailyQuestionComment.js';
import express from 'express';
import ApiToken from '../../models/apiToken.js';
import dailyQuestion from '../../controllers/v1/dailyQuestion.js';

export default function(app) {
    const router = express.Router();

    //MIDDLEWARE for AUTH
    router.all("/auth/*", async (req, res, next) => {
        if(!req.headers || !req.headers.authorization){
            res.status(422).json(
                {
                    message:"Unauthorized",
                    status: 0,
                }
            );
            return;
        }
        let user = null
        try {
            user = await ApiToken.getUserByBearerToken(req.headers.authorization);
        } catch (error) {
            res.status(422).json(
                {
                    error: error.message,
                    message:"Unauthorized",
                    status: 0,
                }
            );
            return;
        }
        res.user = user
        next()
    });

    try {
        //SEND-NOTIFICATION
        router.get("/send-for-new-blog", User.sendForNewBlog);
        router.get("/send-for-daily-question", User.sendForDailyQuestion);

        //USER LOGIN FLOW
        // sdsssdsd
        router.get("/get-user-type", User.getUserType);  //to get the type of user (NEW,TMP,REAL)
        router.post("/create-temp-user", User.createTempUser); //to create the temp user with device id
        router.post("/create-real-user", User.createRealUser); //to create a real user with device id
        router.post("/user/login", User.login); //login the user(return the token)
        router.post("/user/forgot-password", User.forgotPassword); //forgot password
        //SOCIAL LOGIN
        router.post("/user/social-login", User.socialLogin);


        //CONTACT US AND REQUEST DATA(EMAILS)
        router.post("/user/request-data", User.requestData); 
        router.post("/user/contact-us", User.contactUs); 

        //TEST(to quickly test some code)
        router.post("/test", test.test);
        router.post("/auth/test", test.test); //test with auth
        router.get("/get-token", test.getToken); //test api to get the 

        //QUESTIONS
        router.get("/questions", question.getQuestion);
        router.post("/questions/add-result", question.addResult);
        
        //API INSIDE AUTH
        router.get("/auth/user", User.getUser);
        router.post("/auth/logout", User.logout);
        router.post("/auth/user-edit", User.editUser);    
        router.delete("/auth/delete-user", User.deleteUser);

        //CARDS
        router.get("/auth/get-user-card", Card.getUserCard);
        router.get("/auth/get-type-card", Card.getTypeCard);
        router.post("/auth/add-card", Card.addCard);
        router.delete("/auth/delete-card", Card.deleteCard);

        //explore
        router.get("/auth/explore", Explore.index);
        router.post("/auth/explore/like-toggle", Explore.likeToggle);

        //EXPLORE COMMENTs
        router.get("/auth/explore/comments", exploreComment.index);
        router.post("/auth/explore/comments/add", exploreComment.create);
        router.post("/auth/explore/comments/like-toggle", exploreComment.likeToggle);

        //AUTH QUESTION
        router.post("/auth/question/update", question.updateResult);
        router.post("/auth/question/rate", question.rateResult);

        //DAILY QUESTIONS
        router.get("/auth/daily-question/get-today-question", dailyQuestion.getTodayQuestion);
        router.post("/auth/daily-question/submit-answer", dailyQuestion.answer);
        router.get("/auth/daily-question/get-submited-answer", dailyQuestion.getAnswer);
        router.get("/auth/daily-question/get-question-stats", dailyQuestion.getStats);
        router.get("/auth/daily-question/get-option-stats", dailyQuestion.getOptionStats);

        //DAILY QUESTION COMMENTS
        router.get("/auth/daily-question/comments", dailyQuestionComment.index);
        router.post("/auth/daily-question/comments/add", dailyQuestionComment.addComment);
        router.post("/auth/daily-question/comments/like-toggle", dailyQuestionComment.likeToggle);

        //NOTIFICATION
        router.get("/auth/notifications", Notification.index);
        router.get("/auth/notifications/:id/read", Notification.readNotification);

        //PERSONALITY INSIGHT
        router.get("/auth/get-insights", personalityInsight.index);

        //match
        router.post("/match", match.create);

        app.use("/api/v1", router);
    } catch (error) {
        res.status(422).json(
            {
                error: error.message,
                message:"Unauthorized",
                status: 0,
            }
        );
        return;
    }
    
}
// Added: to restart 