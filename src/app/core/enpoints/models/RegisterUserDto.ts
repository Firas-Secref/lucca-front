export class RegisterUserDto{
  username:string;
  password:string;
  firstname:string;
  lastname:string;
  email:string;
  address:string;
  city:string;
  country:string;
  startDate:string;
  rolename:string;


  constructor(username: string, password: string, firstname: string, lastname: string, email: string, address: string, city: string, country: string, startDate: string, rolename: string) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
    this.startDate = startDate;
    this.rolename = rolename;
  }
}
