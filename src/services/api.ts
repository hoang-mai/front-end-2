export const login ='/api/v1/auth/login'
export const logout ='/api/v1/auth/logout'
export const refresh= 'api/v1/auth/refresh'

//admin
export const adminCreateAccount ='/api/v1/admin/account/create'
export const adminGetAllAccounts ='/api/v1/admin/account/all'
export const adminResetAccountPassword ='/api/v1/admin/account/reset-password'
export const adminChangeAccountPassword='api/v1/admin/account/change-password'
export const adminCreateAnnouncement ='/api/v1/admin/announcement/create'
export const adminGetAllAnnouncements ='/api/v1/admin/announcement/all'
export const adminAnnouncement ='/api/v1/admin/announcement'
export const adminUpdateAnnouncement ='/api/v1/admin/announcement/update'
export const adminGetAllUsers ='/api/v1/admin/users/all'
export const adminGetUserStudent ='/api/v1/admin/users/student'
export const adminUpdateUserStudent ='/api/v1/admin/users/update/student'
export const adminGetUserAdmin ='/api/v1/admin/users/admin'
export const adminUpdateUserAdmin ='/api/v1/admin/users/update/admin'
export const adminSubject ='/api/v1/admin/subject'
export const adminCreateSubject ='/api/v1/admin/subject/create'
export const adminGetAllSubjects ='/api/v1/admin/subject/all'
export const adminUpdateSubject ='/api/v1/admin/subject/update'
export const adminGetAllHomeRooms ='/api/v1/admin/homeroom/all'
export const adminCreateHomeRoom ='/api/v1/admin/homeroom/create'


//student
export const studentChangeAccountPassword ='/api/v1/student/account/change-password'
export const studentInformation ='/api/v1/student/information'
export const studentGetAllSubjects ='/api/v1/student/subject/all'
export const studentSubject='/api/v1/student/subject'

//search
export const searchUser='/api/v1/search/user'
export const searchUserView='/api/v1/search/user/view'