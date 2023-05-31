//tạo 1 cái bảng chưa giá trị dạng table
const VALUES = [
    {id:"scissors", value:"✌🏾"},//0
    {id:"rock", value:"✊🏾"},//1
    {id:"paper", value:"✋🏾"}//2
]//độ dài length: 3
//khi nào thì ?
//  thắng:  1 - 0 = 1
//          2 - 1 = 1
//          0 - 2 = -2
//      indexPlayer - indexComputer = 1 | -2                            return 1
//  hòa: indexPlayer - indexComputer = 0                                return 0
//  thua: indexPlayer - indexComputer mà không ra các số trên thì thua  return -1
// tạo hàm mà, mỗi lần gọi thì nó sẽ thay đổi giá trị của máy
//khi so sánh A và B hàm 1: thắng 0: hòa -1: thua

let i = 0;
const handleChange = () =>{
    let computer = document.querySelector("#computer")//móc vào máy
    computer.textContent = VALUES[i].value//đổi giá trị cho computer
    computer.dataset.id = VALUES[i].id//đổi data-id cho computer
    if(i === VALUES.length - 1){
        i = 0;
    }else{
        i++;
    }
}

//setUbterval(cf, milisecond): cứ sau milisecond thì sẽ gọi cf 1 lần
let interval = setInterval(handleChange,100);
//lưu lại interval để mình có thể dừng lại việc call cf 

// valuePlayer : rock       | valueComputer: data-id => scissors
// => inexPlayer : 1        |   =>indexComputer : 0

//là viết cái hàm nhận vào (valuePlayer, valueComputer)
//từ đó tìm ra vị trí của tụi nó trong mảng VALUES
//sau đó so sánh và trả kết quả 1 0 -1
//để báo rằng player thắng | hòa | thua

const compare = (valuePlayer, valueComputer) =>{
    let indexPlayer = VALUES.findIndex(item => item.id == valuePlayer)
    let indexComputer = VALUES.findIndex(item => item.id == valueComputer)
    let check = indexPlayer - indexComputer;
    if(check == 1 || check == -2){
        return 1;
    }else if(check == 0){
        return 0;
    }else{
        return -1;
    }
}

// sự kiện trò chơi diễn ra khi 1 trong 3 nút user bị click 
// dom danh sách các nút user
let playerItem = document.querySelectorAll(".user")
playerItem.forEach(item => {
    item.addEventListener("click", event =>{
        clearInterval(interval)//dừng interval lại
        let valuePlayer = event.target.id;
        let valueComputer = computer.dataset.id;
        let result = compare(valuePlayer, valueComputer)
        // alert(result) //dùng để test kết quả
        //duyệt lại các nút và xóa avtived | chặn sự kiện click
        playerItem.forEach(_item => {
            _item.classList.remove("actived")
            _item.style.pointerEvents = "none"
        });
        event.target.classList.add("actived")

        //thông báo kết quả: tạo 1 cái div để thông báo kết quả
        const alertDiv = document.createElement("div")
        alertDiv.classList.add("alert")//alert là class của bootstrap
        let msg ="";
        if(result == 1){
            msg = "Bạn đã thắng"
            alertDiv.classList.add("alert-success")//làm cho cái div có màu vàng
        }else if(result == 0){
            msg = "Bạn đã hòa"
            alertDiv.classList.add("alert-warning")//làm cho cái div có màu vàng
        }if(result == -1){
            msg = "Bạn đã thua"
            alertDiv.classList.add("alert-dark")//làm cho cái div có màu vàng
        }
        alertDiv.textContent = msg;
        document.querySelector(".notification").appendChild(alertDiv)
        document.querySelector("#play-again").classList.remove("d-none")
    })
});

//làm sự kiện cho nút chơi lại
document.querySelector(".btn-play-again").addEventListener("click", event => {
    interval = setInterval(handleChange, 100);
    playerItem.forEach(_item => {
        _item.classList.remove("actived")
        _item.style.pointerEvents = ""
    });
    document.querySelector(".notification").innerHTML = "";
    document.querySelector("#play-again").classList.add("d-none")
})