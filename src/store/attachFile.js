import axios from 'axios';
import { defineStore } from 'pinia';
import { inject } from 'vue';

/**
 * 파일 다운로드 및 업로드 이전 유효성 체크
 */
export const useFileStore = defineStore('attachFile', () => {
    const toast = inject('toast');
    /**
     * 파일의 링크와 이름을 넣어 해당 파일을 다운로드
     * @param {string} fileLink 파일링크
     * @param {string} fileName 파일명
     */
    const downloadFile = async (fileLink, fileName) => {
        try {
            const response = await axios({
                method: 'get',
                url: fileLink,
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data], {
                type: response.headers['content-type']
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err){toast.notify('파일 다운로드 실패')}
    }

    /**
     * 이벤트와 인풋요소의 파일 구성 및 최대사이즈 등을 받아 해당 이미지 파일의 확장자나 사이즈와 같은 유효성을 체크
     * @param {*} e 이벤트 요소
     * @param {*} fileElement 인풋 요소
     * @param {number} fileMaxSize 파일의 사용자 지정 최대 크기
     * @param {*} fileList 파일이 여러건인 경우
    */
    const fileCheckImages =(e,fileElement,fileMaxSize,fileList)=>{
        const allowedFileType = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
        var maxSize = fileMaxSize * 1024 * 1024;
        if (e.target.files.length > 0) {
            var fileSizeErr = 0;
            var fileTypeErr = 0;
            var fileNameErr = 0;
            for (var i = 0; i < e.target.files.length; i++) {
                var errFlag = false;
                const arr = Array.from(fileList.value).filter(el => el.name == e.target.files[i].name).length;
                if (arr > 0) {
                    fileNameErr++;
                    errFlag = true;
                }
                const ext = e.target.files[i].type.toLowerCase();
                var cnt = 0;
                for (var j = 0; j < allowedFileType.length; j++) {
                    if (ext.includes(allowedFileType[j])) {
                        cnt++;
                    }
                }
                if(cnt == 0){
                    fileTypeErr++;
                    errFlag = true;
                }
                const fileSize = e.target.files[i].size;
                if (fileSize > maxSize) {
                    fileSizeErr++;
                    errFlag = true;
                }
                if (!errFlag) {
                    e.target.files[i].description = '';
                    e.target.files[i].url = URL.createObjectURL(e.target.files[i])
                    fileList.value.push(e.target.files[i])
                }
            }
            if (fileSizeErr > 0) {
                toast.notify("최대 "+fileMaxSize+"MB 이하의 파일만 업로드 가능합니다.");
            } else if (fileNameErr > 0) {
                toast.notify("동일한 이름의 파일이 존재합니다. 이전 파일을 삭제하거나 업로드하는 파일 이름을 변경해 주세요.")
            } else if (fileTypeErr > 0) {
                toast.notify("이미지 형식의 파일만 업로드 가능합니다.");
            }
            fileElement.value.value='';
        }
    }

    /**
     * 파일의 형식이 이미지가 아닌 경우 확장자를 파라미터로 포함하여 유효성 체크
     * @param {*} e 이벤트요소
     * @param {*} fileInput 인풋요소
     * @param {Array[string]} allowedFileType 허용 확장자
     * @param {number} fileMaxSize 최대사이즈
     * @param {*} atchFile 첨부대상 파일
     * @returns boolean
     */
    const fileCheck = (e, fileInput, allowedFileType, fileMaxSize, atchFile) => {
        if (e.target.files.length > 0) {
            const MAX_SIZE = fileMaxSize * 1024 * 1024;
            let fileSizeErr = 0;
            let fileTypeErr = 0;
            let fileNameErr = 0;
            let errFlag = false;

            if (e.target.files[0].size > MAX_SIZE) {
                fileSizeErr++;
                errFlag = true;
            } else if (atchFile.value != null && atchFile.value.name == e.target.files[0].name) {
                fileNameErr++;
                errFlag = true;
            } else if (!allowedFileType.includes(e.target.files[0].name.split('.').pop()?.toLowerCase())) {
                fileTypeErr++;
                errFlag = true;
            }

            if (!errFlag) {
                e.target.files[0].altText = '';
                e.target.files[0].url = URL.createObjectURL(e.target.files[0])
                atchFile.value = e.target.files[0];
            } else {
                if (fileSizeErr > 0) {
                    toast.notify("최대 "+fileMaxSize+"MB 이하의 파일만 업로드 가능합니다.");
                } else if (fileNameErr > 0) {
                    toast.notify("동일한 이름의 파일이 존재합니다. 이전 파일을 삭제하거나 업로드하는 파일 이름을 변경해 주세요.")
                } else if (fileTypeErr > 0) {
                    if (allowedFileType.includes('html')) {
                        toast.notify("HTML 파일만 업로드 가능합니다.");
                    } else if(allowedFileType.includes('mp4')) {
                        toast.notify("비디오 형식의 파일만 업로드 가능합니다.");
                    }else if(allowedFileType.includes('png')){
                        if(allowedFileType.includes('ppt')){
                            toast.notify("이미지 및 문서 형식의 파일만 업로드 가능합니다.");
                        }else{
                            toast.notify("이미지 형식의 파일만 업로드 가능합니다.");
                        }
                    }else{
                        toast.notify("이미지 형식의 파일만 업로드 가능합니다.");
                    }
                }
            }
            fileInput.value.value = '';
            return !errFlag ? true : false;
        }
    }

    return { downloadFile, fileCheckImages, fileCheck }
})