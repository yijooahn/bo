import { defineStore } from "pinia";

/**
 * 목록 화면에서 컬럼 별 정렬 공통 모듈
 */
export const useSortStore = defineStore("sort", () => {

    /**
     * 화면별 특정 컬럼 기준 정렬
     * @param {string} sortColumn 최초 화면 진입 시점 정렬 대상 기준 컬럼
     * @param {string} col 변경 정렬 대상 기준 컬럼
     * @param {boolean} ascending 오름차순 여부
     */
    const sortTable = (sortColumn,col,ascending) => {
        if (sortColumn.value === col) {
          ascending.value = !ascending.value;
        } else {
          ascending.value = true;
          sortColumn.value = col;
        }
        // list.value.sort(function(a, b) {
        //   if (a[col] > b[col]) {
        //     return ascending.value ? 1 : -1
        //   } else if (a[col] < b[col]) {
        //     return ascending.value ? -1 : 1
        //   }
        //   return 0;
        // });
  }
  return { sortTable };
});
