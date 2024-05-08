export class UpdateUserRequestDto{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  rolename: string;
  startDate: string;
  country: string;
  departmentId: number;


  constructor(username: string, password: string, firstname: string, lastname: string, email: string, address: string, city: string, rolename: string, startDate: string, country: string, departmentId: number) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.city = city;
    this.rolename = rolename;
    this.startDate = startDate;
    this.country = country;
    this.departmentId = departmentId;
  }
}
