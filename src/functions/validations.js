const areFieldsValid = (name, surname, email, password, phone) => {
    if (!name || !surname || !email || !password || !phone) {
        return {
            success: false,
            message: "Please fill in all the fields",
        };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    const phoneRegex = /^(?:\+\d{1,2}\s?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,10}[-.\s]?\d{1,10}$/.test(phone);

    if (!emailRegex) {
        return {
            success: false,
            message: "Invalid email format",
        };
    }

    if (!passwordRegex) {
        return {
            success: false,
            message: "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number",
        };
    }

    if (!phoneRegex) {
        return {
            success: false,
            message: "Invalid phone number",
        };
    }

    return {
        success: true,
    };
};

export { areFieldsValid };
