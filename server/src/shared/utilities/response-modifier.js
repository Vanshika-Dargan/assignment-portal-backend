export const excludeFields = (input, fieldsToExclude = []) => {

    const filterUser = (user) => {
        if (!user || typeof user.toObject !== 'function') {
            throw new Error('Provided argument is not a valid Mongoose document');
        }
        const userObj = user.toObject();
        const filteredRes = Object.keys(userObj).reduce((acc, key) => {
            if (!fieldsToExclude.includes(key) && key !== 'password') {
                acc[key] = userObj[key]; 
            }
            return acc;
        }, {});
        return filteredRes;
    };


    if (Array.isArray(input)) {
        return input.map(user => filterUser(user)); 
    } else {

        return filterUser(input); 
    }
};

