<template>
  <div class="gnb">
    <div class="gnb-icon-wrapper" @click="collapse = !collapse">
      <img
        :style="collapse ? 'transform:rotate(180deg);' : 'transform:unset;'"
        src="/images/icon23.svg"
      />
    </div>
    <div class="gnb-inner-2" v-if="!collapse">
      <menu-list v-model:menuList="menuList"></menu-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, ref } from "vue";
import MenuList from "./GNBList.vue";

const menuList = ref([
  {
    value: "회원 관리",
    icon: true,
    depth: 1,
    show: true,
    twoLine: false,
  },
  {
    value: "계정관리",
    icon: true,
    depth: 2,
    show: true,
    twoLine: false,
  },
  {
    value: "계정정보변경",
    icon: false,
    depth: 3,
    show: true,
    twoLine: false,
    path: "/myInfoModify",
  },
  /*
    {
        value: '계정탈퇴',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/acntWhdwl'
    },
    */
  {
    value: "시스템관리자 계정관리",
    icon: false,
    depth: 3,
    show: true,
    twoLine: false,
    path: "/accountMng",
  },
  {
    value: "권한관리",
    icon: true,
    depth: 2,
    show: true,
    twoLine: false,
  },
  {
    value: "계정별 권한관리",
    icon: false,
    depth: 3,
    show: true,
    twoLine: false,
    path: "/acntAuthrtMng",
  },
  {
    value: "그룹관리",
    icon: true,
    depth: 2,
    show: true,
    twoLine: false,
  },
  {
    value: "그룹별 권한관리",
    icon: false,
    depth: 3,
    show: true,
    twoLine: false,
    path: "/groupAuthrtMng",
  },
  {
    value: "서비스 관리",
    icon: true,
    depth: 1,
    show: true,
    twoLine: false,
  },
  {
    value: "코치마크 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/coachMarkMng",
  },
  {
    value: "안내 동영상 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/gdVdoMng",
  },
  {
    value: "툴팁 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/tooltipMng",
  },
  {
    value: "아바타 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/avtrChartrMng",
  },
  {
    value: "서비스 공지사항 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/srvcNtcMttrMng",
  },
  {
    value: "PM 일정 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/pmSchdlMng",
  },
  {
    value: "FAQ 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/faqMng",
  },
  {
    value: "약관 이력 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/trmsHstryMng",
  },
  {
    value: "1:1 문의 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/oneononeInqryMng",
  },
  {
    value: "금칙어 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/prhbtWord",
  },
  /*
    {
        value: '사용자 작업이력 조회',
        icon: false,
        depth: 2,
        show: true,
        twoLine: false,
        path: '/userJobHstryInq'
    },
    {
        value: '파일 모니터링 관리',
        icon: false,
        depth: 2,
        show: true,
        twoLine: false,
        path: '/fileMntr'
    },
    */
  {
    value: "시스템 관리",
    icon: true,
    depth: 1,
    show: true,
    twoLine: false,
  },
  {
    value: "외부 연동 모니터링",
    icon: false,
    depth: 2,
    show: true,
    twoLine: true,
    path: "/linkMntr",
  },
  {
    value: "시스템 현황 조회",
    icon: false,
    depth: 2,
    show: true,
    twoLine: true,
    path: "/sysMntr",
  },
  {
    value: "배치 현황 조회",
    icon: false,
    depth: 2,
    show: true,
    twoLine: true,
    path: "/batchMntr",
  },
  {
    value: "인프라 과금 모니터링",
    icon: false,
    depth: 2,
    show: true,
    twoLine: true,
    path: "/infraPayMttrMng",
  },
  {
    value: "관리자 작업이력 조회",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/jobHstryInq",
  },
  {
    value: "마스킹 해제 이력 조회",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/mskgRmvHstryInq",
  },
  {
    value: "비상연락망 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/emct",
  },
  {
    value: "장애대응체계 관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/obstlRspdSysMng",
  },
  {
    value: "공통코드관리",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/comCdMng",
  },
  {
    value: "통계관리",
    icon: true,
    depth: 1,
    show: true,
    twoLine: false,
  },
  {
    value: "서비스 이용 현황",
    icon: false,
    depth: 2,
    show: true,
    twoLine: false,
    path: "/statServAcc",
  },
  /*
    {
        value: '서비스 계정',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statServAcc'
    },
    {
        value: '플랫폼 현황',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statPlat',
    },

    {
        value: '평가/처방',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statEval',
    },
    {
        value: 'AI 학습관',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statAiEdu',
    },
    {
        value: '오답노트',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statWrongNote',
    },
    {
        value: '프로필',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statProfile',
    },
    {
        value: '학습맵',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statLearningMap',
    },
    {
        value: '표준체계',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statStanSys',
    },
    {
        value: '지식맵',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/statKnowMap',
    },
    {
        value: '콘텐츠 및 교과서 <br> 구성 현황',
        icon: true,
        depth: 2,
        show: true,
        twoLine: true,
    },
    {
        value: '관리자 계정',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '코스',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '챕터',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '모듈(1)',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '모듈(2)',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '콘텐츠',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '문항',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/',
    },
    {
        value: '학습맵, 표준체계, 지식맵 현황',
        icon: true,
        depth: 2,
        show: true,
        twoLine: false,
    },
    {
        value: '대시보드',
        icon: false,
        depth: 2,
        show: true,
        twoLine: false,
        path: '/'
    },
    {
        value: '각종 통계',
        icon: false,
        depth: 2,
        show: true,
        twoLine: false,
        path: '/'
    }
    {
        value: '서비스 모니터링',
        icon: true,
        depth: 2,
        show: true,
        twoLine: false
    },
    {
        value: '서비스 모니터링 (현황)',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/srvcMntr'
    },
    {
        value: '가이드 관리',
        icon: true,
        depth: 2,
        show: true,
        twoLine: false
    },

    {
        value: '이용가이드 관리',
        icon: false,
        depth: 3,
        show: true,
        twoLine: false,
        path: '/userGdMng'
    },
     {
        value: '시스템 모니터링',
        icon: true,
        depth: 2,
        show: true,
        twoLine: false
    },
    {
        value: '시스템 모니터링 <br> (CPU/메모리)',
        icon: false,
        depth: 3,
        show: true,
        twoLine: true,
        path: '/sysMntr'
    },
    {
        value: '시스템 공지사항 관리',
        icon: false,
        depth: 2,
        show: true,
        twoLine: false,
        path: '/sysNtcMttrMng'
    },
   */
]);

const collapse = defineModel("collapse", {
  type: Boolean,
  required: false,
  default: false,
});
</script>

<style scoped>
.gnb {
  background: #fff;
  box-shadow: 1px 4px 4px #0000002b;
}
.gnb-icon-wrapper {
  width: 100%;
  justify-content: right;
  display: flex;
}
@keyframes shaking {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(2px, 2px) rotate(2deg);
  }
  50% {
    transform: translate(0, 0) rotate(0eg);
  }
  75% {
    transform: translate(-2px, 2px) rotate(-2deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

.gnb-icon-wrapper img:hover {
  animation: shaking 0.15s infinite;
  transform: rotate(180deg);
}
.gnb-icon-wrapper img {
  padding: 0.6rem;
  height: 100%;
  cursor: pointer;
}
.gnb-inner-2 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0.5rem;
  align-items: stretch;
}
</style>
