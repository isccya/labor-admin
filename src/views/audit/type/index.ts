export interface LaborList {
    /**
     * 姓名
     */
    name: string;
    /*
    * 学院
    */
    college: string;
    /**
     * 年级
     */
    grade: string;
    /**
    * 班级
    */
    class: string;
    /**
   * 审核状态
   */
    status: number;
}

export interface UserInfo{
    /*
    * 姓名
    */
    name:string,
    /*
    * 学院
    */
    college:string,
    /*
    * 年级
    */
    grade:string,
    /*
    * 班级
    */
    class:string,
    /*
    * 学号
    */
    studentNo:string,
    /*
    * 成绩
    */
    score:number
}