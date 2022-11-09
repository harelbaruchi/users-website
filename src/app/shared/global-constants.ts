export class GlobalConstants{
    //Message
    public static genericError: string="something went wrong. please try again later.";

    public static unauthorized: string = " you are not authorized person to access this page"

    //Regex
    public static nameRegex: string="[a-zA-Z0-9 ]*";

    public static emailRegex: string="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex: string="^[e0-9]{10,10}$";

    //variable
    public static error: string="error";

    public static success: string="success";

    public static showFlag: boolean=true;

    //url 
    public static usersUrl: string="'https://randomuser.me/api/?results=10'"


}