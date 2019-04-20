const Query = {
    users: (parent, args, ctx, info) =>  {
        const users = ctx.db.query.users({}, info);
        return users;
    }
}

module.exports = Query;