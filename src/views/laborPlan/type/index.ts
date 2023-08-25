export interface LaborPlan {
    /**
     * 等级
     */
    planRank:string
    /**
     * 学院
     */
    college: string;
    /**
     * 年级
     */
    grade: string;
    /**
     * 学期
     */
    termName: string;
    /**
     * 主管老师
     */
    advisor: string;
}

export interface LaborPlanForm {
    /**
     * 等级
     */
    planRank: string;
    /**
     * 学期
     */
    term: string;
    /**
     * 学院
     */
    college ?: string;
    /**
     * 年级
     */
    grade: string;
    /**
     * 指导老师
     */
    advisor: string;
     /**
     * 开始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 
     */
    dailyLabor: number;
    /**
     * 指导老师工号
     */
    collectiveLabor: number;
    /**
     * 指导老师工号
     */
    societyLabor: number;
    /**
     * 指导老师工号
     */
    otherLabor: number;
}

export interface TermList{
    /**
     * 学期id
     */
    termId:number,
    /**
     * 学期名
     */
    termName:string,
}

export interface CollegeList{
    /**
     * 学院id
     */
    collegeId:string,
    /**
     * 学院名
     */
    collegeName:string,
}
