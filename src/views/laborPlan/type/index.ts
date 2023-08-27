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
     * 劳动计划id
     */
    planId?:string|number;
    /**
     * 等级
     */
    planRank: string|number;
    /**
     * 学期
     */
    termId: number|string;
    /**
     * 学院
     */
    collegeId ?: number|string;
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
     * 日常劳动记录
     */
    dailyAmount: number;
    /**
     * 集中劳动记录
     */
    centralAmount: number;
    /**
     * 社会实践劳动记录
     */
    societyAmount: number;
    /**
     * 其它劳动记录
     */
    otherAmount: number;
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
