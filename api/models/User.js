var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        /**
         * User alias, only alphanumericdashed supported and unique
         * 
         * @type        string
         * @required    true
         */
        username: {
            type: 'string',
            required: true,
            unique: true,
            alphanumericdashed: true
        },

        /**
         * User password hashed. 
         * 
         * @type        string
         */
        password: {
            type: 'string'
        },

        /**
         * User email, unique
         * 
         * @type      string
         * @required  true
         */
        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },

        /**
         * User firstname and lastname.
         * 
         * @type      string
         */
        firstName: {
            type: 'string',
            defaultsTo: ''
        },
        lastName: {
            type: 'string',
            defaultsTo: ''
        },

        /**
         * User avatar URL.
         * 
         * @type      string
         */
        photo: {
            type: 'string',
            defaultsTo: '',
            url: true
        },

        /**
         * Information about connect to social profiles (facebook, google , ...)
         * 
         * @type  object
         */
        socialProfiles: {
            type: 'object',
            defaultsTo: {}
        },

        /**
         * Active account or not, default active when register
         * 
         * @type  boolean [true]
         */
        is_actived: {
            type: 'boolean',
            defaultsTo: true
        }, 

        /**
         * Default real member must be actived by verify
         * 
         * @type  boolean [true]
         */
        is_verified: {
            type: 'boolean',
            defaultsTo: false
        }, 

        /**
         * Method of verify
         * 
         * @type  boolean [true]
         */
        verified_by: {
            type: 'string',
            defaultsTo: ''
        }, 

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.socialProfiles;
            return obj;
        }
    },
    
    beforeUpdate: function(values, next) {
        if (values.newPassword) {
            values.password = values.newPassword;
            CipherService.hashPassword(values);
        }

        next();
    },

    beforeCreate: function(values, next) {
        CipherService.hashPassword(values);
        next();
    },

    changePassword: function(userid, oldPass, newPass, next) {
        this.findOne(userid).exec(function (err, theUser) {
            if (err) return next(new Error('User not found!'));

            if (!CipherService.comparePassword(oldPass, theUser)) {
                return next({ error: 'Old password was invalid!' });
            }

            theUser.newPassword = newPass;
            theUser.save(next);
        })
    },

    resetPassword: function(userid, newPass, next) {
        this.findOne(userid).exec(function (err, theUser) {
            if (err) return next(new Error('User not found!'));

            theUser.newPassword = newPass;
            theUser.save(next);
        })
    },
};

module.exports = User;
