const viewBtn = document.querySelector(".view-modal"),
      popup = document.querySelector(".popup"),
      close = popup.querySelector(".close"),
      field = popup.querySelector(".field"),
      input = field.querySelector("input"),
      copy = field.querySelector("button"),
      backdrop = document.querySelector(".modal-backdrop");

      // both modals share the one blurred backdrop, so it is driven by whether
      // either panel is open rather than by whichever button was last pressed
      function syncModalBackdrop(){
        const open = document.querySelector(".popup.show, .popup-qrcode.show");
        backdrop.classList.toggle("show", !!open);
      }

      viewBtn.onclick = ()=>{
        popup.classList.toggle("show");
        syncModalBackdrop();
      }
      close.onclick = ()=>{
        viewBtn.click();
      }

      backdrop.onclick = ()=>{
        document.querySelectorAll(".popup.show, .popup-qrcode.show").forEach((panel)=>{
          panel.classList.remove("show");
        });
        syncModalBackdrop();
      }

      copy.onclick = ()=>{
        input.select(); //select input value
        if(document.execCommand("copy")){ //if the selected text copy
          field.classList.add("active");
          copy.innerText = "Copied";
          setTimeout(()=>{
            window.getSelection().removeAllRanges(); //remove selection from document
            field.classList.remove("active");
            copy.innerText = "Copy";
          }, 3000);
        }
      }
