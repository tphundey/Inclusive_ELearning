import './FooterUser.css'
const FooterUser = () => {
    return (
        <div>
            <hr />
            <footer>
                <ul>
                    <li><a href=""><button>English (English)<i className="fa-solid fa-caret-down ml-2"></i></button></a></li>
                    <li><a href="">About </a></li>
                    <li><a href="">Become an Instructor </a></li>
                    <li><a href="">Buy for my team </a></li>
                    <li><a href="">Help</a></li>
                    <li><a href="">Privacy & Terms</a></li>
                    <li><a href="">Accessibility </a></li>
                    <li><a href="">Apps</a></li>
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