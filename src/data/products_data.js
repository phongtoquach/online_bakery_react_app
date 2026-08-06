const productsData = [
    {
        id: 123,
        name: "Bánh Mousse Dưa Lưới Minty",
        slug: "banh-mousse-dua-luoi-minty",
        price: 545000,
        images: [
            "images/mousese-dua-luoi-minty-1.jpg",
            "images/mousese-dua-luoi-minty-2.jpg",
            "images/mousese-dua-luoi-minty-3.jpg",
            "images/mousese-dua-luoi-minty-4.jpg"
        ],
        shortDescription: "Mousse Dưa Lưới là sự kết hợp hài hòa giữa bạt vani mềm nhẹ và mousse dưa lưới thanh mát quyện cùng cream cheese béo dịu. Điểm nhấn nằm ở lớp nhân bạc hà the mát, mang đến cảm giác tươi mới đầy thú vị trong từng muỗng bánh, tạo nên hương vị tươi mát và tinh tế cho những ngày hè.",
        description: "<p><strong>Hương vị:</strong> Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan vani truyền thống.</p></li><li><p>Mousse dưa lưới kết hợp với cream cheese béo nhẹ.</p></li><li><p>Nhân bạc hà tươi mát.</p></li></ul><p>Phần trang trí: Kết hợp decor dưa lưới tươi mát, mousse sữa chua, kem trang trí tuyền thống và chocolate tạo hình.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [124, 125]
    },
    {
        id: 124,
        name: "hello Bánh Mousse Thanh Nhãn",
        slug: "banh-mousse-thanh-nhan",
        price: 261000,
        images: [
            // "images/mousse-thanh-nhan.jpg",
            //"images/mousse-thanh-nhan-2.jpg"
            // "images/mousse-thanh-nhan-3.jpg",
            // "images/mousse-thanh-nhan-4.jpg",
            // "images/mousse-thanh-nhan-5.jpg"
        ],
        shortDescription: "he he he 124 Mousse Thanh Nhãn là sự giao thoa giữa cốt choco đậm đà và mousse nhãn ngọt thanh, mát mịn. Nhân bánh gây ấn tượng với thịt nhãn giòn sần sật quyện cùng hạt dẻ béo bùi lạ miệng, thơm ngậy. Vẻ ngoài chỉn chu với nhãn tươi và hoa thủ công, mang đến trải nghiệm vị giác tinh tế, thanh mát cho ngày hè",
        description: "<p><strong>Hương vị:</strong>&nbsp;Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan choco.</p></li><li><p>Mousse nhãn mềm mát mịn vị ngọt thanh.</p></li><li><p>Lớp nhân nhãn có thịt nhãn giòn sần sật, lớp nhân hạt dẻ béo bùi.</p></li></ul><p>Phần trang trí: Trên mặt bánh decor kem topping, nhãn lon, hoa gumpaste, lá húng lủi, choco.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul><p></p>",
        isFeatured: false,
        relatedProductIds: [123, 125, 126],
        //relatedProductIds: []
    },
    {
        id: 125,
        name: "Bánh Mousse Ngọc Nhãn",
        slug: "banh-mousse-ngoc-nhan",
        price: 565000,
        images: [
            "images/mousse-ngoc-nhan.jpg",
            "images/mousse-ngoc-nhan-2.jpg",
            "images/mousse-ngoc-nhan-3.jpg",
            "images/mousse-ngoc-nhan-4.jpg",
            "images/mousse-ngoc-nhan-5.jpg"
        ],
        shortDescription: "Mousse Ngọc Nhãn gây ấn tượng với lớp thạch trong veo bao bọc nhãn độc đáo. Cấu trúc bánh kết hợp hài hòa giữa bạt chocolate đắng nhẹ, mousse nhãn mịn mượt ngọt thanh và điểm nhấn nhân nhãn giòn sần sật quyện cùng hạt dẻ béo bùi. Sự đối lập thú vị giữa các tầng kết cấu và vị trái cây thanh mát mang đến một trải nghiệm tinh tế",
        description: "<p><strong>Hương vị:</strong>&nbsp;Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan choco.</p></li><li><p>Mousse nhãn mềm mát mịn vị ngọt thanh.</p></li><li><p>Lớp nhân nhãn có thịt nhãn giòn sần sật, lớp nhân hạt dẻ béo bùi.</p></li></ul><p>Phần trang trí: Trên mặt bánh decor kem topping, nhãn lon, hoa gumpaste, lá húng lủi, choco.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [123, 124]
    },
    // {
    //     id: 0,
    //     name: "",
    //     price: 565000,
    //     images: [
            
    //     ],
    //     shortDescription: "",
    //     description: "",
    //     isFeatured: true,
    //     relatedProductIds: [],
    //     inStock: true
    // }
    {
        id: 126,
        name: "Bánh Flan Gato Strawberry",
        slug: "banh-flan-gato-strawberry",
        price: 350000,
        images: [
            "images/flan-gato-dau-1.jpg",
            "images/flan-gato-dau-2.jpg",
            "images/flan-gato-dau-3.jpg",
            "images/flan-gato-dau-4.jpg",
            "images/flan-gato-dau-5.jpg"
        ],
        shortDescription: "Bánh Flan Gato là sự giao thoa tuyệt vời giữa lớp flan truyền thống béo mịn và cốt bông lan chocolate đắng nhẹ, mềm xốp. Vị ngọt dịu quyện cùng hương thơm trứng sữa nồng nàn tạo nên sức hút khó cưỡng. Điểm xuyết dâu tây tươi mọng, bánh mang đến trải nghiệm hài hòa, là lựa chọn \"chân ái\" cho mọi lứa tuổi",
        description: "<p><strong>Hương vị:</strong> Ngọt dịu - Béo nhẹ - Thơm - Đắng nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm các lớp chính:</p><ul><li><p>Bánh flan vị truyền thống</p></li><li><p>Bông lan sô-cô-la</p></li></ul><p>Phần trang trí: dâu tươi</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li><li><p>Cây ghim</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [127, 128, 129]
    },
    {
        id: 127,
        name: "Bánh Flan Gato Trà Thái đỏ",
        slug: "banh-flan-gato-tra-thai-do",
        price: 555000,
        images: [
            "images/flan-tra-thai-do-1.jpg",
            "images/flan-tra-thai-do-2.jpg",
            "images/flan-tra-thai-do-3.jpg",
            "images/flan-tra-thai-do-4.jpg"
        ],
        shortDescription: "Flan Gato Trà Thái Đỏ là bản giao thoa đầy lôi cuốn giữa lớp flan Trà Thái Đỏ thơm nồng, béo mịn và bạt bông lan chocolate đắng nhẹ, ẩm mịn. Vị ngọt dịu quyện cùng hương trà đặc trưng, điểm xuyết thêm jelly caramel, đào, dâu và dưa lưới. Một trải nghiệm mới lạ, thanh mát và cực kỳ nịnh miệng",
        description: "<p><strong>Hương vị:</strong> Ngọt dịu - Béo nhẹ - Thơm - Đắng nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm các lớp chính:</p><ul><li><p>Bánh flan vị trà thái đỏ</p></li><li><p>Bông lan sô-cô-la</p></li></ul><p>Phần trang trí: jelly caramel, đào, dâu tây, dưa lưới, socola</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li><li><p>Cây ghim</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [128, 129, 126, 125]
    },
    {
        id: 128,
        name: "Bánh Flan Gato Fruit & Pins",
        slug: "banh-flan-gato-fruit-pins",
        price: 450000,
        images: [
            "images/flan-fruit-pins-1.jpg",
            "images/flan-fruit-pins-2.jpg",
            "images/flan-fruit-pins-3.jpg",
            "images/flan-fruit-pins-4.jpg",
        ],
        shortDescription: "Mẫu bánh giữ trọn vị truyền thống với lớp flan béo mịn đan xen cốt chocolate đắng thanh, xốp nhẹ. Lớp jelly caramel óng ả quyện cùng dâu, dưa lưới, đào và búp sữa chua thanh mát tạo nên sự cân bằng hoàn hảo, không hề gây ngấy. Diện mạo rạng rỡ, tươi mới, là tâm điểm ý nghĩa cho mọi bữa tiệc gia đình",
        description: "<p><strong>Hương vị:</strong> Ngọt dịu - Béo nhẹ - Đắng nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm các lớp chính:</p><ul><li><p>Bánh flan vị truyền thống</p></li><li><p>Bông lan sô-cô-la</p></li></ul><p>Phần trang trí: vòng chocolate trắng, viên mousse sữa chua, dâu tây, dưa lưới và đào</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [126, 138, 0, "123abc", 127, 125, 123]
    },
    {
        id: 129,
        name: "Hộp Sweetin Thanh Nhãn - Special",
        slug: "hop-sweetin-thanh-nhan-special",
        price: 345000,
        images: [
            "images/Sweetin-Thanh-Nhan-1.jpg",
            "images/Sweetin-Thanh-Nhan-2.jpg",
            "images/Sweetin-Thanh-Nhan-3.jpg",
            "images/Sweetin-Thanh-Nhan-4.jpg",
            "images/Sweetin-Thanh-Nhan-5.jpg"
        ],
        shortDescription: "Thanh Nhãn Special là hương vị của mùa hè được gói trọn trong từng lớp bánh tươi mát, nhẹ nhàng và đậm chất nhiệt đới. Điểm đặc biệt nằm ở những ký tự bằng socola trên mặt bánh. Bộ sưu tập đang có 5 bộ chữ gồm: LOVE U, SNVV, SUMMER, 8386, VUÝP",
        description: "<p><strong>Hương vị:</strong> Béo nhẹ - ngọt dịu - thơm mùi vải</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Bạt bông lan choco.</p></li><li><p>Mousse nhãn mềm mát mịn vị ngọt thanh. Lớp nhân nhãn có thịt nhãn giòn sần sật, lớp nhân hạt dẻ béo bùi.</p></li><li><p>Trên mặt bánh decor nhãn lon, hoa gumpaste, lá húng lủi, choco.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 thìa lá bạc</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [130, 131]
    },
    {
        id: 130,
        name: "Hộp Sweetin - Matcha Chocolate",
        slug: "hop-sweetin-matcha-chocolate",
        price: 285000,
        images: [
            "images/sweetin-matcha-1.jpg",
            "images/sweetin-matcha-2.jpg",
            "images/sweetin-matcha-3.jpg",
            "images/sweetin-matcha-4.jpg",
        ],
        shortDescription: "Sự lựa chọn hoàn hảo cho những tín đồ yêu trà xanh, nơi hương vị thanh tao và hương thơm tinh tế của Matcha được gói trọn trong từng tầng vị êm dịu, mang lại cảm giác thư thái như một buổi trà đạo thu nhỏ.",
        description: "<p><strong>Hương vị:</strong> Ngọt dịu - đậm vị matcha</p><p><strong>Cấu trúc bánh:</strong></p><p>Bánh gồm 5 lớp (từ dưới lên trên):</p><ul><li><p>Bạt bánh matcha cake nướng.</p></li><li><p>Mousse matcha socola nguyên chất.</p></li><li><p>Lớp ganache dẻo socola matcha.</p></li><li><p>Lớp socola matcha nguyên chất.</p></li><li><p>Bột matcha.</p></li></ul><p>Trang trí: Chocolate tạo hình tổ ong</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 thìa lá bạc</p></li></ul>",
        isFeatured: false,
        relatedProductIds: [129, 131]
    },
    {
        id: 131,
        name: "Hộp Sweetin Dưa Lưới Minty - Special",
        slug: "hop-sweetin-dua-luoi-minty-special",
        price: 355000,
        images: [
            "images/Sweetin-Dua-Luoi-1.jpg",
            "images/Sweetin-Dua-Luoi-2.jpg",
            "images/Sweetin-Dua-Luoi-3.jpg",
            "images/Sweetin-Dua-Luoi-4.jpg",
        ],
        shortDescription: "Mousse Dưa Lưới mang hương vị mùa hè tươi mát với lớp mousse dưa lưới thanh ngọt kết hợp cùng cream cheese béo nhẹ và hậu vị bạc hà the mát đầy dễ chịu. Điểm nhấn của bánh nằm ở phần decor dưa lưới tươi cùng thanh choco thông điệp. Bộ sưu tập đang có 7 bộ chữ gồm: LOVE U, SNVV, SUMMER, 8386, VUÝP, Mẹ Yêu, Yêu Mẹ. ",
        description: "<p><strong>Hương vị:</strong> Béo nhẹ - Ngọt dịu - The mát</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Bạt bông lan vani truyền thống.</p></li><li><p>Mousse dưa lưới kết hợp với cream cheese béo nhẹ.</p></li><li><p>Nhân bạc hà tươi mát.</p></li><li><p>Decor dưa lưới tươi và thanh choco thông điệp.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 thìa lá bạc</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [129, 130]
    },
    {
        id: 132,
        name: "Hộp Amber Crunchill",
        slug: "hop-amber-crunchill",
        price: 135000,
        images: [
            "images/Amber-Crunchill-1.jpg",
            "images/Amber-Crunchill-2.jpg",
            "images/Amber-Crunchill-3.jpg",
            "images/Amber-Crunchill-4.jpg",
        ],
        shortDescription: "Amber Crunchill lôi cuốn với bạt chocolate đen mềm ẩm quyện cùng mousse Earl Grey ủ caramel thơm nồng. Trải nghiệm vị giác đa tầng nhờ lớp chocolate mỏng và ngũ cốc giòn tan. Một lựa chọn tinh tế, đậm đà vị caramel và nồng nàn hương trà. ",
        description: "<p><strong>Hương vị:</strong> Béo nhẹ - thơm dịu - giòn rụm</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Lớp crunchy caramel: sự kết hợp giữa ngũ cốc giòn cùng chocolate caramel thơm lừng.</p></li><li><p>Lớp chocolate caramel: phủ một lớp mỏng tạo độ giòn nhẹ.</p></li><li><p>Mousse Earl Grey hòa quyện cùng chocolate trắng, ngọt béo nhẹ, dậy hương trà thêm chút vị caramel tinh tế.</p></li><li><p>Lớp bạt bánh chocolate đen mềm ẩm.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>2 muỗng nhựa</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [133, 134]
    },
    {
        id: 133,
        name: "Hộp Forest Crunchill",
        slug: "images/Forest-Crunchill-1.jpg",
        price: 165000,
        images: [
            "images/Forest-Crunchill-1.jpg",
            "images/Forest-Crunchill-2.jpg",
            "images/Forest-Crunchill-3.jpg",
            "images/Forest-Crunchill-4.jpg",
        ],
        shortDescription: "Forest Crunchill nồng nàn với bạt chocolate thấm rượu cherry và mứt dâu cherry chua dịu. Lớp mousse vanilla hạt béo mịn quyện cùng chocolate mỏng và ngũ cốc praline giòn rụm tạo cấu trúc đa tầng. Vị đắng thanh xen lẫn nét ngọt thơm nồng nàn, mang lại trải nghiệm vị giác đầy chiều sâu. ",
        description: "<p><strong>Hương vị:</strong> Đậm đà  - Chua nhẹ - Béo dịu</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Lớp crunchy chocolate đen: sự kết hợp giữa ngũ cốc giòn cùng chocolate đen và hạnh nhân hạt phỉ.</p></li><li><p>Lớp chocolate đen: phủ một lớp mỏng tạo độ giòn nhẹ.</p></li><li><p>Mousse vị vanilla: vị mousse thơm béo kết hợp cùng hạt vanilla li ti thơm lừng.</p></li><li><p>Lớp mứt cherry nấu cùng dâu và rượu cherry đậm đà.</p></li><li><p>Lớp bạt bánh chocolate đen mềm ẩm, được thấm một lớp syrup rượu cherry.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>2 muỗng nhựa</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [132, 134, 131]
    },
    {
        id: 134,
        name: "Hộp Matcha Crunchill",
        slug: "hop-matcha-crunchill",
        price: 155000,
        images: [
            "images/Matcha-Crunchill-1.jpg",
            "images/Matcha-Crunchill-2.jpg",
            "images/Matcha-Crunchill-3.jpg",
            "images/Matcha-Crunchill-4.jpg",
        ],
        shortDescription: "Matcha Crunchill mang đến trải nghiệm đa tầng: bạt trà xanh hạnh nhân xốp mịn quyện cùng mứt dâu phúc bồn tử chua ngọt. Lớp mousse matcha béo mượt thơm lừng, kết hợp cùng chocolate đen mỏng và ngũ cốc giòn tan. Sự hòa quyện hoàn hảo giữa vị thanh đắng và ngọt dịu. ",
        description: "<p><strong>Hương vị:</strong> Thơm mát - Chua dịu - giòn rụm</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Lớp crunchy trà xanh: sự kết hợp giữa ngũ cốc giòn cùng chocolate trắng và bột trà xanh thơm lừng.</p></li><li><p>Lớp chocolate đen: phủ một lớp mỏng tạo độ giòn nhẹ.</p></li><li><p>Mousse trà xanh và chocolate trắng ngọt và béo nhẹ, thơm mùi trà xanh.</p></li><li><p>Lớp mứt dâu và phúc bồn tử vị chua ngọt được nấu thủ công.</p></li><li><p>Lớp bạt bánh trà xanh hạnh nhân xốp mịn.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>2 muỗng nhựa</p></li></ul>",
        isFeatured: false,
        relatedProductIds: [132, 133]
    },
    {
        id: 135,
        name: "Bánh Thiên Nga - Kem Bắp Nhiệt Đới",
        slug: "banh-thien-nga-kem-bap-nhiet-doi",
        price: 575000,
        images: [
            "images/banh-thien-nga-1.jpg",
            "images/banh-thien-nga-2.jpg",
            "images/banh-thien-nga-3.jpg"
        ],
        shortDescription: "Tuyệt tác nghệ thuật dành riêng cho các bữa tiệc sang trọng và dịp kỷ niệm đặc biệt. Mẫu bánh gây ấn tượng mạnh mẽ với tạo hình thiên nga trắng kem quý phái cùng lớp trái cây tươi rực rỡ sắc màu. Hương vị thanh tao từ bắp tươi kết hợp kết cấu mềm mịn hứa hẹn sẽ chinh phục những vị khách sành ăn nhất. ",
        description: "<p><strong>Hương vị:</strong> Béo thơm - Chua ngọt - Mềm mịn</p><p><strong>Cấu trúc bánh:</strong></p><ul><li><p>Bạt bông lan bắp: Ẩm mịn, xốp mềm, lưu giữ trọn vẹn hương thơm nguyên bản.</p></li><li><p>Kem bắp tươi làm từ 100% bắp tươi, mềm mại và tan ngay trên đầu lưỡi với vị ngọt thanh thanh.</p></li><li><p>Chi tiết cổ và cánh thiên nga được tạo hình thủ công tỉ mỉ từ chocolate cao cấp.</p></li><li><p>Mặt bánh được điểm xuyết rạng rỡ bằng các loại trái cây tươi mọng nước như dâu tây, đào ngọt...</p></li><li><p>Lớp bạt bánh trà xanh hạnh nhân xốp mịn.</p></li></ul><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>Dao cắt bánh</p></li><li><p>Bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [136, 134, 133]
    },
    {
        id: 136,
        name: "Delicate Bloom - Bánh kem Bắp Dâu",
        slug: "delicate-bloom-banh-kem-bap-dau",
        price: 535000,
        images: [
            "images/delicate_bloom_1.jpg",
            "images/delicate_bloom_2.jpg",
            "images/delicate_bloom_3.jpg"
        ],
        shortDescription: "Đây chính là lựa chọn quốc dân mang vị ngọt thanh, thơm dịu. Lớp cốt bông lan xốp mềm quyện cùng mousse bắp béo nhẹ tạo cảm giác tan chảy, giải ngấy cực đỉnh. Trang trí đầy đặn với dâu tây, dưa lưới, đào và bắp hạt - đây là món bánh gần gũi, tươi mát cho mọi bữa tiệc gia đình. ",
        description: "<p><strong>Hương thơm và mùi vị:</strong> Ngọt dịu - Thơm đặc trưng - Béo nhẹ</p><p><strong>Bánh size 22cm - cao 4cm</strong></p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm các lớp chính:</p><ul><li><p>Mousse bắp</p></li><li><p>Bông lan bắp</p></li></ul><p>Phần trang trí: Dâu tây, Dưa lưới, Bắp nguyên hạt, Đào, Sô-cô-la trắng</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li><li><p>Cây ghim và phụ kiện riêng của bánh</p></li></ul><p></p>",
        isFeatured: false,
        relatedProductIds: [134, 135]
    },
];

export default productsData;