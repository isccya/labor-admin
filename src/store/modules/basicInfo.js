import { defineStore } from "pinia";
import { getTermList, getCollegeList, getGradeList} from '@/api/basicInfo'

const useBasicInfoStore = defineStore(
    'basicInfo',
    {
        state: () => ({
            termList: [],
            collegeList: [],
            gradeList: []
        }),
        actions: {
            getTermList() {
                return new Promise((resolve, reject) => {
                    getTermList().then((res) => {
                        this.termList = res.data;
                        resolve();
                    }).catch((error) => {
                        reject(error)
                    })
                })
            },
            getCollegeList() {
                return new Promise((resolve, reject) => {
                    getCollegeList().then((res) => {
                        this.collegeList = res.data;
                        resolve();
                    }).catch((error) => {
                        reject(error)
                    })
                })
            },
            getGradeList() {
                    return new Promise((resolve, reject) => {
                        getGradeList().then((res) => {
                            this.gradeList = res.data;
                            resolve();
                        }).catch((error) => {
                            reject(error)
                        })
                    })
            }
        }
    },
)

export default useBasicInfoStore