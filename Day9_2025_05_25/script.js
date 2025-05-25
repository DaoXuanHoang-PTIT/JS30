function changeBackground() {
      const select = document.getElementById("backgroundSelect");
      const value = select.value;
      let url = "";

      switch(value) {
        case "mountain":
          url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz50KYkS5249QI_5i84MJ63rVFBhwvT44c8w&s'
          break;
        case "sea":
          url = "https://trieuhaotravel.vn/Uploads/images/nttnhu/bien_vietnam_5_min.png_large.webp";
          break;
        case "forest":
          url = "https://vcdn1-vnexpress.vnecdn.net/2022/07/03/Rung-cay-se-9244-1656845719.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=bzC8YkBHGB9cdW4xzEbTgQ";
          break;
        case "desert":
          url = "https://baobariavungtau.com.vn/dataimages/202008/original/images1628910_Sa_mac_Taklamakan_2d379b3ea3__1_.jpeg";
          break;
      }

      document.body.style.backgroundImage = `url('${url}')`;
    }

    // Cài đặt ảnh nền mặc định lúc tải trang
    window.onload = () => {
      changeBackground();
    };