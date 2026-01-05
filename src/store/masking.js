import axios from 'axios';
import { defineStore } from "pinia";

/**
 * 마스킹 해제를 위한 axios 통신 공통 모듈
 */
export const useMaskingStore = defineStore("masking", () => {
    
    /**
     * 마스킹 해제 모달을 통해 화면별 마스킹 해제 요청
     * @param {string} endpoint 조회 엔드포인트
     * @param {string} msg 마스킹 해제 사유
     * @param {*} searchResult 마스킹 해제된 조회 결과
     * @param {*} masking 마스킹 여부
     * @param {*} inquiry 마스킹 해제된 조회
     */
    const triggerSubmitMasking = async (endpoint,msg,searchResult,masking,inquiry) => {
        const tempSearchResult = searchResult.value;
        masking.value = false;
        try{
            const response = await inquiry(masking.value);
            let param = {
                endPoint : endpoint,
                mskgRsn: msg,
                rmvMbrCnt: searchResult.value.length
            };
        
            try {
                const response = await axios.post('/masking/create', param)
                if (response.status != null) {
                    if (response.status == 201) {
                    }else{
                        searchResult.value = tempSearchResult;
                    }
                }
            } catch (err) {
                searchResult.value = tempSearchResult;
                if (err.repsonse != null) {
                    if (err.response.status != null) {
                        if (err.response.status == 500) {
                        }
                    }
                }
            }
        }catch (err){
            if (err.repsonse != null) {
                if (err.response.status != null) {
                }
            }
        }
    }
    return { triggerSubmitMasking };
});
