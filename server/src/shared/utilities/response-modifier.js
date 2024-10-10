export const excludeFields = (users, fieldsToExclude = []) => {
    if (!Array.isArray(users)) {
        throw new Error('Provided argument is not a valid array of Mongoose documents');
    }
    return users.map(user => {
        if (!user || typeof user.toObject !== 'function') {
            throw new Error('One of the provided arguments is not a valid Mongoose document');
        }
        const userObj = user.toObject();
        const filteredRes = Object.keys(userObj).reduce((acc, key) => {
            if (!fieldsToExclude.includes(key) && key !== 'password') {
                acc[key] = userObj[key]; 
            }
            return acc;
        }, {});

        return filteredRes; 
    });
};
