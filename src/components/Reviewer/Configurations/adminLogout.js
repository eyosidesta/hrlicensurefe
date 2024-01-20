const logout = (router) => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("allAdminData")
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    router.push({path: "/admin"});
}

export default logout;