import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/", redirect: "/main" },
  { path: "", redirect: "/main" },
  //로그인 페이지
  {
    path: "/login",
    component: () => import("@/views/pages/member/Login.vue"),
    name: "loginView",
    meta: { requiresAuth: false },
  },
  //회원가입 페이지
  {
    path: "/signUp",
    component: () => import("../views/pages/member/SignUp.vue"),
    name: "signUpView",
    meta: { requiresAuth: false },
  },
  //회원가입 신청완료 페이지
  {
    path: "/afterSignUp",
    component: () => import("../views/pages/member/AfterSignUp.vue"),
    name: "afterSignUpView",
    meta: { requiresAuth: false },
  },
   //에러 페이지
  {
    path: "/ErrPage",
    component: () => import("@/views/pages/common/ErrPage.vue"),
    name: "errPageView",
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/ErrPage"
  },
  // 임시 메인 페이지
  {
    path: '/main',
    component: () => import('@/views/pages/common/TempMainPage.vue'),
    name:'tempMainView',
    meta: { requiresAuth: true }
  },
  //시스템계정관리 페이지
  {
    path: '/accountMng',
    component: () => import('@/views/pages/account/AccountMng.vue'),
    name:'accountMngView',
    meta: { requiresAuth: true }
  },
  //시스템계정생성 페이지
  {
    path: '/accountMngWrite',
    component: () => import('@/views/pages/account/AccountMngWrite.vue'),
    name:'accountMngWriteView',
    meta: { requiresAuth: true }
  },
  //시스템계정수정 페이지
  {
    path: '/accountMngModify',
    component: () => import('@/views/pages/account/AccountMngModify.vue'),
    name:'accountMngModifyView',
    meta: { requiresAuth: true }
  },
    //내 정보 수정 페이지
  {
    path: '/myInfoModify',
    component: () => import('@/views/pages/account/MyInfoModify.vue'),
    name:'myInfoModifyView',
    meta: { requiresAuth: true }
  },
  //계정별권한관리 페이지
  {
    path: '/acntAuthrtMng',
    component: () => import('@/views/pages/authority/AcntAuthrtMng.vue'),
    name:'authrtMngView',
    meta: { requiresAuth: true }
  },
  //계정별권한생성 페이지
  {
    path: '/acntAuthrtMngModify',
    component: () => import('@/views/pages/authority/AcntAuthrtMngModify.vue'),
    name:'acntAuthrtMngModifyView',
    meta: { requiresAuth: true }
  },
  //그룹별권한관리 페이지
  {
	path: '/groupAuthrtMng',
    component: () => import('@/views/pages/authority/GroupAuthrtMng.vue'),
    name:'groupAuthrtMngView',
    meta: { requiresAuth: true }
  },
  //그룹별권한생성 페이지
  {
	path: '/groupAuthrtMngWrite',
    component: () => import('@/views/pages/authority/GroupAuthrtMngWrite.vue'),
    name:'groupAuthrtMngWriteView',
    meta: { requiresAuth: true }
  },
  //코치마크 관리 목록
  {
    path: "/coachMarkMng",
    component: () => import("@/views/pages/service/CoachMarkMng.vue"),
    name: "coachMarkMngView",
    meta: { requiresAuth: true },
  },
  //코치마크 관리 등록
  {
    path: "/coachMarkMngWrite",
    component: () => import("@/views/pages/service/CoachMarkReg.vue"),
    name: "coachMarkRegView",
    meta: { requiresAuth: true },
  },
  //코치마크 관리 상세
  {
    path: "/coachMarkMngRead",
    component: () => import("@/views/pages/service/CoachMarkDtl.vue"),
    name: "coachMarkDtlView",
    meta: { requiresAuth: true },
  },
  //코치마크 관리 수정
  {
    path: "/coachMarkMngModify",
    component: () => import("@/views/pages/service/CoachMarkMdfcn.vue"),
    name: "coachMarkMdfcnView",
    meta: { requiresAuth: true },
  },
  //안내 동영상 관리 목록
  {
    path: "/gdVdoMng",
    component: () => import("@/views/pages/service/GdVdoMng.vue"),
    name: "gdVdoMngView",
    meta: { requiresAuth: true },
  },
  //안내 동영상 관리 등록
  {
    path: "/gdVdoMngWrite",
    component: () => import("@/views/pages/service/GdVdoReg.vue"),
    name: "gdVdoRegView",
    meta: { requiresAuth: true },
  },
  //안내 동영상 관리 상세
  {
    path: "/gdVdoMngRead",
    component: () => import("@/views/pages/service/GdVdoDtl.vue"),
    name: "gdVdoDtlView",
    meta: { requiresAuth: true },
  },
  //안내 동영상 관리 수정
  {
    path: "/gdVdoMngModify",
    component: () => import("@/views/pages/service/GdVdoMdfcn.vue"),
    name: "gdVdoMdfcnView",
    meta: { requiresAuth: true },
  },
  //툴팁 관리 목록
  {
    path: "/tooltipMng",
    component: () => import("@/views/pages/service/TooltipMng.vue"),
    name: "tooltipMngView",
    meta: { requiresAuth: true },
  },
  //툴팁 관리 등록
  {
    path: "/tooltipMngWrite",
    component: () => import("@/views/pages/service/TooltipReg.vue"),
    name: "tooltipRegView",
    meta: { requiresAuth: true },
  },
  //툴팁 관리 상세
  {
    path: "/tooltipMngRead",
    component: () => import("@/views/pages/service/TooltipDtl.vue"),
    name: "tooltipDtlView",
    meta: { requiresAuth: true },
  },
  //툴팁 관리 수정
  {
    path: "/tooltipMngModify",
    component: () => import("@/views/pages/service/TooltipMdfcn.vue"),
    name: "tooltipMdfcnView",
    meta: { requiresAuth: true },
  },
  //아바타 관리 목록
  {
    path: "/avtrChartrMng",
    component: () => import("@/views/pages/service/AvtrChartrMng.vue"),
    name: "avtrChartrMngView",
    meta: { requiresAuth: true },
  },
  //아바타 관리 등록
  {
    path: "/avtrChartrMngWrite",
    component: () => import("@/views/pages/service/AvtrChartrReg.vue"),
    name: "avtrChartrRegView",
    meta: { requiresAuth: true },
  },
  //아바타 관리 상세
  {
    path: "/avtrChartrMngRead",
    component: () => import("@/views/pages/service/AvtrChartrDtl.vue"),
    name: "avtrChartrDtlView",
    meta: { requiresAuth: true },
  },
  //아바타 관리 수정
  {
    path: "/avtrChartrMngModify",
    component: () => import("@/views/pages/service/AvtrChartrMdfcn.vue"),
    name: "avtrChartrMdfcnView",
    meta: { requiresAuth: true },
  },
  //서비스 공지사항 관리 목록
  {
    path: "/srvcNtcMttrMng",
    component: () => import("@/views/pages/service/SrvcNtcMttrMng.vue"),
    name: "srvcNtcMttrMngView",
    meta: { requiresAuth: true },
  },
  //서비스 공지사항 관리 등록
  {
    path: "/srvcNtcMttrMngWrite",
    component: () => import("@/views/pages/service/SrvcNtcMttrReg.vue"),
    name: "srvcNtcMttrRegView",
    meta: { requiresAuth: true },
  },
  //서비스 공지사항 관리 상세
  {
    path: "/srvcNtcMttrMngRead",
    component: () => import("@/views/pages/service/SrvcNtcMttrDtl.vue"),
    name: "srvcNtcMttrDtlView",
    meta: { requiresAuth: true },
  },
  //서비스 공지사항 관리 수정
  {
    path: "/srvcNtcMttrMngModify",
    component: () => import("@/views/pages/service/SrvcNtcMttrMdfcn.vue"),
    name: "srvcNtcMttrMdfcnView",
    meta: { requiresAuth: true },
  },
  //PM 일정 관리 목록
  {
    path: "/pmSchdlMng",
    component: () => import("@/views/pages/system/PMSchdlMng.vue"),
    name: "pmSchdlMngView",
    meta: { requiresAuth: true },
  },
  //PM 일정 관리 등록
  {
    path: "/pmSchdlMngWrite",
    component: () => import("@/views/pages/system/PMSchdlReg.vue"),
    name: "pmSchdlRegView",
    meta: { requiresAuth: true },
  },
  //PM 일정 관리 상세
  {
    path: "/pmSchdlMngRead",
    component: () => import("@/views/pages/system/PMSchdlDtl.vue"),
    name: "pmSchdlDtlView",
    meta: { requiresAuth: true },
  },
  //PM 일정 관리 수정
  {
    path: "/pmSchdlMngModify",
    component: () => import("@/views/pages/system/PMSchdlMdfcn.vue"),
    name: "pmSchdlMdfcnView",
    meta: { requiresAuth: true },
  },
  //FAQ 관리 목록
  {
    path: "/faqMng",
    component: () => import("@/views/pages/service/FAQMng.vue"),
    name: "faqMngView",
    meta: { requiresAuth: true },
  },
  //FAQ 관리 등록
  {
    path: "/faqMngWrite",
    component: () => import("@/views/pages/service/FAQReg.vue"),
    name: "faqRegView",
    meta: { requiresAuth: true },
  },
  //FAQ 관리 상세
  {
    path: "/faqMngRead",
    component: () => import("@/views/pages/service/FAQDtl.vue"),
    name: "faqDtlView",
    meta: { requiresAuth: true },
  },
  //FAQ 관리 수정
  {
    path: "/faqMngModify",
    component: () => import("@/views/pages/service/FAQMdfcn.vue"),
    name: "faqMdfcnView",
    meta: { requiresAuth: true },
  },
  //약관 이력 관리 목록
  {
    path: "/trmsHstryMng",
    component: () => import("@/views/pages/service/TrmsHstryMng.vue"),
    name: "trmsHstryMngView",
    meta: { requiresAuth: true },
  },
  //약관 이력 관리 등록
  {
    path: "/trmsHstryMngWrite",
    component: () => import("@/views/pages/service/TrmsHstryReg.vue"),
    name: "trmsHstryRegView",
    meta: { requiresAuth: true },
  },
  //약관 이력 관리 상세
  {
    path: "/trmsHstryMngRead",
    component: () => import("@/views/pages/service/TrmsHstryDtl.vue"),
    name: "trmsHstryDtlView",
    meta: { requiresAuth: true },
  },
  //약관 이력 관리 수정
  {
    path: "/trmsHstryMngModify",
    component: () => import("@/views/pages/service/TrmsHstryMdfcn.vue"),
    name: "trmsHstryMdfcnView",
    meta: { requiresAuth: true },
  },
  //1:1 문의 관리 목록
  {
    path: "/oneononeInqryMng",
    component: () => import("@/views/pages/service/OneononeInqryMng.vue"),
    name: "oneononeInqryMngView",
    meta: { requiresAuth: true },
  },
  //1:1 문의 관리 상세 및 답변 등록/수정
  {
    path: "/oneononeInqryMngRead",
    component: () => import("@/views/pages/service/OneononeInqryDtl.vue"),
    name: "oneononeInqryDtlView",
    meta: { requiresAuth: true },
  },
  //금칙어 관리 목록 및 등록/수정
  {
    path: "/prhbtWord",
    component: () => import("@/views/pages/service/PrhbtWord.vue"),
    name: "prhbtWordView",
    meta: { requiresAuth: true },
  },
  //사용자 작업이력 조회 목록
  {
    path: '/userJobHstryInq',
    component: () => import('@/views/pages/service/UserJobHstryInq.vue'),
    name: 'userJobHstryInqView',
    meta: { requiresAuth: true }
  },
  //파일모니터링 관리 목록
  {
    path: '/fileMntr',
    component: () => import('@/views/pages/service/FileMonitor.vue'),
    name: 'fileMntrView',
    meta: { requiresAuth: true }
  },
  //연동 연동 모니터링 목록
  {
    path: '/linkMntr',
    component: () => import('@/views/pages/system/LinkMntr.vue'),
    name: 'linkMntrView',
    meta: { requiresAuth: true }
  },
  //시스템 현황 조회
  {
    path: '/sysMntr',
    component: () => import('@/views/pages/system/SysMntr.vue'),
    name: 'sysMntrView',
    meta: { requiresAuth: true }
  },
  //배치 현황 조회
  {
    path: '/batchMntr',
    component: () => import('@/views/pages/system/BatchMntr.vue'),
    name: 'batchMntrView',
    meta: { requiresAuth: true }
  },
  //인프라 과금 모니터링
  {
    path: "/infraPayMttrMng",
    component: () => import("@/views/pages/system/InfraPayMttrMng.vue"),
    name: "infraPayMttrMngView",
    meta: { requiresAuth: true },
  },
  //관리자 작업이력 조회
  {
    path: '/jobHstryInq',
    component: () => import('@/views/pages/system/JobHstryInq.vue'),
    name: 'jobHstryInqView',
    meta: { requiresAuth: true }
  },
  //마스킹 해제 이력 조회
  {
    path: '/mskgRmvHstryInq',
    component: () => import('@/views/pages/system/MskgRmvHstryInq.vue'),
    name: 'mskgRmvHstryInqView',
    meta: { requiresAuth: true }
  },
  //비상연락망 관리 목록
  {
    path: '/emct',
    component: () => import('@/views/pages/system/Emct.vue'),
    name: 'emctView',
    meta: { requiresAuth: true }
  },
  //장애대응체계 관리 목록
  {
    path: '/obstlRspdSysMng',
    component: () => import('@/views/pages/system/ObstlRspdSysMng.vue'),
    name: 'obstlRspdSysMngView',
    meta: { requiresAuth: true }
  },
  //장애대응체계 관리 등록
  {
    path: '/obstlRspdSysMngWrite',
    component: () => import('@/views/pages/system/ObstlRspdSysReg.vue'),
    name: 'obstlRspdSysRegView',
    meta: { requiresAuth: true }
  },
  //장애대응체계 관리 상세
  {
    path: '/obstlRspdSysMngRead',
    component: () => import('@/views/pages/system/ObstlRspdSysDtl.vue'),
    name: 'obstlRspdSysDtlView',
    meta: { requiresAuth: true }
  },
  //장애대응체계 관리 수정
  {
    path: '/obstlRspdSysMngModify',
    component: () => import('@/views/pages/system/ObstlRspdSysMdfcn.vue'),
    name: 'obstlRspdSysMdfcnView',
    meta: { requiresAuth: true }
  },
  //공통코드 관리 목록
  {
    path: '/comCdMng',
    component: () => import('@/views/pages/system/ComCdMng.vue'),
    name: 'comCdMngView',
    meta: { requiresAuth: true }
  },
  //공통코드 관리 등록
  {
    path: '/comCdMngWrite',
    component: () => import('@/views/pages/system/ComCdReg.vue'),
    name: 'comCdRegView',
    meta: { requiresAuth: true }
  },
  //공통코드 관리 상세
  {
    path: '/comCdMngRead',
    component: () => import('@/views/pages/system/ComCdDtl.vue'),
    name: 'comCdDtlView',
    meta: { requiresAuth: true }
  },
  //공통코드 관리 수정
  {
    path: '/comCdMngModify',
    component: () => import('@/views/pages/system/ComCdMdfcn.vue'),
    name: 'comCdMdfcnView',
    meta: { requiresAuth: true }
  },
  //통계 관리
  {
    path: '/statServAcc',
    component: () => import('@/views/pages/statistics/StatServAcc.vue'),
    name: 'statServAccView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statPlat',
    component: () => import('@/views/pages/statistics/StatPlat.vue'),
    name: 'statPlatView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statEval',
    component: () => import('@/views/pages/statistics/StatEval.vue'),
    name: 'statEvalView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statAiEdu',
    component: () => import('@/views/pages/statistics/StatAiEdu.vue'),
    name: 'statAiEduView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statWrongNote',
    component: () => import('@/views/pages/statistics/StatWrongNote.vue'),
    name: 'statWrongNoteView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statProfile',
    component: () => import('@/views/pages/statistics/StatProfile.vue'),
    name: 'statProfileView',
    meta: { requiresAuth: true }
  },
    /*
  {
    path: '/statLearningMap',
    component: () => import('@/views/pages/statistics/StatLearningMap.vue'),
    name: 'statLearningMapView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statStanSys',
    component: () => import('@/views/pages/statistics/StatStanSys.vue'),
    name: 'statStanSysView',
    meta: { requiresAuth: true }
  },
  {
    path: '/statKnowMap',
    component: () => import('@/views/pages/statistics/StatKnowMap.vue'),
    name: 'statKnowMapView',
    meta: { requiresAuth: true }
  },
  {
    path: '/guide',
    component: () => import('../views/pages/Guide.vue'),
    name: 'guideView'
  },
  //회원가입 완료 페이지
  {
    path: '/afterSignUp',
    component: () => import('../views/pages/member/AfterSignUp.vue'),
    name: 'afterSignUpView',
    meta: { requiresAuth: false }
  },
  //로그인 페이지
  {
    path: '/login',
    component: () => import('@/views/pages/member/Login.vue'),
    name: 'loginView',
    meta: { requiresAuth: false }
  },
  //에러 페이지
  {
    path: '/errPage',
    component: () => import('@/views/pages/common/ErrPage.vue'),
    name: 'errPageView',
    meta: { requiresAuth: false }
  },
  //대시보드 페이지
  {
    path: '/dashBrd',
    component: () => import('@/views/pages/common/DashBrd.vue'),
    name: 'dashBrdView',
    meta: { requiresAuth: true }
  },
  //그룹별권한수정 페이지
  {
	path: '/groupAuthrtMngModify',
    component: () => import('@/views/pages/authority/GroupAuthrtMngModify.vue'),
    name:'groupAuthrtMngModifyView',
    meta: { requiresAuth: true }
  },
  //서비스모니터링 페이지
  {
    path: '/srvcMntr',
    component: () => import('@/views/pages/service/srvcMntr/SrvcMntr.vue'),
    name: 'srvcMntrView',
    meta: { requiresAuth: true }
  },
  //이용가이드 페이지
  {
    path: "/userGdMng",
    component: () => import("../views/pages/service/UserGdMng.vue"),
    name: "userGdMngView",
    meta: { requiresAuth: true },
  },
  {
    path: "/userGdReg",
    component: () => import("../views/pages/service/UserGdReg.vue"),
    name: "userGdRegView",
    meta: { requiresAuth: true },
  },
  {
    path: "/userGdDtl",
    component: () => import("../views/pages/service/UserGdDtl.vue"),
    name: "userGdDtlView",
    meta: { requiresAuth: true },
  },
  {
    path: "/userGdMdfcn",
    component: () => import("../views/pages/service/UserGdMdfcn.vue"),
    name: "userGdMdfcnView",
    meta: { requiresAuth: true },
  },
  //시스템공지사항 페이지
  {
    path: '/sysNtcMttrMng',
    component: () => import('@/views/pages/system/SysNtcMttrMng.vue'),
    name: 'sysNtcMttrMngView',
    meta: { requiresAuth: true }
  },
  {
    path: '/sysNtcMttrReg',
    component: () => import('@/views/pages/system/SysNtcMttrReg.vue'),
    name: 'sysNtcMttrRegView',
    meta: { requiresAuth: true }
  },
  {
    path: '/sysNtcMttrDtl/:id',
    component: () => import('@/views/pages/system/SysNtcMttrDtl.vue'),
    name: 'sysNtcMttrDtlView',
    meta: { requiresAuth: true }
  },
  {
    path: '/sysNtcMttrMdfcn/:id',
    component: () => import('@/views/pages/system/SysNtcMttrMdfcn.vue'),
    name: 'sysNtcMttrMdfcnView',
    meta: { requiresAuth: true }
  },
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  document.getElementsByClassName("main")[0]?.scrollTo(0,0);
  document.getElementsByClassName('main-ct')[0]?.scrollTo(0,0);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (document.cookie.split('; ').filter(el=>el.startsWith('UserInfo='))[0] == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  }else if(to.path.includes('/login') || to.path.includes('/signUp')){
        if(document.cookie.split(';').filter(el=>el.includes('lastLoggedIn')).length>0){
        document.cookie = "lastLoggedIn=; Max-Age=0; path=/;";
      }
      if(document.cookie.split(';').filter(el=>el.includes('UserInfo')).length>0){
        document.cookie = "UserInfo=; Max-Age=0; path=/;";
      }
      if(document.cookie.split(';').filter(el=>el.includes('maskedId')).length>0){
        document.cookie = "maskedId=; Max-Age=0; path=/;";
      }
      next();
  } else {
    next();
  }
});
export default router;
