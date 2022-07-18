//vẽ bàn cờ
var htmlCaroTable = '<table boder="1" cellpadding="0" cellspacing="0">';
var n = parseInt(prompt("Moi nhập kích cỡ bàn cờ:"));
if(!n)
{
    n=12;
}



for (var i = 1; i <= n; i++) {
  htmlCaroTable += "<tr>";
  for (var j = 1; j <= n; j++) {
    var stt = (i - 1) * n + j;
    htmlCaroTable +=
      '<td class="cell" data-adressx=' +
      j +
      " data-adressy=" +
      i +
      " data-stt=" +
      stt +
      "></td>";
  }
  htmlCaroTable += "</tr>";
}
htmlCaroTable += "</table>";
var tableObject = document.querySelector(".carotable");
tableObject.innerHTML += htmlCaroTable;

//nước đi
var cellObject = document.querySelectorAll(".cell");
var turn = true;

for (let index = 0; index < cellObject.length; index++) {
  const element = cellObject[index];
  element.onclick = function () {
    if (
      !element.classList.contains("oshape") &&
      !element.classList.contains("xshape")
    ) {
      if (turn) {
        element.classList.add("oshape");
        kiemtraO("oshape");
        turn = !turn;
      } else {
        element.classList.add("xshape");
        kiemtraO("xshape");
        turn = !turn;
        // kiemtraOcanhnhau(element)
      }
    } 
    else {
        var popup = document.querySelector('.popup')
            popup.setAttribute('style','left: '+event.clientX+'px; top: '+event.clientY+'px;')
            popup.classList.add('active')
            setTimeout(function(){
                popup.classList.remove('active')
            },1000)
    }
  };
}
// -----------------------------------------------------
// Xem ai win
function kiemtraO(shape) {
  for (let index = 0; index < cellObject.length; index++) {
    var stt = index + 1;
    var tong = cellObject.length;
    var oke = Math.sqrt(tong) - 4;
    var flagngang = 1,
      flagxeoxuong = 1,
      flagxeolen = 1;
    flagdungxuong = 1;
    if (cellObject[index].classList.contains(shape)) {
      //kiemtra theo chieu ngang trai qua phải
      if (stt % Math.sqrt(tong) <= oke && stt % Math.sqrt(tong) > 0) {
        var batdau = index + 1;
        //console.log('từ ô :'+batdau)
        for (var i = 1; i < 5; i++) {
          var ngang = index + i + 1;
          //console.log('đangkiem tra ngang ô; '+ngang)
          if (kiemtra(cellObject[index + i], shape)) {
            flagngang++;
          } else {
            break;
          }

          if (flagngang >= 5) { 
            for (var i = 0; i < 5; i++) {
                var ngang = index + i;
                cellObject[ngang].classList.add('winshape')
                setTimeout(function(){
                    location.reload();
                },3000)
            }
            setTimeout(function()
            {
                alert(shape+' Đã chiến thắng 3s sau reload')
            },1000)
            break;
            
          }
          
        }
      }
      //kiemtra theo chieu xeo tự trên xuống
      if (index <= cellObject.length - (Math.sqrt(cellObject.length) * 4 - 5)) {
        var batdauxx = index + 1;
        //console.log('từ ô: '+batdauxx)
        for (var i = 1; i < 5; i++) {
          var xxuong = index + i * Math.sqrt(tong) + i;
          //console.log('đangkiem tra xx ô; '+xxuong)
          if (kiemtra(cellObject[xxuong], shape)) {
            flagxeoxuong++;
          } else {
            break;
          }
          if (flagxeoxuong >= 5) {
            for (var i = 0; i < 5; i++) {
                var xxuong = index + i * Math.sqrt(tong) + i;
                cellObject[xxuong].classList.add('winshape')
                setTimeout(function(){
                    location.reload();
                },3000)
            }
            setTimeout(function()
            {
                alert(shape+' Đã chiến thắng 3s sau reload')
            },1000)
            break;
          }
        }
        
      }
      //kiemtra theo chieu xeo tu duoi len
      if (
        index >=
        Math.sqrt(cellObject.length) * 4 + (Math.sqrt(cellObject.length) - 4)
      ) {
        //console.log('tù ô'+index)
        for (var i = 1; i < 5; i++) {
          var xlen = index - i * Math.sqrt(tong) + i;
          //console.log('đangkiem tra xlen ô; '+xlen)
          if (kiemtra(cellObject[xlen], shape)) {
            flagxeolen++;
          } else {
            break;
          }
          if (flagxeolen >= 5) {
            for (var i = 0; i < 5; i++) {
                var xlen = index - i * Math.sqrt(tong) + i;
                cellObject[xlen].classList.add('winshape')
                setTimeout(function(){
                    location.reload();
                },3000)
            }
            setTimeout(function()
            {
                alert(shape+' Đã chiến thắng 3s sau reload')
            },1000)
            break;
          }
        }
        
      }
      //kiem tra theo chieu doc tu tren xuong
      if (index <= cellObject.length - Math.sqrt(cellObject.length) * 4) {
        for (var i = 1; i < 5; i++) {
          var thangdung = index + i * Math.sqrt(cellObject.length);
          if (kiemtra(cellObject[thangdung], shape)) {
            flagdungxuong++;
          } else {
            break;
          }
          if (flagdungxuong >= 5) {
            for (var i = 0; i < 5; i++) {
                var thangdung = index + i * Math.sqrt(cellObject.length);
                cellObject[thangdung].classList.add('winshape')
                setTimeout(function(){
                    location.reload();
                },3000)
            }
            setTimeout(function()
            {
                alert(shape+' Đã chiến thắng 3s sau reload')
            },1000)
            break;
          }
        }
        
      }
    }
}
}
function kiemtra(element, shape) {
  var result = false;
  if (element.classList.contains(shape)) {
    result = true;
  }
  return result;
}


//xet 2 ô cạnh nhau
// function kiemtraOcanhnhau(elementO){
//     var xadress=elementO.dataset.adressx;
//     console.log(xadress)
// }
