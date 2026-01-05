import { defineStore } from "pinia";

/**
 * 비밀번호 유효성 체크 로직 공통 모듈
 */
export const useMemberStore = defineStore("members", () => {

  /**
   * 비밀번호 유효성 체크
   * @param {string} password 비밀번호
   * @returns boolean
   */
  const pr1 = (password) => {
    // 8~15자의 비밀번호 및 최소한 1개의 영문자/숫자/특수문자 포함 여부
    const reg = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@$%^&*]).{8,15}$/;
    if (!reg.test(password.value)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * 비밀번호 유효성 체크
   * @param {string} password 비밀번호
   * @param {string} email 이메일
   * @returns boolean
   */
  const pr2 = (password, email) => {
    // 비밀번호가 4자 이상인 경우 이메일 주소의 사용자 이름 부분과 비밀번호의 연속도니 4자의 중복 여부
    if (password.value.length > 3) {
      let amlAddr = email.value;
      if (amlAddr.includes("@")) {
        amlAddr = amlAddr.substring(0, amlAddr.indexOf("@"));
      }
      for (let i = 0; i <= password.value.length - 4; i++) {
        if (amlAddr.includes(password.value.substring(i, i + 4))) {
          return false;
        } else if (i == password.value.length - 4) {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  /**
   * 비밀번호 유효성 체크
   * @param {string} password 비밀번호
   * @returns boolean
   */
  const pr3 = (password) => {
    // 비밀번호에 허용된 항목만 포함되었는지 여부
    var ext = password.value
      .replace(/[a-zA-Z0-9]/gi, "")
      .replace(/[!@$%^&*]/gi, "");
    if (ext !== "") {
      return false;
    } else {
      return true;
    }
  };

  /**
   * 비밀번호 유효성 체크
   * @param {string} password 비밀번호
   * @returns boolean
   */
  const pr4 = (password) => {
    var pw = password.value;
    var reg = /(\w)\1\1/; // 동일 영문자&숫자 연속 3번
    var reg2 = /[!@$%^&*]{3,}/g; // 특수문자 연속 3회
    var reg3 = /(012)|(123)|(234)|(345)|(456)|(567)|(678)|(789)|(890)|(901)/; // 연속된 숫자
    var reg4 =
      /(abc)|(bcd)|(cde)|(def)|(efg)|(fgh)|(ghi)|(hij)|(ijk)|(jkl)|(klm)|(lmn)|(mno)|(nop)|(opq)|(pqr)|(qrs)|(rst)|(stu)|(tuv)|(uvw)|(vwx)|(wxy)|(xyz)|(yxa)|(ABC)|(BCD)|(CDE)|(DEF)|(EFG)|(FGH)|(GHI)|(HIJ)|(IJK)|(JKL)|(KLM)|(LMN)|(MNO)|(NOP)|(OPQ)|(PQR)|(QRS)|(RST)|(STU)|(TUV)|(UVW)|(VWX)|(WXY)|(XYZ)|(YZA)/;
      // 연속된 알파벳

    if (reg.test(pw) || reg2.test(pw) || reg3.test(pw) || reg4.test(pw)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * 쿠키 제거
   */
  const removeUserInfo = () => {
    if (document.cookie.split(';').filter(el => el.includes('lastLoggedIn')).length > 0) {
      document.cookie = "lastLoggedIn=; Max-Age=0; path=/;";
    }
    if (document.cookie.split(';').filter(el => el.includes('UserInfo')).length > 0) {
      document.cookie = "UserInfo=; Max-Age=0; path=/;";
    }
    if (document.cookie.split(';').filter(el => el.includes('maskedId')).length > 0) {
      document.cookie = "maskedId=; Max-Age=0; path=/;";
    }
  }
  return { pr1, pr2, pr3, pr4, removeUserInfo };
});
