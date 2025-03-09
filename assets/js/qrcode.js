const viewBtnQR = document.querySelector(".view-modal-qrcode"),
      popupQR = document.querySelector(".popup-qrcode"),
      closeQR = popupQR.querySelector(".close");
  
      viewBtnQR.onclick = ()=>{
        popupQR.classList.toggle("show");
      }
      closeQR.onclick = ()=>{
        viewBtnQR.click();
      }