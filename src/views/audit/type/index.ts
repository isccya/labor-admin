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
    * 是否被审核 0-否 1-是
    */ 
    checked:number,
    /*
    * 姓名
    */
    studentName:string,
    /*
    * 学院
    */
    collegeName:string,
    /*
    * 年级
    */
    grade:string|number,
    /*
    * 班级
    */
    className:string,
    /*
    * 学号
    */
    studentId:string,
    /*
    * 成绩
    */
    score:number
}