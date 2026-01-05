import { defineStore } from "pinia";
import { toast, type ToastOptions } from "vue3-toastify";

/**
 * 토스트 알림
 */
export const useToastStore = defineStore("toastStore", () => {
  const defaultOption = {
    autoClose: 4000,
    theme: toast.THEME.COLORED,
    position: toast.POSITION.TOP_CENTER,
    type: toast.TYPE.INFO,
    pauseOnHover: true,
    dangerouslyHTMLString: true,
    //toastId: "customId",
    //  style:{},
    //   hideProgressBar:false,
    //    progress: "",
    //autoClose:false,
    //pauseOnFocusLoss: false,
  };

  /**
   * 토스트 알림 활성화
   * @param msg 토스트 알림 메시지
   * @param option 사용자 지정 옵션
   */
  const notify = (msg: string, option: object) => {
    toast.clearAll();
    if (option == undefined) {
      option = defaultOption;
    }
    toast(msg, option as ToastOptions);
  };
 
  return {
    notify
  };
});
