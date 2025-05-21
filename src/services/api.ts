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


//student
export const studentChangeAccountPassword ='/api/v1/student/account/change-password'
export const studentInformation ='/api/v1/student/information'

//search
export const searchUser='/api/v1/search/user'
export const searchUserView='/api/v1/search/user/view'