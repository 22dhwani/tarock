import sql from "../../config/db.js";

const Explore = function(explore) {
    this.id = explore.id;
    this.image = explore.image;
    this.title = explore.title;
    this.author = explore.author;
    this.time = explore.time;
    this.link = explore.link;
}

async function getAll() {
    const data = await sql.query("SELECT * FROM explore;");
    return data[0];
}

async function getForUser(id) {
    const data = await sql.query("select *, CASE WHEN EXISTS(select * from user_to_explore where `user_to_explore`.`internal_user_id` = ? AND `user_to_explore`.`explore_id` = explore.id) then 1 else 0 end as is_liked from `explore`;",[id]);
    return data[0];
}


export default { getAll,getForUser };