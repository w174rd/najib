const viewBtnQR = document.querySelector(".view-modal-qrcode"),
      popupQR = document.querySelector(".popup-qrcode"),
      closeQR = popupQR.querySelector(".close");

      viewBtnQR.onclick = ()=>{
        popupQR.classList.toggle("show");
        syncModalBackdrop(); //declared in share.js, which loads first
      }
      closeQR.onclick = ()=>{
        viewBtnQR.click();
      }
