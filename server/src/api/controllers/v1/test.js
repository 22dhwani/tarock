import crypto from 'crypto';

async function test(req,res){        
    res.send(req.body)
}

export default { test };