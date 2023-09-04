import { defineStore } from "pinia";
import { getTermList, getCollegeList, getGradeList } from '@/api/basicInfo'

const useBasicInfoStore = defineStore(
    'basicInfo',
    {
        state: () => ({
            auditUser:{},
            termList: [],
            collegeList: [],
            gradeList: []
        }),
        actions: {
            getTermList(TermList) {
                if (this.termList.length === 0) {
                    getTermList().then((res) => {
                        this.termList = res.data;
                        TermList.push(...this.termList);
                    })
                }
                else {
                    TermList.push(...this.termList);
                }
            },
            getCollegeList(CollegeList) {
                if (this.collegeList.length === 0) {
                    getCollegeList().then((res) => {
                        this.collegeList = res.data;
                        CollegeList.push(...this.collegeList);
                    })
                }
                else {
                    CollegeList.push(...this.collegeList);
                }
            },
            getGradeList(GradeList) {
                if (this.gradeList.length === 0) {
                    getGradeList().then((res) => {
                        this.gradeList = res.data;
                        GradeList.push(...this.gradeList);
                    })
                }
                else {
                    GradeList.push(...this.gradeList);
                }
            },
            
        }
    },
)

export default useBasicInfoStore