export const checkValidData = (email , password) =>{
    // eslint-disable-next-line no-useless-escape
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid) return "Email ID is not valid"
    if(!isValidPassword) return "Password is not valid"

    return null;
}