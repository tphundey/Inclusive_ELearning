import './FooterUser.css'
const FooterUser = () => {
    return (
        <div>
            <hr />
            <footer>
                <ul>
                    <li><a href=""><button>Ngôn ngữ (Tiếng Việt)<i className="fa-solid fa-caret-down ml-2"></i></button></a></li>
                    <li><a href="">Xem thêm </a></li>
                    <li><a href="">Về chúng tôi </a></li>
                    <li><a href="">Điều khoản</a></li>
                    <li><a href="">Hỗ trợ</a></li>
                    <li><a href="">Liên hệ hợp tác</a></li>
                    <li><a href="">Cộng đồng </a></li>
                    <li><a href="">Ứng dụng</a></li>
                </ul>

                <div className='des-footer'>
                    <div>
                        <img width={90} src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="" />
                    </div>
                    <div className="des">
                        LinkedIn Corporation © 2023
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FooterUser