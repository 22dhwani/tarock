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


export default { getAll };