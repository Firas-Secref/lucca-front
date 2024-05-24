export const api_locale = "http://localhost:8080/"


export const holidays_api = (year: number)=>  (` https://date.nager.at/api/v3/PublicHolidays/${year}/TN`)

export const endpoints = {

  "login": `${api_locale}login`,
  "register": `${api_locale}register`,
  "updateUser": `${api_locale}updateUser`,
  "deleteUser": `${api_locale}deleteUser`,
  "getCurrentUser": `${api_locale}getCurrentUser`,
  "addNewRequest": `${api_locale}addNewRequest`,
  "getMyRequests": `${api_locale}getMyRequests`,
  "getRequestSentToRh": `${api_locale}getRequestSentToRh`,
  "getMyEmployeeRequests": `${api_locale}getMyEmployeeRequests`,
  "getAllEmployeesHolidays": `${api_locale}getAllEmployeesHolidays`,
  "getAllUsers": `${api_locale}getAllUsers`,
  "changeRequestStatus": `${api_locale}changeRequestStatus`,
  "newInterview": `${api_locale}newInterview`,
  "getUserDetails": `${api_locale}getUserDetails`,
  "getInterviewsByEmployee": `${api_locale}getInterviewsByEmployee`,
  "getInterviewDetails": `${api_locale}getInterviewDetails`,
  "addAnswerToQuestion": `${api_locale}addAnswerToQuestion`,
  "completeInterview": `${api_locale}completeInterview`,
  "getUserById": `${api_locale}getUserById`,
  "addNoteToEmployee": `${api_locale}addNoteToEmployee`,
  "getAllHomeOfficeRequests": `${api_locale}getAllHomeOfficeRequests`,
  "newFeedback": `${api_locale}newFeedback`,
  "employeeFeedBack": `${api_locale}employeeFeedBack`,
  //
  // "analyse": `${api_analyse}analyseCV`,
  //
  // "newEvent": `${api_locale}addNewEvent`,
  // "allEvents": `${api_locale}allEvents`,
  // "allInterviews": `${api_locale}allInterviews`,
  // "updateEvent": `${api_locale}updateEvent`,
  // "newInterview": `${api_locale}newInterview`,
  //
  // "pushNotificationUser": `${api_locale}pushNotificationUser`,
  // "myReqNotifications": `${api_locale}myReqNotifications`,


}
