async function getUser(req,res){          
    let user = res.user;
    if(!user){
        res.status(422).json(
            {
                data:user,
                message: "User Not found",
                status: 0,
            }
        );
    }  
    res.json(
        {
            data: user,
            message: "User returned",
            status: 1,
        }
    );
    
}


export default { getUser };
