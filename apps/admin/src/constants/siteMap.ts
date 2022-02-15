type SiteMap = { [key: string]: string }
const siteMap: SiteMap = {
  '': 'Home',
  '/admin': 'Dashboard',
  '/admin/users': 'Quản lý người dùng',
  '/admin/categories': 'Quản lý thể loại',
  '/admin/posts': 'Quản lý bài viết',
  '/options': 'Cấu hình hệ thống',
  '/options/header': 'Cấu hình header',
}

export default siteMap
