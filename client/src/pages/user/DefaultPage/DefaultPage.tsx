import './DefaultPage.css'

const Defaultpage = () => {

    return (
        <div>
            <div className="containerCss">
                <div className="defaultContainer">
                    <div className="defaltLeft">
                        <div className="keeplearning">
                            Keep learning in the moments that matter
                        </div>
                        <div className="expert ">
                            <span className='text-blue-600 font-medium'> Expert-led courses</span> across a variety of <span className='text-blue-600 font-medium'> online class topics</span>  for every step of your career. Instructors with real-world experience.
                        </div>
                        <div className="defaultLogin">
                            <button>Sign In</button>
                        </div>
                    </div>
                    <div className="containerRight">
                        <img src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" alt="" />
                    </div>
                </div>
            </div>
            <div className='mt-9'>
                <img src="https://f9-zpcloud.zdn.vn/8144163010039801452/7cc7326bb06b65353c7a.jpg" alt="" />
            </div>
        </div>
    )

};

export default Defaultpage;
