export interface LaborPlan {
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
    term: string;
    /**
     * 主管老师
     */
    mentorName: string;
}

export interface LaborPlanForm {
    /**
     * 等级
     */
    level: string;
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
    mentorName: string;
    /**
     * 指导老师工号
     */
    mentor: string;
    /**
     * 期限
     */
    deadline: string;
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