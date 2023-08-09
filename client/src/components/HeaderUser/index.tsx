import './HeaderUser.css'
const HeaderUser = () => {
    return (
        <div className='header-static'>
            <header>
                <div className="containerCss flex-hd">
                    <div className="box1">
                        <div className="logo">
                            <img src="https://f9-zpcloud.zdn.vn/6063566139068766470/d60a9b137ea1adfff4b0.jpg" alt="logo website" />
                        </div>
                    </div>
                    <div className="box2">
                        <div className="left">
                            <i className="fa-solid fa-list lups"></i>
                            <div className="bolder-css">
                                <form action="">
                                    <input placeholder='What do you want to learn today?' type="text" />
                                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <a href="">
                                        <i className="fa-solid fa-house lups"></i>
                                        <div>Home</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-regular fa-file lups"></i>
                                        <div>My learning</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-regular fa-user lups"></i>
                                        <div>Me<i className="fa-solid fa-caret-down lups-left"></i></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-solid fa-earth-europe lups"></i>
                                        <div>EN<i className="fa-solid fa-caret-down lups-left"></i></div>
                                    </a>
                                </li>

                            </ul>
                            <div className='freemonth'>
                                <a href="">Start my free month</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <div className="containerCss">
                    <div> Solutions for: </div>
                    <ul>
                        <li><a href="">Business</a></li>
                        <li><a href="">Develop</a></li>
                        <li><a href="">Higher Education</a></li>
                        <li><a href="">| <span className='mr-3'></span> buy for my team</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HeaderUser