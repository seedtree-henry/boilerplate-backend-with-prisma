const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Mutations = {
    signUp: async (parent, args, ctx, info) => {
        const email = args.email.toLowerCase();
        const name = args.name;
        const password = await bcrypt.hash(args.password, 15);

        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    email,
                    name,
                    password
                } 
            },
            info
        );
        // jwt Token (frontend)

        return user;
    },
    signIn: async (parent, args, ctx, info) => {
        const email = args.email;
        const password = args.password;
        const user = await ctx.db.query.user({ where: { email } });

        if (!user) {
            throw new Error('No user found!!!');
        } 

        console.log(user);
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error('Invalid Password!');
        }
        // jwt Token (frontend)

        return user;
    }
}

module.exports = Mutations;