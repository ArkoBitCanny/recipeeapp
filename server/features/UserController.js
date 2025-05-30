import UserRepository from "./UserRepository.js";


export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }


    async userLogin(req, res) {
        try {
            const { mail, password } = req.body;
            const exist = await this.userRepository.Login(mail);
            if (!exist) return res.status(400).send({ success: false, msg: "Not a valid User" });
            if (exist.password !== password) return res.status(400).send({ success: false, msg: "Not a valid User" });
            return res.status(201).send({ success: true, msg: "Login Successful", data: exist });
        } catch (error) {
            console.log(error);
        }
    }

    async userSignUp(req, res) {
        try {
            const { name, mail, password } = req.body;
            const exist = await this.userRepository.Login(mail);
            if (exist) return res.status(400).send({ success: false, msg: "Already User" });
            const user = await this.userRepository.Signup({ name, mail, password });
            if (!user) return res.status(400).send({ success: false, msg: 'User Not Registered' });
            return res.status(200).send({ success: true, data: user, msg: "Sign up Successfull" });
        } catch (error) {
            console.log(error);
        }
    }
}