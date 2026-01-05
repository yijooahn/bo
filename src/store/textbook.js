import axios from 'axios';
import { defineStore } from 'pinia';

/**
 * 학과목 목록 조회 공통 모듈
 */
export const useTextbookStore = defineStore('textbookCd', () => {

    /**
     * 학과목별 코드 및 학과목명을 조회
     * @param {*} subjectList 학과목 목록(학과목별 코드 및 학과목명)
     * @param {string} selectedSubjectNm 화면에 보이는 학과목명
     * @param {string} addString 최초 진입 시 선택될 학과목명
     */
    const getTextbookCodeList = async (subjectList, selectedSubjectNm, addString = null) => {
        try {
            const response = await axios.post(`/coachmark/sbjctlist`);
            if (response.data != null) {
                subjectList.value = response.data.map(item => ({ comCdId: item.comCdId, comCdNm: item.comCdNm}));
                if (addString != undefined && addString != null) {
                    subjectList.value.unshift({ comCdId: 'addString', comCdNm: addString });
                }
                selectedSubjectNm.value = subjectList.value[0].comCdNm;
            }
        }catch (err){
            if (err.response != null) {
                if (err.response.status != null) {

                }
            }
        }
    }

    return { getTextbookCodeList }
})