import axios from 'axios';
import { defineStore } from 'pinia';

/**
 * 화면 목록 조회 공통 모듈
 */
export const useUiStore = defineStore('uiCd', () => {

  /**
   * 화면별 코드 및 화면명을 조회
   * @param {string} endPoint 대상 화면
   * @param {string} trgt 교사용/학생용 구분
   * @param {*} list 화면 목록(화면별 코드 및 화면명)
   * @param {string} selectedNm 조회시점 화면에 보이는 화면명
   */
  const getUiCodeList = async (endPoint, trgt, list, selectedNm) => {
    try {
      let target = trgt.value == '교사용' ? 'TCHR' : 'STDNT';
      const response = await axios.get(`${endPoint}/menuinquiry/${target}`);
      if (response.data != null) {
        if (endPoint.includes('coachmark')) {
          list.value = response.data.coachmarkist.map(item => ({ scrnId: item.scrnId, scrnTtl: item.scrnTtl }));
          //selectedNm.value = list.value[0].scrnTtl;
          selectedNm.value = '선택';
        } else if (endPoint.includes('guidevideo')) {
          list.value = response.data.guidevideoDtoList.map(item => ({ uiId: item.uiId, uiTtl: item.uiTtl }));
          //selectedNm.value = list.value[0].uiTtl;
          selectedNm.value = '선택';
        } else if (endPoint.includes('tooltip')) {
          list.value = response.data.tooltipDtoList.map(item => ({ uiId: item.uiId, uiTtl: item.uiTtl }));
          //selectedNm.value = list.value[0].uiTtl;
          selectedNm.value = '선택';
        }
      }
    }catch (err){
      if (err.response != null) {
        if (err.response.status != null) {

        }
      }
    }
  }
  return { getUiCodeList }
})