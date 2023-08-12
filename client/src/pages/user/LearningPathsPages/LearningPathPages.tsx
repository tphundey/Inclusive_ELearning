import './LearningPath.css'
import { Select, Space } from 'antd';
const LearningPathpage = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='containerCss learning-path'>
            <div className="filter">
                <button className='flbt-1'>Learning Paths</button>
                <Space
                    style={{ borderRadius: 240 }}
                    className='ml-5' wrap>
                    <Select
                        defaultValue="Level"
                        style={{ width: 120, borderRadius: 240 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Beginner', label: 'Beginner' },
                            { value: 'Intermediate', label: 'Intermediate' },
                            { value: 'Advanced', label: 'Advanced' },
                        ]}
                    />
                </Space>
            </div>
            <hr />
            <span className='sp1'>Browse</span> <br />
            <span className='sp2'>Business</span><br />
            <div className='sp3'>The Business library is a better business school for professionals. It teaches you how to manage time and projects; be more productive with business software and technology; and lead yourself, others, and the business across functions and over the span of your career.</div>
            <hr />
            <span className="sp4">266 Results for “Business”</span>
            <div className="list-lerningpath">
                <div className="lerning-path-children">
                    <div className="ler-left">
                        <img src="https://media.licdn.com/dms/image/C4E0DAQFiGbsG7ktnyA/learning-public-crop_144_256/0/1582672209910?e=1692478800&v=beta&t=g5m5Zf_DPzJuOJ9DRchYq36IfVcbmIgKDy96QI0jNs4" alt="" />
                    </div>
                    <div className="ler-right">
                        <div className="ler-right-t1">LEARNING PATH</div>
                        <div className="ler-right-t2">Start a Design Business</div>
                        <div className="ler-right-t3"> <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" /> LinkedIn - Updated 4 months ago</div>
                        <div className="ler-right-t4">9,655 learners - Skills: Design, Graphic Design</div>
                    </div>
                    <div className='ler-right2'>
                        <button>Save</button>
                    </div>
                </div>
                <hr />

                <div className="lerning-path-children">
                    <div className="ler-left">
                        <img src="https://media.licdn.com/dms/image/D560DAQFiQlCaBADM9w/learning-public-banner-crop_300_1400/0/1680818127320?e=1692478800&v=beta&t=A1mvktl2ds7sextwIwRUECVMBcHo3uEfZT2Md9X4oFQ" alt="" />
                    </div>
                    <div className="ler-right">
                        <div className="ler-right-t1">LEARNING PATH</div>
                        <div className="ler-right-t2">Start a Design Business</div>
                        <div className="ler-right-t3"> <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" /> LinkedIn - Updated 4 months ago</div>
                        <div className="ler-right-t4">9,655 learners - Skills: Design, Graphic Design</div>
                    </div>
                    <div className='ler-right2'>
                        <button>Save</button>
                    </div>
                </div>
                <hr />

                <div className="lerning-path-children">
                    <div className="ler-left">
                        <img src="https://media.licdn.com/dms/image/C4E0DAQFLi9Ov_Q8ESg/learning-public-crop_144_256/0/1588716377593?e=1692478800&v=beta&t=5tG8kgGOjbvcwJ-voqOLSQVWIZaAOvbTDS3dfsUumcw" alt="" />
                    </div>
                    <div className="ler-right">
                        <div className="ler-right-t1">LEARNING PATH</div>
                        <div className="ler-right-t2">Start a Design Business</div>
                        <div className="ler-right-t3"> <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" /> LinkedIn - Updated 4 months ago</div>
                        <div className="ler-right-t4">9,655 learners - Skills: Design, Graphic Design</div>
                    </div>
                    <div className='ler-right2'>
                        <button>Save</button>
                    </div>
                </div>
                <hr />

                <div className="lerning-path-children">
                    <div className="ler-left">
                        <img src="https://media.licdn.com/dms/image/C4E0DAQFiGbsG7ktnyA/learning-public-crop_144_256/0/1582672209910?e=1692478800&v=beta&t=g5m5Zf_DPzJuOJ9DRchYq36IfVcbmIgKDy96QI0jNs4" alt="" />
                    </div>
                    <div className="ler-right">
                        <div className="ler-right-t1">LEARNING PATH</div>
                        <div className="ler-right-t2">Start a Design Business</div>
                        <div className="ler-right-t3"> <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" /> LinkedIn - Updated 4 months ago</div>
                        <div className="ler-right-t4">9,655 learners - Skills: Design, Graphic Design</div>
                    </div>
                    <div className='ler-right2'>
                        <button>Save</button>
                    </div>
                </div>
                <hr />

                <div className="lerning-path-children">
                    <div className="ler-left">
                        <img src="https://media.licdn.com/dms/image/C4E0DAQFiGbsG7ktnyA/learning-public-crop_144_256/0/1582672209910?e=1692478800&v=beta&t=g5m5Zf_DPzJuOJ9DRchYq36IfVcbmIgKDy96QI0jNs4" alt="" />
                    </div>
                    <div className="ler-right">
                        <div className="ler-right-t1">LEARNING PATH</div>
                        <div className="ler-right-t2">Start a Design Business</div>
                        <div className="ler-right-t3"> <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" /> LinkedIn - Updated 4 months ago</div>
                        <div className="ler-right-t4">9,655 learners - Skills: Design, Graphic Design</div>
                    </div>
                    <div className='ler-right2'>
                        <button>Save</button>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )

};

export default LearningPathpage;
