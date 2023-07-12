//常量不知道为啥不能被定义，该处已纠结

declare type HomeQueryVo = {
    pageNum: number
    pageSize: number
}

//用户岗位信息类型
declare type RoleType = {
    id:string,
    type:string,
    name:string,
}

//用户登录获得信息类型
declare type UserInfoType = {
    id:string,
    name:string,
    password:string,
    currentRole?:RoleType
    role:Array<RoleType>,
}

//菜单信息类型
declare type MenuType = {
    id:string,
    name:string,
    child:Array<MenuType>
}
