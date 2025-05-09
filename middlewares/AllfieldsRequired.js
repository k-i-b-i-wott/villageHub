

export const AllfieldsRequired = (req, res, next) => {
    const { firstName, lastName, emailAddress, userName, password, address, phoneNumber } = req.body;
    if (!firstName || !lastName || !emailAddress || !userName || !password || !address || !phoneNumber) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    next();
};